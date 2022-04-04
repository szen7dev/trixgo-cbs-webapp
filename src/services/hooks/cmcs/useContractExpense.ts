/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import ContractExpenseRepository from 'apis/cmcs/contractExpense';
import type {
    Contract,
    ListContractsPayload,
    InsertContractPayload,
    DeleteMultiContractPayload,
    UpdateContractPayload
} from 'typings/cmcs';

/*=====3.INTERFACE DEFINE=====*/
interface UseContractExpense {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    list: Array<Contract>;
    info: Contract | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
    insertAsync: (params: InsertContractPayload) => Promise<any>;
    updateAsync: (params: UpdateContractPayload) => Promise<any>;
    deleteAsync: (params: DeleteMultiContractPayload) => Promise<any>;
}

// Khai báo params cho hook
type UseContractExpenseProps = {
    params?: ListContractsPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useContractExpense = ({
    params = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseContractExpenseProps): UseContractExpense => {
    // Create
    const { mutateAsync: insertAsync } =
        useMutation((payload: InsertContractPayload) =>
            ContractExpenseRepository.insert(payload)
        );

    // Update
    const { mutateAsync: updateAsync } =
        useMutation((payload: UpdateContractPayload) =>
            ContractExpenseRepository.update(payload)
        );

    // Delete
    const { mutateAsync: deleteAsync } =
        useMutation((params: DeleteMultiContractPayload) =>
            ContractExpenseRepository.remove(params)
        );

    // Get info
    const { data: detailData } =
        useQuery("contract_expense__info", () => ContractExpenseRepository.fetchInfo({ contractID: params.contractID || '' }), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = detailData?.data;

    // Get List
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage
    } = useInfiniteQuery(
        ['contract_expense__list', params],
        async ({ pageParam }: any) =>
            ContractExpenseRepository.fetchList({
                lastestID: pageParam ?? "",
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor ?? undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList
        }
    );

    const list = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;

    // Return data
    return {
        isLoading,
        list,
        info,
        totalRecord,
        totalPage,
        hasNextPage,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        insertAsync,
        updateAsync,
        deleteAsync,
    }
}
