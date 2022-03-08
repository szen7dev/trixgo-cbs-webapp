/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { ResponseCreateSuccess } from "typings/apis/response";
import { DatahubProjects } from "typings/datahub/projects";

type Props = {
  onSuccess?: (data: ResponseCreateSuccess<DatahubProjects>) => void;
};

const useCreateDatahubProject = (props?: Props) => {
  const { mutateAsync } = useMutation(
    ["create_datahub_projects", ""],
    DatahubRepository.createProject,
    {
      onSuccess: (data) => {
        if ("error" in data && !data.error) {
          toast.success("Create datahub project successfully");
          if (props?.onSuccess) props.onSuccess(data);
        }
      },
    }
  );
  return {
    createDatahubProject: mutateAsync,
  };
};

export default useCreateDatahubProject;
