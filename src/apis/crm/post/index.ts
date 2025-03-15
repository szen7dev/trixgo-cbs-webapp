import API from "../../repository";

const URL = "/api/medias";

const crmPostRepository = {
  async getInfoAndGetList(params: any): Promise<any> {
    const { data } = await API.get(`${URL}`, {
      params: {
        ...params,
      },
    });

    return data;
  },

  async insert(params: any): Promise<any> {
    const { data } = await API.post<any>(`${URL}`, params);
    return data;
  },

  async update(params: any): Promise<any> {
    const { data } = await API.put<any>(`${URL}`, params);
    return data;
  },

  async remove(params: any): Promise<any> {
    const { data } = await API.delete<any>(`${URL}`, { params: params });
    return data;
  },

  async getTags(params: any): Promise<any> {
    const { data } = await API.get(`${URL}` + "/tag", {
      params: {
        ...params,
      },
    });

    return data?.data;
  },

  async insertTag(params: any): Promise<any> {
    const { data } = await API.post<any>(`${URL}` + "/tag", params);
    return data || [];
  },

  async getMenus(params: any): Promise<any> {
    const { data } = await API.get(`${URL}` + "/menu?select=name slug order", {
      params: {
        ...params,
      },
    });

    return data || [];
  },

  async downloadTemplateExcel(params: any): Promise<any> {
    const { data } = await API.get<any>(
      `${URL}/download-template-excel`,
      params
    );
    return data;
  },

  async importExcel(params: any): Promise<any> {
    const { data } = await API.post<any>(`${URL}/import-from-excel`, params);
    return data;
  },

  async exportExcel(params: any): Promise<any> {
    const { data } = await API.get<any>(`${URL}/export-excel`, {
      params: params,
    });
    return data;
  },
};

export default crmPostRepository;
