import { useInfiniteQuery } from "react-query";
import { PackageRepository } from 'apis/document';

import type { Package, PackageQueryPayload } from 'typings/document/package';

interface UseQueryListPackage {
    loading: boolean;
    totalRecord: number;
    totalPages: number;
    hasNextPage?: boolean;
    listPackage: Array<Package>;
    refetchListPackage: () => void;
    fetchNextPagePackage: () => void;
}

export const useQueryListPackage = (params: PackageQueryPayload): UseQueryListPackage => {
    const res = useInfiniteQuery(
        [`documents`, { params }],
        async ({ pageParam }: any) =>
            PackageRepository.fetchListPackage({
                limit: params?.limit || 10,
                lastestID: pageParam || "",
                keyword: params?.keyword || '',
                select: params?.select || '',
                ...params,
                departmentID: params.departmentID,
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
        hasNextPage
    } = res;

    const listPackage = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    return {
        loading: isLoading,
        listPackage,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListPackage: refetch,
        fetchNextPagePackage: fetchNextPage
    }
}
