import { useInfiniteQuery } from "react-query";
import React from "react";

import { DoctypeRepository } from 'apis/item';
import type { Doctype } from 'typings/items';

interface UseQueryListDoctype {
    loading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    listDoctypes: Array<Doctype.Doctype>;
    refetchListDoctype: () => void;
    fetchNextPageDoctype: () => void;
}

export const useQueryListDoctype = (params: Doctype.DoctypeQueryPayload): UseQueryListDoctype => {
    const res = useInfiniteQuery(
        ['doctypes', { params }],
        async ({ pageParam }: any) =>
            // mai request BE check lại api này
            DoctypeRepository.fetchListDoctype({
                limit: params?.limit || 10,
                lastestID: pageParam || "",
                keyword: params?.keyword || '',
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
    const {
        isLoading,
        data,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        hasNextPage
    } = res;

    const listDoctypes = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        loading: isLoading,
        listDoctypes,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListDoctype,
        fetchNextPageDoctype
    }
}

interface UseQueryDetailDoctype {
    doctype: Doctype.Doctype,
    loading: boolean,
    onFetchDetailDoctypeAsync: (docTypeID: string) => Promise<Doctype.Doctype>;
}
export const useQueryDetailDoctype = (): UseQueryDetailDoctype => {
    const [doctype, setDoctype] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false);

    const onFetchDetailDoctype = React.useCallback(async (docTypeID): Promise<any> => {
        try {
            setLoading(true);
            const result = await DoctypeRepository.fetchDetailDoctype(docTypeID);
            if (result.error) {
                throw new Error('ERROR~');
            }
            setDoctype(result.data);
            return result.data;
        } catch(err) {
            setDoctype({});
            return {}
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        doctype,
        loading,
        onFetchDetailDoctypeAsync: onFetchDetailDoctype,
    }
}