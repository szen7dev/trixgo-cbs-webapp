/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { AccountRepository } from "apis/account";
import type {
    Account,
    AccountInfoParams,
    AccountListParams,
} from 'typings/items/account';

/*=====3.INTERFACE DEFINE=====*/
interface UseAccount {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    list: Array<Account>;
    info: Account | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

type UseAccountProps = {
    params?: AccountListParams,
    paramsInfo?: AccountInfoParams,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

export const useAccount = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false
}: UseAccountProps): UseAccount => {
    const { data: detailData } =
        useQuery("account__info", () => AccountRepository.fetchInfo(params), {
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
        ['account__list', params],
        async ({ pageParam }: any) =>
            AccountRepository.fetchList({
                lastestID: pageParam ?? "",
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor ?? undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList,
            // keepPreviousData: true,
            // refetchOnMount: false,
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