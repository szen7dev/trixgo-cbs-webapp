import API from "../../repository";

const URL = "/api/medias";

const crmMenuRepository = {
    async getInfoAndGetList(params: any): Promise<any> {
        const { data } = await API.get(
            `${URL}/tag`, {
            params: {
                ...params
            }
        })

        return data;
    },

    async insert(params: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/tag`, params
        );
        return data;
    },
    
    async update(params: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/tag`, params
        );
        return data;
    },
    
    async remove(params: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/tag`, { params: params }
        );
        return data;
    },

    async downloadTemplateExcel(params: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/tag/download-template-excel`, params
        );
        return data;
    },
    
    async importExcel(params: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/tag/import-from-excel`, params
        );
        return data;
    },
    
    async exportExcel(params: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/tag/export-excel`, { params: params }
        );
        return data;
    },
};

export default crmMenuRepository;