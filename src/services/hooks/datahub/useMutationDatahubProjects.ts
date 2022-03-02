/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useMutation, useQueryClient } from "react-query";
import { ResponseList } from "typings/datahub/api";
import { DatahubTypesParams } from "typings/datahub/datahubtypes";
import { DatahubProjects } from "typings/datahub/projects";

type Props = DatahubTypesParams;

const useMutationDatahubProject = (props?: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(
    ["create_datahub_projects", ""],
    DatahubRepository.createProject,
    {
      onSuccess: (data) => {
        if ("error" in data && !data.error) {
          queryClient.setQueryData<ResponseList<DatahubProjects> | undefined>(
            ["datahub_projects", ""],
            (old) => {
              if (old) {
                old.data.listRecords.unshift(data.data);
                old.data.totalRecord++;
                old.data.limit++;
              }
              return old;
            }
          );
        }
      },
    }
  );
  return {
    createDatahubProject: mutateAsync,
  };
};

export default useMutationDatahubProject;
