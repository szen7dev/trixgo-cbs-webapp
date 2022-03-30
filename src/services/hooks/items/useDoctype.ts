import { useInfiniteQuery, useMutation } from "react-query";
import React from "react";

import { DoctypeRepository } from 'apis/item';
import type { Doctype } from 'typings/items';

interface UseDoctype {
    addDoctypeAsync: (params: any) => Promise<any>,
    updateDoctypeAsync: (params: any) => Promise<any>,
    deleteDoctypeAsync: (ids: Array<string>) => Promise<any>,
    loading: boolean;
    totalRecord: number;
    totalPages: number;
    hasNextPage: boolean | undefined;
    listDoctypes: Array<Doctype.Doctype>;
    refetchListDoctype: () => void;
    fetchNextPageDoctype: () => void;
}

export const useDoctype = (params: Doctype.DoctypeQueryPayload, isFetch?: boolean): UseDoctype => {
    const { mutateAsync: addDoctypeAsync } =
        useMutation((payload: any) =>
            DoctypeRepository.addDoctype(payload)
        );

    const { mutateAsync: updateDoctypeAsync } =
        useMutation((payload: any) =>
            DoctypeRepository.updateDoctype(payload)
        );

    const { mutateAsync: deleteDoctypeAsync } =
        useMutation((ids: Array<string>) =>
            DoctypeRepository.deleteDoctype(ids)
        );

    const {
        isLoading,
        data,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        hasNextPage
    } = useInfiniteQuery(
        ['doctypes', params],
        async ({ pageParam }: any) =>
            DoctypeRepository.fetchListDoctype({
                limit: params?.limit ?? 10,
                lastestID: pageParam ?? "",
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor ?? undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetch ?? true
        }
    );

    const listDoctypes = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    return {
        addDoctypeAsync,
        updateDoctypeAsync,
        deleteDoctypeAsync,
        loading: isLoading,
        listDoctypes,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListDoctype,
        fetchNextPageDoctype
    }
}

// Những Hook này cần refactor lại, không nên sử dụng
interface UseQueryListDoctype {
    loading: boolean;
    totalRecord: number;
    totalPages: number;
    hasNextPage: boolean | undefined;
    listDoctypes: Array<Doctype.Doctype>;
    refetchListDoctype: () => void;
    fetchNextPageDoctype: () => void;
}

export const useQueryListDoctype = (params: Doctype.DoctypeQueryPayload, isFetch?: boolean): UseQueryListDoctype => {
    const {
        isLoading,
        data,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        hasNextPage
    } = useInfiniteQuery(
        ['doctypes', params],
        async ({ pageParam }: any) =>
            DoctypeRepository.fetchListDoctype({
                limit: params?.limit ?? 10,
                lastestID: pageParam ?? "",
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor ?? undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetch ?? true
        }
    );

    const listDoctypes = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

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