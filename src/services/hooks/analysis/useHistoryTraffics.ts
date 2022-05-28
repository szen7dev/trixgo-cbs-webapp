/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import HistoryTrafficRepository from 'apis/history-traffics';

/*=====3.INTERFACE DEFINE=====*/
interface UseHistoryTraffics {
    isLoading: boolean;
    totalRecord: number;
    hasNextPage: boolean | undefined;
    list: Array<any>;
    refetch: () => void;
    fetchNextPage: () => void;
    insertAsync: (params: any) => Promise<any>;
}

// Khai báo params cho hook
type UseHistoryTrafficsProps = {
    params?: any,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const UseHistoryTraffics = ({
    params = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseHistoryTrafficsProps): UseHistoryTraffics => {
    // Create
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            HistoryTrafficRepository.insert(payload)
        );
    
    // Get List
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['history_traffic__list', params],
        async ({ pageParam }: any) =>
            HistoryTrafficRepository.getInfoAndGetList(params),
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
        totalRecord,
        hasNextPage,
        refetch,
        fetchNextPage,
        insertAsync,
    }
}
