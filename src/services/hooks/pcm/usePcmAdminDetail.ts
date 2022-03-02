// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useMutation, useQuery, useInfiniteQuery } from "react-query";
import AuthenticationRepository from "apis/authentication";

type UsePcmAdminDetail = {
    nameAppRoleDetail: string,
    isLoadingPcmAdminDetail: boolean,
    refetchPcmAdminDetail: () => void,
    listMembers: Array<any>,
    companyAppRoleDetail: string,

    isCreateAppRole: boolean,
    createAppRolesMutateAsync: any,
    isUpdateAppRole: boolean,
    updateAppRolesMutateAsync: any,
    isManyAppRole: boolean,
    removeManyAppRoleMutateAsync: any
};

export const usePcmAdminDetail = (payload: { appID: string, keyword?: string }): UsePcmAdminDetail => {
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
           [`app_roles_detail?appID=${payload.appID}`, payload.keyword],
            async () => {
                return AuthenticationRepository.getListAppRole({
                    select: "members name company",
                    populates: JSON.stringify({
                        path: "members",
                        select: "bizfullname position department image",
                        populate: {
                            path: "position department company",
                            select: "name"
                        }
                    }),
                    appRoleID: payload.appID,
                    keyword: payload.keyword
                })
            },
            {
                refetchOnWindowFocus: false,
                enabled: true,
            }
        );

    const nameAppRoleDetail = dataPcmAdminDetail?.data?.name;
    const companyAppRoleDetail = dataPcmAdminDetail?.data?.company;
    const listMembers = dataPcmAdminDetail?.data?.members || [];

    return {
        nameAppRoleDetail,
        companyAppRoleDetail,
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

export const useGetUsersByCompany = (companyID: string, keyword: string): any => {
    const {
        isLoading: isLoadingGetUsersByCompany,
        refetch: refetchGetUsersByCompany,
        data: dataGetUsersByCompany,
        fetchNextPage: nextPageGetUsersByCompany,
        fetchPreviousPage: prevPageGetUsersByCompany,
        hasNextPage: hasNextPageGetUsersByCompany,
        isFetching: isFetchingGetUsersByCompany
    } =
        useInfiniteQuery(
            [`users?companyID=${companyID}`, keyword],
            async (pageParam: any) => {
                return AuthenticationRepository.getListUsersByCompany({
                    lastestID: pageParam?.pageParam ? pageParam?.pageParam : "",
                    select: "bizfullname image",
                    companyID: companyID,
                    keyword: keyword
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
    const listMembers = [].concat(...(dataGetUsersByCompany?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataGetUsersByCompany?.pages[0]?.data?.totalRecord;
    const totalPage = dataGetUsersByCompany?.pages[0]?.data?.totalPage;

    return {
        listMembers,
        isLoadingGetUsersByCompany,
        refetchGetUsersByCompany,
        nextPageGetUsersByCompany,
        prevPageGetUsersByCompany,
        hasNextPageGetUsersByCompany,
        isFetchingGetUsersByCompany,
        totalRecord,
        totalPage,
    };
};