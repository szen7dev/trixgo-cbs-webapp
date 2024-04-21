import { InfiniteData, useInfiniteQuery, useMutation, useQuery } from "react-query";

import CompanyRepository from 'apis/companies';
import type { CompanyItem, QueryParam, CompanyPayload, CompaniesResponse } from 'typings/companies';

interface UseQueryListCompany {
    loading: boolean;
    data: any;
    // data: CompanyItem[];
    newData: InfiniteData<CompaniesResponse> | undefined,
    hasNextPage?: boolean;
    totalPages: number;
    totalRecord: number;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

export const useQueryListCompany = (params?: QueryParam): UseQueryListCompany => {
    const result = useInfiniteQuery(
        ['list_company', params],
        async ({ pageParam }: any) =>
        CompanyRepository.companyList({
            lastestID: pageParam,
            ...params,
        }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true,
        });

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage
    } = result;

    const listCompany = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    return {
        loading: isLoading,
        data: listCompany,
        newData: data,
        hasNextPage,
        totalPages,
        totalRecord,
        refetch,
        fetchNextPage,
        fetchPreviousPage
    }
}

export const useQueryInfoCompany = (params?: QueryParam) => {
    const result = useInfiniteQuery(
        ['info_company', params],
        async ({ pageParam }: any) =>
        CompanyRepository.companyList({
            lastestID: pageParam,
            ...params,
        }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true,
        });

    const {
        data,
    } = result;

    return {
        data
    }
}

type UseCompany = {
    createCompanyAsync: (payload: CompanyPayload) => Promise<any>,
    updateCompanyAsync: (payload: CompanyPayload) => Promise<any>,
}

export const useCompany = () : UseCompany => {
    const { mutateAsync: createCompanyAsync } =
        useMutation((payload: CompanyPayload) =>
            CompanyRepository.createCompany(payload)
        );

    const { mutateAsync: updateCompanyAsync } =
        useMutation((payload: CompanyPayload) =>
            CompanyRepository.updateCompany(payload)
        );

    return {
        createCompanyAsync,
        updateCompanyAsync,
    }
}