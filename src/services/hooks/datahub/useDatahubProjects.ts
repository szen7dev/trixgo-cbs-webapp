/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
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
  key: string | string[],
  props?: Props,
  options: Options = { refetchOnMount: false }
) => {
  return useQuery(key, () => DatahubRepository.getProjectList(props), {
    refetchOnMount: options.refetchOnMount,
    refetchOnWindowFocus: false,
    enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
    keepPreviousData: true,
    onSuccess: options?.onSuccess,
  });
};

export default useDatahubProjects;
