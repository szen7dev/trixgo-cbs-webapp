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
    isFetching,
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
        ...payload,
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

  const listDataForResponseWithPager = (dataSubject?.pages || []).map(
    (d: any) => d.data?.listRecords
  );
  const totalRecord = dataSubject?.pages[0]?.data?.totalRecord;
  const totalPage = dataSubject?.pages[0]?.data?.totalPage;

  return {
    isLoadingResponse,
    listDataForResponse,
    listDataForResponseWithPager,
    totalRecord,
    totalPage,
    nextPageSubject,
    hasNextPageSubject,
    refetchSubject,
    isFetching,
  };
};

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
  const { data, refetch } = useQuery(
    [`usePcmPlanTaskNotification`],
    async () => {
      return pcmDashboardV2.pcmPlanTaskNotification({
        ...payload,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: payload.enabled ? true : false,
    }
  );

  return {
    data,
    refetch
  };
};

export const useListFileFromSearch = (payload: any): any => {
  // Get danh sách
  const {
    isLoading: isLoadingFile,
    refetch: refetchFile,
    data: dataFile,
    fetchNextPage: nextPageFile,
    hasNextPage: hasNextPageFile,
    isFetching,
  } = useInfiniteQuery(
    [`app_dashboard_search_by_file.${payload}`, payload],
    async ({ pageParam }) => {
      return pcmDashboardV2.pcmFiles({
        populates: JSON.stringify({
          path: "author task project",
          select: "_id name fullname image createAt related sign",
        }),
        lastestID: pageParam || "",
        limit: "50",
        ...payload,
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

  const listDataForFile = []
    .concat(...(dataFile?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const listDataForFileWithPager = (dataFile?.pages || []).map(
    (d: any) => d.data?.listRecords
  );

  const totalRecord = dataFile?.pages[0]?.data?.totalRecord;
  const totalPage = dataFile?.pages[0]?.data?.totalPage;

  return {
    isLoadingFile,
    listDataForFile,
    listDataForFileWithPager,
    totalRecord,
    totalPage,
    nextPageFile,
    hasNextPageFile,
    refetchFile,
    isFetching,
  };
};

export const usePcmCommentGetListByProperty = (payload: any): any => {
  const data = useQuery(
    [`usePcmCommentGetListByProperty`, payload],
    async () => {
      return pcmDashboardV2.pcmCommentGetListByProperty({
        ...payload,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: payload.enabled === true ? true : false
    }
  );

  return {
    isLoading: data.isLoading,
    listDataProject: data.data?.data?.listDataProject || [],
    listDataProjectCompanyAuthor: data.data?.data?.listDataProjectCompanyAuthor || [],
  }
};

export const usePcmPlanTaskGetListByProperty = (payload: any): any => {
  const data = useQuery(
    [`usePcmPlanTaskGetListByProperty`, payload],
    async () => {
      return pcmDashboardV2.pcmPlanTaskGetListByProperty({
        ...payload,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: payload.enabled === true ? true : false
    }
  );
  return {
    isLoading: data.isLoading,
    listDataProject: data.data?.data?.listDataProject || [],
    listDataProjectCompany: data.data?.data?.listDataProjectCompany || [],
    dataTotal: data?.data
  }
};