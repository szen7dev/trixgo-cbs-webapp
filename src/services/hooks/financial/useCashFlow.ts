/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { CashFlowPlanRepository } from 'apis/financial';
import {
    CashFlowPlan,
    CashFlowPlanQueryPayload,
    CashFlowCustomParams,
} from 'typings/financial/cashFlowPlan';

/**
 * ============================ *********************** ===============================
 * ============================ 	 CASH FLOW HOOK     ===============================
 * ============================ *********************** ===============================
 */

interface UseCashFlowPlan {
    isLoading: boolean;
    isLoadingInfo: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    list: Array<CashFlowPlan>;
    listWithPager: Array<CashFlowPlan[]>;
    info: CashFlowPlan | undefined;
    refetch: () => void;
    refetchInfo: () => void;
    fetchNextPage: () => void;
    insertAsync: (params: any) => Promise<any>;
    updateAsync: (params: any) => Promise<any>;
    deleteManyAsync: (params: any) => Promise<any>;
}

type UseCashFlowPlanProps = {
    params?: CashFlowPlanQueryPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

export const useCashFlowPlan = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false
}: UseCashFlowPlanProps): UseCashFlowPlan => {

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

    const { data: detailData, isLoading: isLoadingInfo, refetch: refetchInfo } =
        useQuery("cash_flow_plan__info", () => CashFlowPlanRepository.fetchDetailCashFlowPlan(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });
        
    const info = detailData?.data;

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['cash_flow_plan--list', params],
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
    const listWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;

    return {
        isLoading,
        isLoadingInfo,
        list,
        listWithPager,
        info,
        totalRecord,
        totalPage,
        hasNextPage,
        refetch,
        refetchInfo,
        fetchNextPage,
        insertAsync,
        updateAsync,
        deleteManyAsync,
    }
}

/**
 * ============================ ************************** ===============================
 * ============================    CASH FLOW HOOK CUSTOM   ===============================
 * ============================ ************************** ===============================
 */

interface UseCashFlowPlanCustom {
    listAmountByProperty: Array<any>;
    isLoadingAmountByProperty: boolean;
    refetchAmountByProperty: () => void;
}

type UseCashFlowPlanCustomProps = {
    params?: CashFlowCustomParams,
    isFetchAmountByProperty?: boolean,
}

export const useCashFlowPlanCustom = ({
    params = {},
    isFetchAmountByProperty = false
} : UseCashFlowPlanCustomProps) : UseCashFlowPlanCustom => {
    // Get amount by property
    const {
        data: amountByProperty,
        refetch: refetchAmountByProperty,
        isLoading: isLoadingAmountByProperty
    } =
        useQuery(["cash_flow_plan--amount-by-property", params.amountByProperty],
            () => CashFlowPlanRepository.fetchAmountByProperty(params.amountByProperty), {
                refetchOnWindowFocus: false,
                enabled: isFetchAmountByProperty,
            });

    const listAmountByProperty = amountByProperty?.data || [];

    return {
        listAmountByProperty,
        refetchAmountByProperty,
        isLoadingAmountByProperty
    }
}