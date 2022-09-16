/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { ParamsGetDatahubProfiles } from "apis/datahub/profiles";
import { useInfiniteQuery } from "react-query";

type Props = ParamsGetDatahubProfiles;

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
