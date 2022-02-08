import {
  useInfiniteQuery,
  useQuery,
  InfiniteData,
  RefetchOptions,
  QueryObserverResult,
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "react-query";
import { DepartmentsRepository } from "apis/ppt";

type NewType<T> = {
  loading: boolean;
  data: InfiniteData<T> | undefined;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<InfiniteData<T>, unknown>>;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<T, unknown>>;
};
type InputProps = {
  onSuccess?:
    | ((data: InfiniteData<DepartmentResponse<DepartmentListData>>) => void)
    | undefined;
};

type DepartmentHook<T> = () => NewType<T>;

export const useListDepartment: DepartmentHook<
  DepartmentResponse<DepartmentListData>
> = (props: InputProps = {}) => {
  const { isLoading, data, refetch, fetchNextPage } = useInfiniteQuery(
    ["departments.list"],
    ({ pageParam }) =>
      DepartmentsRepository.getDepartmentList({
        select:
          "name description sign company startTime expiredTime milestones completedMilestones stage createAt",
        type: 2,
      }),
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
    // hasNextPage,
    fetchNextPage,
    // fetchPreviousPage,
  };
};
