// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useInfiniteQuery, useMutation } from "react-query";
import inspection from "apis/inspection/";

export const useListCheckList = (payload: any): any => {

  // Create
  const { mutateAsync: insertAsync } =
    useMutation((payload: any) =>
      inspection.createDocs(payload)
    );

  // Get danh sách
  const {
    isLoading,
    refetch,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    [`useListCheckList.${payload}`, payload],
    async ({ pageParam }) => {
      return inspection.inspectionDocs({
        lastestID: pageParam || "",
        ...payload,
      });
    },
    {
      getNextPageParam: ({ data }) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const listData = []
    .concat(...(data?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const listDataForWithPager = (data?.pages || []).map(
    (d: any) => d.data?.listRecords
  );
  const totalRecord = data?.pages[0]?.data?.totalRecord;
  const totalPage = data?.pages[0]?.data?.totalPage;

  return {
    isLoading,
    listData,
    listDataForWithPager,
    totalRecord,
    totalPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    insertAsync,
  };
};