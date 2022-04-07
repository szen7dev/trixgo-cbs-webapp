import { useMutation, useQuery, useInfiniteQuery } from "react-query";
import ContractPaymentRepository from 'apis/cmcs/contractPayment';

interface UseContractPayment {
    listAmountContractValueByDate: Array<any>;
    // isLoading: boolean;
    // totalRecord: number;
    // totalPage: number;
    // hasNextPage: boolean | undefined;
    // list: Array<any>;
    // info: any;
    // refetch: () => void;
    // fetchNextPage: () => void;
    // fetchPreviousPage: () => void;
}

// Khai báo params cho hook
type UseContractPaymentProps = {
    params?: any,
    isFetchListAmountContractValue?: boolean,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useContractPayment = ({
    params = {},
    isFetchListAmountContractValue = false,
    // isFetchList = false,
    // isFetchInfo = false
}: UseContractPaymentProps): UseContractPayment => {
    // Get info
    const { data: detailData } =
        useQuery("amount_contract_value_by_date__info", () => ContractPaymentRepository.fetchAmountContractValueGroupByDate(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchListAmountContractValue,
        });

    const listAmountContractValueByDate = detailData?.data?.listRecords || [];

    // // Get List
    // const {
    //     isLoading,
    //     data,
    //     refetch,
    //     fetchNextPage,
    //     fetchPreviousPage,
    //     hasNextPage
    // } = useInfiniteQuery(
    //     ['contract_payment__list', params],
    //     async ({ pageParam }: any) =>
    //         ContractPaymentRepository.fetchAmountContractValueGroupByDate({
    //             lastestID: pageParam ?? "",
    //             ...params,
    //         }),
    //     {
    //         getNextPageParam: ({ data }: any) => {
    //             return data?.nextCursor ?? undefined;
    //         },
    //         refetchOnWindowFocus: false,
    //         enabled: isFetchList
    //     }
    // );

    // const list = []
    //     .concat(...(data?.pages || [])
    //     .map((d: any) => d.data?.listRecords))
    //     .filter(Boolean);

    // const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    // const totalPage = data?.pages[0]?.data?.totalPage || 0;

    // Return data
    return {
        listAmountContractValueByDate,
        // isLoading,
        // list,
        // info,
        // totalRecord,
        // totalPage,
        // hasNextPage,
        // refetch,
        // fetchNextPage,
        // fetchPreviousPage,
    }
}

// Đoạn hook này sẽ refactor lại sau, sử dụng hook phía trên

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