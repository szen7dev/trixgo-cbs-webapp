/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { ResponseList, DatahubPrams } from "typings/datahub/api";
import { DatahubFinancial } from "typings/datahub/financial";
import useQueryDatahub from "../useQueryDatahub";

type Props = { contractorID: string } & DatahubPrams;
type Options = {
  onSuccess?: (data: ResponseList<DatahubFinancial>) => void;
  refetchOnMount?: boolean;
};

const useQueryFinancials = (
  props: Props,
  options: Options = { refetchOnMount: false }
) => {
  return useQueryDatahub(
    ["datahub_financials", props?.keyword],
    ({ cursor }) =>
      DatahubRepository.getDatahubFinancialList({ ...props, lastestID: cursor }),
    {
      refetchOnMount: options.refetchOnMount,
      refetchOnWindowFocus: false,
      enabled: Boolean(props.contractorID), // https://react-query.tanstack.com/guides/disabling-queries
      keepPreviousData: true,
      onSuccess: options?.onSuccess,
    }
  );
};

export default useQueryFinancials;
