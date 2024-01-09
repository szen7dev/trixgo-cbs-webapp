/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import fnbRepository from 'apis/fnb/customerCare';

export const useFnbCustomerCare = ({
    params = {},
    isFetchList = false,
    isFetchInfo = false
}: any): any => {

    const { mutateAsync: insertAsync } =
        useMutation((payload: any) =>
            fnbRepository.insert(payload)
        );

    const { mutateAsync: updateAsync } =
        useMutation((payload: any) =>
            fnbRepository.update(payload)
        );

    const { mutateAsync: deleteManyAsync } =
        useMutation((payload: any) =>
            fnbRepository.remove(payload)
        );

    const { data: detailData, isLoading: isLoadingInfo, refetch: refetchInfo } =
        useQuery("fnb_customer_care_info", () => fnbRepository.getInfoAndGetList(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = detailData?.data;

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['fnb-customer_care-list', params],
        async ({ pageParam }: any) =>
            fnbRepository.getInfoAndGetList({
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

    // Export excel
    const { mutateAsync: exportExcelAsync } =
        useMutation((payload: any) =>
        fnbRepository.exportExcel(payload)
    );

    return {
        isLoading,
        isLoadingInfo,
        list,
        listWithPager,
        info,
        totalRecord,
        totalPage,
        hasNextPage,
        refetch,
        refetchInfo,
        fetchNextPage,
        insertAsync,
        updateAsync,
        deleteManyAsync,
        exportExcelAsync
    }
}