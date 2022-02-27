import { useInfiniteQuery, useMutation, useQuery } from "react-query";

import AccountingVoucherRepository from 'apis/accounting/voucher';
import HumanRepository from 'apis/human';

type UseAccountingVoucherProp = {
    listAccountingVoucher: Array<any>;
    isLoading: boolean;
    fetchNextPage: () => void,
    fetchPreviousPage: () => void,
    totalRecord: number | undefined,
    totalPage: number | undefined,
    hasNextPage: boolean | undefined
};

export const UseAccountingVoucherList = (pageParam = '', type: number, limit = 10): any => {

    const {
        status,
        data,
        error,
        refetch
    } = useQuery(
        ["AccountingVoucherList", { pageParam }],
        async (pageParams: any) => {
            const [, { pageParam }] = pageParams.queryKey;
            return AccountingVoucherRepository.fetchList({
                limit,
                lastestID: pageParam || "",
                type
            })
        },
        { keepPreviousData: true }
    );
    const listAccountingVoucher = data?.data?.listVoucher
    const totalRecord = data?.data?.totalRecord
    const totalPage = data?.data?.totalPage
    const nextCursor = data?.data?.nextCursor

    return {
        listAccountingVoucher,
        totalRecord,
        totalPage,
        nextCursor,
        refetch
    }
};

export const useJournalDetailList = (pageParam = '', voucherID = '', limit = 10): any => {
    const {
        status,
        data,
        error,
        refetch
    } = useQuery(
        ["JournalDetailList", { pageParam }],
        async (pageParams: any) => {
            const [, { pageParam }] = pageParams.queryKey;
            return AccountingVoucherRepository.fetchListJournalDetail({
                limit,
                lastestID: pageParam || "",
                voucherID
            })
        },
        { keepPreviousData: true }
    );
    const listJournalDetail = data?.data?.listRecords
    const totalRecord = data?.data?.totalRecord
    const totalPage = data?.data?.totalPage
    const nextCursor = data?.data?.nextCursor

    return {
        listJournalDetail,
        totalRecord,
        totalPage,
        nextCursor,
        refetch
    }
};

export const useCreateAccountingVoucherMutation = (): {
    createAccountingVoucherMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        AccountingVoucherRepository.requestCreateAccountingVoucher(payload)
    );
    return {
        createAccountingVoucherMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useHistoryTraffics = (): {
    createHistoryTraffics: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        AccountingVoucherRepository.requestHistoryTraffics(payload)
    );
    return {
        createHistoryTraffics: mutateAsync,
        loading: isLoading,
    }
}

export const useUpdateAccountingVoucherMutation = (): {
    updateAccountingVoucherMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        AccountingVoucherRepository.requestUpdateAccountingVoucher(payload)
    );
    return {
        updateAccountingVoucherMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useDeleteAccountingVoucherMutation = (): {
    deleteAccountingVoucherMutateAsync: (payload: any) => Promise<any>;
    loading: boolean;
} => {
    const { mutateAsync, isLoading } = useMutation((payload: any) =>
        AccountingVoucherRepository.requestDeleteAccountingVoucher(payload)
    );
    return {
        deleteAccountingVoucherMutateAsync: mutateAsync,
        loading: isLoading,
    }
}

export const useDetailAccountingVoucherMutation = (id: string): any => {
    const res = useQuery(`AccountingVoucher_detail.${id}`, () =>
        AccountingVoucherRepository.fetchDetailAccountingVoucher({ id })
    );
    if (Array.isArray(res.data?.data)) {
        return {
            detailAccountingVoucher: {},
            message: res.data?.data[0].message,
            loading: res.isLoading,
            refetch: res.refetch,
        }
    }
    return {
        detailAccountingVoucher: res.data?.data || {},
        message: 'Ok',
        loading: res.isLoading,
        refetch: res.refetch,
    }
}