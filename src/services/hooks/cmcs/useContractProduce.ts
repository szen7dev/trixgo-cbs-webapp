import {useInfiniteQuery, useMutation, useQuery} from "react-query";

import ContractProduceRepository from 'apis/cmcs/contractProduce';
import {DocumentRepository} from "../../../apis/document";

type UseContractProduceProp = {
    listContractProduce: Array<any>;
    isLoading: boolean;
    fetchNextPage: () => void,
    fetchPreviousPage: () => void,
    totalRecord: number | undefined,
    totalPage: number | undefined,
    hasNextPage: boolean | undefined
};

export const UseContractProduceList = (pageParam = '', contractID = '', limit = 10): any => {

    const {
        status,
        data,
        error,
        refetch
    } = useQuery(
        ["contractProduceList", { pageParam }],
        async (pageParams: any) => {
            const [, { pageParam }] = pageParams.queryKey;
            return ContractProduceRepository.fetchList({
                limit,
                lastestID: pageParam || "",
                contractID
            })
        },
        { keepPreviousData: true }
    );

    const listContractProduce = data?.data?.listRecords
    const totalRecord = data?.data?.totalRecord
    const totalPage = data?.data?.totalPage
    const nextCursor = data?.data?.nextCursor

    return {
        listContractProduce,
        totalRecord,
        totalPage,
        nextCursor,
        refetch
    }
};

export const UseContractProduceListWithPager = (param = {}, contractID = '', limit = 10, isFetchList = false): any => {
    const res = useInfiniteQuery(
        [`contractProduceListWithPager`, { param }],
        async ({ pageParam }: any) =>
            ContractProduceRepository.fetchList({
                lastestID: pageParam,
                limit,
                contractID
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

    const listContractProduce = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const listContractProduceWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        listContractProduce,
        listContractProduceWithPager,
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

export const useCreateContractProduceMutation = (): {
    createContractProduceMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractProduceRepository.requestCreateContract(payload)
    );
    return {
        createContractProduceMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useHistoryTraffics = (): {
    createHistoryTraffics: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractProduceRepository.requestHistoryTraffics(payload)
    );
    return {
        createHistoryTraffics: mutateAsync,
        loading: isLoading,
    }
}

export const useUpdateContractProduceMutation = (): {
    updateContractProduceMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractProduceRepository.requestUpdateContract(payload)
    );
    return {
        updateContractProduceMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useDeleteContractProduceMutation = (): {
    deleteContractProduceMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractProduceRepository.requestDeleteContract(payload)
    );
    return {
        deleteContractProduceMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useDetailContractProduceMutation = (id: string): any => {
    const res = useQuery(`contract_detail.${id}`, () =>
        ContractProduceRepository.fetchDetailContract({
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