import { useQuery } from "react-query";
import { PackageRepository } from 'apis/document';

import type { Package, PackageQueryPayload } from 'typings/document/package';

interface UseQueryListPackage {
    loading: boolean;
    totalRecord: number;
    totalPages: number;
    listPackage: Array<Package>;
    nextCursor?: string | null;
    refetchListPackage: () => void;
}

export const useQueryListPackage = (params: PackageQueryPayload): UseQueryListPackage => {
    const res = useQuery(
        [`documents`, { params }],
        async () =>
            PackageRepository.fetchListPackage({
                limit: params?.limit || 10,
                keyword: params?.keyword || '',
                select: params?.select || '',
                ...params,
                departmentID: params.departmentID,
            }),
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch,
    } = res;

    const listPackage = data?.data?.listRecords || []
    const totalRecord = data?.data?.totalRecord || 0;
    const totalPages = data?.data?.totalPage || 0;
    const nextCursor = data?.data?.nextCursor

    return {
        loading: isLoading,
        listPackage,
        totalRecord,
        totalPages,
        nextCursor,
        refetchListPackage: refetch,
    }
}
