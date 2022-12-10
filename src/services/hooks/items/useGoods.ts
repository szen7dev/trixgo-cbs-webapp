/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { GoodsRepository } from 'apis/item';
import type { Goods } from 'typings/items';

/*=====3.INTERFACE DEFINE=====*/
interface useGoods {
    isLoading: boolean;
    totalRecord: number;
    hasNextPage: boolean | undefined;
    list: Array<Goods.Goods>;
    info: Goods.Goods | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    insertAsync: (params: any) => Promise<any>;
    updateAsync: (params: any) => Promise<any>;
    deleteAsync: (ids: Array<string>) => Promise<any>;
    downloadTemplateExcelAsync: (payload: any) => Promise<any>;
    importExcelAsync: (payload: any) => Promise<any>;
    exportExcelAsync: (payload: any) => Promise<any>;
}

// Khai báo params cho hook
type UseGoodsProps = {
    params?: Goods.GoodsQueryPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useGoods = ({
    params = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseGoodsProps): useGoods => {
    // Create
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            GoodsRepository.addGoods(payload)
        );
    
    // Update
    const { mutateAsync: updateAsync } =
        useMutation((payload: any) =>
            GoodsRepository.updateGoods(payload)
        );

    // Delete
    const { mutateAsync: deleteAsync } =
        useMutation((ids: Array<string>) =>
            GoodsRepository.deleteGoods(ids)
        );

    // Get info
    const { data: infoGoods } =
        useQuery("Goods__info", () => GoodsRepository.fetchDetailGoods(params.goodsID || ''), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = infoGoods?.data;

    // Get List
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['Goods__list', params],
        async ({ pageParam }: any) =>
            GoodsRepository.fetchListGoods({
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

    // Tải mẫu import excel
        const { mutateAsync: downloadTemplateExcelAsync } =
        useMutation((payload: any ) =>
        GoodsRepository.downloadTemplateExcel(payload)
    );

    // Import excel
    const { mutateAsync: importExcelAsync } =
        useMutation((payload: { projectID?: string, dataImport: string }) =>
        GoodsRepository.importExcel(payload)
    );

    // Export excel
    const { mutateAsync: exportExcelAsync } =
        useMutation((payload: any) =>
        GoodsRepository.exportExcel(payload)
    );

    // Return data
    return {
        isLoading,
        list,
        info,
        totalRecord,
        hasNextPage,
        refetch,
        fetchNextPage,
        insertAsync,
        updateAsync,
        deleteAsync,
        downloadTemplateExcelAsync,
        importExcelAsync,
        exportExcelAsync
    }
}
