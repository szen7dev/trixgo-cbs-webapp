/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { DepartmentDirectoryRepository } from 'apis/item';
import type { DepartmentDirectory } from 'typings/items';

/*=====3.INTERFACE DEFINE=====*/
interface useDepartmentDirectory {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    nextCursor: string | null,
    hasNextPage: boolean | undefined;
    list: Array<DepartmentDirectory.DepartmentDirectory>;
    info: DepartmentDirectory.DepartmentDirectory | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    insertAsync: (params: any) => Promise<any>;
    updateAsync: (params: any) => Promise<any>;
    deleteAsync: (ids: Array<string>) => Promise<any>;
}

// Khai báo params cho hook
type UseDepartmentDirectoryProps = {
    params?: DepartmentDirectory.DepartmentDirectoryQueryPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useDepartmentDirectory = ({
    params = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseDepartmentDirectoryProps): useDepartmentDirectory => {
    // Create
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            DepartmentDirectoryRepository.addDepartmentDirectory(payload)
        );

    // Update
    const { mutateAsync: updateAsync } =
        useMutation((payload: any) =>
            DepartmentDirectoryRepository.updateDepartmentDirectory(payload)
        );

    // Delete
    const { mutateAsync: deleteAsync } =
        useMutation((ids: Array<string>) =>
            DepartmentDirectoryRepository.deleteDepartmentDirectory(ids)
        );

    // Get info
    const { data: infoDepartmentDirectory } =
        useQuery("department_directory__info", () => DepartmentDirectoryRepository.fetchDetailDepartmentDirectory(params || ''), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = infoDepartmentDirectory?.data;

    // Get List
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['department_directory__list', params],
        async ({ pageParam }: any) =>
            DepartmentDirectoryRepository.fetchListDepartmentDirectory({
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
    const totalPage = data?.pages[0]?.data?.totalPages || 0;
    const nextCursor = data?.pages[0]?.data?.nextCursor || null;
    // Return data
    return {
        isLoading,
        list,
        info,
        totalRecord,
        totalPage,
        hasNextPage,
        refetch,
        fetchNextPage,
        insertAsync,
        updateAsync,
        deleteAsync,
        nextCursor
    }
}
