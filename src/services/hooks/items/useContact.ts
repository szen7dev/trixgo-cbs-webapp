import { useInfiniteQuery } from "react-query";

import { PackageRepository } from 'apis/item';
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
            PackageRepository.fetchListContact({
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