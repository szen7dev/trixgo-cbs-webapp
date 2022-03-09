/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useQuery } from "react-query";
import { ResponseCreate } from "typings/apis/response";
import { DatahubProjects } from "typings/datahub/projects";

type Options<T> = {
  onSuccess?: (data: T) => void;
};

const useDatahubProject = (
  datahubProjectID?: string,
  options?: Options<ResponseCreate<DatahubProjects>>
) => {
  return useQuery(
    ["datahub_type"],
    () =>
      DatahubRepository.getProject<
        "_id" | "client" | "name" | "address" | "area3"
      >({
        datahubProjectID: datahubProjectID || "",
        // select: "_id client name description",
        populates: JSON.stringify({
          path: "client area3",
          select: "name sign parent level",
          populate: {
            path: "parent",
            select: "name sign parent level",
            populate: { path: "parent", select: "name sign parent level" },
          },
        }),
      }),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(datahubProjectID), // https://react-query.tanstack.com/guides/disabling-queries
      onSuccess: options?.onSuccess,
    }
  );
};

export default useDatahubProject;
