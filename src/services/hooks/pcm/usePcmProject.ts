// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useInfiniteQuery, useMutation } from "react-query";
import { DepartmentRepository } from 'apis/item';

export const usePcmProject = (payload: any): any => {
    const { mutateAsync: createProjectMutateAsync, isLoading: isLoadingCreateProject } =
        useMutation((payload: any) =>
            DepartmentRepository.insertDepartments(payload)
        );

    const { mutateAsync: updateProjectMutateAsync, isLoading: isLoadingUpdateProject } =
        useMutation((payload: any) =>
            DepartmentRepository.updateDepartments(payload)
        );

    // Get danh sách
    const {
        isLoading: isLoadingPcmProject,
        refetch: refetchPcmProject,
        data: dataPcmProject,
        fetchNextPage: nextPagePcmProject,
        hasNextPage: hasNextPagePcmProject,
    } = useInfiniteQuery([`app_admin_list_project`, payload.keyword], async (pageParam: any) => {
            return DepartmentRepository.fetchListDepartment({
                lastestID: pageParam?.pageParam ? pageParam?.pageParam : "",
                select: "name sign startTime expiredTime milestones completedMilestones members type budget",
                keyword: payload.keyword,
                limit: 20
            })
        },
        {
            getNextPageParam: ({ data }) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true,
        }
    );
    
    const listPcmProject = [].concat(...(dataPcmProject?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataPcmProject?.pages[0]?.data?.totalRecord;
    const totalPage = dataPcmProject?.pages[0]?.data?.totalPage;

    return {
        createProjectMutateAsync,
        isLoadingCreateProject,

        updateProjectMutateAsync,
        isLoadingUpdateProject,

        isLoadingPcmProject,
        listPcmProject,
        totalRecord,
        totalPage,
        nextPagePcmProject,
        hasNextPagePcmProject,
        refetchPcmProject
    };
};