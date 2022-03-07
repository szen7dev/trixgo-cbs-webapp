import API from "../repository";

import { 
    ListHistoryResponse, ListHistoryPayload
} from "typings/historyTraffics";
import { convertObToUrl } from "utils";
const historyTrafficsURL = "/api/analysis/history_traffics";
const AnalysisRepository = {
    /**
     * MEDIA
     * @param payload
     * @returns 
     */
    async listHistoryTrafficsOfMe(payload: ListHistoryPayload): Promise<ListHistoryResponse> {
        const { data } = await API.get<ListHistoryPayload>(
            `${historyTrafficsURL}`,
            {
                params: {
                    filter: { "type": 1,"app": 1, "menu": 1, "companyOfAuthor": 1, "createdAt": 1, "userCreate": 1 },
                    populates: {"path": "companyOfAuthor userCreate app menu", "select": "name sign fullname bizfullname image"},
                    ...payload,
                },
            }
        );
        return data;
    },
};

export default AnalysisRepository;