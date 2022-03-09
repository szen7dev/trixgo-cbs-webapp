// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useInfiniteQuery, useMutation } from "react-query";
import PcmRepository from 'apis/pcm';

export const usePcmPlanGroup = (params: any, isFetch: boolean): any => {

    const { mutateAsync: createPcmPlanGroupMutateAsync, isLoading: isLoadingCreatePcmPlanGroup } =
    useMutation((payload: any) =>
        PcmRepository.insertPcmPlanGroup(payload)
    );

    const { mutateAsync: updatePcmPlanGroupMutateAsync, isLoading: isLoadingUpdatePcmPlanGroup } =
        useMutation((payload: any) =>
        PcmRepository.updatePcmPlanGroup(payload)
    );

    // Get danh sách
    const {
        isLoading,
        refetch,
        data,
        fetchNextPage,
        hasNextPage,
    } =
        useInfiniteQuery(
            [`list_pcm_plan_group`, params],
            async ({ pageParam }: any) => {
                return PcmRepository.listPcmPlanGroup({
                    lastestID: pageParam ? pageParam : "",
                    ...params
                })
            },
            {
                getNextPageParam: ({ data }) => {
                    return data?.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: isFetch ?? false,
            }
        );

    const listPcmPlanGroup = [].concat(...(data?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPage = data?.pages[0]?.data?.totalPage;
    
    return {
        isLoading,
        refetch,
        data: listPcmPlanGroup,
        fetchNextPage,
        hasNextPage,
        totalRecord,
        totalPage,
        createPcmPlanGroupMutateAsync,
        updatePcmPlanGroupMutateAsync
    };
};