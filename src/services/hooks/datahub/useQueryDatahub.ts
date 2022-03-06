/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from "react";
import {
  useQuery,
  UseQueryOptions,
  QueryFunctionContext,
  QueryKey,
} from "react-query";
import { ResponseList } from "typings/datahub/api";

type QueryFunction<T = unknown, TQueryKey extends QueryKey = QueryKey> = (
  context: QueryFunctionContext<TQueryKey> & {
    cursor: string | undefined;
  }
) => T | Promise<T>;

// Hook gọi api chung cùng kiểu phân trang
function useQueryDatahub<TQueryFnData = unknown, TData = TQueryFnData>(
  keys: QueryKey,
  queryFn: QueryFunction<ResponseList<TQueryFnData>>,
  options?: UseQueryOptions<
    ResponseList<TQueryFnData>,
    unknown,
    ResponseList<TData>,
    QueryKey
  >
) {
  const [pageCursor, setPageCuror] = useState({
    page: [] as string[],
    cursor: "",
  });

  const data = useQuery(
    typeof keys === "string"
      ? keys + "." + pageCursor.cursor
      : [...keys, pageCursor.cursor],
    (context) => queryFn({ ...context, cursor: pageCursor.cursor }),
    options
  );

  function fetchNextPage() {
    if (data.data?.data.nextCursor) {
      pageCursor.page.push(data.data.data.nextCursor);
      setPageCuror({
        page: pageCursor.page,
        cursor: data.data.data.nextCursor,
      });
    }
  }

  function fetchPrevPage() {
    if (pageCursor.page.length > 0) {
      pageCursor.page.pop();
      setPageCuror({
        page: pageCursor.page,
        cursor: pageCursor.page[pageCursor.page.length - 1],
      });
    }
  }
  function resetPage() {
    setPageCuror({ page: [], cursor: "" });
  }
  return {
    ...data,
    fetchNextPage,
    fetchPrevPage,
    resetPage,
  };
}

export default useQueryDatahub;
