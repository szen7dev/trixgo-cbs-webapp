/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useQuery } from "react-query";
import { ResponseCreateSuccess } from "typings/apis/response";
import { DatahubFinancial } from "typings/datahub/financial";

type Options<T> = {
  onSuccess?: (data: T) => void;
};

const useDatahubFinancial = (
  { datahubFinreportID = "", contractorID = "" },
  options?: Options<ResponseCreateSuccess<DatahubFinancial>>
) => {
  return useQuery(
    ["datahub_financial", datahubFinreportID],
    () =>
      DatahubRepository.getDatahubFinancial({
        contractorID,
        datahubFinreportID,
        // select: "_id type name description popular",
      }),
    {
      refetchOnWindowFocus: false,
      retryOnMount: true,
      enabled: Boolean(datahubFinreportID), // https://react-query.tanstack.com/guides/disabling-queries
      onSuccess: options?.onSuccess,
    }
  );
};

export default useDatahubFinancial;
