import {
  useInfiniteQuery,
  InfiniteData,
  RefetchOptions,
  QueryObserverResult,
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "react-query";
import { DepartmentsRepository } from "apis/ppt";
import { APIResponse } from "typings/ppt";
import {
  DataDepartmentResponse,
  DataEnum,
  DepartmentListData,
} from "typings/ppt/department";
import { DepartmentEnumType } from "typings/ppt";

type NewType<T> = {
  loading: boolean;
  data: InfiniteData<T> | undefined;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<InfiniteData<T>, unknown>>;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<T, unknown>>;
  hasNextPage?: boolean;
};

export function useListDepartment<
  T extends DepartmentEnumType | undefined,
  S extends (keyof DataEnum<undefined, undefined>[T extends undefined
    ? DepartmentEnumType.PROJECT
    : T])[],
  P extends
    | (S extends keyof DataEnum<undefined, undefined>[T extends undefined
        ? DepartmentEnumType.PROJECT
        : T]
        ? S
        : keyof DataEnum<undefined, undefined>[T extends undefined
            ? DepartmentEnumType.PROJECT
            : T])
    | undefined,
  Sn extends
    | keyof DataEnum<P, undefined>[T extends DepartmentEnumType
        ? T
        : DepartmentEnumType.PROJECT]
    | undefined
>(props: {
  type?: T;
  select?: S;
  populates?: {
    path?: P[];
    select?: Sn[];
  };
}): NewType<
  APIResponse & {
    data: DepartmentListData<DataDepartmentResponse<T, S, P, Sn>>;
  }
> {
  const { isLoading, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["departments.messageList"],
      ({ pageParam }) => DepartmentsRepository.getDepartmentList({ ...props }),
      {
        refetchOnWindowFocus: false,
        enabled: true,
        getNextPageParam(response) {
          return response.data.nextCursor;
        },
      }
    );

  return {
    loading: isLoading,
    data,
    refetch,
    hasNextPage,
    fetchNextPage,
    // fetchPreviousPage,
  };
}
