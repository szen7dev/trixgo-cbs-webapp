/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import DatahubRepository from "apis/datahub";
import { useQuery } from "react-query";
import { DatahubTypesParams } from "typings/datahub/datahubtypes";

type Props = DatahubTypesParams;

const useDatahubTypes = (props?: Props) => {
  return useQuery(
    [
      "datahub_types",
      props?.lastestID || "",
      props?.type || 1,
      props?.keyword || "",
    ],
    () => DatahubRepository.getDatahubTypesList(props),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
      keepPreviousData: true,
      getNextPageParam: ({ data }) => data.nextCursor,
    }
  );
};

export default useDatahubTypes;
