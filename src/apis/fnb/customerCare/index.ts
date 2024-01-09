import API from "../../repository";

const URL = "/api/fnb";

const fnbShiftRepository = {
    async getInfoAndGetList(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/customer_cares`, { params: payload }
        );
        return data;
    },

    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/customer_cares`
        );
        return data;
    },
    
    async update(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/customer_cares`, payload
        );
        return data;
    },
    
    async remove(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/customer_cares`, { params: payload }
        );
        return data;
    },

    async exportExcel(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/customer_cares/export-excel`, {
                params: payload
            }
        ); 
        return data;
    },
};

export default fnbShiftRepository;