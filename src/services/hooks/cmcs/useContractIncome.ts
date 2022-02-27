import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { ContractIncome } from "typings/contractIncome";
import ContractIncomeRepository from 'apis/cmcs/contractIncome';
import HumanRepository from 'apis/human';

type UseContractIncomeProp = {
    listContractIncome: Array<ContractIncome>;
    isLoading: boolean;
    fetchNextPage: () => void,
    fetchPreviousPage: () => void,
    totalRecord: number | undefined,
    totalPage: number | undefined,
    hasNextPage: boolean | undefined
};

export const UseContractIncomeList = (pageParam = '', limit = 10): any => {

    const {
        status,
        data,
        error,
        refetch
    } = useQuery(
        ["contractIncomeList", { pageParam }],
        async (pageParams: any) => {
            const [, { pageParam }] = pageParams.queryKey;
            return ContractIncomeRepository.fetchList({
                limit,
                lastestID: pageParam || "",
            })
        },
        { keepPreviousData: true }
    );

    const listContractIncome = data?.data?.listRecords
    const totalRecord = data?.data?.totalRecord
    const totalPage = data?.data?.totalPage
    const nextCursor = data?.data?.nextCursor

    return {
        listContractIncome,
        totalRecord,
        totalPage,
        nextCursor,
        refetch
    }
};
export const UseContractGuaranteeList = (pageParam = '', limit = 10): any => {

    const {
        status,
        data,
        error,
        refetch
    } = useQuery(
        ["contractGuaranteeList", { pageParam }],
        async (pageParams: any) => {
            const [, { pageParam }] = pageParams.queryKey;
            return ContractIncomeRepository.fetchList({
                limit,
                lastestID: pageParam || "",
                isExpiredAg: 1
            })
        },
        { keepPreviousData: true }
    );

    const listContractIncome = data?.data?.listRecords
    const totalRecord = data?.data?.totalRecord
    const totalPage = data?.data?.totalPage
    const nextCursor = data?.data?.nextCursor

    return {
        listContractIncome,
        totalRecord,
        totalPage,
        nextCursor,
        refetch
    }
};

export const useCreateContractMutation = (): {
    createContractMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractIncomeRepository.requestCreateContract(payload)
    );
    return {
        createContractMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useHistoryTraffics = (): {
    createHistoryTraffics: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractIncomeRepository.requestHistoryTraffics(payload)
    );
    return {
        createHistoryTraffics: mutateAsync,
        loading: isLoading,
    }
}

export const useUpdateContractMutation = (): {
    updateContractMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractIncomeRepository.requestUpdateContract(payload)
    );
    return {
        updateContractMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useDeleteContractMutation = (): {
    deleteContractMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractIncomeRepository.requestDeleteContract(payload)
    );
    return {
        deleteContractMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useQueryListContract = ({ limit, keyword }: any): any => {
    const res = useInfiniteQuery(
        [`list_contract,${keyword}`, keyword],
        async ({ pageParam }: any) =>
            // mai request BE check lại api này
            HumanRepository.fetchListContract({
                limit: limit || 10,
                lastestID: pageParam || "",
                keyword,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        hasNextPage
    } = res;

    const listContract = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        loading: isLoading,
        listContract,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListDoctype,
        fetchNextPageDoctype
    }
}

export const useQueryListAccount = ({ limit, keyword }: any): any => {
    const res = useInfiniteQuery(
        [`list_account,${keyword}`, keyword],
        async ({ pageParam }: any) =>
            // mai request BE check lại api này
            HumanRepository.fetchListAccount({
                limit: limit || 10,
                lastestID: pageParam || "",
                keyword,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        hasNextPage
    } = res;

    const listAccount = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        loading: isLoading,
        listAccount,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListDoctype,
        fetchNextPageDoctype
    }
}

export const useQueryListGood = ({ limit, keyword }: any): any => {
    const res = useInfiniteQuery(
        [`list_good,${keyword}`, keyword],
        async ({ pageParam }: any) =>
            // mai request BE check lại api này
            HumanRepository.fetchListGood({
                limit: limit || 10,
                lastestID: pageParam || "",
                keyword,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        hasNextPage
    } = res;

    const listGood = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        loading: isLoading,
        listGood,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListDoctype,
        fetchNextPageDoctype
    }
}

export const useQueryListContractIPC = ({ limit, keyword, contractID }: any): any => {
    const res = useInfiniteQuery(
        [`list_contractIPC,${keyword}`, keyword, contractID],
        async ({ pageParam }: any) =>
            // mai request BE check lại api này
            HumanRepository.fetchListContractIPC({
                limit: limit || 10,
                lastestID: pageParam || "",
                keyword,
                contractID
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        hasNextPage
    } = res;

    const listContractIPC = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        loading: isLoading,
        listContractIPC,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListDoctype,
        fetchNextPageDoctype
    }
}

export const useQueryListContact = ({ limit, keyword }: any): any => {
    const res = useInfiniteQuery(
        [`list_contact,${keyword}`, keyword],
        async ({ pageParam }: any) =>
            // mai request BE check lại api này
            HumanRepository.fetchListContact({
                limit: limit || 10,
                lastestID: pageParam || "",
                keyword,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        hasNextPage
    } = res;

    const listContact = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        loading: isLoading,
        listContact,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListDoctype,
        fetchNextPageDoctype
    }
}

export const useQueryListWarehouse = ({ limit, keyword }: any): any => {
    const res = useInfiniteQuery(
        [`list_warehouse,${keyword}`, keyword],
        async ({ pageParam }: any) =>
            // mai request BE check lại api này
            HumanRepository.fetchListWarehouse({
                limit: limit || 10,
                lastestID: pageParam || "",
                keyword,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        hasNextPage
    } = res;

    const listWarehouse = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        loading: isLoading,
        listWarehouse,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListDoctype,
        fetchNextPageDoctype
    }
}

export const useQueryListProject = ({ limit, type, keyword }: any): any => {
    const res = useInfiniteQuery(
        [`list_project,${type}.${keyword}`, keyword],
        async ({ pageParam }: any) =>
            // mai request BE check lại api này
            HumanRepository.fetchListProject({
                limit: limit || 10,
                lastestID: pageParam || "",
                type,
                keyword,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        hasNextPage
    } = res;

    const listProject = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        loading: isLoading,
        listProject,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListDoctype,
        fetchNextPageDoctype
    }
}

export const useDetailContractMutation = (id: string): any => {
    const res = useQuery(`contract_detail.${id}`, () =>
        ContractIncomeRepository.fetchDetailContract({
            contactID: id,
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