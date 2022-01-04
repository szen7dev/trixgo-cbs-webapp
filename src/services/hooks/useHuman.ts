import { useInfiniteQuery, useQuery } from "react-query";
import HumanRepository from 'apis/human';

import type { 
    Human,
    ContactDocumentPayload,
    ContactDocument,
    Department,
    Position,
    DoctypePayload,
    Doctype,
    Area
} from 'typings/human';

interface UseListHuman {
    listHuman: Array<Human>;
    isLoading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    refetchListHuman: () => void;
    fetchNextPageHuman: () => void;
};
export const useFetchListHuman = (limit = 10): UseListHuman => {
    const infinityQuery = useInfiniteQuery(
        ['list_human'],
        async ({ pageParam }: any) => {
            return HumanRepository.fetchListHuman({
                limit,
                lastestID: pageParam || "",
            })
        }
            ,
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    )
    // console.log(infinityQuery);
    const {
        isLoading,
        data,
        refetch: refetchListHuman,
        fetchNextPage: fetchNextPageHuman,
        hasNextPage
    } = infinityQuery;

    const listHuman = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        isLoading,
        listHuman,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListHuman,
        fetchNextPageHuman
    }
}

interface UseDetailHuman {
    detailHuman: Human;
    message: string;
    loading: boolean;
}
export const useFetchDetailHuman = (id: string): UseDetailHuman => {
    const res = useQuery(`human_detail.${id}`, () =>
        HumanRepository.fetchDetailHuman({
            contactID: id,
        })
    );
    if (Array.isArray(res.data?.data)) {
        return {
            detailHuman: {},
            message: res.data?.data[0].message,
            loading: res.isLoading,
        }
    }
    return {
        detailHuman: res.data?.data || {},
        message: 'Ok',
        loading: res.isLoading,
    }
}

interface ListContactDocument {
    listContactDocument: Array<ContactDocument>;
    loading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    refetchListContactDocument: () => void;
    fetchNextPageContactDocument: () => void;
}

type TypeParam = Pick<ContactDocumentPayload, 'type' | 'limit'>;
export const useFetchListContactDocuments = (id: string, typeParam: TypeParam): ListContactDocument => {
    const res = useInfiniteQuery(
        [`list_human.${id}`, typeParam.limit],
        async ({ pageParam }: any) =>
            HumanRepository.fetchListContactDocument({
                limit: typeParam.limit || 10,
                lastestID: pageParam || "",
                contactID: id,
                type: typeParam.type,
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
        refetch: refetchListContactDocument,
        fetchNextPage: fetchNextPageContactDocument,
        hasNextPage
    } = res;

    const listContactDocument = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        loading: isLoading,
        listContactDocument,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListContactDocument,
        fetchNextPageContactDocument
    }
}

export const useFetchListDepartments = ({limit}: {
    limit: number
}): {
    loading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    listDepartments: Array<Department>;
    refetchListDepartments: () => void;
    fetchNextPageDepartments: () => void;
} => {
    const res = useInfiniteQuery(
        [`list_department`, limit],
        async ({ pageParam }: any) =>
            // mai request BE check lại api này
            HumanRepository.fetchListDepartment({
                limit: limit || 10,
                lastestID: pageParam || "",
                type: 1,
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
        refetch: refetchListDepartments,
        fetchNextPage: fetchNextPageDepartments,
        hasNextPage
    } = res;
    
    const listDepartments = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;
    
    return {
        loading: isLoading,
        listDepartments,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListDepartments,
        fetchNextPageDepartments
    }
}

export const useFetchListPosition = ({limit}: {
    limit: number
}): {
    loading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    listPositions: Array<Position>;
    refetchListPositions: () => void;
    fetchNextPagePositions: () => void;
} => {
    const res = useInfiniteQuery(
        [`list_position`, limit],
        async ({ pageParam }: any) =>
            // mai request BE check lại api này
            HumanRepository.fetchListPosition({
                limit: limit || 10,
                lastestID: pageParam || "",
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
        refetch: refetchListPositions,
        fetchNextPage: fetchNextPagePositions,
        hasNextPage
    } = res;
    
    const listPositions = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;
    
    return {
        loading: isLoading,
        listPositions,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListPositions,
        fetchNextPagePositions
    }
}

export const useFetchListDoctype = ({
    limit,
    type
}: Pick<DoctypePayload, 'type'> & {
    limit: number
}): {
    loading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    listDoctypes: Array<Doctype>;
    refetchListDoctypes: () => void;
    fetchNextPageDoctypes: () => void;
} => {
    const res = useInfiniteQuery(
        [`list_Doctype.${type}`, limit],
        async ({ pageParam }: any) =>
            HumanRepository.fetchListDoctype({
                limit: limit || 10,
                lastestID: pageParam || "",
                type
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
        refetch: refetchListDoctypes,
        fetchNextPage: fetchNextPageDoctypes,
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
        refetchListDoctypes,
        fetchNextPageDoctypes
    }
}

export const useFetchListArea = ({
    limit,
}: {
    limit: number
}): {
    loading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    listAreas: Array<Area>;
    refetchListAreas: () => void;
    fetchNextPageAreas: () => void;
} => {
    const res = useInfiniteQuery(
        [`list_Area`, limit],
        async ({ pageParam }: any) =>
            HumanRepository.fetchListAreas({
                limit: limit || 10,
                lastestID: pageParam || "",
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
        refetch: refetchListAreas,
        fetchNextPage: fetchNextPageAreas,
        hasNextPage
    } = res;
    
    const listAreas = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;
    
    return {
        loading: isLoading,
        listAreas,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListAreas,
        fetchNextPageAreas
    }
}