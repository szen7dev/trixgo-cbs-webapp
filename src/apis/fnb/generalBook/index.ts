import API from "../../repository";

import { convertObToUrl } from "utils";

const URL = "/api/fnb";

const fnbGeneralBookRepository = {
    async getInfoAndGetList(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            // `${URL}/general_books?${convertObToUrl(payload)}`
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
};

export default fnbGeneralBookRepository;