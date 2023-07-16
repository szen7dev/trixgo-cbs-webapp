import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import PcmRepository from 'apis/pcm';

export const usePcmPlanGroup = (params: any, isFetch?: boolean, isFetchInfo?: boolean): any => {
    // Tạo group
    const { mutateAsync: createPcmPlanGroupMutateAsync } =
        useMutation((payload: any) => PcmRepository.insertPcmPlanGroup(payload)
    );

    // Sửa group
    const { mutateAsync: updatePcmPlanGroupMutateAsync } =
        useMutation((payload: any) =>PcmRepository.updatePcmPlanGroup(payload)
    );

    // Xoá group
    const { mutateAsync: removeManyPcmPlanGroupMutateAsync } =
        useMutation((payload: any) => PcmRepository.removeManyPcmPlanGroup(payload)
    );

    // Info
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

    // Tải mẫu import excel
    const { mutateAsync: downloadTemplateExcelAsync } =
        useMutation((payload: any ) =>
        PcmRepository.downloadTemplateExcel(payload)
    );

    // Import excel
    const { mutateAsync: importExcelAsync } =
        useMutation((payload: { dataImport: string }) =>
        PcmRepository.importExcel(payload)
    );

    // Export excel
    const { mutateAsync: exportExcelAsync } =
        useMutation((payload: any) =>
        PcmRepository.exportExcel(payload)
    );

    return {
        isLoading,
        refetch,
        data: listPcmPlanGroup,
        fetchNextPage,
        hasNextPage,
        totalRecord,
        totalPage,
        createPcmPlanGroupMutateAsync,
        updatePcmPlanGroupMutateAsync,
        removeManyPcmPlanGroupMutateAsync,
        infoGroup,
        refetchInfoGroup,
        downloadTemplateExcelAsync,
        importExcelAsync,
        exportExcelAsync
    };
};