/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useQuery, useMutation } from "react-query";

/*=====2.TYPING/APIS=====*/
import { BiddingPlanRepository } from "apis/bidding";
import type {
    BiddingPlan,
    BiddingPlanInfoPayload,
    BiddingPlanQueryPayload,
} from 'typings/bidding/biddingPlan';

/*=====3.INTERFACE DEFINE=====*/
interface UseBiddingPlan {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    insertAsync: (payload: any) => Promise<any>;
    updateAsync: (payload: any) => Promise<any>;
    deleteManyAsync: (params: any) => Promise<any>;
    list: Array<BiddingPlan>;
    info: BiddingPlan | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
    contractorSelection: any
}

type UseBiddingPlanProps = {
    params?: BiddingPlanInfoPayload | BiddingPlanQueryPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
    isFetchContractorSelection?:boolean
}

export const useBiddingPlan = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false,
    isFetchContractorSelection = false,
}: UseBiddingPlanProps): UseBiddingPlan => {
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) => BiddingPlanRepository.addBiddingPlan(payload)
    );

    const { mutateAsync: updateAsync } =
        useMutation((payload: any) => BiddingPlanRepository.updateBiddingPlan(payload)
    );

    const { mutateAsync: deleteManyAsync } =
        useMutation((params: any) => BiddingPlanRepository.deleteBiddingPlan(params)
    );

    const { data: detailData } =
        useQuery("bidding_plan__info", () => BiddingPlanRepository.fetchDetailBiddingPlan(params), {
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
        BiddingPlanRepository.fetchListBiddingPlan({
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

    // Báo cáo lựa chọn nhà thầu
    const { data: contractorSelection } =
        useQuery("ContractorSelection", () => BiddingPlanRepository.fetchContractorSelection(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchContractorSelection,
        });
    const infoContractorSelection = contractorSelection?.data;
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
        contractorSelection: infoContractorSelection
    }
}