/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { CashFlowPlanRepository } from 'apis/financial';
import {
    CashFlowPlan,
    CashFlowPlanQueryPayload
} from 'typings/financial/cashFlowPlan';

/*=====3.INTERFACE DEFINE=====*/
interface useCashFlowPlan {
    isLoading: boolean;
    totalRecord: number;
    hasNextPage: boolean | undefined;
    list: Array<CashFlowPlan>;
    info: CashFlowPlan | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    insertAsync: (params: any) => Promise<any>;
    updateAsync: (params: any) => Promise<any>;
    deleteManyAsync: (params: any) => Promise<any>;
}

// Khai báo params cho hook
type UseCashFlowPlanProps = {
    params?: CashFlowPlanQueryPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useCashFlowPlan = ({
    params = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseCashFlowPlanProps): useCashFlowPlan => {
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            CashFlowPlanRepository.addCashFlowPlan(payload)
        );

    const { mutateAsync: updateAsync } =
        useMutation((payload: any) =>
            CashFlowPlanRepository.updateCashFlowPlan(payload)
        );

    const { mutateAsync: deleteManyAsync } =
        useMutation((payload: any) =>
            CashFlowPlanRepository.deleteCashFlowPlan(payload)
        );

    // Get info
    const { data: detailData } =
        useQuery("CashFlowPlan_info", () => CashFlowPlanRepository.fetchDetailCashFlowPlan(params.contactID || ''), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = detailData?.data;

    // Get List
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['CashFlowPlan', params],
        async ({ pageParam }: any) =>
            CashFlowPlanRepository.fetchListCashFlowPlan({
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
        deleteManyAsync,
    }
}
