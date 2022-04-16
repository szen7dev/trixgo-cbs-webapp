/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useQuery, useMutation } from "react-query";

/*=====2.TYPING/APIS=====*/
import { CashbookRepository } from "apis/financial";
import type {
    CashBook,
    CashBookInsertPayload,
    CashBookUpdatePayload,
    CashBookDeleteManyPayload,
    CashBookInfoParams,
    CashBookListParams,
    CashBookInfoResponse
} from 'typings/financial/cashBook';

/*=====3.INTERFACE DEFINE=====*/
interface UseBudget {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    insertAsync: (payload: CashBookInsertPayload) => Promise<CashBookInfoResponse>;
    updateAsync: (payload: CashBookUpdatePayload) => Promise<CashBookInfoResponse>;
    deleteManyAsync: (params: CashBookDeleteManyPayload) => Promise<any>;
    list: Array<CashBook>;
    info: CashBook | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

type UseBudgetProps = {
    params?: CashBookInfoParams | CashBookListParams,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

export const useBudget = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false
}: UseBudgetProps): UseBudget => {

    const { mutateAsync: insertAsync } =
        useMutation((payload: CashBookInsertPayload) => CashbookRepository.insert(payload)
    );

    const { mutateAsync: updateAsync } =
        useMutation((payload: CashBookUpdatePayload) => CashbookRepository.update(payload)
    );

    const { mutateAsync: deleteManyAsync } =
        useMutation((payload: CashBookDeleteManyPayload) => CashbookRepository.deleteMany(payload)
    );

    const { data: detailData } =
        useQuery("cashbook__info", () => CashbookRepository.fetchInfo(params), {
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
        ['cashbook__list', params],
        async ({ pageParam }: any) =>
            CashbookRepository.fetchList({
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