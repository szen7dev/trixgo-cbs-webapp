/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { CustomerRepository } from 'apis/item';
import type { Customer } from 'typings/items';

/*=====3.INTERFACE DEFINE=====*/
interface useCustomer {
    isLoading: boolean;
    totalRecord: number;
    hasNextPage: boolean | undefined;
    list: Array<Customer.Customer>;
    info: Customer.Customer | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    insertAsync: (params: any) => Promise<any>;
    updateAsync: (params: any) => Promise<any>;
    deleteAsync: (ids: Array<string>) => Promise<any>;
}

// Khai báo params cho hook
type UseCustomerProps = {
    params?: Customer.CustomerQueryPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useCustomer = ({
    params = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseCustomerProps): useCustomer => {
    // Create
    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            CustomerRepository.addCustomer(payload)
        );

    // Update
    const { mutateAsync: updateAsync } =
        useMutation((payload: any) =>
            CustomerRepository.updateCustomer(payload)
        );

    // Delete
    const { mutateAsync: deleteAsync } =
        useMutation((ids: Array<string>) =>
            CustomerRepository.deleteCustomer(ids)
        );

    // Get info
    const { data: infoCustomer } =
        useQuery("customer_info", () => CustomerRepository.fetchDetailCustomer(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });
    
    const info = infoCustomer?.data;

    // Get List
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['Customers', params],
        async ({ pageParam }: any) =>
            CustomerRepository.fetchListCustomer({
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

    // Return data
    return {
        isLoading,
        list,
        info,
        totalRecord,
        hasNextPage,
        refetch,
        fetchNextPage,
        insertAsync,
        updateAsync,
        deleteAsync,
    }
}
