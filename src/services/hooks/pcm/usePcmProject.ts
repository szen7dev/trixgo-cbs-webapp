// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useInfiniteQuery, useMutation } from "react-query";
import AuthenticationRepository from "apis/authentication";

type UsePcmProject = {
    isLoadingPcmAdmin: boolean,
    refetchPcmAdmin: () => void,
    nextPagePcmAdmin: () => void,
    totalRecord: number,
    totalPage: number | undefined,
    hasNextPagePcmAdmin: boolean | undefined,
    isFetchingPcmAdmin: boolean,
    listPcmAdmin: Array<any>,
    isCreateAppRole: boolean,
    createAppRolesMutateAsync: any,
    isUpdateAppRole: boolean,
    updateAppRolesMutateAsync: any,
    isManyAppRole: boolean,
    removeManyAppRoleMutateAsync: any
};

export const usePcmProject = (payload: { appID: string, keyword?: string }): UsePcmProject => {
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
        hasNextPage: hasNextPagePcmAdmin,
        isFetching: isFetchingPcmAdmin
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
                    keyword: payload.keyword
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
    const listPcmAdmin = [].concat(...(dataPcmAdmin?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataPcmAdmin?.pages[0]?.data?.totalRecord;
    const totalPage = dataPcmAdmin?.pages[0]?.data?.totalPage;

    return {
        listPcmAdmin,
        isLoadingPcmAdmin,
        refetchPcmAdmin,
        nextPagePcmAdmin,
        hasNextPagePcmAdmin,
        isFetchingPcmAdmin,
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
                enabled: true,
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