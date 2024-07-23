import React from 'react';
import { useInfiniteQuery } from "react-query";
import { DepartmentRepository } from 'apis/item';

import type { Department } from 'typings/items';

type ParamsQuery = Omit<Department.DepartmentPayload, 'type'>;

interface UseQueryListDepartment {
    loading: boolean;
    totalRecord: number;
    totalPages: number;
    hasNextPage?: boolean;
    listDepartments: Array<Department.Department>;
    refetchListDepartments: () => void;
    fetchNextPageDepartments: () => void;
}

export const useQueryListDepartments = (params?: ParamsQuery, isFetch?: boolean): UseQueryListDepartment => {
    const res = useInfiniteQuery(
        [`items.department`, { params }],
        async ({ pageParam }: any) =>
            DepartmentRepository.fetchListDepartment({
                lastestID: pageParam || "",
                type: 1,
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetch ?? false
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
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPages || 0;

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

interface UseQueryListDepartmentIsMember {
    loading: boolean;
    totalRecord: number;
    totalPages: number;
    hasNextPage?: boolean;
    nextCursor?: any;
    data: Array<Department.Department>;
    refetch: () => void;
    fetchNextPage: () => void;
    isFetching: boolean;
}

type ListDepartmentIsMemberProps = {
    keyword?: string;
    limit?: number;
    type?: number;
    isBudget?: number;
    isFetch?: boolean;
    lastestID?: string;
}

export const useQueryListDepartmentsIsMember = (params: any): UseQueryListDepartmentIsMember => {
    const res = useInfiniteQuery(
        [`items.department`, params],
        async ({ pageParam }: any) =>
            DepartmentRepository.fetchListDepartmentIsMember({
                lastestID: pageParam || "",
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: params?.isFetch || false
        }
    );
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetching
    } = res;

    const listDepartments = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        loading: isLoading,
        data: listDepartments,
        totalRecord,
        totalPages,
        hasNextPage,
        nextCursor,
        refetch,
        fetchNextPage,
        isFetching
    }
}

interface UseQueryDetailDepartment {
    loading: boolean;
    detailDepartment: Department.Department,
    onFetchDetailDepartmentAsync: (departmentID: string) => Promise<Department.Department>;
}

export const useQueryDetailDepartment = (): UseQueryDetailDepartment => {
    const [detailDepartment, setDetailDepartment] = React.useState<Department.Department | any>({});
    const [loading, setLoading] = React.useState(false);

    const onFetchDetailDepartment = React.useCallback(async (departmentID) => {
        try {
            setLoading(true);
            const result = await DepartmentRepository.fetchDetailDepartment({ departmentID });
            setDetailDepartment(result.data);
            return result.data;
        } catch (err) {
            console.error(err);
            setDetailDepartment({});
        } finally {
            setLoading(false)
        }

    }, []);

    return {
        onFetchDetailDepartmentAsync: onFetchDetailDepartment,
        loading,
        detailDepartment,
    }
}