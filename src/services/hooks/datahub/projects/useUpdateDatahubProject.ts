/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const useUpdateDatahubProject = () => {
  const { mutateAsync: updateDatahubProject } = useMutation(
    ["update_datahub_projects"],
    DatahubRepository.updateProject,
    {
      onSuccess: (data) => {
        if ("error" in data && !data.error) {
          toast.info("Update datahub project successfully");
        }
      },
    }
  );
  return {
    updateDatahubProject,
  };
};

export default useUpdateDatahubProject;
