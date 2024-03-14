import API from "../../repository";

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

    async exportOrder(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/orders/export-excel`, {
                params: payload
            }
        );
        return data;
    },

    async exportOrder2(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/orders/export-excel2`, {
                params: payload
            }
        );
        return data;
    },

    async exportOrder3(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/orders/export-excel3`, {
                params: payload
            }
        );
        return data;
    },
};

export default fnbOrderRepository;
