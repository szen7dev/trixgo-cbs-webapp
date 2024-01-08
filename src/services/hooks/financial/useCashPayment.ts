/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useQuery, useMutation } from "react-query";

/*=====2.TYPING/APIS=====*/
import { CashPaymentRepository } from "apis/financial";
import type {
    CashPayment,
    CashPaymentInsertPayload,
    CashPaymentUpdatePayload,
    CashPaymentDeleteManyPayload,
    CashPaymentListParams,
    CashPaymentDownloadPayload,
    CashPaymentImportPayload,
    CashPaymentExportManyPayload,
} from 'typings/financial/cashPayment';

/*=====3.INTERFACE DEFINE=====*/
interface UseCashPayment {
    isLoading: boolean;
    isLoadingInfo: boolean;
    totalRecord: number;
    totalPage: number;
    nextCursor: string | undefined;
    hasNextPage: boolean | undefined;
    insertAsync: (payload: CashPaymentInsertPayload) => Promise<any>;
    updateAsync: (payload: CashPaymentUpdatePayload) => Promise<any>;
    deleteManyAsync: (params: CashPaymentDeleteManyPayload) => Promise<any>;
    listDataWithPager: Array<CashPayment>;
    info: CashPayment | undefined;
    refetch: () => void;
    refetchInfo: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
    downloadTemplateExcelAsync: (payload: CashPaymentDownloadPayload) => Promise<any>;
    importExcelAsync: (payload: CashPaymentImportPayload) => Promise<any>;
    exportExcelAsync: (payload: CashPaymentExportManyPayload) => Promise<any>;
}

type UseCashPaymentProps = {
    params?: CashPaymentListParams,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

export const useCashPayment = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false,
}: UseCashPaymentProps): UseCashPayment => {

    const { mutateAsync: insertAsync } =
        useMutation((payload: CashPaymentInsertPayload) => CashPaymentRepository.insert(payload)
    );

    const { mutateAsync: updateAsync } =
        useMutation((payload: CashPaymentUpdatePayload) => CashPaymentRepository.update(payload)
    );

    const { mutateAsync: deleteManyAsync } =
        useMutation((payload: CashPaymentDeleteManyPayload) => CashPaymentRepository.deleteMany(payload)
    );

    const { data: detailData, isLoading: isLoadingInfo, refetch: refetchInfo } =
        useQuery("CashPayment__info", () => CashPaymentRepository.fetchInfo(params), {
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
        ['CashPayment--list', params],
        async ({ pageParam }: any) =>
            CashPaymentRepository.fetchList({
                lastestID: pageParam ?? "",
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList ?? true,
        }
    );

    const listData = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean)

    const listDataWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords)

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    // Tải mẫu import excel
    const { mutateAsync: downloadTemplateExcelAsync } =
        useMutation((payload: CashPaymentDownloadPayload ) => CashPaymentRepository.downloadTemplateExcel(payload)
    );

    // Import excel
    const { mutateAsync: importExcelAsync } =
        useMutation((payload: CashPaymentImportPayload) => CashPaymentRepository.importExcel(payload)
    );

    // Export excel
    const { mutateAsync: exportExcelAsync } =
        useMutation((payload: CashPaymentExportManyPayload) =>
        CashPaymentRepository.exportExcel(payload)
    );

    return {
        isLoading,
        isLoadingInfo,
        insertAsync,
        updateAsync,
        deleteManyAsync,
        listDataWithPager,
        nextCursor,
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