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
export const useListHistoryTraffic = (params?: ListHistoryTrafficPayload) : any => {
    // Get danh sách
    const infinityQuery = useInfiniteQuery(
        ["list_history_traffic", params],
        async ({ pageParam }: any) =>
            SupportRepository.listHistoryTraffic({
                lastestID: pageParam ? pageParam : "",
                populates: JSON.stringify({
                    path: "companyOfAuthor userCreate app menu",
                    select: "name sign fullname bizfullname image",
                }),
                limit: 15,
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

    const {  
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage, } = infinityQuery;

        const listHistoryTraffic = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);
        const totalRecord = data?.pages[0]?.data?.totalRecord;
        const totalPage = data?.pages[0]?.data?.totalPage;
    return {
        isLoading,
        listHistoryTraffic,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        totalRecord,
        totalPage
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
// export const useTypeDeviceAccess = (params?: ListTypeDeviceAccessPayload) : UseTypeDeviceAccess => {
export const useTypeDeviceAccess = (params?: any) : UseTypeDeviceAccess => {
    const infinityQuery = useInfiniteQuery(
        ["list_type_device_access", params],
        async ({ data }: any) => {
            return SupportRepository.listTypeDeviceAccess(params)
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
export const useListAppDeviceAccess = (params?: any) : UselistAppDeviceAccess => {
    const infinityQuery = useInfiniteQuery(
        ["list_app_device_access", params],
        async ({ data }: any) => {
            return SupportRepository.listAppDeviceAccess(params)
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