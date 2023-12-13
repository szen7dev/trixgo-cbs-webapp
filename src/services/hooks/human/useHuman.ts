import { useMutation, useInfiniteQuery } from 'react-query';

import { humanRepository } from 'apis/human/Human';

import type {
    HumanUpdatePayload,
    HumanUpdateResponse,
    HumanQueryPayload,
    HumanProps,
} from 'typings/human/human';

// Khai báo kiểu
type UseHumanCustom = {
    downloadTemplateImportExcelHumanAsync: (payload: any) => Promise<any>,
    importHumanFromExcelAsync: (payload: any) => Promise<any>,
    exportHumanAsync: (payload: any) => Promise<any>,
    exportHumanByFilterAsync: (payload: any) => Promise<any>,
};

type UseHumanCustomParams = {
    params?: any
}

// Custom hook mới cho Human
export const useHumanCustom = (_: UseHumanCustomParams) : UseHumanCustom => {

    // Tải mẫu import excel
    const { mutateAsync: downloadTemplateImportExcelHumanAsync } =
        useMutation((payload: any ) =>
        humanRepository.downloadTemplateImportExcelHuman(payload)
    );

    // Import excel
    const { mutateAsync: importHumanFromExcelAsync } =
        useMutation((payload: { projectID?: string, dataImport: string }) =>
        humanRepository.importHumanFromExcel(payload)
    );

    // Export excel
    const { mutateAsync: exportHumanAsync } =
        useMutation((payload: any) =>
        humanRepository.exportHuman(payload)
    );

    // Export excel by filter
    const { mutateAsync: exportHumanByFilterAsync } =
        useMutation((payload: any) =>
        humanRepository.exportHumanByFilter(payload)
    );

    return {
        downloadTemplateImportExcelHumanAsync,
        importHumanFromExcelAsync,
        exportHumanAsync,
        exportHumanByFilterAsync
    }
}

interface UseMutationHuman {
    insertHumanAsync: (payload: any) => Promise<any>;
    updateHumanAsync: (payload: HumanUpdatePayload) => Promise<HumanUpdateResponse>;
}

export const useMutationHuman = (): UseMutationHuman => {
    const { mutateAsync: insertHumanAsync } = useMutation((payload: any) => humanRepository.insert(payload));
    const { mutateAsync: updateHumanAsync } = useMutation((payload: any) => humanRepository.update(payload));

    return {
        insertHumanAsync,
        updateHumanAsync
    }
}

export interface UseQueryListHuman {
    createHumanMutateAsync?: any,
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage?: boolean;
    nextCursor?: string | null,
    lastestIDs?: Array<string | undefined>,
    listHuman: Array<HumanProps>;
    listHumanWithPager: Array<HumanProps[]>;
    refetchListHuman: () => void;
    fetchNextPageHuman: () => void;
    fetchPrevPageHuman: () => void;
    isFetching: boolean;
}

export const useListHuman = ({ params = {},  isFetchList = false }: HumanQueryPayload): UseQueryListHuman => {

    const res = useInfiniteQuery(
        [`list_Human`, { params }],
        async ({ pageParam }: any) =>
            humanRepository.fetchList({
                lastestID: pageParam, ...params
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList ?? true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        isFetching
    } = res;

    const listHuman = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
        
    const listHumanWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        isLoading,
        listHuman,
        listHumanWithPager,
        totalRecord,
        totalPage,
        hasNextPage,
        nextCursor,
        refetchListHuman: refetch,
        fetchNextPageHuman: fetchNextPage,
        fetchPrevPageHuman: fetchPreviousPage,
        isFetching
    }
}

export const useListFilterHuman = ({ params = {},  isFetchList = false }: HumanQueryPayload): UseQueryListHuman => {
    const res = useInfiniteQuery(
        [`list_filter_Human`, { params }],
        async ({ pageParam }: any) => {
            return humanRepository.fetchFilterList({
                lastestID: pageParam,
                ...params,
            });
        },
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            cacheTime: 0,
            enabled: isFetchList ?? true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        isFetching
    } = res;

    const listHuman = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const listHumanWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);
    const listLastestID = (data?.pages || []).map((d: any) => d.data?.lastestID as string);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        isLoading,
        listHuman,
        listHumanWithPager,
        totalRecord,
        totalPage,
        hasNextPage,
        nextCursor,
        lastestIDs: listLastestID,
        refetchListHuman: refetch,
        fetchNextPageHuman: fetchNextPage,
        fetchPrevPageHuman: fetchPreviousPage,
        isFetching
    }
}