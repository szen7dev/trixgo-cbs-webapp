import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { StoreParentRepository, StoreChildRepository } from "apis/store";

import type {
  StoreParent,
  InsertStoreParentPayload,
  InsertStoreParentResponse,
  UpdateStoreParentPayload,
  UpdateStoreParentResponse,
  DeleteStoreParentPayload,
  DeleteStoreParentResponse,
  StoreChild,
  InsertStoreChildPayload,
  InsertStoreChildResponse,
  UpdateStoreChildPayload,
  UpdateStoreChildResponse,
} from "typings/store";

// Time Sheet Parent
interface UseQueryListStoreParent {
  loading: boolean;
  data: StoreParent[];
  dataNotFilter: Array<StoreParent[]>;
  hasNextPage?: boolean;
  limit: number;
  totalPages: number;
  totalRecord: number;
  refetch: () => void;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
}

export const useQueryListStoreParent = (
  params?: any,
  limit = 50
): UseQueryListStoreParent => {
  const result = useInfiniteQuery(
    [`list_store.parent`, params],
    async ({ pageParam }: any) =>
        StoreParentRepository.fetchListStore({
        populates: {
          path: "assignee project warehouse customer userCreate userUpdate parent",
          select: "fullname name sign phone",
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

  const listStore = []
    .concat(...(data?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const dataNotFilter = (data?.pages || []).map(
    (d: any) => d.data?.listRecords
  );

  const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
  const totalPages = data?.pages[0]?.data?.totalPage || 0;

  // // Tải mẫu import excel
  // const { mutateAsync: downloadTemplateExcelAsync } =
  //     useMutation((payload: DownloadPayload ) => StoreChildRepository.downloadTemplateExcel(payload)
  // );

  // // Import excel
  // const { mutateAsync: importExcelAsync } =
  //     useMutation((payload: ImportPayload) => StoreChildRepository.importExcel(payload)
  // );

  // // Export excel
  // const { mutateAsync: exportExcelAsync } =
  //     useMutation((payload: ExportManyPayload) =>
  //     StoreChildRepository.exportExcel(payload)
  // );

  return {
    loading: isLoading,
    data: listStore,
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

interface UseQueryDetailStoreParent {
  loading: boolean;
  data?: StoreParent;
  error: boolean;
  refetch: () => void;
}

export const useQueryDetailStoreParent = (
  expertStoreID: string
): UseQueryDetailStoreParent => {
  const { isLoading, data, refetch } = useQuery(
    `store.parent.${expertStoreID}`,
    async () =>
        StoreParentRepository.fetchDetailStore({
        populates: {
          path: "assignee project userCreate userUpdate members admins",
          select: "_id fullname bizfullname name sign image",
        },
        expertStoreID,
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

interface UseMutationStoreParent {
  onCreateStoreParentAsync: (
    payload: InsertStoreParentPayload
  ) => Promise<InsertStoreParentResponse>;
  onUpdateStoreParentAsync: (
    payload: UpdateStoreParentPayload
  ) => Promise<UpdateStoreParentResponse>;
  onDeleteStoreParentAsync: (
    payload: DeleteStoreParentPayload
  ) => Promise<DeleteStoreParentResponse>;
}
export const useMutationStoreParent = (): UseMutationStoreParent => {
  const insertMutation = useMutation((payload: InsertStoreParentPayload) =>
    StoreParentRepository.insertStore(payload)
  );
  const updateMutation = useMutation((payload: UpdateStoreParentPayload) =>
    StoreParentRepository.updateStore(payload)
  );
  const deleteMutation = useMutation((payload: DeleteStoreParentPayload) =>
    StoreParentRepository.deleteStore(payload)
  );

  return {
    onCreateStoreParentAsync: insertMutation.mutateAsync,
    onUpdateStoreParentAsync: updateMutation.mutateAsync,
    onDeleteStoreParentAsync: deleteMutation.mutateAsync,
  };
};

// Time Sheet Children
interface UseQueryListStoreChild {
  loading: boolean;
  data: StoreChild[];
  dataNotFilter: StoreChild[];
  hasNextPage?: boolean;
  totalPages: number;
  totalRecord: number;
  limit: number;
  refetch: () => void;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
}
export const useQueryListStoreChild = (
  StoreParentID: string,
  params: any,
): UseQueryListStoreChild => {
  const result = useInfiniteQuery(
    [`list_store.child`, params],
    async ({ pageParam }: any) =>
        StoreChildRepository.fetchListStore({
        parentID: StoreParentID,
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

  const listStore = []
    .concat(...(data?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const dataNotFilter = (data?.pages || []).map(
    (d: any) => d.data?.listRecords
  );

  const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
  const totalPages = data?.pages[0]?.data?.totalPage || 0;

  return {
    loading: isLoading,
    data: listStore,
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

interface UseMutationStoreChild {
  onCreateStoreAsync: (
    payload: InsertStoreChildPayload
  ) => Promise<InsertStoreChildResponse>;
  onUpdateStoreAsync: (
    payload: UpdateStoreChildPayload
  ) => Promise<UpdateStoreChildResponse>;
}

// export const useMutationStoreChild = (): UseMutationStoreChild => {
//   const insertMutation = useMutation((payload: InsertStoreChildPayload) =>
//     StoreChildRepository.insertStore(payload)
//   );

//   const updateMutation = useMutation((payload: UpdateStoreChildPayload) =>
//     StoreChildRepository.updateStore(payload)
//   );

//   return {
//     onCreateStoreAsync: insertMutation.mutateAsync,
//     onUpdateStoreAsync: updateMutation.mutateAsync,
//   }
// }