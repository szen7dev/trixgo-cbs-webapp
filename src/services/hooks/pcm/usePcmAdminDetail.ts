// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useMutation, useQuery } from "react-query";
import AuthenticationRepository from "apis/authentication";

type UsePcmAdminDetail = {
    nameAppRoleDetail: string,
    isLoadingPcmAdminDetail: boolean,
    refetchPcmAdminDetail: () => void,
    listMembers: Array<any>,

    isCreateAppRole: boolean,
    createAppRolesMutateAsync: any,
    isUpdateAppRole: boolean,
    updateAppRolesMutateAsync: any,
    isManyAppRole: boolean,
    removeManyAppRoleMutateAsync: any
};

export const usePcmAdminDetail = (payload: { appID: string }): UsePcmAdminDetail => {
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
        isLoading: isLoadingPcmAdminDetail,
        refetch: refetchPcmAdminDetail,
        data: dataPcmAdminDetail,
    } =
        useQuery(
            `app_roles_detail?appID=${payload.appID}`,
            async () => {
                return AuthenticationRepository.getListAppRole({
                    select: "members name",
                    populates: JSON.stringify({
                        path: "members",
                        select: "bizfullname position department image",
                        populate: {
                            path: "position department company",
                            select: "name"
                        }
                    }),
                    appRoleID: payload.appID
                })
            },
            {
                refetchOnWindowFocus: false,
                enabled: true,
            }
        );
    
    const nameAppRoleDetail = dataPcmAdminDetail?.data?.name;
    const listMembers = dataPcmAdminDetail?.data?.members || [];

    return {
        nameAppRoleDetail,
        listMembers,
        isLoadingPcmAdminDetail,
        refetchPcmAdminDetail,

        isCreateAppRole,
        createAppRolesMutateAsync,

        isUpdateAppRole,
        updateAppRolesMutateAsync,

        isManyAppRole,
        removeManyAppRoleMutateAsync
    };
};