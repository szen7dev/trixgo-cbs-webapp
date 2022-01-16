import { useInfiniteQuery } from "react-query";
import { DepartmentRepository } from 'apis/item';

import type { Department } from 'typings/items';

type ParamsQuery = Pick<Department.DepartmentPayload, 'limit' | 'keyword'>;

interface UseQueryListDepartment {
    loading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    listDepartments: Array<Department.Department>;
    refetchListDepartments: () => void;
    fetchNextPageDepartments: () => void;
}

export const useQueryListDepartments = (params?: ParamsQuery): UseQueryListDepartment => {
    const res = useInfiniteQuery(
        [`items.department.${params?.keyword}`, params?.limit],
        async ({ pageParam }: any) =>
            DepartmentRepository.fetchListDepartment({
                limit: params?.limit || 10,
                lastestID: pageParam || "",
                type: 1,
                keyword: params?.keyword || ''
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
        refetch: refetchListDepartments,
        fetchNextPage: fetchNextPageDepartments,
        hasNextPage
    } = res;

    const listDepartments = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        loading: isLoading,
        listDepartments,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListDepartments,
        fetchNextPageDepartments
    }
}
