import API from "../repository";
import { convertObToUrl } from "utils";

const URL_ANALYSIS = "/api/analysis";

// typing
type payloadGetInfoAndGetList = {
  limit?: number;
  select?: string;
  lastestID?: string;
  keyword?: string;
  populates?: string;
};

const HistoryTrafficRepository = {
    async insert(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${URL_ANALYSIS}/history_traffics`, payload
        );
        return data;
    },

    async getInfoAndGetList(payload: payloadGetInfoAndGetList): Promise<any> {
        const { data } = await API.get<any>(
            `${URL_ANALYSIS}/history_traffics?${convertObToUrl({
                select: "app menu userCreate createAt",
                limit: 20,
                ...payload,
            })}`
        );
        return data;
    },
};

export default HistoryTrafficRepository;