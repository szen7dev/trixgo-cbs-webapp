import { useInfiniteQuery, useMutation } from "react-query";

import { AppCompanyRepository } from 'apis/app';
import type { AppCompanyProps, QueryParam, AppCompanyPayload } from 'typings/apps/appCompany';

interface UseQueryListCompany {
    createAppCompanyAsync: (payload: AppCompanyPayload) => Promise<any>,
    updateAppCompanyAsync: (payload: AppCompanyPayload) => Promise<any>,
    loading: boolean;
    data: AppCompanyProps[];
    hasNextPage?: boolean;
    totalPages: number;
    totalRecord: number;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

export const useAppCompany = (params?: QueryParam): UseQueryListCompany => {
    const { mutateAsync: createAppCompanyAsync } =
        useMutation((payload: AppCompanyPayload) =>
            AppCompanyRepository.createAppCompany(payload)
        );

    const { mutateAsync: updateAppCompanyAsync } =
        useMutation((payload: AppCompanyPayload) =>
            AppCompanyRepository.updateAppCompany(payload)
        );

    const result = useInfiniteQuery(
        // `list_apps_company.${params?.keyword}`, 
        ['list_apps_company', params],
        async ({ pageParam }: any) =>
        AppCompanyRepository.listAppsCompany({
            lastestID: pageParam,
            ...params,
        }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: !!params?.companyID,
        });

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage
    } = result;

    const listAppCompany = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    return {
        createAppCompanyAsync,
        updateAppCompanyAsync,
        loading: isLoading,
        data: listAppCompany,
        hasNextPage,
        totalPages,
        totalRecord,
        refetch,
        fetchNextPage,
        fetchPreviousPage
    }
}