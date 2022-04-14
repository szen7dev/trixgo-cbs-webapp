/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useQuery, useMutation } from "react-query";

/*=====2.TYPING/APIS=====*/
import { BudgetGroupRepository } from "apis/budget";
import type {
    BudgetGroup,
    BudgetGroupInfoParams,
    BudgetGroupListParams,
} from 'typings/budget/budget-group';

/*=====3.INTERFACE DEFINE=====*/
interface UseBudgetGroup {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    insertAsync: (payload: any) => Promise<any>;
    updateAsync: (payload: any) => Promise<any>;
    deleteManyAsync: (params: any) => Promise<any>;
    list: Array<BudgetGroup>;
    info: BudgetGroup | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

type UseBudgetGroupProps = {
    params?: BudgetGroupInfoParams | BudgetGroupListParams,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

export const useBudgetGroup = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false
}: UseBudgetGroupProps): UseBudgetGroup => {
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) => BudgetGroupRepository.insert(payload)
    );

    const { mutateAsync: updateAsync } =
        useMutation((payload: any) => BudgetGroupRepository.update(payload)
    );

    const { mutateAsync: deleteManyAsync } =
        useMutation((params: any) => BudgetGroupRepository.deleteMany(params)
    );

    const { data: detailData } =
        useQuery("budget__info", () => BudgetGroupRepository.fetchInfo(params), {
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
            BudgetGroupRepository.fetchList({
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