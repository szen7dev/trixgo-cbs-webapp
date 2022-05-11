/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { FundaRepository } from 'apis/item';
import type { Funda } from 'typings/items';

/*=====3.INTERFACE DEFINE=====*/
interface useFunda {
    isLoading: boolean;
    totalRecord: number;
    hasNextPage: boolean | undefined;
    list: Array<Funda.Funda>;
    info: Funda.Funda | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    insertAsync: (params: any) => Promise<any>;
    updateAsync: (params: any) => Promise<any>;
    deleteAsync: (ids: Array<string>) => Promise<any>;
}

// Khai báo params cho hook
type UseFundaProps = {
    params?: Funda.FundaQueryPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useFunda = ({
    params = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseFundaProps): useFunda => {
    // Create
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            FundaRepository.addFunda(payload)
        );

    // Update
    const { mutateAsync: updateAsync } =
        useMutation((payload: any) =>
            FundaRepository.updateFunda(payload)
        );

    // Delete
    const { mutateAsync: deleteAsync } =
        useMutation((ids: Array<string>) =>
            FundaRepository.deleteFunda(ids)
        );

    // Get info
    const { data: infoFunda } =
        useQuery("Funda__info", () => FundaRepository.fetchDetailFunda(params.FundaID || ''), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = infoFunda?.data;

    // Get List
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['Funda__list', params],
        async ({ pageParam }: any) =>
            FundaRepository.fetchListFunda({
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
