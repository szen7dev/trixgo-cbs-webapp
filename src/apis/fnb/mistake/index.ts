import API from "../../repository";

import { convertObToUrl } from "utils";

const URL = "/api/fnb";

const fnbShiftRepository = {
    async getInfoAndGetList(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/mistakes`, { params: payload }
        );
        return data;
    },

    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/mistakes`
        );
        return data;
    },
    
    async update(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/mistakes`, payload
        );
        return data;
    },
    
    async remove(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/mistakes`, { params: payload }
        );
        return data;
    },

    async exportMistake(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/orders/export-excel`, {
                params: payload
            }
        ); 
        return data;
    },
};

export default fnbShiftRepository;