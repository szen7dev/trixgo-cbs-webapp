/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useQuery, useMutation } from "react-query";

/*=====2.TYPING/APIS=====*/
import { BudgetWorkRepository } from "apis/budget";
import type {
    BudgetWork,
    BudgetWorkInfoParams,
    BudgetWorkListParams,
} from 'typings/budget/budget-work';

/*=====3.INTERFACE DEFINE=====*/
interface UseBudgetWork {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    insertAsync: (payload: any) => Promise<any>;
    updateAsync: (payload: any) => Promise<any>;
    deleteManyAsync: (params: any) => Promise<any>;
    downloadTemplateExcelAsync: (params: any) => Promise<any>;
    importExcelAsync: (params: any) => Promise<any>;
    exportExcelAsync: (params: any) => Promise<any>;
    list: Array<BudgetWork>;
    info: BudgetWork | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

type UseBudgetWorkProps = {
    params?: BudgetWorkInfoParams | BudgetWorkListParams,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

export const useBudgetWork = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false
}: UseBudgetWorkProps): UseBudgetWork => {
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) => BudgetWorkRepository.insert(payload)
    );

    const { mutateAsync: updateAsync } =
        useMutation((payload: any) => BudgetWorkRepository.update(payload)
    );

    const { mutateAsync: deleteManyAsync } =
        useMutation((params: any) => BudgetWorkRepository.deleteMany(params)
    );

    const { data: detailData } =
        useQuery("budget__info", () => BudgetWorkRepository.fetchInfo(params), {
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
        ['budget__list', params],
        async ({ pageParam }: any) =>
            BudgetWorkRepository.fetchList({
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

    // Tải mẫu import excel
    const { mutateAsync: downloadTemplateExcelAsync } =
        useMutation((payload: any ) =>
        BudgetWorkRepository.downloadTemplateExcel(payload)
    )

    // Import excel
    const { mutateAsync: importExcelAsync } =
        useMutation((payload: { dataImport: string }) =>
        BudgetWorkRepository.importExcel(payload)
    )

    // Export excel
    const { mutateAsync: exportExcelAsync } =
        useMutation((payload: any) =>
        BudgetWorkRepository.exportExcel(payload)
    )

    return {
        isLoading,
        insertAsync,
        updateAsync,
        deleteManyAsync,
        downloadTemplateExcelAsync,
        importExcelAsync,
        exportExcelAsync,
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