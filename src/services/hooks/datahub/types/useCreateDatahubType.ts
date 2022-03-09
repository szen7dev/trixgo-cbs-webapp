/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { ResponseCreateSuccess } from "typings/apis/response";
import { DatahubTypes } from "typings/datahub/datahubtypes";

type Props = {
  onSuccess?: (data: ResponseCreateSuccess<DatahubTypes>) => void;
};

const useCreateDatahubType = (props?: Props) => {
  const { mutate: createDatahubType } = useMutation(
    "create_datahub",
    DatahubRepository.createDatahubTypes,
    {
      onSuccess: (data) => {
        if ("error" in data && !data.error) {
          toast.success("Create datahub type successfully");
					if (props?.onSuccess) props.onSuccess(data);
        }
      },
    }
  );
  return {
    createDatahubType,
  };
};

export default useCreateDatahubType;
