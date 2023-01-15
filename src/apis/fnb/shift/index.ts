import API from "../../repository";

import { convertObToUrl } from "utils";

const URL = "/api/fnb";

const fnbShiftRepository = {
    async getInfoAndGetList(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/shifts?${convertObToUrl(payload)}`
        );
        return data;
    },

    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/shifts`, payload
        );
        return data;
    },
    
    async update(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/shifts`, payload
        );
        return data;
    },
    
    async remove(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/shifts`, { params: payload }
        );
        return data;
    },

    async downloadTemplateExcel(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/shifts/download-template-excel`, payload
        );
        return data;
    },
    
    async importExcel(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/shifts/import-from-excel`, payload
        );
        return data;
    },
    
    async exportExcel(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/shifts/export-excel`, { params: payload }
        );
        return data;
    },
};

export default fnbShiftRepository;