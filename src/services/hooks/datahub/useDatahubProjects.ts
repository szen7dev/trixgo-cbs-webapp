/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResponseList } from "typings/datahub/api";
import {
  DatahubProjects,
  DatahubProjectsParams,
} from "typings/datahub/projects";

type Props = DatahubProjectsParams;
type Options = {
  onSuccess?: (data: ResponseList<DatahubProjects>) => void;
  refetchOnMount?: boolean;
};

const useDatahubProjects = (
  props?: Props,
  options: Options = { refetchOnMount: false }
) => {
  const [pageCursor, setPageCuror] = useState({
    page: [] as string[],
    cursor: "",
  });
  const { data, isFetching } = useQuery(
    ["datahub_projects", pageCursor.cursor, props?.keyword],
    () =>
      DatahubRepository.getProjectList({
        ...props,
        lastestID: pageCursor.cursor,
      }),
    {
      refetchOnMount: options.refetchOnMount,
      refetchOnWindowFocus: false,
      enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
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

export default useDatahubProjects;
