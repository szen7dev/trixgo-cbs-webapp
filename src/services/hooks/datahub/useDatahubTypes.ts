/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useState } from "react";
import { useQuery } from "react-query";
import { DatahubTypesParams } from "typings/datahub/datahubtypes";

type Props = DatahubTypesParams;

const useDatahubTypes = (props?: Props) => {
  const [pageCursor, setPageCuror] = useState({
    page: [] as string[],
    cursor: "",
  });
  const { data, isFetching } = useQuery(
    [
      "datahub_types",
      pageCursor.cursor,
      props?.type || 1,
      props?.keyword || "",
    ],
    () =>
      DatahubRepository.getDatahubTypesList({
        ...props,
        lastestID: pageCursor.cursor,
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
      keepPreviousData: true,
      getNextPageParam: ({ data }) => data.nextCursor,
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

export default useDatahubTypes;
