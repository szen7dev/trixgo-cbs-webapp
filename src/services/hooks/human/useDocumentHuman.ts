import { useMutation, useInfiniteQuery } from 'react-query';

import { documentHumanRepository } from 'apis/human/DocumentHuman';

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
};

type UseHumanCustomParams = {
    params?: any
}

// Custom hook mới cho Human
export const useHumanCustom = ({
    params = {}
}: UseHumanCustomParams) : UseHumanCustom => {

    // Tải mẫu import excel
    const { mutateAsync: downloadTemplateImportExcelHumanAsync } =
        useMutation((payload: any ) =>
        documentHumanRepository.downloadTemplateImportExcelHuman(payload)
    );

    // Import excel
    const { mutateAsync: importHumanFromExcelAsync } =
        useMutation((payload: { projectID?: string, dataImport: string }) =>
        documentHumanRepository.importHumanFromExcel(payload)
    );

    // Export excel
    const { mutateAsync: exportHumanAsync } =
        useMutation((payload: any) =>
        documentHumanRepository.exportHuman(payload)
    );

    return {
        downloadTemplateImportExcelHumanAsync,
        importHumanFromExcelAsync,
        exportHumanAsync
    }
}

interface UseMutationHuman {
    insertHumanAsync: (payload: any) => Promise<any>;
    updateHumanAsync: (payload: HumanUpdatePayload) => Promise<HumanUpdateResponse>;
}

export const useMutationHuman = (): UseMutationHuman => {
    const { mutateAsync: insertHumanAsync } = useMutation((payload: any) => documentHumanRepository.insert(payload));
    const { mutateAsync: updateHumanAsync } = useMutation((payload: any) => documentHumanRepository.update(payload));

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
    listHuman: Array<HumanProps>;
    listHumanWithPager: Array<HumanProps[]>;
    refetchListHuman: () => void;
    fetchNextPageHuman: () => void;
    fetchPrevPageHuman: () => void;
    isFetching: boolean;
}

// export const useListHuman = ({ params = {},  isFetchList = false }: HumanQueryPayload): UseQueryListHuman => {

//     const res = useInfiniteQuery(
//         [`list_Human`, { params }],
//         async ({ pageParam }: any) =>
//             documentHumanRepository.fetchList({
//                 lastestID: pageParam, ...params
//             }),
//         {
//             getNextPageParam: ({ data }: any) => {
//                 return data?.nextCursor || undefined;
//             },
//             refetchOnWindowFocus: false,
//             enabled: isFetchList ?? true, // https://react-query.tanstack.com/guides/disabling-queries
//         }
//     );
//     const {
//         isLoading,
//         data,
//         refetch,
//         fetchNextPage,
//         fetchPreviousPage,
//         hasNextPage,
//         isFetching
//     } = res;

//     const listHuman = []
//         .concat(
//             ...(data?.pages || []).map((d: any) => d.data?.listRecords)
//         )
//         .filter(Boolean);
        
//     const listHumanWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

//     const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
//     const totalPage = data?.pages[0]?.data?.totalPage || 0;
//     const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

//     return {
//         isLoading,
//         listHuman,
//         listHumanWithPager,
//         totalRecord,
//         totalPage,
//         hasNextPage,
//         nextCursor,
//         refetchListHuman: refetch,
//         fetchNextPageHuman: fetchNextPage,
//         fetchPrevPageHuman: fetchPreviousPage,
//         isFetching
//     }
// }

export const useListFilterHuman = ({ params = {},  isFetchList = false }: HumanQueryPayload): UseQueryListHuman => {

    const res = useInfiniteQuery(
        [`list_filter_Document_Human`, { params }],
        async ({ pageParam }: any) =>
            documentHumanRepository.fetchFilterList({
                lastestID: pageParam, ...params
            }),
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