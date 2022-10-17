import { useInfiniteQuery } from "react-query";

import GroupRepository from 'apis/plan-group';
import type { GroupItem, QueryParam } from 'typings/planGroup';

interface UseQueryListGroup {
    loading: boolean;
    data: GroupItem[];
    hasNextPage?: boolean;
    totalPages: number;
    totalRecord: number;
    refetch: () => void;
    fetchNextPage: () => void;
    isFetching: boolean;
}

export const useQueryListGroup = (params?: any, isFetch?: boolean): UseQueryListGroup => {
    const result = useInfiniteQuery(
        `plan_group.${params?.projectID}${params?.keyword}${params?.keyword}${params?.parentID}`, 
        async ({ pageParam }: any) =>
        GroupRepository.groupList({
            lastestID: pageParam,
            limit: 10,
            ...params,
        }), {
        getNextPageParam: ({ data }: any) => {
            return data?.nextCursor || undefined;
        },
        refetchOnWindowFocus: false,
        enabled: isFetch ?? false,
    });

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetching
    } = result;

    const listGroup = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;
    return {
        loading: isLoading,
        data: listGroup,
        hasNextPage,
        totalPages,
        totalRecord,
        refetch,
        fetchNextPage,
        isFetching
    }
}