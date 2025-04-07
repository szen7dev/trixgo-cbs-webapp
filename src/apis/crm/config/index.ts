import API from "../../repository";

const URL = "/api/item";

const crmConfigRepository = {
    async getInfoAndGetList(params: any): Promise<any> {
        const { data } = await API.get(
            `${URL}/configs`, {
            params: {
                ...params
            }
        })

        return data;
    },

    async insert(params: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/configs`, params
        );
        return data;
    },
    
    async update(params: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/configs`, params
        );
        return data;
    },
    
    async remove(params: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/configs`, { params: params }
        );
        return data;
    },

    async downloadTemplateExcel(params: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/configs/download-template-excel`, params
        );
        return data;
    },
    
    async importExcel(params: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/configs/import-from-excel`, params
        );
        return data;
    },
    
    async exportExcel(params: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/configs/export-excel`, { params: params }
        );
        return data;
    },
};

export default crmConfigRepository;