import { useInfiniteQuery, useMutation, useQuery } from "react-query";

import ContractIPCRepository from 'apis/cmcs/contractIPC';
import HumanRepository from 'apis/human';

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