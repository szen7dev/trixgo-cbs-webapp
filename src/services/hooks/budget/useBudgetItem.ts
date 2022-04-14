/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useQuery, useMutation } from "react-query";

/*=====2.TYPING/APIS=====*/
import { BudgetItemRepository } from "apis/budget";
import type {
    BudgetItem,
    BudgetItemInfoParams,
    BudgetItemListParams,
} from 'typings/budget/budget-item';

/*=====3.INTERFACE DEFINE=====*/
interface UseBudgetItem {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    insertAsync: (payload: any) => Promise<any>;
    updateAsync: (payload: any) => Promise<any>;
    deleteManyAsync: (params: any) => Promise<any>;
    list: Array<BudgetItem>;
    info: BudgetItem | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

type UseBudgetItemProps = {
    params?: BudgetItemInfoParams | BudgetItemListParams,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

export const useBudgetItem = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false
}: UseBudgetItemProps): UseBudgetItem => {
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) => BudgetItemRepository.insert(payload)
    );

    const { mutateAsync: updateAsync } =
        useMutation((payload: any) => BudgetItemRepository.update(payload)
    );

    const { mutateAsync: deleteManyAsync } =
        useMutation((params: any) => BudgetItemRepository.deleteMany(params)
    );

    const { data: detailData } =
        useQuery("budget__info", () => BudgetItemRepository.fetchInfo(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = detailData?.data;

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage
    } = useInfiniteQuery(
        ['budget__list', params],
        async ({ pageParam }: any) =>
            BudgetItemRepository.fetchList({
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
    const totalPage = data?.pages[0]?.data?.totalPage || 0;

    return {
        isLoading,
        insertAsync,
        updateAsync,
        deleteManyAsync,
        list,
        info,
        totalRecord,
        totalPage,
        hasNextPage,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
    }
}