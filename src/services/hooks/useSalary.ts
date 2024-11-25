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
  DeleteSalaryChildPayload,
  DeleteSalaryChildResponse,
} from "typings/salary";
interface UseQueryListSalaryParent {
  loading: boolean;
  data: SalaryParent[];
  dataNotFilter: Array<SalaryParent[]>;
  hasNextPage?: boolean;
  limit: number;
  totalPages: number;
  totalRecord: number;
  refetch: () => void;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
}

export const useQueryListSalaryParent = (
  params?: any,
  limit = 50
): any => {
  const result = useInfiniteQuery(
    [`list_salary.parent`, params],
    async ({ pageParam }: any) =>
      SalaryParentRepository.fetchListSalary({
        populates: {
          path: "assignee project userCreate userUpdate",
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
    limit,
    totalPages,
    totalRecord,
    refetch,
    fetchNextPage,
    fetchPrevPage
  };
};

export const useSalaryCustom = ({
  params = {}
}: any) : any => {

  // // Tải mẫu import excel
  // const { mutateAsync: downloadTemplateExcelAsync } =
  //     useMutation((payload: any ) =>
  //       SalaryParentRepository.downloadTemplateExcel(payload)
  // );

  // // Import excel
  // const { mutateAsync: importFromExcelAsync } =
  //     useMutation((payload: { projectID?: string, dataImport: string }) =>
  //       SalaryParentRepository.importFromExcel(payload)
  // );

  // Export excel
  const { mutateAsync: exportExcelAsync } =
      useMutation((payload: any) =>
        SalaryParentRepository.exportExcel(payload)
  );

  return {
      // downloadTemplateExcelAsync,
      // importFromExcelAsync,
      exportExcelAsync
  }
}

export const useByProperty = ({ params = {},  isFetchList = false }: any): any => {

  const { data: detailData, isLoading: listByPropertyIsLoading, refetch: refetchListByProperty } =
  useQuery([`fetchListByProperty`,{...params, isFetchList }],() => SalaryParentRepository.fetchListByProperty(params), {
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
  params: any,
): UseQueryListSalaryChild => {
  const result = useInfiniteQuery(
    [`list_time-sheet.child`, params],
    async ({ pageParam }: any) =>
      SalaryChildRepository.fetchListSalary({
        parentID: salaryParentID,
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
    limit: params.limit || 50,
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
  onDeleteSalaryAsync: (
    payload: DeleteSalaryChildPayload
  ) => Promise<DeleteSalaryChildResponse>;
}

export const useMutationSalaryChild = (): UseMutationSalaryChild => {
  const insertMutation = useMutation((payload: InsertSalaryChildPayload) =>
    SalaryChildRepository.insertSalary(payload)
  );

  const updateMutation = useMutation((payload: UpdateSalaryChildPayload) =>
    SalaryChildRepository.updateSalary(payload)
  );

  const deleteMutation = useMutation((payload: DeleteSalaryChildPayload) =>
    SalaryChildRepository.deleteSalary(payload)
  );

  return {
    onCreateSalaryAsync: insertMutation.mutateAsync,
    onUpdateSalaryAsync: updateMutation.mutateAsync,
    onDeleteSalaryAsync: deleteMutation.mutateAsync,
  };
};
