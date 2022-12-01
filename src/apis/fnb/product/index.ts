import API from "../../repository";

import { convertObToUrl } from "utils";

const URL = "/api/fnb";

const fnbProductRepository = {
    async getInfoAndGetList(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/products?${convertObToUrl(payload)}`
        );
        return data;
    },

    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/products`, payload
        );
        return data;
    },
    
    async update(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/products`, payload
        );
        return data;
    },
    
    async remove(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/products`, { params: payload }
        );
        return data;
    },
};

export default fnbProductRepository;