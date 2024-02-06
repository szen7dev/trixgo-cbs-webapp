/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useQuery, useMutation } from "react-query";

/*=====2.TYPING/APIS=====*/
import { CustomerBookingRepository } from "apis/fnb/customerBooking";
import type {
    CashPayment,
    CashPaymentInsertPayload,
    CashPaymentUpdatePayload,
    CashPaymentDeleteManyPayload,
    CashPaymentListParams,
    CashPaymentDownloadPayload,
    CashPaymentImportPayload,
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
    listData: Array<CashPayment>;
    listDataWithPager: Array<CashPayment>;
    info: CashPayment | undefined;
    refetch: () => void;
    refetchInfo: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
    downloadTemplateExcelAsync: (payload: CashPaymentDownloadPayload) => Promise<any>;
    importExcelAsync: (payload: CashPaymentImportPayload) => Promise<any>;
    exportExcelAsync: (payload: any) => Promise<any>;
}

type UseCashPaymentProps = {
    params?: CashPaymentListParams,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

export const useFnbCustomerBooking = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false,
}: UseCashPaymentProps): UseCashPayment => {

    const { mutateAsync: insertAsync } =
        useMutation((payload: CashPaymentInsertPayload) => CustomerBookingRepository.insert(payload)
    );

    const { mutateAsync: updateAsync } =
        useMutation((payload: CashPaymentUpdatePayload) => CustomerBookingRepository.update(payload)
    );

    const { mutateAsync: deleteManyAsync } =
        useMutation((payload: CashPaymentDeleteManyPayload) => CustomerBookingRepository.deleteMany(payload)
    );

    const { data: detailData, isLoading: isLoadingInfo, refetch: refetchInfo } =
        useQuery("crmBooking__info", () => CustomerBookingRepository.fetchInfo(params), {
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
        ['crmBooking__list', params],
        async ({ pageParam }: any) =>
            CustomerBookingRepository.fetchList({
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
        useMutation((payload: CashPaymentDownloadPayload ) => CustomerBookingRepository.downloadTemplateExcel(payload)
    );

    // Import excel
    const { mutateAsync: importExcelAsync } =
        useMutation((payload: CashPaymentImportPayload) => CustomerBookingRepository.importExcel(payload)
    );

    // Export excel
    const { mutateAsync: exportExcelAsync } =
        useMutation((payload: any) =>
        CustomerBookingRepository.exportExcel(payload)
    );

    return {
        isLoading,
        isLoadingInfo,
        insertAsync,
        updateAsync,
        deleteManyAsync,
        listData,
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
        exportExcelAsync,
    }
}

export const useCustomerCareByProperty = ({ params = {},  isFetchList = false }: any): any => {

    const { data: detailData, isLoading: listCustomerCareByPropertyIsLoading, refetch: refetchListCustomerCareByProperty } =
    useQuery([`CustomerBooking_by_property`,{...params, isFetchList }],() => CustomerBookingRepository.fetchListByProperty(params), {
        refetchOnWindowFocus: false,
        enabled: isFetchList,
    });
    
    const listCustomerCareByProperty = detailData?.data;

    return {
        listCustomerCareByProperty,
        listCustomerCareByPropertyIsLoading,
        refetchListCustomerCareByProperty
    }
}