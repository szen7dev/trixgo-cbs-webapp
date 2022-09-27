/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation } from "react-query";
import React from "react";

/*=====2.TYPING/APIS=====*/
import { DoctypeRepository } from 'apis/item';
import type { Doctype } from 'typings/items';

/*=====3.INTERFACE DEFINE=====*/
interface UseDoctype {
    isLoading: boolean;
    totalRecord: number;
    hasNextPage: boolean | undefined;
    list: Array<Doctype.Doctype>;
    refetch: () => void;
    fetchNextPage: () => void;
    insertAsync: (params: any) => Promise<any>;
    updateAsync: (params: any) => Promise<any>;
    deleteManyAsync: (ids: Array<string>) => Promise<any>;
    isFetching: boolean;
}

type UseDocTypeParams = {
    params?: Doctype.DoctypeListParams,
    isFetchList?: boolean
}

export const useDoctype = ({
    params = {},
    isFetchList = false
}: UseDocTypeParams): UseDoctype => {

    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            DoctypeRepository.addDoctype(payload)
        );

    const { mutateAsync: updateAsync } =
        useMutation((payload: any) =>
            DoctypeRepository.updateDoctype(payload)
        );

    const { mutateAsync: deleteManyAsync } =
        useMutation((ids: Array<string>) =>
            DoctypeRepository.deleteDoctype(ids)
        );

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetching
    } = useInfiniteQuery(
        ['doctype--list', params],
        async ({ pageParam }: any) =>
            DoctypeRepository.fetchListDoctype({
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
        totalRecord,
        hasNextPage,
        refetch,
        fetchNextPage,
        insertAsync,
        updateAsync,
        deleteManyAsync,
        isFetching
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

export const useQueryListDoctype = (params: Doctype.DoctypeListParams, isFetch?: boolean): UseQueryListDoctype => {
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