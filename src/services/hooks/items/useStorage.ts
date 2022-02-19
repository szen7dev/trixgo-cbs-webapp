import { useInfiniteQuery } from "react-query";
import React from "react";

import { StorageRepository } from 'apis/item';
import type { Storage } from 'typings/items';

interface UseQueryListStorage {
    loading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    listStorages: Array<Storage.Storage>;
    refetchListStorage: () => void;
    fetchNextPageStorage: () => void;
}

export const useQueryListStorage = (params?: Storage.StorageQueryPayload): UseQueryListStorage => {
    const res = useInfiniteQuery(
        ['doctypes', { params }],
        async ({ pageParam }: any) =>
            StorageRepository.fetchListStorage({
                limit: params?.limit || 10,
                lastestID: pageParam || "",
                ...params,
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
        refetch: refetchListStorage,
        fetchNextPage: fetchNextPageStorage,
        hasNextPage
    } = res;

    const listStorages = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        loading: isLoading,
        listStorages,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListStorage,
        fetchNextPageStorage
    }
}

interface UseQueryDetailStorage {
    storage: Storage.Storage,
    loading: boolean,
    onFetchDetailStorageAsync: (storageID: string, params?: Storage.StorageQueryPayload) => Promise<Storage.Storage>,
}

export const useQueryDetailStorage = (): UseQueryDetailStorage => {
    const [storage, setStorage] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false);

    const onFetchDetailStorage = React.useCallback(async (storageID: string, params?: Storage.StorageQueryPayload): Promise<any> => {
        try {
            setLoading(true);
            const result = await StorageRepository.fetchDetailStorage(storageID, params)
            if (result.error) {
                throw new Error('ERROR~');
            }
            setStorage(result.data);
            return result.data;
        } catch (err) {
            setStorage({});
            return {};
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        storage,
        loading,
        onFetchDetailStorageAsync: onFetchDetailStorage,
    }
}