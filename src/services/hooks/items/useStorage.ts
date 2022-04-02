/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { StorageRepository } from 'apis/item';
import type { Storage } from 'typings/items';

/*=====3.INTERFACE DEFINE=====*/
interface useStorage {
    isLoading: boolean;
    totalRecord: number;
    hasNextPage: boolean | undefined;
    list: Array<Storage.Storage>;
    info: Storage.Storage | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    addAsync: (params: any) => Promise<any>;
    updateAsync: (params: any) => Promise<any>;
    deleteAsync: (ids: Array<string>) => Promise<any>;
}

// Khai báo params cho hook
type UseStorageProps = {
    params?: Storage.StorageQueryPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useStorage = ({
    params = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseStorageProps): useStorage => {
    // Create
    const { mutateAsync: addAsync } =
        useMutation((payload: any) =>
            StorageRepository.addStorage(payload)
        );

    // Update
    const { mutateAsync: updateAsync } =
        useMutation((payload: any) =>
            StorageRepository.updateStorage(payload)
        );

    // Delete
    const { mutateAsync: deleteAsync } =
        useMutation((ids: Array<string>) =>
            StorageRepository.deleteStorage(ids)
        );

    // Get info
    const { data: infoStorage } =
        useQuery("contract_info", () => StorageRepository.fetchDetailStorage(params.storageID || ''), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = infoStorage?.data;

    // Get List
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['storages', params],
        async ({ pageParam }: any) =>
            StorageRepository.fetchListStorage({
                lastestID: pageParam ?? "",
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor ?? undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList
        }
    );

    const list = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;

    // Return data
    return {
        isLoading,
        list,
        info,
        totalRecord,
        hasNextPage,
        refetch,
        fetchNextPage,
        addAsync,
        updateAsync,
        deleteAsync,
    }
}
