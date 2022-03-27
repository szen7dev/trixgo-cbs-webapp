// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import AuthenticationRepository from "apis/authentication";

type UseAdmin = {
    listAppRoles: Array<any>,
    isLoadingListAppRoles: boolean,
    refetchListAppRoles: () => void,
    nextPageListAppRoles: () => void,
    totalRecord: number,
    totalPage: number | undefined,
    hasNextPageListAppRoles: boolean | undefined,
    isFetchingListAppRoles: boolean,
    isCreateAppRole: boolean,
    createAppRolesMutateAsync: any,
    isUpdateAppRole: boolean,
    updateAppRolesMutateAsync: any,
    isManyAppRole: boolean,
    removeManyAppRoleMutateAsync: any
};

type UseAdminDetail = {
    nameAppRoleDetail: string,
    companyAppRoleDetail: string,
    typeAppRoleDetail: "1" | "2" | "3",
    isLoadingAppRolesDetail: boolean,
    refetchAppRolesDetail: () => void,
    listMembers: Array<any>,

    addMembersMutateAsync: any,
    removeMembersMutateAsync: any
};

export const useAdmin = (payload: { appID: string, keyword?: string }): UseAdmin => {
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
        isLoading: isLoadingListAppRoles,
        refetch: refetchListAppRoles,
        data: dataListAppRoles,
        fetchNextPage: nextPageListAppRoles,
        hasNextPage: hasNextPageListAppRoles,
        isFetching: isFetchingListAppRoles
    } =
        useInfiniteQuery(
            [`app_roles?appID=${payload.appID}`, payload.keyword],
            async (pageParam: any) => {
                return AuthenticationRepository.getListAppRole({
                    lastestID: pageParam?.pageParam ? pageParam?.pageParam : "",
                    select: "name app company description createAt modifyAt type",
                    populates: JSON.stringify({
                        path: "userCreate userUpdate",
                        select: "bizfullname",
                    }),
                    keyword: payload.keyword,
                    appID: payload.appID
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
    const listAppRoles = [].concat(...(dataListAppRoles?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataListAppRoles?.pages[0]?.data?.totalRecord;
    const totalPage = dataListAppRoles?.pages[0]?.data?.totalPage;

    return {
        listAppRoles,
        isLoadingListAppRoles,
        refetchListAppRoles,
        nextPageListAppRoles,
        hasNextPageListAppRoles,
        isFetchingListAppRoles,
        totalRecord,
        totalPage,

        isCreateAppRole,
        createAppRolesMutateAsync,

        isUpdateAppRole,
        updateAppRolesMutateAsync,

        isManyAppRole,
        removeManyAppRoleMutateAsync
    };
};

export const useGetListAppRoleMenuFromAdmin = (payload: {
    appID: string,
    companyID: string,
    roleID: string
}): any => {

    //  CẬP NHẬT QUYỀN TRUY CẬP MỘT CHỨC NĂNG CỦA NHÓM CHỨC NĂNG
    const { mutateAsync: updatePermissionsAppRoleMenusMutateAsync } =
        useMutation((
            payload: {
                role: string,
                menu: string,
                read: number,
                create: number,
                update: number,
                deleteIn: number
            }) =>
            AuthenticationRepository.updatePermissionsAppRoleMenus(payload)
        );

    const {
        isLoading: isLoadingGetListAppRoleMenuFromAdmin,
        refetch: refetchGetListAppRoleMenuFromAdmin,
        data: dataGetListAppRoleMenuFromAdmin,
        fetchNextPage: nextPageGetListAppRoleMenuFromAdmin,
        hasNextPage: hasNextPageGetListAppRoleMenuFromAdmin,
        isFetching: isFetchingGetListAppRoleMenuFromAdmin
    } =
        useInfiniteQuery(
            [`users?${JSON.stringify(payload)}`, payload],
            async (pageParam: any) => {
                return AuthenticationRepository.getListAppRoleMenuFromAdmin({
                    lastestID: pageParam?.pageParam ? pageParam?.pageParam : "",
                    ...payload
                })
            },
            {
                getNextPageParam: ({ data }) => {
                    return data?.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: payload.roleID ? true : false,
            }
        );
    const listAppRoleMenuFromAdmin = [].concat(...(dataGetListAppRoleMenuFromAdmin?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataGetListAppRoleMenuFromAdmin?.pages[0]?.data?.totalRecord;
    const totalPage = dataGetListAppRoleMenuFromAdmin?.pages[0]?.data?.totalPage;

    return {
        listAppRoleMenuFromAdmin,
        isLoadingGetListAppRoleMenuFromAdmin,
        refetchGetListAppRoleMenuFromAdmin,
        nextPageGetListAppRoleMenuFromAdmin,
        hasNextPageGetListAppRoleMenuFromAdmin,
        isFetchingGetListAppRoleMenuFromAdmin,
        totalRecord,
        totalPage,

        updatePermissionsAppRoleMenusMutateAsync
    };
};

export const useAdminDetail = (payload: { appID: string, keyword?: string }): UseAdminDetail => {

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
        isLoading: isLoadingAppRolesDetail,
        refetch: refetchAppRolesDetail,
        data: dataAppRolesDetail,
    } =
        useQuery(
            [`app_roles_detail?appID=${payload.appID}`, payload.keyword],
            async () => {
                return AuthenticationRepository.getListAppRole({
                    select: "members name company type",
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

    const nameAppRoleDetail = dataAppRolesDetail?.data?.name;
    const companyAppRoleDetail = dataAppRolesDetail?.data?.company;
    const typeAppRoleDetail = dataAppRolesDetail?.data?.type ? dataAppRolesDetail?.data?.type.toString() : "1";
    const listMembers = dataAppRolesDetail?.data?.members || [];

    return {
        nameAppRoleDetail,
        companyAppRoleDetail,
        typeAppRoleDetail,
        listMembers,
        isLoadingAppRolesDetail,
        refetchAppRolesDetail,

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