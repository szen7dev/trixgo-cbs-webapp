import { useEffect } from "react";
import AuthenticationRepository from "apis/authentication";
import { useInfiniteQuery, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { UseGetListAppOfUser, UseCheckPermission, UseCheckPermissionOneMenu, UseGetListAppMenu, UseGetListAppRoleMenu } from "typings/auth";

// 1. Lấy danh sách ứng dụng của 1 user được truy cập
export const useGetListAppOfUser = (): UseGetListAppOfUser => {
    const {
        isLoading: isLoadingAppUsers,
        refetch: refetchAppUsers,
        data: dataReturnFromAPIAppUsers,
        fetchNextPage: nextPageAppUsers
    } =
        useInfiniteQuery(
            "app_users/list-app-of-user",
            async ({ pageParams }: any) =>
                AuthenticationRepository.getListAppOfUser({
                    lastestID: pageParams ? pageParams : "",
                }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: false
            }
        );
    const listAppOfUser = [].concat(...(dataReturnFromAPIAppUsers?.pages || []).map((d: any) => d.data?.listRecords));

    return {
        isLoadingAppUsers,
        refetchAppUsers,
        nextPageAppUsers,
        listAppOfUser
    }
};

// 2. Check quyền truy cập vào 1 app tổng
export const useCheckPerAccessApp = (payload: { appID: string }): UseCheckPermission => {
    const { isSuccess, data } =
        useQuery(`check-permissions-access-app?appID=${payload.appID}`, () => AuthenticationRepository.checkPermissionsAccessApp(payload.appID), {
            refetchOnWindowFocus: false
        });

    let hasPermission = true;
    if (isSuccess && data?.data?.keyError == 'permission_denied') {
        hasPermission = false;
    }
    // console.log("check-permissions-access-app", data);
    return {
        hasPermission,
        isSuccess,
        dataUserAccess: data?.data
    };
};

// 3. Lấy danh sách MENU của hệ thống
export const useGetListAppMenu = (payload: { appID: string, parentID?: string }): UseGetListAppMenu => {
    const {
        isLoading: isLoadingGetListAppMenu,
        refetch: refetchGetListAppMenu,
        data: dataReturnFromAPIGetListAppMenu,
        fetchNextPage: nextPageGetListAppMenu
    } =
        useInfiniteQuery(
            `app_menus?appID=${payload.appID}$parentID=${payload.parentID}`,
            async ({ pageParams }: any) =>
                AuthenticationRepository.getListAppMenu({
                    appID: payload.appID,
                    parentID: payload.parentID ? payload.parentID : "",
                    select: "name slug order level",
                    lastestID: pageParams ? pageParams : "",
                }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false
            }
        );
    const listAppMenu = [].concat(...(dataReturnFromAPIGetListAppMenu?.pages || []).map((d: any) => d.data?.listRecords));

    return {
        isLoadingGetListAppMenu,
        refetchGetListAppMenu,
        listAppMenu,
        nextPageGetListAppMenu
    }
};

// 4. Lấy danh sách MENU được quyền truy cập của 1 user
export const useGetListAppRoleMenu = (payload: { appID: string, type: "1" | "2" | "3", companyID?: string }, enabled: true | false = true): UseGetListAppRoleMenu => {
    const currentUser = localStorage.getItem("currentUser") ?? "{}";
    const profile = JSON.parse(currentUser);
    const {
        isLoading: isLoadingGetListAppRoleMenu,
        refetch: refetchGetListAppRoleMenu,
        data: dataReturnFromAPIGetListAppRoleMenu,
        fetchNextPage: nextPageGetListAppRoleMenu
    } =
        useInfiniteQuery(
            `app_role_menus/permission?appID=${payload.appID}&type=${payload.type}&companyID=${payload.companyID}`,
            async ({ pageParams }: any) =>
                AuthenticationRepository.getListAppRoleMenu({
                    appID: payload.appID,
                    companyID: payload.companyID || profile?.company?._id,
                    type: payload.type
                }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: enabled
            }
        );
    const listAppRoleMenu = [].concat(...(dataReturnFromAPIGetListAppRoleMenu?.pages || []).map((d: any) => d.data));

    return {
        isLoadingGetListAppRoleMenu,
        refetchGetListAppRoleMenu,
        listAppRoleMenu,
        nextPageGetListAppRoleMenu
    }
};

// 5. Check quyền truy cập vào một menu trong app
export const useCheckPerAccessOneMenu = (payload: { appID: string, menuID: string, type: "1" | "2" | "3", companyID?: string }): UseCheckPermissionOneMenu => {
    const currentUser = localStorage.getItem("currentUser") ?? "{}";
    const profile = JSON.parse(currentUser);
    const { isSuccess, data } =
        useQuery(`permission-to-access-one-menu-of-app?appID=${payload.appID}&menuID=${payload.menuID}&companyID=${payload.companyID || profile?.company?._id}`,
            () => AuthenticationRepository.checkPermissionsAccessOneMenu({
                appID: payload.appID,
                menuID: payload.menuID,
                companyID: payload.companyID || profile?.company?._id,
                type: payload.type
            }), {
            refetchOnWindowFocus: false,
            cacheTime: 0
        });

    let hasPermission = true;
    if (isSuccess && data?.data?.keyError == 'permission_denied') {
        hasPermission = false;
    }

    return {
        hasPermission,
        isSuccess,
        permission: data?.data || {
            create: 0,
            update: 0,
            delete: 0,
            read: 0
        }
    };
};

// 6. hook check quyền truy cập chi tiết màn hình cụ thể của 1 user, được triệu gọi trong view
export const useCheckPerAccessScreen = (payload: { appID: string, menuID: string, type: "1" | "2" | "3", companyID?: string }) => {
    const history = useHistory();
    const { hasPermission, isSuccess: isSuccessApp, dataUserAccess } = useCheckPerAccessApp({ appID: payload.appID });
    const { hasPermission: hasPermissionMenu, isSuccess: isSuccessMenu, permission } = useCheckPerAccessOneMenu(payload);

    // Phân quyền theo nhóm chức năng
    useEffect(() => {
        // if (isSuccessApp && isSuccessMenu && (!hasPermission || !hasPermissionMenu || permission?.read < 1)) {
        //     toast.error("Bạn không có quyền truy cập tính năng này!");
        //     history.push("/");
        // };
        if (isSuccessApp && isSuccessMenu && (!hasPermission)) {
            toast.error("Bạn không có quyền truy cập tính năng này Neww!");
            history.push("/");
        };
    }, [isSuccessApp, isSuccessMenu, hasPermission, hasPermissionMenu, permission]);

    return {
        createPermission: (permission?.create && permission.create > 0) ? true : false,
        updatePermission: (permission?.update && permission.update > 0) ? true : false,
        deletePermission: (permission?.delete && permission.delete > 0) ? true : false,
    };
};