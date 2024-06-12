import API from "../../repository";

import { convertObToUrl } from "utils";

const URL = "/api/fnb";

const fnbBatchRepository = {
    async getInfoAndGetList(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/batches?${convertObToUrl(payload)}`
        );
        return data;
    },

    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/batches`, payload
        );
        return data;
    },
    
    async update(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/batches`, payload
        );
        return data;
    },
    
    async remove(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/batches`, { params: payload }
        );
        return data;
    },

    async downloadTemplateExcel(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/batches/download-template-excel`, payload
        );
        return data;
    },
    
    async importExcel(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/batches/import-from-excel`, payload
        );
        return data;
    },
    
    async exportExcel(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/batches/export-excel`, { params: payload }
        );
        return data;
    },
};

export default fnbBatchRepository;