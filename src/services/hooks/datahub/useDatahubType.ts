/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useQuery } from "react-query";
import { ResponseCreate } from "typings/datahub/api";
import { DatahubTypes } from "typings/datahub/datahubtypes";

type Options<T> = {
  onSuccess?: (data: T) => void;
};

const useDatahubType = (
  datahubID?: string,
  options?: Options<
    ResponseCreate<
      DatahubTypes<"_id" | "type" | "name" | "description" | "popular">
    >
  >
) => {
  return useQuery(
    ["datahub_type"],
    () =>
      DatahubRepository.getDatahubType<
        "_id" | "type" | "name" | "description" | "popular"
      >({
        datahubID: datahubID || "",
        select: "_id type name description popular",
      }),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(datahubID), // https://react-query.tanstack.com/guides/disabling-queries
      onSuccess: options?.onSuccess,
    }
  );
};

export default useDatahubType;
