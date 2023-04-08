import API from "../../repository";

import { convertObToUrl } from "utils";

const URL = "/api/fnb";

const fnbGeneralBookRepository = {
    async getInfoAndGetList(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/general_books`, { params: payload }
        );
        return data;
    },

    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/general_books`, payload
        );
        return data;
    },
    
    async update(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/general_books`, payload
        );
        return data;
    },
    
    async remove(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/general_books`, { params: payload }
        );
        return data;
    },

    async downloadTemplateExcel(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/general_books/download-template-excel`, payload
        );
        return data;
    },
    
    async importExcel(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/general_books/import-from-excel`, payload
        );
        return data;
    },
    
    async exportExcel(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/general_books/export-excel`, { params: payload }
        );
        return data;
    },
};

export default fnbGeneralBookRepository;