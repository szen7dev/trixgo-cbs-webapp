import { useInfiniteQuery } from "react-query";
import SupportRepository from "apis/support";

import { Device, ListDevicePayload } from 'typings/support';

interface UseSupport {
    listDevice: Array<Device>,
    isLoading: boolean;
};
export const useFetchSupport = (payload?: ListDevicePayload) : UseSupport => {
    const infinityQuery = useInfiniteQuery(
      ["list_device", payload],
      async ({ data }: any) => {
        return SupportRepository.listDeviceAccess({
            year: new Date().getFullYear()
        }),
            {
                getNextPageParam: ({ data }: any) => {
                    return data?.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
            }
      },
    );
    const { data, isLoading } = infinityQuery;
    console.log('data11',data)
    const listDevice = [].concat(...(data?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    return {
        isLoading,
        listDevice,
    }
  };