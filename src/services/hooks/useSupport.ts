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
    listCompany,
    HistoryTraffic,
    ListHistoryTrafficPayload,
    ListCompanyAccessPayload
} from 'typings/support';

//1. LIST HISTORY TRAFFIC
interface UseListHistoryTraffic {
    listHistoryTraffic: Array<HistoryTraffic>,
    isLoading: boolean;
};
export const useListHistoryTraffic = (params?: ListHistoryTrafficPayload) : UseListHistoryTraffic => {
    // Get danh sách
    const infinityQuery = useInfiniteQuery(
        ["list_history_traffic", params],
        async ({ pageParams }: any) =>
            SupportRepository.listHistoryTraffic({
                lastestID: pageParams ? pageParams : "",
                filter: JSON.stringify({
                    type: 1,
                    app: 1,
                    menu: 1,
                    companyOfAuthor: 1,
                    createdAt: 1,
                    userCreate: 1,
                }),
                populates: JSON.stringify({
                    path: "companyOfAuthor userCreate app menu",
                    select: "name sign fullname bizfullname image",
                }),
                ...params
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const { data, isLoading } = infinityQuery;
    const listHistoryTraffic = [].concat(...(data?.pages || []).map((d: any) => d.data)).filter(Boolean);
    return {
        isLoading,
        listHistoryTraffic,
    }
};
//2. THỐNG KÊ THEO THIẾT BỊ THEO NĂM
interface UseSupport {
    listDevice: Array<Device>,
    isLoading: boolean;
};
export const useFetchSupport = (params?: ListDevicePayload) : UseSupport => {
    const infinityQuery = useInfiniteQuery(
      ["list_device", params],
      async ({ data }: any) =>
        SupportRepository.listDeviceAccess(params)
      ,
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

//3. THỐNG KÊ THEO LOẠI THIẾT BỊ(TỪ NGÀY ĐẾN NGÀY)
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

//4. THỐNG KÊ TRUY CẬP THEO APP
interface UselistAppAccess {
    listAppAccess: Array<AppAccess>
}
export const useListAppAccess = (params?: ListAppAccessPayload) : UselistAppAccess => {
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

//5. THỐNG KÊ TRUY CẬP THEO APP VÀ THIẾT BỊ
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
    listCompany: Array<listCompany>
}
export const useListCompanyAccess = (params?: ListCompanyAccessPayload) : UselistCompanyAccess => {
    const infinityQuery = useInfiniteQuery(
        ["list_company_access", params],
        async ({ data }: any) => {
            return SupportRepository.listCompanyAccess(
                params
            )
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