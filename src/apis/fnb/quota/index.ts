import API from "../../repository";

import { convertObToUrl } from "utils";

const URL = "/api/fnb";

const fnbQuotaRepository = {
    async getInfoAndGetList(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/quotas?${convertObToUrl(payload)}`
        );
        return data;
    },

    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/quotas`, payload
        );
        return data;
    },
    
    async update(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/quotas`, payload
        );
        return data;
    },
    
    async remove(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/quotas`, { params: payload }
        );
        return data;
    },
};

export default fnbQuotaRepository;