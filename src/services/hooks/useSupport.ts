import { useInfiniteQuery } from "react-query";
import SupportRepository from "apis/support";

import { Device, ListDevicePayload } from 'typings/support';

interface UseSupport {
    listDevices:  Array<Device>,
    isLoading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    refetchListHuman: () => void;
    fetchNextPageHuman: () => void;
    _id: {
        month: number
    },
    data: [
        {
            data: [
                {
                    type: number;
                    amountAccesses: number
                }
            ]
        }
    ];
}
export const useFetchSupport = (params?: ListDevicePayload) : UseSupport[] => {
    const {
      data: dataListTask,
    } = useInfiniteQuery(
      ["list_device", params],
      async ({ data }: any) => {
        return SupportRepository.listDeviceAccess({
            year: 2021
        });
      },
      {
        getNextPageParam: ({ params }: any) => {
          return params?.nextCursor || undefined;
        },
        refetchOnWindowFocus: false,
        enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
      }
    );
  
    const listDevices = [].concat(...(dataListTask?.pages || []).map((d: any) => d.data)).filter(Boolean);
    return listDevices
  };