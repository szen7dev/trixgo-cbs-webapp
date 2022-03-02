// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useMutation, useQuery, useInfiniteQuery } from "react-query";
import AuthenticationRepository from "apis/authentication";

type UsePcmAdminDetail = {
    nameAppRoleDetail: string,
    isLoadingPcmAdminDetail: boolean,
    refetchPcmAdminDetail: () => void,
    listMembers: Array<any>,
    companyAppRoleDetail: string,

    addMembersMutateAsync: any,
    removeMembersMutateAsync: any
};

export const usePcmAdminDetail = (payload: { appID: string, keyword?: string }): UsePcmAdminDetail => {
    
    // Thêm mới 1 hoặc nhiều thành viên
    const { mutateAsync: addMembersMutateAsync } =
        useMutation((
            payload: {
                appRoleID: string,
                membersAddID: Array<string>,
            }) =>
            AuthenticationRepository.updateAppRole(payload)
        );

    // Xoá 1 hoặc nhiều thành viên
    const { mutateAsync: removeMembersMutateAsync } =
        useMutation((
            payload: {
                appRoleID: string,
                membersRemoveID: Array<string>,
            }) =>
            AuthenticationRepository.updateAppRole(payload)
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

        addMembersMutateAsync,
        removeMembersMutateAsync,
    };
};

export const useGetUsersByCompany = (companyID: string, keyword: string): any => {
    const {
        isLoading: isLoadingGetUsersByCompany,
        refetch: refetchGetUsersByCompany,
        data: dataGetUsersByCompany,
        fetchNextPage: nextPageGetUsersByCompany,
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
        hasNextPageGetUsersByCompany,
        isFetchingGetUsersByCompany,
        totalRecord,
        totalPage,
    };
};