// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import pcmDashboardV2 from "apis/pcm/pcmDashboardV2";

export const usePcmDashboardV2 = (payload: {
  keyword: string;
}): any => {
  // Get danh sách
  const {
    isLoading: isLoadingSubject,
    refetch: refetchSubject,
    data: dataSubject,
    fetchNextPage: nextPageSubject,
    hasNextPage: hasNextPageSubject,
  } = useInfiniteQuery(
    [`app_dashboard_search_by_subject.${payload.keyword}`, payload.keyword],
    async ({ pageParam }) => {
      return pcmDashboardV2.searchBySubject({
        isActive: 1,
        keyword: payload.keyword,
        select: "createAt content author task",
        populates: {
          path: "author task project",
          select: "_id name fullname image createAt related sign",
        },
        lastestID: pageParam ? pageParam : "",
      });
    },
    {
      getNextPageParam: ({ data }) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: payload.keyword ? true : false,
    }
  );

  const listDataSubject = []
    .concat(...(dataSubject?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);
  const totalRecord = dataSubject?.pages[0]?.data?.totalRecord;
  const totalPage = dataSubject?.pages[0]?.data?.totalPage;

  return {
    isLoadingSubject,
    listDataSubject,
    totalRecord,
    totalPage,
    nextPageSubject,
    hasNextPageSubject,
    refetchSubject,
  };
};
