import {useMutation, useInfiniteQuery} from 'react-query';
import { JournalRepository } from 'apis/accounting/journal';
import type {
    DocumentProps,
} from 'typings/accounting/journal';

type UseDataCustom = {
    downloadTemplateExcelDocumentAsync: (payload: any) => Promise<any>,
    importFromExcelAsync: (payload: any) => Promise<any>,
    exportExcelAsync: (payload: any) => Promise<any>,
};

export const useDocumentCustom = ({
    params = {}
}: any) : UseDataCustom => {

    // Tải mẫu import excel
    const { mutateAsync: downloadTemplateExcelDocumentAsync } =
        useMutation((payload: any ) =>
        JournalRepository.downloadTemplateExcel(payload)
    );

    // Import excel
    const { mutateAsync: importFromExcelAsync } =
        useMutation((payload: { projectID?: string, dataImport: string }) =>
        JournalRepository.importFromExcel(payload)
    );

    // Export excel
    const { mutateAsync: exportExcelAsync } =
        useMutation((payload: any) =>
        JournalRepository.exportExcel(payload)
    );

    return {
        downloadTemplateExcelDocumentAsync,
        importFromExcelAsync,
        exportExcelAsync
    }
}

interface UseMutationDocument {
    insertDocumentAsync: (payload: any) => Promise<any>;
    updateDocumentAsync: (payload: any) => Promise<any>;
}

export const useMutationDocument = (): UseMutationDocument => {
    const { mutateAsync: insertDocumentAsync } = useMutation((payload: any) => JournalRepository.insert(payload));
    const { mutateAsync: updateDocumentAsync } = useMutation((payload: any) => JournalRepository.update(payload));

    return {
        insertDocumentAsync,
        updateDocumentAsync
    }
}

export interface UseQueryListData {
    createDataMutateAsync?: any,
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage?: boolean;
    nextCursor?: string | null,
    listData: Array<[]>;
    listDataWithPager: Array<DocumentProps[]>;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
    isFetching: boolean;
}

export const useJournallList = ({ params = {},  isFetchList = false }: any): UseQueryListData => {

    const res = useInfiniteQuery(
        [`list_journal`, { params }],
        async ({ pageParam }: any) =>
        JournalRepository.fetchListJournal({
                lastestID: pageParam, ...params
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList ?? true,
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

    const listData = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const listDataWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        isLoading,
        listData,
        listDataWithPager,
        totalRecord,
        totalPage,
        hasNextPage,
        nextCursor,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        isFetching
    }
}

// export const taskInfo(payload: TaskInfoParams): Promise<any> {
//     const { data } = await API.get(
//       `${pcmURL}/pcm_plan_tasks?${convertObToUrl({
//         select: "name description type typeStatus status draft alert priority project contract parent checklist createAt field group author assignee related expiredTime startTime actualStartTime actualFinishTime responses assigneeAttachs authorAttachs timeApproved valueApproved approver percentage signatures openedUsers comments amountComment amountResponse amountMarkedResponse startTime subtype flags milestone links openedStatus amountCurrentStatus amountSolution amountResponseOther accessUsers timeImportExcel milestone unit unitPrice quantity amountoftime judgement ontime quality viewedUsers linksDocs amount vatAmount upcoming",
//         populates: populatesTask,
//         ...payload
//       })}`
//     );

//     return data;
//   },

// export const useListFilterDocument = ({ params = {},  isFetchList = false }: DocumentQueryPayload): UseQueryListDocument => {

//     const res = useInfiniteQuery(
//         [`list_filter_document`, { params }],
//         async ({ pageParam }: any) =>
//             DocumentRepository.fetchFilterList({
//                 lastestID: pageParam, ...params
//             }),
//         {
//             getNextPageParam: ({ data }: any) => {
//                 return data?.nextCursor || undefined;
//             },
//             refetchOnWindowFocus: false,
//             cacheTime: 0,
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

//     const listDocument = []
//         .concat(
//             ...(data?.pages || []).map((d: any) => d.data?.listRecords)
//         )
//         .filter(Boolean);
//     const listDocumentWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

//     const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
//     const totalPage = data?.pages[0]?.data?.totalPage || 0;
//     const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

//     return {
//         isLoading,
//         listDocument,
//         listDocumentWithPager,
//         totalRecord,
//         totalPage,
//         hasNextPage,
//         nextCursor,
//         refetchListDocument: refetch,
//         fetchNextPageDocument: fetchNextPage,
//         fetchPrevPageDocument: fetchPreviousPage,
//         isFetching
//     }
// }