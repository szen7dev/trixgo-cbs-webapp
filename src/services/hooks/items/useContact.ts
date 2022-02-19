import React from 'react';
import { useInfiniteQuery } from "react-query";

import { ContactRepository } from 'apis/item';
import type { Contact } from 'typings/items';

interface UseQueryContact {
    listContact: Array<Contact.Contact>;
    loading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    refetchListContact: () => void;
    fetchNextPageContact: () => void;
}
export const useQueryContact = (params?: Contact.ContactQueryPayload): UseQueryContact => {
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['contact', { params }],
        async ({ pageParam }: any) =>
            ContactRepository.fetchListContact({
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
    const totalPages = data?.pages[0]?.data?.totalPages;

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
    onFetchDetailContactAsync: (contactId: string, params?: Contact.ContactQueryPayload) => Promise<Contact.Contact>
}
export const useQueryDetailContact = (contactID?: string, params?: Contact.ContactQueryPayload): UseQueryDetailContact => {
    const [detailContact, setDetailContact] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false);
    
    const onFetchDetailContact = React.useCallback(async (contactId: string, _params: any): Promise<any> => {
        try {
            setLoading(true)
            const result = await ContactRepository.fetchDetailContact(contactId, _params);
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