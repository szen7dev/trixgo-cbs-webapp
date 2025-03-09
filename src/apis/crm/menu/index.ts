import API from "../../repository";

const URL = "/api/medias";

const crmMenuRepository = {
    async getInfoAndGetList(params: any): Promise<any> {
        const { data } = await API.get(
            `${URL}/menu`, {
            params: {
                ...params
            }
        })

        return data;
    },

    async insert(params: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/menu`, params
        );
        return data;
    },
    
    async update(params: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/menu`, params
        );
        return data;
    },
    
    async remove(params: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/menu`, { params: params }
        );
        return data;
    },

    async downloadTemplateExcel(params: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/menu/download-template-excel`, params
        );
        return data;
    },
    
    async importExcel(params: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/menu/import-from-excel`, params
        );
        return data;
    },
    
    async exportExcel(params: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/menu/export-excel`, { params: params }
        );
        return data;
    },
};

export default crmMenuRepository;