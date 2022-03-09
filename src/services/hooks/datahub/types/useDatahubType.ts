/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useQuery } from "react-query";
import { ResponseCreateSuccess } from "typings/apis/response";
import { DatahubTypes } from "typings/datahub/datahubtypes";

type Options<T> = {
  onSuccess?: (data: T) => void;
};

const useDatahubType = (
  datahubID?: string,
  options?: Options<
    ResponseCreateSuccess<
      DatahubTypes<"_id" | "type" | "name" | "description" | "popular">
    >
  >
) => {
  return useQuery(
    ["datahub_type", datahubID],
    () =>
      DatahubRepository.getDatahubType<
        "_id" | "type" | "name" | "description" | "popular"
      >({
        datahubTypeID: datahubID || "",
        select: "_id type name description popular",
      }),
    {
      refetchOnWindowFocus: false,
      retryOnMount: true,
      enabled: Boolean(datahubID), // https://react-query.tanstack.com/guides/disabling-queries
      onSuccess: options?.onSuccess,
    }
  );
};

export default useDatahubType;
