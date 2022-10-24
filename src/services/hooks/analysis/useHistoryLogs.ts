/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import HistoryLogsRepository from 'apis/history-logs';

/*=====3.INTERFACE DEFINE=====*/
interface UseHistoryLogs {
    isLoading: boolean;
    isFetching: boolean;
    totalRecord: number;
    hasNextPage: boolean | undefined;
    totalPage: number;
    nextCursor?: string | null,
    list: Array<any>;
    listHistoryLogsWithPager: Array<any>;
    refetch: () => void;
    fetchNextPage: () => void;
    insertAsync: (params: any) => Promise<any>;
}

// Khai báo params cho hook
type UseHistoryLogsProps = {
    params?: any,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const UseHistoryLogs = ({
    params = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseHistoryLogsProps): UseHistoryLogs => {
    // Create
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            HistoryLogsRepository.insert(payload)
        );
    
    // Get List
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetching
    } = useInfiniteQuery(
        ['history_logs__list', params],
        async ({ pageParam }: any) =>
            HistoryLogsRepository.getInfoAndGetList(params),
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
    const listHistoryLogsWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);
    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    // Return data
    return {
        isLoading,
        list,
        listHistoryLogsWithPager,
        totalRecord,
        totalPage,
        nextCursor,
        hasNextPage,
        refetch,
        fetchNextPage,
        insertAsync,
        isFetching
    }
}
