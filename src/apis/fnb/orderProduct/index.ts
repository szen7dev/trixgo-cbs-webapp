import API from "../../repository";

import { convertObToUrl } from "utils";

const URL = "/api/fnb";

const fnbOrderProductRepository = {
    async getInfoAndGetList(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/order_products?${convertObToUrl(payload)}`
        );
        return data;
    },

    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/order_products`, payload
        );
        return data;
    },
    
    async update(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/order_products`, payload
        );
        return data;
    },
    
    async remove(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/order_products`, { params: payload }
        );
        return data;
    },

    async downloadTemplateExcel(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/order_products/download-template-excel`, payload
        );
        return data;
    },
    
    async importExcel(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/order_products/import-from-excel`, payload
        );
        return data;
    },
    
    async exportExcel(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/order_products/export-excel`, { params: payload }
        );
        return data;
    },
};

export default fnbOrderProductRepository;