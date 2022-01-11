import { useInfiniteQuery } from "react-query";
import SupportRepository from "apis/support";

import {
    Device,
    ListDevicePayload,
    ListTypeDeviceAccessPayload,
    ListTypeDevice
} from 'typings/support';

interface UseSupport {
    listDevice: Array<Device>,
    isLoading: boolean;
};
export const useFetchSupport = (payload?: ListDevicePayload) : UseSupport => {
    const infinityQuery = useInfiniteQuery(
      ["list_device", payload],
      async ({ data }: any) => {
        return SupportRepository.listDeviceAccess({
            year: 2021
        })      
      },
      {
        getNextPageParam: ({ data }: any) => {
            return data?.nextCursor || undefined;
        },
        refetchOnWindowFocus: false,
        enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
    }
    );
    const { data, isLoading } = infinityQuery;
    const listDevice = [].concat(...(data?.pages || []).map((d: any) => d.data)).filter(Boolean);
    return {
        isLoading,
        listDevice,
    }
};
interface UseTypeDeviceAccess {
    listTypeDevice: Array<ListTypeDevice>
}
export const useTypeDeviceAccess = (payload?: ListTypeDeviceAccessPayload) : UseTypeDeviceAccess => {
    const infinityQuery = useInfiniteQuery(
        ["list_type_device_access", payload],
        async ({ data }: any) => {
            return SupportRepository.listTypeDeviceAccess({
                fromDate: "2021-12-30",
                toDate: "2021-12-30",
                year: 2021,
            })
        },
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const { data } = infinityQuery;
    const listTypeDevice = [].concat(...(data?.pages || []).map((d: any) => d.data)).filter(Boolean);
    return {
        listTypeDevice,
    }
};
