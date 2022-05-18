/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useQuery, useMutation } from "react-query";

/*=====2.TYPING/APIS=====*/
import { BiddingDocRepository } from "apis/bidding";
import type {
    BiddingDoc,
    BiddingDocInfoPayload,
    BiddingDocQueryPayload,
} from 'typings/bidding/biddingDoc';

/*=====3.INTERFACE DEFINE=====*/
interface UseBiddingDoc {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    insertAsync: (payload: any) => Promise<any>;
    updateAsync: (payload: any) => Promise<any>;
    deleteManyAsync: (params: any) => Promise<any>;
    list: Array<BiddingDoc>;
    info: BiddingDoc | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

type UseBiddingDocProps = {
    params?: BiddingDocInfoPayload | BiddingDocQueryPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

export const useBiddingDoc = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false
}: UseBiddingDocProps): UseBiddingDoc => {
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) => BiddingDocRepository.addBiddingDoc(payload)
    );

    const { mutateAsync: updateAsync } =
        useMutation((payload: any) => BiddingDocRepository.updateBiddingDoc(payload)
    );

    const { mutateAsync: deleteManyAsync } =
        useMutation((params: any) => BiddingDocRepository.deleteBiddingDoc(params)
    );

    const { data: detailData } =
        useQuery("bidding_plan__info", () => BiddingDocRepository.fetchDetailBiddingDoc(params), {
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
        ['bidding_plan__list', params],
        async ({ pageParam }: any) =>
        BiddingDocRepository.fetchListBiddingDoc({
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