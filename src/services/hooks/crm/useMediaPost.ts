/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import crmMediaRepository from 'apis/crm/post';

export const useMediaPost = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false
}: any): any => {

    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            crmMediaRepository.insert(payload)
        );

    const { mutateAsync: updateAsync } =
        useMutation((payload: any) =>
            crmMediaRepository.update(payload)
        );

    const { mutateAsync: deleteManyAsync } =
        useMutation((payload: any) =>
            crmMediaRepository.remove(payload)
        );

    const { data: detailData, isLoading: isLoadingInfo, refetch: refetchInfo } =
        useQuery("media_post_info", () => crmMediaRepository.getInfoAndGetList(params), {
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
        ['media-post-list', params],
        async ({ pageParam }: any) =>
            crmMediaRepository.getInfoAndGetList({
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
        crmMediaRepository.downloadTemplateExcel(payload)
    );

    // Import excel
    const { mutateAsync: importExcelAsync } =
        useMutation((payload: { dataImport: string }) =>
        crmMediaRepository.importExcel(payload)
    );

    // Export excel
    const { mutateAsync: exportExcelAsync } =
        useMutation((payload: any) =>
        crmMediaRepository.exportExcel(payload)
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