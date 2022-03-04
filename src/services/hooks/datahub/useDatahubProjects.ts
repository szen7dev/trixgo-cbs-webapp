/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useQuery } from "react-query";
import { DatahubProjectsParams } from "typings/datahub/projects";

type Props = DatahubProjectsParams;

const useDatahubProjects = (key: string | string[], props?: Props) => {
  return useQuery(key, () => DatahubRepository.getProjectList(props), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
    keepPreviousData: true
  });
};

export default useDatahubProjects;
