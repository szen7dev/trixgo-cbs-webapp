import API from "../../repository";

import { convertObToUrl } from "utils";

const URL = "/api/fnb";

const fnbOrderRepository = {
    async getInfoAndGetList(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/orders`, {
                params: payload
            }
        ); 
        return data;
    },

    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/orders`, payload
        );
        return data;
    },
    
    async update(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/orders`, payload
        );
        return data;
    },
    
    async remove(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/orders`, { params: payload }
        );
        return data;
    },
};

export default fnbOrderRepository;