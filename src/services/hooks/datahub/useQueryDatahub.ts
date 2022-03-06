/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResponseList, DatahubPrams } from "typings/datahub/api";
import { DatahubFinancial } from "typings/datahub/financial";

type Props = { contractorID: string } & DatahubPrams;
type Options = {
  onSuccess?: (data: ResponseList<DatahubFinancial>) => void;
  refetchOnMount?: boolean;
};

// Hook gọi api chung cùng kiểu phân trang
const useQueryFinancials = (
	keys: string | string[],
  props: Props,
  options: Options = { refetchOnMount: false }
) => {
  const [pageCursor, setPageCuror] = useState({
    page: [] as string[],
    cursor: "",
  });
	
  const { data, isFetching } = useQuery(
    ["datahub_financials", pageCursor.cursor, props?.keyword],
    () =>
      DatahubRepository.getDatahubFinancial({
        ...props,
        lastestID: pageCursor.cursor,
        contractorID: props.contractorID,
      }),
    {
      refetchOnMount: options.refetchOnMount,
      refetchOnWindowFocus: false,
      enabled: Boolean(props.contractorID), // https://react-query.tanstack.com/guides/disabling-queries
      keepPreviousData: true,
      onSuccess: options?.onSuccess,
    }
  );

  function fetchNextPage() {
    if (data?.data.nextCursor) {
      pageCursor.page.push(data.data.nextCursor);
      setPageCuror({
        page: pageCursor.page,
        cursor: data.data.nextCursor,
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
    data,
    isFetching,
    fetchNextPage,
    fetchPrevPage,
    resetPage,
  };
};

export default useQueryFinancials;
