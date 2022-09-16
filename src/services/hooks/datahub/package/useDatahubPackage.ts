/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useQuery } from "react-query";
import { ResponseCreate } from "typings/apis/response";
import { DatahubContract } from "typings/datahub/contract";

type Options<T> = {
  onSuccess?: (data: T) => void;
};
type Props = {
  contractorID?: string;
  datahubPackageID?: string;
  populates?:
    | string
    | {
        path: string;
        select?: string | undefined;
        populate?: string | undefined;
      };
};

const useDatahubPackage = (
  { contractorID = "", datahubPackageID = "", populates }: Props,
  options?: Options<ResponseCreate<DatahubContract>>
) => {
  return useQuery(
    ["datahub_package", { contractorID, datahubPackageID }],
    () =>
      DatahubRepository.getDatahubContract({
        contractorID,
        datahubPackageID,
        // select: "_id client name description",
        populates,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(contractorID && datahubPackageID), // https://react-query.tanstack.com/guides/disabling-queries
      onSuccess: options?.onSuccess,
    }
  );
};

export default useDatahubPackage;
