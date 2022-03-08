/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useQuery } from "react-query";
import { ResponseCreateSuccess } from "typings/apis/response";
import { DatahubCompanies } from "typings/datahub/company";

type Options<T> = {
  onSuccess?: (data: T) => void;
};

const useDatahubProject = (
  companyID = "",
  options?: Options<ResponseCreateSuccess<DatahubCompanies>>
) => {
  return useQuery(
    ["datahub_company", companyID],
    () =>
      DatahubRepository.getCompany({
        companyID,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(companyID), // https://react-query.tanstack.com/guides/disabling-queries
      onSuccess: options?.onSuccess,
    }
  );
};

export default useDatahubProject;
