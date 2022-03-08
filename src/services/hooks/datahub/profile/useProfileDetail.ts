/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useQuery } from "react-query";
import { ResponseCreateSuccess } from "typings/datahub/api";
import { DatahubProfile } from "typings/datahub/profile";

type Options<T> = {
  onSuccess?: (data: T) => void;
};

const useProfileDetail = (
  datahubProfileID = "",
  options?: Options<ResponseCreateSuccess<DatahubProfile>>
) => {
  return useQuery(
    ["datahub_profile_detail", datahubProfileID],
    () =>
      DatahubRepository.getDatahubProfile({
        datahubProfileID: datahubProfileID,
        select: "_id name",
      }),
    {
      refetchOnWindowFocus: false,
      retryOnMount: true,
      enabled: Boolean(datahubProfileID), // https://react-query.tanstack.com/guides/disabling-queries
      onSuccess: options?.onSuccess,
    }
  );
};

export default useProfileDetail;
