import { useInfiniteQuery, useQuery, useMutation } from "react-query";
import HumanRepository from 'apis/human';
import type {
    Human,
    ContactDocumentPayload,
    ContactDocument,
    Department,
    DoctypePayload,
    Doctype,
    Area,
    CreateContactResponse,
    MutationContactPayload,

    CreateContactDocumentPayload,
    UpdateContactDocumentPayload,
    UpdateFileContactDocumentPayload,
    RemoveFileContactDocumentPayload,
    MutationContactDocument,
    Contract,
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
    refetch: () => any;
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
            refetch: res.refetch,
        }
    }
    return {
        detailHuman: res.data?.data || {},
        message: 'Ok',
        loading: res.isLoading,
        refetch: res.refetch,
    }
}

export const useFetchListDepartments = ({
    limit,
    keyword = '',
}: {
    limit: number;
    keyword?: string;
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
        [`list_department.${keyword}`, limit],
        async ({ pageParam }: any) =>
            // mai request BE check lại api này
            HumanRepository.fetchListDepartment({
                limit: limit || 10,
                lastestID: pageParam || "",
                type: 1,
                keyword
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

interface UseQueryListDoctype {
    loading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    listDoctypes: Array<Doctype>;
    refetchListDoctype: () => void;
    fetchNextPageDoctype: () => void;
}
type ParamQueryPayload = Pick<DoctypePayload, 'type'> & {
    limit: number;
}
export const useQueryListDoctype = ({ limit, type }: ParamQueryPayload): UseQueryListDoctype => {
    const res = useInfiniteQuery(
        [`list_doctype,${type}`, limit],
        async ({ pageParam }: any) =>
            // mai request BE check lại api này
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

// export const useFetchListDoctype = ({
//     limit,
//     type,
// }: Pick<DoctypePayload, 'type'> & {
//     limit: number;
// }): {
//     loading: boolean;
//     totalRecord: number | undefined;
//     totalPages: number | undefined;
//     hasNextPage: boolean | undefined;
//     listDoctypes: Array<Doctype>;
//     refetchListDoctypes: () => void;
//     fetchNextPageDoctypes: () => void;
// } => {
//     const res = useInfiniteQuery(
//         [`list_Doctype.${type}`, limit],
//         async ({ pageParam }: any) =>
//             HumanRepository.fetchListDoctype({
//                 limit: limit || 10,
//                 lastestID: pageParam || "",
//                 type
//             }),
//         {
//             getNextPageParam: ({ data }: any) => {
//                 return data?.nextCursor || undefined;
//             },
//             refetchOnWindowFocus: false,
//             enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
//         }
//     );
//     const {
//         isLoading,
//         data,
//         refetch: refetchListDoctypes,
//         fetchNextPage: fetchNextPageDoctypes,
//         hasNextPage
//     } = res;

//     const listDoctypes = []
//         .concat(
//             ...(data?.pages || []).map((d: any) => d.data?.listRecords)
//         )
//         .filter(Boolean);
//     const totalRecord = data?.pages[0]?.data?.totalRecord;
//     const totalPages = data?.pages[0]?.data?.totalPages;

//     return {
//         loading: isLoading,
//         listDoctypes,
//         totalRecord,
//         totalPages,
//         hasNextPage,
//         refetchListDoctypes,
//         fetchNextPageDoctypes
//     }
// }

export const useFetchListArea = ({
    limit,
    keyword = '',
}: {
    limit: number;
    keyword: string;
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
        [`list_Area.${keyword}`, limit],
        async ({ pageParam }: any) =>
            HumanRepository.fetchListAreas({
                limit: limit || 10,
                lastestID: pageParam || "",
                keyword
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

export const useCreateContactMutation = (): {
    createContactMutateAsync: (payload: MutationContactPayload) => Promise<CreateContactResponse>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: MutationContactPayload) =>
        HumanRepository.requestCreateContact(payload)
    );
    return {
        createContactMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useUpdateContactMutation = (): {
    updateContactMutateAsync: (payload: MutationContactPayload) => Promise<CreateContactResponse>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: MutationContactPayload) =>
        HumanRepository.requestUpdateContact(payload)
    );
    return {
        updateContactMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

interface UseMutationContactDocument {
    createContactDocumentAsync: (payload: CreateContactDocumentPayload) => Promise<MutationContactDocument>;
    updateContractDocumentAsync: (payload: UpdateContactDocumentPayload) => Promise<MutationContactDocument>;
    deleteContractDocumentAsync: (contactDocumentID: string) => Promise<MutationContactDocument>;
    updateFileContractDocumentAsync: (
        payload: UpdateFileContactDocumentPayload & {
            onUploadProgress?: (progressEvent: any) => void
        },
    ) => Promise<any>;
    removeFileContractDocument: (payload: RemoveFileContactDocumentPayload) => Promise<any>;
}
type TypeParam = Pick<ContactDocumentPayload, 'type' | 'limit'>;
export const useMutationContactDocument = ():UseMutationContactDocument  => {
    const { mutateAsync: createContactDocumentAsync } = useMutation((payload: CreateContactDocumentPayload) =>
        HumanRepository.requestCreateContactDocument(payload));

    const { mutateAsync: updateContractDocumentAsync } = useMutation((payload: UpdateContactDocumentPayload) =>
        HumanRepository.requestUpdateContactDocument(payload));

    const { mutateAsync: deleteContractDocumentAsync } = useMutation((contactDocumentID: string) =>
        HumanRepository.requestDeleteContactDocument(contactDocumentID))

    const { mutateAsync: updateFileContractDocumentAsync } = useMutation(
        (payload: UpdateFileContactDocumentPayload & {
            onUploadProgress?: (progressEvent: any) => void
        }) => {
            const { onUploadProgress, ...other } = payload;
            return  HumanRepository.requestUpdateFileContractDocument(other, {
                onUploadProgress,
            })
        });

    const { mutateAsync: removeFileContractDocument } = useMutation((payload: RemoveFileContactDocumentPayload) =>
        HumanRepository.requestRemoveFileContractDocument(payload));

    return {
        createContactDocumentAsync,
        updateContractDocumentAsync,
        deleteContractDocumentAsync,
        updateFileContractDocumentAsync,
        removeFileContractDocument,
    }
}
interface UseQueryContactDocument {
    listContactDocument: Array<ContactDocument>;
    listContactDocumentLoading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    refetchListContactDocument: () => void;
    fetchNextPageContactDocument: () => void;
}
export const useQueryContactDocument = (humanId: string, typeParam: TypeParam): UseQueryContactDocument => {
    const {
        isLoading,
        data,
        refetch: refetchListContactDocument,
        fetchNextPage: fetchNextPageContactDocument,
        hasNextPage
    } = useInfiniteQuery(
        [`list_human.${humanId}.${typeParam.type}`, typeParam.limit],
        async ({ pageParam }: any) =>
            HumanRepository.fetchListContactDocument({
                limit: typeParam.limit || 10,
                lastestID: pageParam || "",
                contactID: humanId,
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

    const listContactDocument = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        refetchListContactDocument,
        fetchNextPageContactDocument,
        listContactDocumentLoading: isLoading,
        hasNextPage,
        listContactDocument,
        totalRecord,
        totalPages
    }
}

interface UseQueryItemContract {
    fetchNextPageContract: () => void;
    refetchListContracts: () => void;
    listContracts: Contract[];
    totalRecord: number;
    totalPages: number;
    loading: boolean;
    hasNextPage?: boolean;
}

export const useQueryItemContract = (companyID: string, typeParam?: {
    limit?: number;
}): UseQueryItemContract => {
    const {
        isLoading,
        data,
        refetch: refetchListContracts,
        fetchNextPage: fetchNextPageContract,
        hasNextPage
    } = useInfiniteQuery(
        [`list_contract`, typeParam?.limit],
        async ({ pageParam }: any) =>
            HumanRepository.fetchListContracts({
                limit: typeParam?.limit || 10,
                lastestID: pageParam || "",
                companyID,
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