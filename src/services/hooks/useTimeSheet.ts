import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import {
  TimeSheetParentRepository,
  TimeSheetChildRepository,
} from "apis/time-sheet";

import type {
  TimeSheetParent,
  InsertTimeSheetParentPayload,
  InsertTimeSheetParentResponse,
  UpdateTimeSheetParentPayload,
  UpdateTimeSheetParentResponse,
  DeleteTimeSheetParentPayload,
  DeleteTimeSheetParentResponse,
  TimeSheetChild,
  InsertTimeSheetChildPayload,
  InsertTimeSheetChildResponse,
  UpdateTimeSheetChildPayload,
  UpdateTimeSheetChildResponse,
} from "typings/time-sheet";

// Time Sheet Parent
interface UseQueryListTimeSheetParent {
  loading: boolean;
  data: TimeSheetParent[];
  dataNotFilter: Array<TimeSheetParent[]>;
  hasNextPage?: boolean;
  limit: number;
  totalPages: number;
  totalRecord: number;
  refetch: () => void;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
}

export const useQueryListTimeSheetParent = (
  params?: any,
  limit = 50
): UseQueryListTimeSheetParent => {
  const result = useInfiniteQuery(
    [`list_time-sheet.parent`, params],
    async ({ pageParam }: any) =>
      TimeSheetParentRepository.fetchListTimeSheet({
        populates: {
          path: "assignee project userCreate userUpdate parent work funda",
          select: "fullname name",
        },
        limit,
        lastestID: pageParam,
        ...params,
      }),
    {
      getNextPageParam: ({ data }: any) => {
        return data?.nextCursor || undefined;
      },
      getPreviousPageParam: (data) => {
        return undefined;
      },
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );
  const {
    isLoading,
    data,
    refetch,
    fetchNextPage,
    fetchPreviousPage: fetchPrevPage,
    hasNextPage,
  } = result;

  const listTimeSheet = []
    .concat(...(data?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const dataNotFilter = (data?.pages || []).map(
    (d: any) => d.data?.listRecords
  );

  const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
  const totalPages = data?.pages[0]?.data?.totalPage || 0;

  return {
    loading: isLoading,
    data: listTimeSheet,
    dataNotFilter,
    hasNextPage,
    limit,
    totalPages,
    totalRecord,
    refetch,
    fetchNextPage,
    fetchPrevPage,
  }
}

export const useTimesheetCustom = ({
  params = {}
}: any) : any => {

  // // Tải mẫu import excel
  // const { mutateAsync: downloadTemplateExcelAsync } =
  //     useMutation((payload: any ) =>
  //       TimeSheetParentRepository.downloadTemplateExcel(payload)
  // );

  // // Import excel
  // const { mutateAsync: importFromExcelAsync } =
  //     useMutation((payload: { projectID?: string, dataImport: string }) =>
  //       TimeSheetParentRepository.importFromExcel(payload)
  // );

  // Export excel
  const { mutateAsync: exportExcelAsync } =
      useMutation((payload: any) =>
        TimeSheetParentRepository.exportExcel(payload)
  );

  return {
      // downloadTemplateExcelAsync,
      // importFromExcelAsync,
      exportExcelAsync
  }
}

export const useByProperty = ({ params = {},  isFetchList = false }: any): any => {

  const { data: detailData, isLoading: listByPropertyIsLoading, refetch: refetchListByProperty } =
  useQuery([`fetchListByProperty`,{...params, isFetchList }],() => TimeSheetParentRepository.fetchListByProperty(params), {
      refetchOnWindowFocus: false,
      enabled: isFetchList,
  });
  
  const listByProperty = detailData?.data;

  return {
      listByProperty,
      listByPropertyIsLoading,
      refetchListByProperty
  }
}
interface UseQueryDetailTimeSheetParent {
  loading: boolean;
  data?: TimeSheetParent;
  error: boolean;
  refetch: () => void;
}

export const useQueryDetailTimeSheetParent = (
  expertTimesheetID: string
): UseQueryDetailTimeSheetParent => {
  const { isLoading, data, refetch } = useQuery(
    `time-sheet.parent.${expertTimesheetID}`,
    async () =>
      TimeSheetParentRepository.fetchDetailTimeSheet({
        populates: {
          path: "assignee project userCreate userUpdate members admins",
          select: "_id fullname bizfullname name sign image",
        },
        expertTimesheetID,
      }),
    {
      getNextPageParam: ({ data }: any) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  return {
    loading: isLoading,
    data: data?.data,
    error: data?.error || false,
    refetch,
  };
};

interface UseMutationTimeSheetParent {
  onCreateTimeSheetParentAsync: (
    payload: InsertTimeSheetParentPayload
  ) => Promise<InsertTimeSheetParentResponse>;
  onUpdateTimeSheetParentAsync: (
    payload: UpdateTimeSheetParentPayload
  ) => Promise<UpdateTimeSheetParentResponse>;
  onDeleteTimeSheetParentAsync: (
    payload: DeleteTimeSheetParentPayload
  ) => Promise<DeleteTimeSheetParentResponse>;
}
export const useMutationTimeSheetParent = (): UseMutationTimeSheetParent => {
  const insertMutation = useMutation((payload: InsertTimeSheetParentPayload) =>
    TimeSheetParentRepository.insertTimeSheet(payload)
  );
  const updateMutation = useMutation((payload: UpdateTimeSheetParentPayload) =>
    TimeSheetParentRepository.updateTimeSheet(payload)
  );
  const deleteMutation = useMutation((payload: DeleteTimeSheetParentPayload) =>
    TimeSheetParentRepository.deleteTimeSheet(payload)
  );

  return {
    onCreateTimeSheetParentAsync: insertMutation.mutateAsync,
    onUpdateTimeSheetParentAsync: updateMutation.mutateAsync,
    onDeleteTimeSheetParentAsync: deleteMutation.mutateAsync,
  };
};

// Time Sheet Children
interface UseQueryListTimeSheetChild {
  loading: boolean;
  data: TimeSheetChild[];
  dataNotFilter: TimeSheetChild[];
  hasNextPage?: boolean;
  totalPages: number;
  totalRecord: number;
  limit: number;
  refetch: () => void;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
}
export const useQueryListTimeSheetChild = (
  timeSheetParentID: string,
  params: any,
): UseQueryListTimeSheetChild => {
  const result = useInfiniteQuery(
    [`list_time-sheet.child`, params],
    async ({ pageParam }: any) =>
      TimeSheetChildRepository.fetchListTimeSheet({
        parentID: timeSheetParentID,
        lastestID: pageParam,
        ...params
      }),
    {
      getNextPageParam: ({ data }: any) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );
  const {
    isLoading,
    data,
    refetch,
    fetchNextPage,
    fetchPreviousPage: fetchPrevPage,
    hasNextPage,
  } = result;

  const listTimeSheet = []
    .concat(...(data?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const dataNotFilter = (data?.pages || []).map(
    (d: any) => d.data?.listRecords
  );

  const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
  const totalPages = data?.pages[0]?.data?.totalPage || 0;

  return {
    loading: isLoading,
    data: listTimeSheet,
    dataNotFilter,
    hasNextPage,
    totalPages,
    totalRecord,
    limit: params.limit || 50,
    refetch,
    fetchNextPage,
    fetchPrevPage,
  };
};

interface UseMutationTimeSheetChild {
  onCreateTimeSheetAsync: (
    payload: InsertTimeSheetChildPayload
  ) => Promise<InsertTimeSheetChildResponse>;
  onUpdateTimeSheetAsync: (
    payload: UpdateTimeSheetChildPayload
  ) => Promise<UpdateTimeSheetChildResponse>;
}

export const useMutationTimeSheetChild = (): UseMutationTimeSheetChild => {
  const insertMutation = useMutation((payload: InsertTimeSheetChildPayload) =>
    TimeSheetChildRepository.insertTimeSheet(payload)
  );

  const updateMutation = useMutation((payload: UpdateTimeSheetChildPayload) =>
    TimeSheetChildRepository.updateTimeSheet(payload)
  );

  return {
    onCreateTimeSheetAsync: insertMutation.mutateAsync,
    onUpdateTimeSheetAsync: updateMutation.mutateAsync,
  }
}