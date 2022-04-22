/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { WarehouseRepository } from 'apis/item';
import type { Warehouse } from 'typings/items';

/*=====3.INTERFACE DEFINE=====*/
interface useWarehouse {
    isLoading: boolean;
    totalRecord: number;
    hasNextPage: boolean | undefined;
    list: Array<Warehouse.Warehouse>;
    info: Warehouse.Warehouse | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    insertAsync: (params: any) => Promise<any>;
    updateAsync: (params: any) => Promise<any>;
    deleteAsync: (ids: Array<string>) => Promise<any>;
}

// Khai báo params cho hook
type UseWarehouseProps = {
    params?: Warehouse.WarehouseQueryPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useWarehouse = ({
    params = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseWarehouseProps): useWarehouse => {
    // Create
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            WarehouseRepository.addWarehouse(payload)
        );

    // Update
    const { mutateAsync: updateAsync } =
        useMutation((payload: any) =>
            WarehouseRepository.updateWarehouse(payload)
        );

    // Delete
    const { mutateAsync: deleteAsync } =
        useMutation((ids: Array<string>) =>
            WarehouseRepository.deleteWarehouse(ids)
        );

    // Get info
    const { data: infoWarehouse } =
        useQuery("Warehouse__info", () => WarehouseRepository.fetchDetailWarehouse(params.WarehouseID || ''), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = infoWarehouse?.data;

    // Get List
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['Warehouse__list', params],
        async ({ pageParam }: any) =>
            WarehouseRepository.fetchListWarehouse({
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
        insertAsync,
        updateAsync,
        deleteAsync,
    }
}
