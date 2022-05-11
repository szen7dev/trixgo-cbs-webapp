/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { AccountRepository } from 'apis/item';
import type { Account } from 'typings/items';

/*=====3.INTERFACE DEFINE=====*/
interface useAccount {
    isLoading: boolean;
    totalRecord: number;
    hasNextPage: boolean | undefined;
    list: Array<Account.Account>;
    info: Account.Account | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    insertAsync: (params: any) => Promise<any>;
    updateAsync: (params: any) => Promise<any>;
    deleteAsync: (ids: Array<string>) => Promise<any>;
}

// Khai báo params cho hook
type UseAccountProps = {
    params?: Account.AccountQueryPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useAccount = ({
    params = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseAccountProps): useAccount => {
    // Create
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            AccountRepository.addAccount(payload)
        );

    // Update
    const { mutateAsync: updateAsync } =
        useMutation((payload: any) =>
            AccountRepository.updateAccount(payload)
        );

    // Delete
    const { mutateAsync: deleteAsync } =
        useMutation((ids: Array<string>) =>
            AccountRepository.deleteAccount(ids)
        );

    // Get info
    const { data: infoAccount } =
        useQuery("account__info", () => AccountRepository.fetchDetailAccount(params.accountID || ''), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = infoAccount?.data;

    // Get List
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['account__list', params],
        async ({ pageParam }: any) =>
            AccountRepository.fetchListAccount({
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

    // Return data
    return {
        isLoading,
        list,
        info,
        totalRecord,
        hasNextPage,
        refetch,
        fetchNextPage,
        insertAsync,
        updateAsync,
        deleteAsync,
    }
}
