import {useInfiniteQuery, useQuery} from "react-query";
import CmcsRepository from "apis/cmcs";
import {CmcsListAccessByContractQueryPayload, CmcsListByFilterQueryPayload, Contract} from "typings/cmcs";

export interface UseQueryListCmcsByFilter {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage?: boolean;
    nextCursor?: string | null,
    listCmcsByFilter: Array<Contract>;
    listCmcsByFilterWithPager: Array<Contract[]>;
    refetchListCmcsByFilter: () => void;
    fetchNextPageListCmcsByFilter: () => void;
    fetchPrevPageListCmcsByFilter: () => void;
}

export interface UseQueryListAccessByContract {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage?: boolean;
    nextCursor?: string | null,
    listAccessByContract: Array<{
        _id: string,
        company: {
            _id: string;
            name: string;
            sign: string;
            [key: string] : any;
        };
        name: string;
        sign: string|null;
        [key: string] : any;
    }>;
    listAccessByContractWithPager: Array<{
        _id: string,
        company: {
            _id: string;
            name: string;
            sign: string;
            [key: string] : any;
        };
        name: string;
        sign: string|null;
        [key: string] : any;
    }[]>;
    refetchListAccessByContract: () => void;
    fetchNextPageListAccessByContract: () => void;
    fetchPrevPageListAccessByContract: () => void;
}
export const useListFilterContract = ({ params = {},  isFetchList = false }: CmcsListByFilterQueryPayload): UseQueryListCmcsByFilter => {

    const res = useInfiniteQuery(
        [`list_filter_cmcs`, { params }],
        async ({ pageParam }: any) =>
            CmcsRepository.listByFilter({
                lastestID: pageParam, ...params
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList ?? true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
    } = res;

    const listCmcsByFilter = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const listCmcsByFilterWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        isLoading,
        listCmcsByFilter,
        listCmcsByFilterWithPager,
        totalRecord,
        totalPage,
        hasNextPage,
        nextCursor,
        refetchListCmcsByFilter: refetch,
        fetchNextPageListCmcsByFilter: fetchNextPage,
        fetchPrevPageListCmcsByFilter: fetchPreviousPage
    }
}

export const useListAccessByContract = ({ params = {},  isFetchList = false }: CmcsListAccessByContractQueryPayload): UseQueryListAccessByContract => {

    const res = useInfiniteQuery(
        [`list_access_by_contract`, { params }],
        async ({ pageParam }: any) =>
            CmcsRepository.listAccessByContract({
                lastestID: pageParam, ...params
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList ?? true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
    } = res;

    const listAccessByContract = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const listAccessByContractWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        isLoading,
        listAccessByContract,
        listAccessByContractWithPager,
        totalRecord,
        totalPage,
        hasNextPage,
        nextCursor,
        refetchListAccessByContract: refetch,
        fetchNextPageListAccessByContract: fetchNextPage,
        fetchPrevPageListAccessByContract: fetchPreviousPage
    }
}

type UseContractCustom = {
    listGuarantee: any,
    isLoadingListGuarantee: boolean,
};

type UseContractCustomParams = {
    params?: any,
    isFetchListGuarantee?: boolean
}

export const useContractCustom = ({
    params = {},
    isFetchListGuarantee = false
}: UseContractCustomParams) : UseContractCustom => {
    const { data: listGuarantee, isLoading: isLoadingListGuarantee } =
        useQuery(["cmcsListGuarantee", params], () =>
        CmcsRepository.getListGuarantee(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchListGuarantee,
        });

    return {
        listGuarantee,
        isLoadingListGuarantee
    }
}