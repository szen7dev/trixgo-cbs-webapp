import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import PcmRepository from 'apis/pcm';

export const usePcmPlanGroup = (params: any, isFetch?: boolean, isFetchInfo?: boolean): any => {
    // Tạo group
    const { mutateAsync: createPcmPlanGroupMutateAsync, isLoading: isLoadingCreatePcmPlanGroup } =
        useMutation((payload: any) => PcmRepository.insertPcmPlanGroup(payload)
    );

    // Sửa group
    const { mutateAsync: updatePcmPlanGroupMutateAsync, isLoading: isLoadingUpdatePcmPlanGroup } =
        useMutation((payload: any) =>PcmRepository.updatePcmPlanGroup(payload)
    );

    // Xoá group
    const { mutateAsync: removeManyPcmPlanGroupMutateAsync, isLoading: isManyAppRole } =
        useMutation((payload: any) => PcmRepository.removeManyPcmPlanGroup(payload)
    );

    // info group
    const {
        data: infoGroup,
        refetch: refetchInfoGroup
    } = useQuery(`pcm_group_info.${params}`, () => PcmRepository.infoPcmPlanGroup(params), {
        enabled: isFetchInfo ?? false,
        refetchOnWindowFocus: false,
    });
    
    // Danh sách group
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
        // get List
        isLoading,
        refetch,
        data: listPcmPlanGroup,
        fetchNextPage,
        hasNextPage,
        totalRecord,
        totalPage,
        // create update remove
        createPcmPlanGroupMutateAsync,
        updatePcmPlanGroupMutateAsync,
        removeManyPcmPlanGroupMutateAsync,
        // get Info
        infoGroup,
        refetchInfoGroup
    };
};