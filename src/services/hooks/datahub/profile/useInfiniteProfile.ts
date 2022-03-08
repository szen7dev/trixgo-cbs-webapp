/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useInfiniteQuery } from "react-query";
import { DatahubPrams } from "typings/datahub/api";

type Props = { company: string } & DatahubPrams;

const useInfiniteProfile = (
  key: string | readonly unknown[],
  props: Props,
  options?: { enable: boolean }
) => {
  return useInfiniteQuery(
    key,
    ({ pageParam }) =>
      DatahubRepository.getDatahubProfileList({
        ...props,
        lastestID: pageParam,
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: Boolean(options?.enable),
      keepPreviousData: true,
      getNextPageParam(data) {
        if (!data.data.nextCursor) return undefined;
        return data.data.nextCursor;
      },
    }
  );
};

export default useInfiniteProfile;
