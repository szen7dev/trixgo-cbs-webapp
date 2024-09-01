import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { StoreParentRepository, StoreChildRepository } from "apis/store";

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
} from "typings/store";

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
    [`list_store.parent`, params],
    async ({ pageParam }: any) =>
        StoreParentRepository.fetchListTimeSheet({
        populates: {
          path: "assignee project userCreate userUpdate parent",
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

  // // Tải mẫu import excel
  // const { mutateAsync: downloadTemplateExcelAsync } =
  //     useMutation((payload: DownloadPayload ) => TimeSheetChildRepository.downloadTemplateExcel(payload)
  // );

  // // Import excel
  // const { mutateAsync: importExcelAsync } =
  //     useMutation((payload: ImportPayload) => TimeSheetChildRepository.importExcel(payload)
  // );

  // // Export excel
  // const { mutateAsync: exportExcelAsync } =
  //     useMutation((payload: ExportManyPayload) =>
  //     TimeSheetChildRepository.exportExcel(payload)
  // );

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
  };
};

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
    `store.parent.${expertTimesheetID}`,
    async () =>
        StoreParentRepository.fetchDetailTimeSheet({
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
    StoreParentRepository.insertTimeSheet(payload)
  );
  const updateMutation = useMutation((payload: UpdateTimeSheetParentPayload) =>
    StoreParentRepository.updateTimeSheet(payload)
  );
  const deleteMutation = useMutation((payload: DeleteTimeSheetParentPayload) =>
    StoreParentRepository.deleteTimeSheet(payload)
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
    [`list_store.child`, params],
    async ({ pageParam }: any) =>
        StoreChildRepository.fetchListTimeSheet({
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

// export const useMutationTimeSheetChild = (): UseMutationTimeSheetChild => {
//   const insertMutation = useMutation((payload: InsertTimeSheetChildPayload) =>
//     StoreChildRepository.insertTimeSheet(payload)
//   );

//   const updateMutation = useMutation((payload: UpdateTimeSheetChildPayload) =>
//     StoreChildRepository.updateTimeSheet(payload)
//   );

//   return {
//     onCreateTimeSheetAsync: insertMutation.mutateAsync,
//     onUpdateTimeSheetAsync: updateMutation.mutateAsync,
//   }
// }