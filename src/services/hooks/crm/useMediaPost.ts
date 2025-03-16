/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import crmMediaRepository from "apis/crm/post";

interface MediaPostParams {
  lastestID?: string;
  [key: string]: any; // For other potential params
}

interface UseMediaPostProps {
  params?: MediaPostParams;
  isFetchList?: boolean;
  isFetchInfo?: boolean;
  isFetchTags?: boolean;
  isFetchMenu?: boolean;
}

export const useMediaPost = ({
  params = {},
  isFetchList = false,
  isFetchInfo = false,
  isFetchTags = false,
  isFetchMenu = false,
}: UseMediaPostProps): any => {
  const { mutateAsync: insertAsync } = useMutation((payload: any) =>
    crmMediaRepository.insert(payload)
  );

  const { mutateAsync: updateAsync } = useMutation((payload: any) =>
    crmMediaRepository.update(payload)
  );

  const { mutateAsync: deleteManyAsync } = useMutation((payload: any) =>
    crmMediaRepository.remove(payload)
  );

  const {
    data: detailData,
    isLoading: isLoadingInfo,
    refetch: refetchInfo,
  } = useQuery(
    "media_post_info",
    () => crmMediaRepository.getInfoAndGetList(params),
    {
      refetchOnWindowFocus: false,
      enabled: isFetchInfo,
    }
  );

  const info = detailData?.data;

  // Fetch tags from the API /api/medias/tag
  const {
    data: tagsData,
    isLoading: isLoadingTags,
    refetch: refetchTags,
  } = useQuery("media_tags", () => crmMediaRepository.getTags(params), {
    enabled: isFetchTags,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: insertTag } = useMutation((payload: any) =>
    crmMediaRepository.insertTag(payload)
  );

  // Fetch menus from the API /api/medias/menu
  const {
    data: menuData,
    isLoading: isLoadingMenu,
    refetch: refetchMenu,
  } = useQuery("media_menu", () => crmMediaRepository.getMenus(params), {
    enabled: isFetchMenu,
    refetchOnWindowFocus: false,
  });

  const { isLoading, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["media-post-list", params],
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
        enabled: isFetchList,
      }
    );

  const list = []
    .concat(...(data?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const listTags = tagsData?.listRecords || [];
  const listMenus = menuData?.listRecords || [];

  const listWithPager = (data?.pages || []).map(
    (d: any) => d.data?.listRecords
  );

  const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
  const totalPage = data?.pages[0]?.data?.totalPage || 0;

  // Tải mẫu import excel
  const { mutateAsync: downloadTemplateExcelAsync } = useMutation(
    (payload: any) => crmMediaRepository.downloadTemplateExcel(payload)
  );

  // Import excel
  const { mutateAsync: importExcelAsync } = useMutation(
    (payload: { dataImport: string }) => crmMediaRepository.importExcel(payload)
  );

  // Export excel
  const { mutateAsync: exportExcelAsync } = useMutation((payload: any) =>
    crmMediaRepository.exportExcel(payload)
  );

  return {
    isLoading,
    isLoadingInfo,
    isLoadingTags,
    isLoadingMenu,
    list,
    listWithPager,
    info,
    totalRecord,
    totalPage,
    hasNextPage,
    refetch,
    refetchInfo,
    refetchTags,
    refetchMenu,
    fetchNextPage,
    insertAsync,
    insertTag,
    updateAsync,
    deleteManyAsync,
    downloadTemplateExcelAsync,
    importExcelAsync,
    exportExcelAsync,
    listTags,
    listMenus,
  };
};
