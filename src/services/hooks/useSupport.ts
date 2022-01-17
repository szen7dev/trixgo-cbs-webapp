import { useInfiniteQuery } from "react-query";
import SupportRepository from "apis/support";

import {
    Device,
    ListDevicePayload,
    ListTypeDeviceAccessPayload,
    ListTypeDevice,
    ListAppAccessPayload,
    AppAccess,
    ListAppDeviceAccessPayload,
    DataListAppDevice,
    ListCompany
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
            year: 2022
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
                fromDate: "2022-1-15",
                toDate: "2022-1-15",
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
interface UselistAppAccess {
    listAppAccess: Array<AppAccess>
}
export const useListAppAccess = (params?: ListAppAccessPayload) : UselistAppAccess => {
    console.log('params',params)
    const infinityQuery = useInfiniteQuery(
        ["list_app_access", params],
        async ({ pageParam }: any) =>
            // return SupportRepository.listAppAccess({
            //     fromDate: "2022-1-15",
            //     toDate: "2022-1-15",
            //     year: 2022,
            // })
            SupportRepository.listAppAccess(
                params
            )
        ,
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const { data } = infinityQuery;
    const listAppAccess = [].concat(...(data?.pages || []).map((d: any) => d.data)).filter(Boolean);
    return {
        listAppAccess,
    }
};
interface UselistAppDeviceAccess {
    listAppDeviceAccess: Array<DataListAppDevice>
}
export const useListAppDeviceAccess = (payload?: ListAppDeviceAccessPayload) : UselistAppDeviceAccess => {
    const infinityQuery = useInfiniteQuery(
        ["list_app_device_access", payload],
        async ({ data }: any) => {
            return SupportRepository.listAppDeviceAccess({
                fromDate: "2022-1-15",
                toDate: "2022-1-15",
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
    const listAppDeviceAccess = [].concat(...(data?.pages || []).map((d: any) => d.data)).filter(Boolean);
    return {
        listAppDeviceAccess,
    }
};
//6. THỐNG KÊ TRUY CẬP THEO CÔNG TY
interface UselistCompanyAccess {
    listCompany: Array<ListCompany>
}
export const useListCompanyAccess = (payload?: ListAppDeviceAccessPayload) : UselistCompanyAccess => {
    const infinityQuery = useInfiniteQuery(
        ["list_company_access", payload],
        async ({ data }: any) => {
            return SupportRepository.listCompanyAccess({
                fromDate: "2022-1-15",
                toDate: "2022-1-15",
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
    const listCompany = [].concat(...(data?.pages || []).map((d: any) => d.data)).filter(Boolean);
    return {
        listCompany,
    }
};