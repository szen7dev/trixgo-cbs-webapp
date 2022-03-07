/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { DatahubTypesParams } from "typings/datahub/datahubtypes";
import useQueryDatahub from "./useQueryDatahub";

type Props = DatahubTypesParams;
type Options = {
  enabled?: boolean;
};

const useDatahubTypes = (
  props?: Props,
  options: Options = { enabled: true }
) => {
  return useQueryDatahub(
    ["datahub_types", props?.type || 1, props?.parentID, props?.keyword || ""],
    ({ cursor }) =>
      DatahubRepository.getDatahubTypesList({ ...props, lastestID: cursor }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: options.enabled, // https://react-query.tanstack.com/guides/disabling-queries
      keepPreviousData: true,
    }
  );
};

export default useDatahubTypes;
