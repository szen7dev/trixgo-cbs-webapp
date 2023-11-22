import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { SalaryParentRepository, SalaryChildRepository } from "apis/time-sheet";

import type {
  SalaryParent,
  InsertSalaryParentPayload,
  InsertSalaryParentResponse,
  UpdateSalaryParentPayload,
  UpdateSalaryParentResponse,
  DeleteSalaryParentPayload,
  DeleteSalaryParentResponse,
  SalaryChild,
  InsertSalaryChildPayload,
  InsertSalaryChildResponse,
  UpdateSalaryChildPayload,
  UpdateSalaryChildResponse,
  // DownloadPayload,
  // ImportPayload,
  // ExportManyPayload,
} from "typings/salary";

// Time Sheet Parent
interface UseQueryListSalaryParent {
  loading: boolean;
  data: SalaryParent[];
  hasNextPage?: boolean;
  totalPages: number;
  totalRecord: number;
  refetch: () => void;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
  // insertAsync: (payload: DownloadPayload) => Promise<SalaryParent>;
  // updateAsync: (payload: ImportPayload) => Promise<SalaryParent>;
  // deleteManyAsync: (params: ExportManyPayload) => Promise<any>;
}

export const useQueryListSalaryParent = (
  params?: any
): UseQueryListSalaryParent => {
  const result = useInfiniteQuery(
    `list_salary.parent`,
    async () =>
      SalaryParentRepository.fetchListSalary({
        populates: {
          path: "assignee project userCreate",
          select: "fullname bizfullname name",
        },
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

  const listSalary = []
    .concat(...(data?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);
  const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
  const totalPages = data?.pages[0]?.data?.totalPage || 0;

  // // Tải mẫu import excel
  // const { mutateAsync: downloadTemplateExcelAsync } =
  //     useMutation((payload: DownloadPayload ) => SalaryChildRepository.downloadTemplateExcel(payload)
  // );

  // // Import excel
  // const { mutateAsync: importExcelAsync } =
  //     useMutation((payload: ImportPayload) => SalaryChildRepository.importExcel(payload)
  // );

  // // Export excel
  // const { mutateAsync: exportExcelAsync } =
  //     useMutation((payload: ExportManyPayload) =>
  //     SalaryChildRepository.exportExcel(payload)
  // );

  return {
    loading: isLoading,
    data: listSalary,
    hasNextPage,
    totalPages,
    totalRecord,
    refetch,
    fetchNextPage,
    fetchPrevPage,
    // downloadTemplateExcelAsync,
    // importExcelAsync,
    // exportExcelAsync
  };
};

interface UseQueryDetailSalaryParent {
  loading: boolean;
  data?: SalaryParent;
  error: boolean;
  refetch: () => void;
}

export const useQueryDetailSalaryParent = (
  expertSalaryID: string
): UseQueryDetailSalaryParent => {
  const { isLoading, data, refetch } = useQuery(
    `salary.parent.${expertSalaryID}`,
    async () =>
      SalaryParentRepository.fetchDetailSalary({
        populates: {
          path: "assignee project userCreate members admins",
          select: "_id fullname bizfullname name sign image",
        },
        expertSalaryID,
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

interface UseMutationSalaryParent {
  onCreateSalaryParentAsync: (
    payload: InsertSalaryParentPayload
  ) => Promise<InsertSalaryParentResponse>;
  onUpdateSalaryParentAsync: (
    payload: UpdateSalaryParentPayload
  ) => Promise<UpdateSalaryParentResponse>;
  onDeleteSalaryParentAsync: (
    payload: DeleteSalaryParentPayload
  ) => Promise<DeleteSalaryParentResponse>;
}
export const useMutationSalaryParent = (): UseMutationSalaryParent => {
  const insertMutation = useMutation((payload: InsertSalaryParentPayload) =>
    SalaryParentRepository.insertSalary(payload)
  );
  const updateMutation = useMutation((payload: UpdateSalaryParentPayload) =>
    SalaryParentRepository.updateSalary(payload)
  );
  const deleteMutation = useMutation((payload: DeleteSalaryParentPayload) =>
    SalaryParentRepository.deleteSalary(payload)
  );

  return {
    onCreateSalaryParentAsync: insertMutation.mutateAsync,
    onUpdateSalaryParentAsync: updateMutation.mutateAsync,
    onDeleteSalaryParentAsync: deleteMutation.mutateAsync,
  };
};

// Time Sheet Children
interface UseQueryListSalaryChild {
  loading: boolean;
  data: SalaryChild[];
  dataNotFilter: SalaryChild[];
  hasNextPage?: boolean;
  totalPages: number;
  totalRecord: number;
  limit: number;
  refetch: () => void;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
}
export const useQueryListSalaryChild = (
  salaryParentID: string,
  limit = 50
): UseQueryListSalaryChild => {
  const result = useInfiniteQuery(
    `list_time-sheet.child`,
    async ({ pageParam }: any) =>
      SalaryChildRepository.fetchListSalary({
        parentID: salaryParentID,
        lastestID: pageParam,
        limit,
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

  const listSalary = []
    .concat(...(data?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const dataNotFilter = (data?.pages || []).map(
    (d: any) => d.data?.listRecords
  );

  const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
  const totalPages = data?.pages[0]?.data?.totalPage || 0;

  return {
    loading: isLoading,
    data: listSalary,
    dataNotFilter,
    hasNextPage,
    totalPages,
    totalRecord,
    limit,
    refetch,
    fetchNextPage,
    fetchPrevPage,
  };
};

interface UseMutationSalaryChild {
  onCreateSalaryAsync: (
    payload: InsertSalaryChildPayload
  ) => Promise<InsertSalaryChildResponse>;
  onUpdateSalaryAsync: (
    payload: UpdateSalaryChildPayload
  ) => Promise<UpdateSalaryChildResponse>;
}

export const useMutationSalaryChild = (): UseMutationSalaryChild => {
  const insertMutation = useMutation((payload: InsertSalaryChildPayload) =>
    SalaryChildRepository.insertSalary(payload)
  );

  const updateMutation = useMutation((payload: UpdateSalaryChildPayload) =>
    SalaryChildRepository.updateSalary(payload)
  );

  return {
    onCreateSalaryAsync: insertMutation.mutateAsync,
    onUpdateSalaryAsync: updateMutation.mutateAsync,
  };
};
