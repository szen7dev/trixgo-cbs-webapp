import { useInfiniteQuery } from "react-query";

import { ContractRepository } from 'apis/item';

import type {
    ListContractsPayload,
    ContractProps
} from "typings/cmcs";

interface UseQueryContract {
    fetchNextPageContract: () => void;
    refetchListContracts: () => void;
    listContracts: ContractProps[];
    totalRecord: number;
    totalPages: number;
    loading: boolean;
    hasNextPage?: boolean;
}

export const useQueryItemContract = (companyID: string, params?: ListContractsPayload): UseQueryContract => {
    const {
        isLoading,
        data,
        refetch: refetchListContracts,
        fetchNextPage: fetchNextPageContract,
        hasNextPage
    } = useInfiniteQuery(
        [`list_contract`, { params, companyID }],
        async ({ pageParam }: any) =>
            ContractRepository.getListContract({
                limit: params?.limit || 10,
                lastestID: pageParam || "",
                companyID,
                keyword: params?.keyword,
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );

    const listContactDocument = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPages || 0;

    return {
        fetchNextPageContract,
        refetchListContracts,
        listContracts: listContactDocument,
        totalRecord,
        totalPages,
        loading: isLoading,
        hasNextPage
    }
}