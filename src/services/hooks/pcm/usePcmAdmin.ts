// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useInfiniteQuery, useMutation } from "react-query";
import AuthenticationRepository from "apis/authentication";

type UsePcmAdmin = {
    isLoadingPcmAdmin: boolean,
    refetchPcmAdmin: () => void,
    nextPagePcmAdmin: () => void,
    prevPagePcmAdmin: () => void,
    totalRecord: number | undefined,
    totalPages: number | undefined,
    hasNextPagePcmAdmin: boolean | undefined,
    listPcmAdmin: Array<any>,
    isCreateAppRole: boolean,
    createAppRolesMutateAsync: any,
    isUpdateAppRole: boolean,
    updateAppRolesMutateAsync: any,
    isManyAppRole: boolean,
    removeManyAppRoleMutateAsync: any
};

export const usePcmAdmin = (payload: { appID: string }): UsePcmAdmin => {
    const currentUser = localStorage.getItem("currentUser") ?? "{}";
    const profile = JSON.parse(currentUser);
    // Tạo mới 1 app roles
    const { mutateAsync: createAppRolesMutateAsync, isLoading: isCreateAppRole } =
        useMutation((
            payload: {
                type: 1 | 2 | 3,
                appID: string,
                name: string
            }) =>
            AuthenticationRepository.createAppRole({
                ...payload,
                companyID: profile?.company?._id,
            })
        );

    // Chỉnh sửa 1 app roles
    const { mutateAsync: updateAppRolesMutateAsync, isLoading: isUpdateAppRole } =
        useMutation((
            payload: {
                appRoleID: string,
                name: string,
            }) =>
            AuthenticationRepository.updateAppRole(payload)
        );

    // Xoá 1 hoặc nhiều app roles
    const { mutateAsync: removeManyAppRoleMutateAsync, isLoading: isManyAppRole } =
        useMutation((
            payload: {
                appRoleIDs: Array<string>,
            }) =>
            AuthenticationRepository.removeManyAppRole(payload)
        );

    // Get danh sách
    const {
        isLoading: isLoadingPcmAdmin,
        refetch: refetchPcmAdmin,
        data: dataPcmAdmin,
        fetchNextPage: nextPagePcmAdmin,
        fetchPreviousPage: prevPagePcmAdmin,
        hasNextPage: hasNextPagePcmAdmin
    } =
        useInfiniteQuery(
            `app_roles?appID=${payload.appID}`,
            async ({ pageParams }: any) =>
                AuthenticationRepository.getListAppRole({
                    lastestID: pageParams ? pageParams : "",
                    select: "name app company description createAt modifyAt",
                    populates: JSON.stringify({
                        path: "userCreate userUpdate",
                        select: "bizfullname",
                    }),
                }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true,
            }
        );

    const listPcmAdmin = [].concat(...(dataPcmAdmin?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataPcmAdmin?.pages[0]?.data?.totalRecord;
    const totalPages = dataPcmAdmin?.pages[0]?.data?.totalPages;

    return {
        listPcmAdmin,
        isLoadingPcmAdmin,
        refetchPcmAdmin,
        nextPagePcmAdmin,
        prevPagePcmAdmin,
        hasNextPagePcmAdmin,
        totalRecord,
        totalPages,

        isCreateAppRole,
        createAppRolesMutateAsync,

        isUpdateAppRole,
        updateAppRolesMutateAsync,

        isManyAppRole,
        removeManyAppRoleMutateAsync
    };
};