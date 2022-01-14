import API from "../repository";

import {
    ListDeviceResponse,
    ListDevicePayload,
    ListTypeDeviceAccessPayload,
    ListTypeDeviceAccessResponse,
    ListAppAccessPayload,
    ListAppAccessResponse,
    ListAppDeviceAccessPayload,
    ListAppDeviceAccessResponse,
    ListCompanyAccessPayload,
    ListCompanyAccessResponse
} from "typings/support";

const spURL = "/api/analysis/history_traffics";

const SupportRepository = {

    //2. THỐNG KÊ THEO THIẾT BỊ THEO NĂM
    async listDeviceAccess(params: ListDevicePayload): Promise<ListDeviceResponse> {
        const { data } = await API.get<ListDeviceResponse>(`${spURL}/statistics_device_access_by_year`, {params: params});
        return data;
    },

    //3. THỐNG KÊ THEO LOẠI THIẾT BỊ(TỪ NGÀY ĐẾN NGÀY)
    async listTypeDeviceAccess(params: ListTypeDeviceAccessPayload): Promise<ListTypeDeviceAccessResponse> {
        const { data } = await API.get<ListTypeDeviceAccessResponse>(`${spURL}/statistics_by_device_access`, {params: params});
        return data;
    },

    //4. THỐNG KÊ TRUY CẬP THEO APP
    async listAppAccess(params: ListAppAccessPayload): Promise<ListAppAccessResponse> {
        const { data } = await API.get<ListAppAccessResponse>(`${spURL}/statistics_access_by_app`, {params: params});
        return data;
    },

    //5. THỐNG KÊ TRUY CẬP THEO APP VÀ THIẾT BỊ
    async listAppDeviceAccess(params: ListAppDeviceAccessPayload): Promise<ListAppDeviceAccessResponse> {
        const { data } = await API.get<ListAppDeviceAccessResponse>(`${spURL}/statistics_access_by_app_and_device`, {params: params});
        return data;
    },
    //6. THỐNG KÊ TRUY CẬP THEO CÔNG TY
    async listCompanyAccess(params: ListCompanyAccessPayload): Promise<ListCompanyAccessResponse> {
        const { data } = await API.get<ListCompanyAccessResponse>(`${spURL}/statistics_access_by_company`, {params: params});
        return data;
    },
};

export default SupportRepository;