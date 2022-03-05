/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useQuery } from "react-query";
import { ResponseCreate } from "typings/datahub/api";
import { DatahubProjects } from "typings/datahub/projects";

type Options<T> = {
  onSuccess?: (data: T) => void;
};

const useDatahubProject = (
  datahubProjectID?: string,
  options?: Options<
    ResponseCreate<DatahubProjects>
  >
) => {
  return useQuery(
    ["datahub_type"],
    () =>
      DatahubRepository.getProject<"_id" | "client" | "name" | "address">({
        datahubProjectID: datahubProjectID || "",
        // select: "_id client name description",
        populates: {
          // select:'client',
          path: "client area3",
        },
      }),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(datahubProjectID), // https://react-query.tanstack.com/guides/disabling-queries
      onSuccess: options?.onSuccess,
    }
  );
};

export default useDatahubProject;
