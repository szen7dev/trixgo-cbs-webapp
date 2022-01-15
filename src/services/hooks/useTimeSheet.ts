import { useInfiniteQuery, useMutation } from "react-query";
import { TimeSheetParentRepository, TimeSheetChildRepository } from 'apis/time-sheet';

import type {
    TimeSheetParent,
    InsertTimeSheetParentPayload,
    InsertTimeSheetParentResponse,
    UpdateTimeSheetParentPayload,
    UpdateTimeSheetParentResponse,
    DeleteTimeSheetParentPayload,
    DeleteTimeSheetParentResponse,
    TimeSheetChild,
} from 'typings/time-sheet';

// Time Sheet Parent
interface UseQueryListTimeSheetParent {
    loading: boolean;
    data: TimeSheetParent[];
    hasNextPage?: boolean;
    totalPages: number;
    totalRecord: number;
    refetch: () => void;
    fetchNextPage: () => void;
}
export const useQueryListTimeSheetParent = (): UseQueryListTimeSheetParent => {
    const result = useInfiniteQuery(
        `list_time-sheet.parent`, async () =>
        TimeSheetParentRepository.fetchListTimeSheet({
            populates: {
                "path": "assignee project userCreate",
                "select": "fullname name"
            },
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

    const listTimeSheet = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    return {
        loading: isLoading,
        data: listTimeSheet,
        hasNextPage,
        totalPages,
        totalRecord,
        refetch,
        fetchNextPage
    }
}

interface UseMutationTimeSheetParent {
    onCreateTimeSheetParentAsync: (payload: InsertTimeSheetParentPayload) =>
        Promise<InsertTimeSheetParentResponse>;
    onUpdateTimeSheetParentAsync: (payload: UpdateTimeSheetParentPayload) =>
        Promise<UpdateTimeSheetParentResponse>;
    onDeleteTimeSheetParentAsync: (payload: DeleteTimeSheetParentPayload) =>
        Promise<DeleteTimeSheetParentResponse>;
}
export const useMutationTimeSheetParent = (): UseMutationTimeSheetParent => {
    const insertMutation = useMutation((payload: InsertTimeSheetParentPayload) =>
        TimeSheetParentRepository.insertTimeSheet(payload));
    const updateMutation = useMutation((payload: UpdateTimeSheetParentPayload) =>
        TimeSheetParentRepository.updateTimeSheet(payload));
    const deleteMutation = useMutation((payload: DeleteTimeSheetParentPayload) =>
        TimeSheetParentRepository.deleteTimeSheet(payload));

    return {
        onCreateTimeSheetParentAsync: insertMutation.mutateAsync,
        onUpdateTimeSheetParentAsync: updateMutation.mutateAsync,
        onDeleteTimeSheetParentAsync: deleteMutation.mutateAsync,
    }
}

// Time Sheet Children
interface UseQueryListTimeSheetChild {
    loading: boolean;
    data: TimeSheetChild[];
    hasNextPage?: boolean;
    totalPages: number;
    totalRecord: number;
    refetch: () => void;
    fetchNextPage: () => void;
}
export const useQueryListTimeSheetChild = (timeSheetParentID: string): UseQueryListTimeSheetChild => {
    const result = useInfiniteQuery(
        `list_time-sheet.parent`, async ({ pageParam }: any) =>
        TimeSheetChildRepository.fetchListTimeSheet({
            parentID: timeSheetParentID,
            lastestID: pageParam,
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

    const listTimeSheet = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    return {
        loading: isLoading,
        data: listTimeSheet,
        hasNextPage,
        totalPages,
        totalRecord,
        refetch,
        fetchNextPage
    }
}
