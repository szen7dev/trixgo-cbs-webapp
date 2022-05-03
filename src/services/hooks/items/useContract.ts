import { useInfiniteQuery, useQuery } from "react-query";
import React from "react";

import { ContractRepository } from 'apis/item';

import type {
    ListContractsPayload,
    Contract,
    InfoContractPayload
} from "typings/cmcs";

interface UseContract {
    loading: boolean;
    totalRecord: number;
    totalPage: number;
    nextCursor: string | undefined;
    hasNextPage: boolean | undefined;
    listContracts: Array<Contract>;
    contractInfo: Contract;
    refetch: () => void;
    fetchNextPage: () => void;
}

type Props = {
    params?: any,
    isFetch?: boolean,
    isFetchInfo?: boolean
}

export const useContract = ({
    params = {},
    isFetch = false,
    isFetchInfo = false
}: Props): UseContract => {
    const { data: infoContract } =
        useQuery("contract_info", () => ContractRepository.getInfoContract(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });
    
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['contracts', params],
        async ({ pageParam }: any) =>
            ContractRepository.getListContract({
                lastestID: pageParam ?? "",
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor ?? undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetch
        }
    );
    
    const listContracts = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    const contractInfo = infoContract?.data;
    return {
        contractInfo,
        listContracts,
        loading: isLoading,
        totalRecord,
        nextCursor,
        totalPage,
        hasNextPage,
        refetch,
        fetchNextPage
    }
}

// Những Hook này cần refactor lại, không nên sử dụng
interface UseQueryContract {
    fetchNextPageContract: () => void;
    refetchListContracts: () => void;
    listContracts: Contract[];
    totalRecord: number;
    totalPages: number;
    loading: boolean;
    hasNextPage?: boolean;
}

export const useQueryItemContract = (params?: ListContractsPayload): UseQueryContract => {
    const {
        isLoading,
        data,
        refetch: refetchListContracts,
        fetchNextPage: fetchNextPageContract,
        hasNextPage
    } = useInfiniteQuery(
        [`list_contract`, { params }],
        async ({ pageParam }: any) =>
            ContractRepository.getListContract({
                limit: params?.limit || 10,
                lastestID: pageParam || "",
                companyID: params?.companyID,
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
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

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

interface UseQueryDetailContract {
    detailContract: Contract,
    loading: boolean,
    onFetchDetailContractAsync: (params: InfoContractPayload) => Promise<Contract>
}
export const useQueryDetailContract = (params?: InfoContractPayload): UseQueryDetailContract => {
    const [detailContract, setDetailContract] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false);
    
    const onFetchDetailContract = React.useCallback(async (_params: InfoContractPayload): Promise<any> => {
        try {
            setLoading(true)
            const result = await ContractRepository.getInfoContract({..._params});
            if (result.error) {
                throw new Error('ERROR~');
            }
            setDetailContract(result.data);
            return result.data
        } catch(err) {
            setDetailContract({});
            return {};
        } finally {
            setLoading(false)
        }
    }, []);

    React.useEffect(() => {
        if (params && params.contractID && params.contractID.length > 0) {
            onFetchDetailContract(params);
        }
    }, [onFetchDetailContract, params]);

    return {
        detailContract,
        loading,
        onFetchDetailContractAsync: onFetchDetailContract,
    }
}