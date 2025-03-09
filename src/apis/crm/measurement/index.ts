import API from "../../repository";

const URL = "/api/crm";

const crmMenuRepository = {
    async getInfoAndGetList(params: any): Promise<any> {
        const { data } = await API.get(
            `${URL}/grow_track`, {
            params: {
                ...params
            }
        })

        return data;
    },

    async insert(params: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/grow_track`, params
        );
        return data;
    },
    
    async update(params: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/grow_track`, params
        );
        return data;
    },
    
    async remove(params: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/grow_track`, { params: params }
        );
        return data;
    },

    async downloadTemplateExcel(params: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/grow_track/download-template-excel`, params
        );
        return data;
    },
    
    async importExcel(params: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/grow_track/import-from-excel`, params
        );
        return data;
    },
    
    async exportExcel(params: any): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/grow_track/export-excel`, { params: params }
        );
        return data;
    },
};

export default crmMenuRepository;