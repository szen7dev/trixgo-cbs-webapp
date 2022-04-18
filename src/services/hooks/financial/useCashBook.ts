/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useQuery, useMutation } from "react-query";

/*=====2.TYPING/APIS=====*/
import { CashbookRepository } from "apis/financial";
import type {
    CashBook,
    CashBookInsertPayload,
    CashBookUpdatePayload,
    CashBookDeleteManyPayload,
    CashBookInfoParams,
    CashBookListParams,
    CashBookInfoResponse,
    CashBookAmountIncomeExpenseResponse
} from 'typings/financial/cashBook';

/*=====3.INTERFACE DEFINE=====*/
interface UseCashBook {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    insertAsync: (payload: CashBookInsertPayload) => Promise<CashBookInfoResponse>;
    updateAsync: (payload: CashBookUpdatePayload) => Promise<CashBookInfoResponse>;
    deleteManyAsync: (params: CashBookDeleteManyPayload) => Promise<any>;
    amountIncomeExpenseByParent: CashBookAmountIncomeExpenseResponse;
    list: Array<CashBook>;
    info: CashBook | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

type UseCashBookProps = {
    params?: CashBookInfoParams | CashBookListParams,
    paramsAmountIncomeExpense?: Partial<{ parentID: string }>,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
    isFetchAmountIncomeExpenseByParent?: boolean,
}

export const useCashBook = ({
    params = {},
    paramsAmountIncomeExpense = {},
    isFetchList = false,
    isFetchInfo = false,
    isFetchAmountIncomeExpenseByParent = false
}: UseCashBookProps): UseCashBook => {

    const { mutateAsync: insertAsync } =
        useMutation((payload: CashBookInsertPayload) => CashbookRepository.insert(payload)
    );

    const { mutateAsync: updateAsync } =
        useMutation((payload: CashBookUpdatePayload) => CashbookRepository.update(payload)
    );

    const { mutateAsync: deleteManyAsync } =
        useMutation((payload: CashBookDeleteManyPayload) => CashbookRepository.deleteMany(payload)
    );

    const { data: detailData } =
        useQuery("cashbook__info", () => CashbookRepository.fetchInfo(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = detailData?.data;

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage
    } = useInfiniteQuery(
        ['cashbook__list', params],
        async ({ pageParam }: any) =>
            CashbookRepository.fetchList({
                lastestID: pageParam ?? "",
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor ?? undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList,
            // keepPreviousData: true,
            // refetchOnMount: false,
        }
    );

    const list = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;

    const { data: dataAmountIncomeExpenseByParent } =
        useQuery("cashbook__amount-income-expense", 
            () => CashbookRepository.fetchAmountIncomeExpenseByParent(paramsAmountIncomeExpense.parentID || ''), {
            refetchOnWindowFocus: false,
            enabled: isFetchAmountIncomeExpenseByParent,
        });

    const amountIncomeExpenseByParent = dataAmountIncomeExpenseByParent?.data;

    return {
        isLoading,
        insertAsync,
        updateAsync,
        deleteManyAsync,
        amountIncomeExpenseByParent,
        list,
        info,
        totalRecord,
        totalPage,
        hasNextPage,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
    }
}