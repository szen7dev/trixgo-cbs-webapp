import { useInfiniteQuery, useQuery } from "react-query";
import React from 'react';

import { ContactRepository } from 'apis/item';
import type { Contact } from 'typings/items';

interface UseContact {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    nextCursor: any,
    list: Array<Contact.Contact>;
    listWithPager: Array<Contact.Contact>;
    info: Contact.Contact | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

type UseContactProps = {
    params?: Contact.ContactListParams,
    paramsInfo?: Contact.ContactInfoParams,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useContact = ({
    params = {},
    paramsInfo = {},
    isFetchList = false,
    isFetchInfo = false
}: UseContactProps): UseContact => {
    const { data: detailData } =
        useQuery("contact__info", () => ContactRepository.fetchInfo(paramsInfo), {
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
        ['contact__list', params],
        async ({ pageParam }: any) =>
            ContactRepository.fetchList({
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
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        isLoading,
        list,
        listWithPager,
        info,
        totalRecord,
        totalPage,
        hasNextPage,
        nextCursor,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
    }
}

/**
 * Những Hook này cần refactor lại, không nên sử dụng
 * Tuấn Nguyễn
 */
interface UseQueryContact {
    listContact: Array<Contact.Contact>;
    loading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    refetchListContact: () => void;
    fetchNextPageContact: () => void;
}

export const useQueryContact = (params?: Contact.ContactListParams): UseQueryContact => {
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['contact', { params }],
        async ({ pageParam }: any) =>
            ContactRepository.fetchList({
                limit: params?.limit || 10,
                lastestID: pageParam || "",
                type: params?.type,
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
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPage;

    return {
        refetchListContact: refetch,
        fetchNextPageContact: fetchNextPage,
        loading: isLoading,
        hasNextPage,
        listContact: listContactDocument,
        totalRecord,
        totalPages
    }
}

interface UseQueryDetailContact {
    detailContact: Contact.Contact,
    loading: boolean,
    onFetchDetailContactAsync: (contactId: string, params?: Contact.ContactListParams) => Promise<Contact.Contact>
}

export const useQueryDetailContact = (contactID?: string, params?: Contact.ContactListParams): UseQueryDetailContact => {
    const [detailContact, setDetailContact] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false);
    
    const onFetchDetailContact = React.useCallback(async (contactId: string, _params: any): Promise<any> => {
        try {
            setLoading(true)
            const result = await ContactRepository.fetchInfo({
                contactID: contactId,
                ..._params
            });
            if (result.error) {
                throw new Error('ERROR~');
            }
            setDetailContact(result.data);
            return result.data
        } catch(err) {
            setDetailContact({});
            return {};
        } finally {
            setLoading(false)
        }
    }, []);

    React.useEffect(() => {
        if (contactID && contactID.length > 0) {
            onFetchDetailContact(contactID, params);
        }
    }, [contactID, onFetchDetailContact, params]);

    return {
        detailContact,
        loading,
        onFetchDetailContactAsync: onFetchDetailContact,
    }
}