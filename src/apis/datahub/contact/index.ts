import API from "../../repository";

import { convertObToUrl } from "utils";

const URL = "/api/datahub";
// typing
type payloadGetInfoAndGetList = {
  limit?: number;
  select?: string;
  lastestID?: string;
  keyword?: string;
  populates?: string;
  parentID?: string;
};

// Api danh bạ hệ thống
const DatahubContractRepository = {
    async getInfoAndGetList(payload: payloadGetInfoAndGetList): Promise<any> {
        const { data } = await API.get<any>(
            `${URL}/datahub_contacts?${convertObToUrl({
                select: "name createAt",
                limit: 20,
                ...payload,
            })}`
        );
        return data;
    },

    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL}/datahub_contacts`, payload
        );
        return data;
    },
    
    async update(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${URL}/datahub_contacts`, payload
        );
        return data;
    },
    
    async remove(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${URL}/datahub_contacts`, { params: payload }
        );
        return data;
    },
};

export default DatahubContractRepository;