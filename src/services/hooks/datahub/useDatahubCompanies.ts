/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useQuery } from "react-query";
import { DatahubProjectsParams } from "typings/datahub/projects";

type Props = DatahubProjectsParams;

const useDatahubCompanies = (
  key: string | string[],
  props?: Props,
  options?: { enable: boolean }
) => {
  return useQuery(key, () => DatahubRepository.companiesList(props), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(options?.enable), // https://react-query.tanstack.com/guides/disabling-queries
    keepPreviousData: true,
  });
};

export default useDatahubCompanies;
