import { useInfiniteQuery, useMutation, useQuery } from "react-query";

import ContractIPCRepository from 'apis/cmcs/contractIPC';

type UseContractIPCProp = {
    listContractIPC: Array<any>;
    isLoading: boolean;
    fetchNextPage: () => void,
    fetchPreviousPage: () => void,
    totalRecord: number | undefined,
    totalPage: number | undefined,
    hasNextPage: boolean | undefined
};

export const UseContractIPCList = (pageParam = '', contractID = '', limit = 10, keyword = ""): any => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(
        ["contractIPCList", { pageParam }],
        async (pageParams: any) => {
            const [, { pageParam }] = pageParams.queryKey;
            return ContractIPCRepository.fetchList({
                limit,
                lastestID: pageParam || "",
                contractID,
                keyword
            })
        },
        { keepPreviousData: true }
    );

    const listContractIPC = data?.data?.listRecords
    const totalRecord = data?.data?.totalRecord
    const totalPage = data?.data?.totalPage
    const nextCursor = data?.data?.nextCursor

    return {
        listContractIPC,
        totalRecord,
        totalPage,
        nextCursor,
        refetch
    }
};

export const UseContractIPCListWithPager = (isFetchList = false, param = {}, contractID = '', limit = 10, keyword = ""): any => {
    const res = useInfiniteQuery(
        [`contractIPCListWithPager`, { param }],
        async ({ pageParam }: any) =>
            ContractIPCRepository.fetchList({
                limit,
                lastestID: pageParam || "",
                contractID,
                keyword,
                ...param
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList ?? true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
    } = res;

    const listContractIPC = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const listContractIPCWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        listContractIPC,
        listContractIPCWithPager,
        totalRecord,
        totalPage,
        nextCursor,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        isLoading
    }
};

export const useCreateContractIPCMutation = (): {
    createContractIPCMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractIPCRepository.requestCreateContract(payload)
    );
    return {
        createContractIPCMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useHistoryTraffics = (): {
    createHistoryTraffics: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractIPCRepository.requestHistoryTraffics(payload)
    );
    return {
        createHistoryTraffics: mutateAsync,
        loading: isLoading,
    }
}

export const useUpdateContractIPCMutation = (): {
    updateContractIPCMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractIPCRepository.requestUpdateContract(payload)
    );
    return {
        updateContractIPCMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useDeleteContractIPCMutation = (): {
    deleteContractIPCMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractIPCRepository.requestDeleteContract(payload)
    );
    return {
        deleteContractIPCMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useDetailContractIPCMutation = (id: string): any => {
    const res = useQuery(`contract_detail.${id}`, () =>
        ContractIPCRepository.fetchDetailContract({
            contractIpcID: id,
        })
    );
    if (Array.isArray(res.data?.data)) {
        return {
            detailContract: {},
            message: res.data?.data[0].message,
            loading: res.isLoading,
            refetch: res.refetch,
        }
    }
    return {
        detailContract: res.data?.data || {},
        message: 'Ok',
        loading: res.isLoading,
        refetch: res.refetch,
    }
}

// Bắt đầu tạo hook download excel
type UseContractCustom = {
    exportContractIpcAsync: (payload: any) => Promise<any>,
    contractIPCAmountByProperty: any,
    isLoadingAmountByProperty: boolean,
};

type UseContractCustomParams = {
    params?: any,
    isFetchAmountByProperty?: boolean
}

export const useContractIpcCustom = ({
    params = {},
    isFetchAmountByProperty = false
}: UseContractCustomParams) : UseContractCustom => {
    const { mutateAsync: exportContractIpcAsync } =
        useMutation((payload: any) =>
            ContractIPCRepository.exportContractIpc(payload)
        );

    const { data: contractIPCAmountByProperty, isLoading: isLoadingAmountByProperty } =
    useQuery(["cmcsContractIPCAmountByProperty", params], () =>
        ContractIPCRepository.fetchAmountByProperty(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchAmountByProperty,
        });

    return {
        exportContractIpcAsync,
        contractIPCAmountByProperty,
        isLoadingAmountByProperty
    }
}
// Kết thúc tạo hook download excel

export const useCmcsDashboard = ({ params = {}}) => {
    const { data: cmcsContractIPCAmountByMonth } =
        useQuery(["cmcsContractIPCAmountByMonth", params], () =>
            ContractIPCRepository.cmcsContractIPCAmountByMonth(params), {
                refetchOnWindowFocus: false,
                enabled: true,
            });

    const { data: cmcsContractPaymentAmountByMonth } =
    useQuery(["cmcsContractPaymentAmountByMonth", params], () =>
        ContractIPCRepository.cmcsContractPaymentAmountByMonth(params), {
            refetchOnWindowFocus: false,
            enabled: true,
        });

    return {
        cmcsContractIPCAmountByMonth: cmcsContractIPCAmountByMonth?.data,
        cmcsContractPaymentAmountByMonth: cmcsContractPaymentAmountByMonth?.data
    }
}

export const UseContractIPCGetListByMonthWithPager = ({ params = {}, isFetchList = false }): any => {
    console.log({ isFetchList })
    const res = useInfiniteQuery(
        [`contractIPCGetListByMonthWithPager`, { params }],
        async ({ pageParam }: any) =>
            ContractIPCRepository.getListByMonth({
                lastestID: pageParam || "",
                ...params
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList ?? true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
    } = res;

    const listWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);
    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        listWithPager,
        totalRecord,
        totalPage,
        nextCursor,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        isLoading
    }
};