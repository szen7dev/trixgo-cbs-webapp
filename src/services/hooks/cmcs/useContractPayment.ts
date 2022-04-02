import { useMutation, useQuery } from "react-query";
import ContractPaymentRepository from 'apis/cmcs/contractPayment';

export const UseContractPaymentList = (pageParam = '', contractID = '', limit = 10, keyword=''): any => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(
        ["contractPaymentList", { pageParam }],
        async (pageParams: any) => {
            const [, { pageParam }] = pageParams.queryKey;
            return ContractPaymentRepository.fetchListContractPaynent({
                limit,
                lastestID: pageParam || "",
                contractID,
                keyword
            })
        },
        { keepPreviousData: true }
    );

    const listContractPayment = data?.data?.listRecords
    const totalRecord = data?.data?.totalRecord
    const totalPage = data?.data?.totalPage
    const nextCursor = data?.data?.nextCursor

    return {
        listContractPayment,
        totalRecord,
        totalPage,
        nextCursor,
        refetch
    }
};

export const useCreateContractPaymentMutation = (): {
    createContractPaymentMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        ContractPaymentRepository.requestCreateContractPayment(payload)
    );
    return {
        createContractPaymentMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useHistoryTraffics = (): {
    createHistoryTraffics: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
    ContractPaymentRepository.requestHistoryTraffics(payload)
    );
    return {
        createHistoryTraffics: mutateAsync,
        loading: isLoading,
    }
}

export const useUpdateContractPaymentMutation = (): {
    updateContractPaymentMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
    ContractPaymentRepository.requestUpdateContractPayment(payload)
    );
    return {
        updateContractPaymentMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useDeleteContractPaymentMutation = (): {
    deleteContractPaymentMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
    ContractPaymentRepository.requestDeleteContractPayment(payload)
    );
    return {
        deleteContractPaymentMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useDetailContractPaymentMutation = (id: string): any => {
    const res = useQuery(`contract_payment_detail.${id}`, () =>
    ContractPaymentRepository.fetchDetailContractPayment({
            contractPaymentID: id
        })
    );
    if (Array.isArray(res.data?.data)) {
        return {
            detailContractPayment: {},
            message: res.data?.data[0].message,
            loading: res.isLoading,
            refetch: res.refetch,
        }
    }
    return {
        detailContractPayment: res.data?.data || {},
        message: 'Ok',
        loading: res.isLoading,
        refetch: res.refetch,
    }
}