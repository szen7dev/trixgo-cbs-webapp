// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import pcmDashboardV2 from "apis/pcm/pcmDashboardV2";
import TaskRepository from "apis/task";
import DatahubRepository from "apis/datahub";

export const useListResponseFromSearch = (payload: any): any => {
  // Get danh sách
  const {
    isLoading: isLoadingResponse,
    refetch: refetchSubject,
    data: dataSubject,
    fetchNextPage: nextPageSubject,
    hasNextPage: hasNextPageSubject,
    isFetching
  } = useInfiniteQuery(
    [`app_dashboard_search_by_response.${payload}`, payload],
    async ({ pageParam }) => {
      return pcmDashboardV2.searchBySubject({
        isActive: "1",
        isGroup: "1",
        isParent: "0",
        select: "createAt content author task",
        populates: JSON.stringify({
          path: "author task project",
          select: "_id name fullname image createAt related sign",
        }),
        lastestID: pageParam || "",
        limit: "50",
        ...payload
      });
    },
    {
      getNextPageParam: ({ data }) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: payload.enabled ? true : false,
    }
  );

  const listDataForResponse = []
    .concat(...(dataSubject?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);
  const totalRecord = dataSubject?.pages[0]?.data?.totalRecord;
  const totalPage = dataSubject?.pages[0]?.data?.totalPage;

  return {
    isLoadingResponse,
    listDataForResponse,
    totalRecord,
    totalPage,
    nextPageSubject,
    hasNextPageSubject,
    refetchSubject,
    isFetching
  };
};

// export const useListSubjectFromSearch = (
//   payload: {
//     keyword: string;
//   },
//   enabled = true
// ): any => {
//   // Get danh sách
//   const {
//     isLoading: isLoadingSubject,
//     refetch: refetchSubject,
//     data: dataSubject,
//     fetchNextPage: nextPageSubject,
//     hasNextPage: hasNextPageSubject,
//   } = useInfiniteQuery(
//     [`app_dashboard_search_by_subject.${payload.keyword}`, payload.keyword],
//     async ({ pageParam }) => {
//       return TaskRepository.listSubject({
//         keyword: payload.keyword,
//         draft: "1",
//         isParent: "1",
//         isActive: "1",
//         lastestID: pageParam || "",
//       });
//     },
//     {
//       getNextPageParam: ({ data }) => {
//         return data?.nextCursor || undefined;
//       },
//       refetchOnWindowFocus: false,
//       enabled: enabled,
//     }
//   );

//   const listDataForSubject = []
//     .concat(...(dataSubject?.pages || []).map((d: any) => d.data?.listRecords))
//     .filter(Boolean);
//   const totalRecord = dataSubject?.pages[0]?.data?.totalRecord;
//   const totalPage = dataSubject?.pages[0]?.data?.totalPage;

//   return {
//     isLoadingSubject,
//     listDataForSubject,
//     totalRecord,
//     totalPage,
//     nextPageSubject,
//     hasNextPageSubject,
//     refetchSubject,
//   };
// };

export const useListCompaniesSystems = (
  payload: {
    keyword: string;
  },
  enabled = true
): any => {
  // Get danh sách
  const {
    isLoading: isLoadingCompaniesSystems,
    refetch: refetchCompaniesSystems,
    data: dataCompaniesSystems,
    fetchNextPage: nextPageCompaniesSystems,
    hasNextPage: hasNextPageCompaniesSystems,
  } = useInfiniteQuery(
    [`app_dashboard_search_company.${payload.keyword}`, payload.keyword],
    async ({ pageParam }) => {
      return DatahubRepository.companiesList({
        select: "_id name sign image address",
        limit: 3,
        keyword: payload.keyword,
        lastestID: pageParam || "",
      });
    },
    {
      getNextPageParam: ({ data }) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: enabled,
    }
  );

  const listDataCompaniesSystems = []
    .concat(
      ...(dataCompaniesSystems?.pages || []).map(
        (d: any) => d.data?.listRecords
      )
    )
    .filter(Boolean);
  const totalRecord = dataCompaniesSystems?.pages[0]?.data?.totalRecord;
  const totalPage = dataCompaniesSystems?.pages[0]?.data?.totalPage;

  return {
    isLoadingCompaniesSystems,
    listDataCompaniesSystems,
    totalRecord,
    totalPage,
    nextPageCompaniesSystems,
    hasNextPageCompaniesSystems,
    refetchCompaniesSystems,
  };
};

export const usePcmPlanTaskNotification = (payload: any): any => {
  const {
    data
  } = useQuery(
    [`usePcmPlanTaskNotification`, payload],
    async () => {
      return pcmDashboardV2.pcmPlanTaskNotification({
        ...payload
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: payload.enabled ? true : false,
    }
  );

  return {
    data
  };
};