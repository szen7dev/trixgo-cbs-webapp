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
    CashBookAmountIncomeExpenseParams,
    CashBookAmountIncomeExpenseResponse,
    CashBookAmountByProperty,
    CashBookAmountByPropertyParams,
    CashBookDownloadPayload,
    CashBookImportPayload,
    CashBookExportManyPayload,
} from 'typings/financial/cashBook';

/*=====3.INTERFACE DEFINE=====*/
interface UseCashBook {
    isLoading: boolean;
    isLoadingInfo: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    insertAsync: (payload: CashBookInsertPayload) => Promise<CashBookInfoResponse>;
    updateAsync: (payload: CashBookUpdatePayload) => Promise<CashBookInfoResponse>;
    deleteManyAsync: (params: CashBookDeleteManyPayload) => Promise<any>;
    list: Array<CashBook>;
    info: CashBook | undefined;
    refetch: () => void;
    refetchInfo: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
    downloadTemplateExcelAsync: (payload: any) => Promise<any>;
    importExcelAsync: (payload: any) => Promise<any>;
    exportExcelAsync: (payload: any) => Promise<any>;
}

type UseCashBookProps = {
    params?: CashBookInfoParams | CashBookListParams,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

export const useCashBook = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false,
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

    const { data: detailData, isLoading: isLoadingInfo, refetch: refetchInfo } =
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
        ['cashbook--list', params],
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
        }
    );

    const list = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;

    // Tải mẫu import excel
    const { mutateAsync: downloadTemplateExcelAsync } =
        useMutation((payload: CashBookDownloadPayload ) => CashbookRepository.downloadTemplateExcel(payload)
    );

    // Import excel
    const { mutateAsync: importExcelAsync } =
        useMutation((payload: CashBookImportPayload) => CashbookRepository.importExcel(payload)
    );

    // Export excel
    const { mutateAsync: exportExcelAsync } =
        useMutation((payload: CashBookExportManyPayload) => CashbookRepository.exportExcel(payload)
    );

    return {
        isLoading,
        isLoadingInfo,
        insertAsync,
        updateAsync,
        deleteManyAsync,
        list,
        info,
        totalRecord,
        totalPage,
        hasNextPage,
        refetch,
        refetchInfo,
        fetchNextPage,
        fetchPreviousPage,
        downloadTemplateExcelAsync,
        importExcelAsync,
        exportExcelAsync
    }
}

/**
 * Hook cashbook Custom
 */
interface UseCashBookCustom {
    amountIncomeExpenseByParent: CashBookAmountIncomeExpenseResponse;
    isLoadingAmountIncomeExpense: boolean;
    amountByProperty: CashBookAmountByProperty[];
    isLoadingAmountByProperty: boolean;
    refetchAmountByProperty: () => void;
    refetchAmountIncomeExpense: () => void;
}

type UseCashBookCustomProps = {
    paramsAmountIncomeExpense?: CashBookAmountIncomeExpenseParams,
    paramsAmountByProperty?: CashBookAmountByPropertyParams,
    isFetchAmountIncomeExpenseByParent?: boolean,
    isFetchAmountByProperty?: boolean,
}

export const useCashBookCustom = ({
    paramsAmountIncomeExpense = {},
    paramsAmountByProperty = {},
    isFetchAmountIncomeExpenseByParent = false,
    isFetchAmountByProperty = false
}: UseCashBookCustomProps) : UseCashBookCustom => {

    const {
        data: dataAmountIncomeExpenseByParent,
        isLoading: isLoadingAmountIncomeExpense,
        refetch: refetchAmountIncomeExpense
    } =
        useQuery("cashbook--amount_income_expense",
            () => CashbookRepository.fetchAmountIncomeExpenseByParent(paramsAmountIncomeExpense), {
            refetchOnWindowFocus: false,
            enabled: isFetchAmountIncomeExpenseByParent,
        });

    const amountIncomeExpenseByParent = dataAmountIncomeExpenseByParent?.data;

    const {
        data: dataAmountByProperty,
        isLoading: isLoadingAmountByProperty,
        refetch: refetchAmountByProperty
    } =
        useQuery("cashbook--amount_by_property",
            () => CashbookRepository.fetchAmountByProperty(paramsAmountByProperty), {
            refetchOnWindowFocus: false,
            enabled: isFetchAmountByProperty,
        });

    const amountByProperty = dataAmountByProperty?.data;

    return {
        amountIncomeExpenseByParent,
        isLoadingAmountIncomeExpense,
        amountByProperty,
        isLoadingAmountByProperty,
        refetchAmountByProperty,
        refetchAmountIncomeExpense
    }
}