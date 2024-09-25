import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { StoreChildRepository } from "apis/store";

import type {
  StoreChild,
  InsertStoreChildPayload,
  InsertStoreChildResponse,
  UpdateStoreChildPayload,
  UpdateStoreChildResponse,
  DeleteStoreChildPayload,
  DeleteStoreChildResponse,
} from "typings/store";

interface UseQueryListStoreChild {
  loading: boolean;
  data: StoreChild[];
  dataNotFilter: StoreChild[];
  hasNextPage?: boolean;
  limit: number;
  totalPages: number;
  totalRecord: number;
  refetch: () => void;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
}

export const useQueryListStoreChild = (
  params?: any,
  limit = 50
): UseQueryListStoreChild => {
  const result = useInfiniteQuery(
    [`list_store.child`, params],
    async ({ pageParam }: any) =>
        StoreChildRepository.fetchListStore({
        populates: {
          path: "account contra goods parentGoods assets funda customer work budgetWork userCreate userUpdate order project package toPackage contract subtype parentSubtype",
          select: "name sign phone unit note fullname description project",
          populate: {
            path: 'project',
            select: 'name sign'
          }
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

export const useQueryListByPropertyStoreChild = (
  params: any,
) => {
  const result = useInfiniteQuery(
    [`list_store_property.child`, params],
    async ({ pageParam }: any) =>
        StoreChildRepository.fetchListByProperty({
        ...params
      }),
  );

  const {
    data,
  } = result;

  return {
    data: data?.pages[0] || []
  };
};

interface UseQueryDetailStoreChild {
  loading: boolean;
  data?: StoreChild;
  error: boolean;
  refetch: () => void;
}

export const useQueryDetailStoreChild = (
  orderID: string
): UseQueryDetailStoreChild => {
  const { isLoading, data, refetch } = useQuery(
    `store.child.${orderID}`,
    async () =>
        StoreChildRepository.fetchDetailStore({
        populates: {
          path: "assignee project userCreate userUpdate members admins",
          select: "_id fullname bizfullname name sign image",
        },
        orderID,
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

interface UseMutationStoreChild {
    onCreateStoreAsync: (
    payload: InsertStoreChildPayload
  ) => Promise<InsertStoreChildResponse>;
  onUpdateStoreAsync: (
    payload: UpdateStoreChildPayload
  ) => Promise<UpdateStoreChildResponse>;
  onDeleteStoreAsync: (
    payload: DeleteStoreChildPayload
  ) => Promise<DeleteStoreChildResponse>;
}
export const useMutationStoreChild = (): UseMutationStoreChild => {
  const insertMutation = useMutation((payload: InsertStoreChildPayload) =>
    StoreChildRepository.insertStore(payload)
  );
  const updateMutation = useMutation((payload: UpdateStoreChildPayload) =>
    StoreChildRepository.updateStore(payload)
  );
  const deleteMutation = useMutation((payload: DeleteStoreChildPayload) =>
    StoreChildRepository.deleteStore(payload)
  );

  return {
    onCreateStoreAsync: insertMutation.mutateAsync,
    onUpdateStoreAsync: updateMutation.mutateAsync,
    onDeleteStoreAsync: deleteMutation.mutateAsync,
  }
}

// Khai báo kiểu
type UseProductCustom = {
  exportByFilterAsync: (payload: any) => Promise<any>,
}

export const useProductCustom = () : UseProductCustom => {

  // Export excel by filter
  const { mutateAsync: exportByFilterAsync } =
      useMutation((payload: any) =>
        StoreChildRepository.exportByFilter(payload)
  );

  return {
    exportByFilterAsync
  }
}