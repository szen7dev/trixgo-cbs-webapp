/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ResponseList } from "typings/datahub/api";
import { DatahubTypesParams, DatahubTypes } from "typings/datahub/datahubtypes";

type Props = DatahubTypesParams;

const useMutationDatahubTypes = (props?: Props) => {
  const queryClient = useQueryClient();
  const { data, mutateAsync } = useMutation(
    "create_datahub",
    DatahubRepository.createDatahubTypes,
    {
      onSuccess: (data) => {
        if ("error" in data && !data.error) {
          queryClient.setQueryData<ResponseList<DatahubTypes> | undefined>(
            ["datahub_types", data.data.type],
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
    data,
    createDatahubTypes: mutateAsync,
  };
};

export default useMutationDatahubTypes;
