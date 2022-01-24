import { useInfiniteQuery } from "react-query";

import CompanyRepository from 'apis/companies';
import type { CompanyItem, QueryParam } from 'typings/companies';

interface UseQueryListCompany {
    loading: boolean;
    data: CompanyItem[];
    hasNextPage?: boolean;
    totalPages: number;
    totalRecord: number;
    refetch: () => void;
    fetchNextPage: () => void;
}

export const useQueryListCompany = (params?: QueryParam): UseQueryListCompany => {
    const result = useInfiniteQuery(
        `list_company.${params?.keyword}`, 
        async ({ pageParam }: any) =>
        CompanyRepository.companyList({
            lastestID: pageParam,
            select: 'name sign',
            ...params,
        }), {
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
        hasNextPage
    } = result;

    const listCompany = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    return {
        loading: isLoading,
        data: listCompany,
        hasNextPage,
        totalPages,
        totalRecord,
        refetch,
        fetchNextPage
    }
}