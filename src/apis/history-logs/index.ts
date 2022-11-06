import API from "../repository";
import { convertObToUrl } from "utils";

const URL_ANALYSIS = "/api/analysis";

type payloadGetInfoAndGetList = {
  limit?: number;
  select?: string;
  lastestID?: string;
  keyword?: string;
  populates?: string;
};

const HistoryLogsRepository = {
    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL_ANALYSIS}/history_logs`, payload
        );
        return data;
    },
    
    async getInfoAndGetList(payload: payloadGetInfoAndGetList): Promise<any> {
        const { data } = await API.get<any>(
            `${URL_ANALYSIS}/history_logs?${convertObToUrl({
                select: "content userCreate createAt",
                populates:JSON.stringify({
                    "path": "userCreate",
                    "select": "fullname image",
                }),
                limit: 20,
                ...payload,
            })}`
        );
        return data;
    },
};

export default HistoryLogsRepository;