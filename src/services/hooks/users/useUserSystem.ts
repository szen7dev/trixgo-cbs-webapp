import { useInfiniteQuery, useMutation } from "react-query";

import { UserSystemRepository } from 'apis/users';
import type { QueryParam, UserSystemProps, UserSystemPayload, ListUserInProjectPayload } from 'typings/users/userSystem';
import { User } from "typings/user";

interface UseUserSystem {
    loading: boolean;
    data: UserSystemProps[];
    hasNextPage?: boolean;
    totalPages: number;
    totalRecord: number;
    refetch: () => void;
    fetchNextPage: () => void;
    createUserSystemAsync: (payload: UserSystemPayload) => Promise<any>;
    updateUserSystemAsync: (payload: UserSystemPayload) => Promise<any>;
    importUserSystemAsync: (data: any) => Promise<any>;
    deleteUserSystemAsync: (usersID: string[]) => Promise<any>;
    isFetching: boolean;
}

export const useUserSystem = (params?: QueryParam, isFetch?: boolean): UseUserSystem => {
    const { mutateAsync: createUserSystemAsync } =
        useMutation((payload: UserSystemPayload) =>
            UserSystemRepository.addUserSystem(payload)
        );

    const { mutateAsync: updateUserSystemAsync } =
        useMutation((payload: UserSystemPayload) =>
            UserSystemRepository.updateUserSystem(payload)
        );

    const { mutateAsync: deleteUserSystemAsync } =
        useMutation((usersID: string[]) =>
            UserSystemRepository.deleteUserSystem(usersID)
        );

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetching
    } = useInfiniteQuery(
        ['list_users_system', params]
        , async ({ pageParam }: any) =>
        UserSystemRepository.listUsersSystem({
            lastestID: pageParam,
            ...params
        }), {
        getNextPageParam: ({ data }: any) => {
            return data?.nextCursor || undefined;
        },
        refetchOnWindowFocus: false,
        enabled: isFetch ?? false
    });

    const listUsers = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    // Import excel
    const { mutateAsync: importUserSystemAsync } =
        useMutation((payload: { dataImport: string }) =>
            UserSystemRepository.importUserSystem(payload)
        );

    return {
        loading: isLoading,
        data: listUsers,
        hasNextPage,
        totalPages,
        totalRecord,
        refetch,
        fetchNextPage,
        createUserSystemAsync,
        updateUserSystemAsync,
        importUserSystemAsync,
        deleteUserSystemAsync,
        isFetching
    }
}

interface UseUsersProject {
    loading: boolean;
    data: UserSystemProps[];
    hasNextPage?: boolean;
    totalPages: number;
    totalRecord: number;
    refetch: () => void;
    fetchNextPage: () => void;
}

export const useUsersProject = (params: ListUserInProjectPayload, isFetch?: boolean): UseUsersProject => {
    const result = useInfiniteQuery(
        ['list_users_project', params]
        , async ({ pageParam }: any) =>
        UserSystemRepository.listUserInProject({
            lastestID: pageParam,
            ...params,
        }), {
        getNextPageParam: ({ data }: any) => {
            return data?.nextCursor || undefined;
        },
        refetchOnWindowFocus: false,
        enabled: isFetch ?? false
    });

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = result;

    const listUsers = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    return {
        loading: isLoading,
        data: listUsers,
        hasNextPage,
        totalPages,
        totalRecord,
        refetch,
        fetchNextPage
    }
}