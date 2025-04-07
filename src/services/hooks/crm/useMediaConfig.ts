/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import crmConfigRepository from 'apis/crm/config';

export const useMediaConfig = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false
}: any): any => {

    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            crmConfigRepository.insert(payload)
        );

    const { mutateAsync: updateAsync } =
        useMutation((payload: any) =>
            crmConfigRepository.update(payload)
        );

    const { mutateAsync: deleteManyAsync } =
        useMutation((payload: any) =>
            crmConfigRepository.remove(payload)
        );

    const { data: detailData, isLoading: isLoadingInfo, refetch: refetchInfo } =
        useQuery("media_menu_info", () => crmConfigRepository.getInfoAndGetList(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = detailData?.data;

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['media-menu-list', params],
        async ({ pageParam }: any) =>
            crmConfigRepository.getInfoAndGetList({
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
    const listWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;

    // Tải mẫu import excel
    const { mutateAsync: downloadTemplateExcelAsync } =
        useMutation((payload: any ) =>
        crmConfigRepository.downloadTemplateExcel(payload)
    );

    // Import excel
    const { mutateAsync: importExcelAsync } =
        useMutation((payload: { dataImport: string }) =>
        crmConfigRepository.importExcel(payload)
    );

    // Export excel
    const { mutateAsync: exportExcelAsync } =
        useMutation((payload: any) =>
        crmConfigRepository.exportExcel(payload)
    );

    return {
        isLoading,
        isLoadingInfo,
        list,
        listWithPager,
        info,
        totalRecord,
        totalPage,
        hasNextPage,
        refetch,
        refetchInfo,
        fetchNextPage,
        insertAsync,
        updateAsync,
        deleteManyAsync,
        downloadTemplateExcelAsync,
        importExcelAsync,
        exportExcelAsync
    }
}