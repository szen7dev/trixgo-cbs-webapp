/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { ResponseList } from "typings/datahub/api";
import {
  DatahubProjects,
  DatahubProjectsParams,
} from "typings/datahub/projects";
import useQueryDatahub from "../useQueryDatahub";

type Props = DatahubProjectsParams;
type Options = {
  onSuccess?: (data: ResponseList<DatahubProjects>) => void;
  refetchOnMount?: boolean;
};

const useDatahubProjects = (
  props?: Props,
  options: Options = { refetchOnMount: false }
) => {
  return useQueryDatahub(
    ["datahub_projects", props?.keyword],
    ({ cursor }) =>
      DatahubRepository.getProjectList({ ...props, lastestID: cursor }),
    {
      refetchOnMount: options.refetchOnMount,
      onSuccess: options?.onSuccess,
      refetchOnWindowFocus: false,
      enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
      keepPreviousData: true,
    }
  );
};

export default useDatahubProjects;
