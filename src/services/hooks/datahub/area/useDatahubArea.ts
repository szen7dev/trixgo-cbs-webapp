/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useInfiniteQuery } from "react-query";
import { DatahubProjectsParams } from "typings/datahub/projects";

type Props = DatahubProjectsParams;

const useDatahubArea = (
  key: string | string[],
  props?: Props,
  options?: { enable: boolean }
) => {
  return useInfiniteQuery(
    key,
    ({ pageParam }) =>
      DatahubRepository.areaList({ ...props, lastestID: pageParam }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: Boolean(options?.enable), // https://react-query.tanstack.com/guides/disabling-queries
      keepPreviousData: true,
      getNextPageParam(data) {
        if (!data.data.nextCursor) return undefined;
        return data.data.nextCursor;
      },
    }
  );
};

export default useDatahubArea;
