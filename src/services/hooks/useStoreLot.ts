import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { StoreLotRepository } from "apis/store";

import type {
  StoreChild,
  InsertStoreChildPayload,
  InsertStoreChildResponse,
  UpdateStoreChildPayload,
  UpdateStoreChildResponse,
  DeleteStoreChildPayload,
  DeleteStoreChildResponse,
} from "typings/lot";

interface useQueryListStoreLot {
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

export const useQueryListStoreLot = (
  params?: any,
  limit = 50
): useQueryListStoreLot => {
  const result = useInfiniteQuery(
    [`list_store.lot`, params],
    async ({ pageParam }: any) =>
        StoreLotRepository.fetchListStore({
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
  //     useMutation((payload: DownloadPayload ) => StoreLotRepository.downloadTemplateExcel(payload)
  // );

  // // Import excel
  // const { mutateAsync: importExcelAsync } =
  //     useMutation((payload: ImportPayload) => StoreLotRepository.importExcel(payload)
  // );

  // // Export excel
  // const { mutateAsync: exportExcelAsync } =
  //     useMutation((payload: ExportManyPayload) =>
  //     StoreLotRepository.exportExcel(payload)
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
    [`list_store_property.lot`, params],
    async ({ pageParam }: any) =>
        StoreLotRepository.fetchListByProperty({
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
  lotID: string
): UseQueryDetailStoreChild => {
  const { isLoading, data, refetch } = useQuery(
    `store.lot.${lotID}`,
    async () =>
        StoreLotRepository.fetchDetailStore({
        populates: {
          path: "assignee project userCreate userUpdate members admins",
          select: "_id fullname bizfullname name sign image",
        },
        lotID,
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
    StoreLotRepository.insertStore(payload)
  );
  const updateMutation = useMutation((payload: UpdateStoreChildPayload) =>
    StoreLotRepository.updateStore(payload)
  );
  const deleteMutation = useMutation((payload: DeleteStoreChildPayload) =>
    StoreLotRepository.deleteStore(payload)
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
  analysePrimeCostAsync: (payload: any) => Promise<any>,
}

export const useProductCustom = () : UseProductCustom => {

  // Export excel by filter
  const { mutateAsync: exportByFilterAsync } =
      useMutation((payload: any) =>
        StoreLotRepository.exportByFilter(payload)
  );

  const { mutateAsync: analysePrimeCostAsync } =
    useMutation((payload: any) =>
      StoreLotRepository.analysePrimeCost(payload)
  );

  return {
    exportByFilterAsync,
    analysePrimeCostAsync,
  }
}