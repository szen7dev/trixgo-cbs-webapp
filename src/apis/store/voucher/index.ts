import API from "../../repository";

import { convertObToUrl } from "utils";

const URL = "/api/store";

const storeVoucherRepository = {
    async getInfoAndGetList(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/vouchers?${convertObToUrl(payload)}`
        );
        return data;
    },

    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/vouchers`, payload
        );
        return data;
    },
    
    async update(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/vouchers`, payload
        );
        return data;
    },
    
    async remove(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/vouchers`, { params: payload }
        );
        return data;
    },

    async downloadTemplateExcel(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/vouchers/download-template-excel`, payload
        );
        return data;
    },
    
    async importExcel(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/vouchers/import-from-excel`, payload
        );
        return data;
    },
    
    async exportExcel(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/vouchers/export-excel`, { params: payload }
        );
        return data;
    },
};

export default storeVoucherRepository;