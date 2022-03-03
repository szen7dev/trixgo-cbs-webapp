import { useInfiniteQuery, useMutation } from "react-query";

import { AppUserRepository } from 'apis/app';
import type { 
    AppUserProps, 
    QueryParam, 
    AddMemberToUserAppPayload, 
    UpdateMemberAppUserPayload
} from 'typings/apps/appUser';

interface UseAppUser {
    addMemberToAppUserAsync: (payload: AddMemberToUserAppPayload) => Promise<any>,
    deleteMemberAppUserAsync: (payload: string[]) => Promise<any>,
    updateMemberAppUserAsync: (payload: UpdateMemberAppUserPayload) => Promise<any>,
    loading: boolean;
    data: AppUserProps[];
    hasNextPage?: boolean;
    totalPages: number;
    totalRecord: number;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

export const useAppUser = (params?: QueryParam): UseAppUser => {
    const { mutateAsync: addMemberToAppUserAsync } =
        useMutation((payload: AddMemberToUserAppPayload) =>
            AppUserRepository.addMemberToAppUser(payload)
        );

    const { mutateAsync: deleteMemberAppUserAsync } =
        useMutation((payload: string[]) =>
            AppUserRepository.deleteMemberAppUser(payload)
        );

    const { mutateAsync: updateMemberAppUserAsync } =
        useMutation((payload: UpdateMemberAppUserPayload) =>
            AppUserRepository.updateMemberAppUser(payload)
        );

    const result = useInfiniteQuery(
        ['list_apps_user', params],
        async ({ pageParam }: any) =>
        AppUserRepository.listAppsUser({
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

    const listAppUser = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    return {
        addMemberToAppUserAsync,
        deleteMemberAppUserAsync,
        updateMemberAppUserAsync,
        loading: isLoading,
        data: listAppUser,
        hasNextPage,
        totalPages,
        totalRecord,
        refetch,
        fetchNextPage,
        fetchPreviousPage
    }
}