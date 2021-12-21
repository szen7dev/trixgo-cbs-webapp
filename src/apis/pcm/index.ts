import API from "../repository";

import { ListTasksPayload, ListTasksResponse, listTotalAnalysisResponse } from "typings/pcm";
import { convertObToUrl } from "helpers";

const pcmURL = "/api/subject_pcm";

const PcmRepository = {
    async listTasks(payload: ListTasksPayload): Promise<ListTasksResponse> {
        const { data } = await API.get<ListTasksResponse>(
            `${pcmURL}/pcm_plan_tasks?${convertObToUrl(payload)}`
        );
        return data;
    },
    async listTotalAnalysis(): Promise<listTotalAnalysisResponse> {
        const { data } = await API.get<listTotalAnalysisResponse>(
            `${pcmURL}/pcm_plan_tasks/badge`
        );
        return data;
    },
};

export default PcmRepository;
