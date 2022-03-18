/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
// import {  } from "typings/datahub/api";
import { DatahubTypesParams } from "typings/datahub/datahubtypes";

type Props = DatahubTypesParams;

const useUpdateDatahubType = (props?: Props) => {
  const { mutateAsync: updateDatahubType } = useMutation(
    "update_datahub",
    DatahubRepository.updateDatahubTypes,
    {
      onSuccess: (data) => {
        if ("error" in data && !data.error) {
          toast.info("Update datahub type successfully");
        }
      },
    }
  );
  return {
    updateDatahubType,
  };
};

export default useUpdateDatahubType;
