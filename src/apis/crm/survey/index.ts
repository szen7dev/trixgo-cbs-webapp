import API from "../../repository";

const URL = "/api/crm";

const crmMenuRepository = {
    async getInfoAndGetList(params: any): Promise<any> {
        const { data } = await API.get(
            `${URL}/survey`, {
            params: {
                ...params
            }
        })

        return data;
    },

    async insert(params: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/survey`, params
        );
        return data;
    },
    
    async update(params: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/survey`, params
        );
        return data;
    },
    
    async remove(params: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/survey`, { params: params }
        );
        return data;
    },

    async downloadTemplateExcel(params: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/survey/download-template-excel`, params
        );
        return data;
    },
    
    async importExcel(params: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/survey/import-from-excel`, params
        );
        return data;
    },
    
    async exportExcel(params: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/survey/export-excel`, { params: params }
        );
        return data;
    },
};

export default crmMenuRepository;