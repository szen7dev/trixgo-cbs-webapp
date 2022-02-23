import API from "../repository";

// Convert Object sang URL query => khi client truyền lên
import { convertObToUrl } from "utils";

// Khai báo chính xác kiểu trả về nếu biết
import { ListTasksPayload, ListTasksResponse, listTotalAnalysisResponse } from "typings/pcm";

// Đường dẫn Endpoint
const pcmURL = "/api/subject_pcm";

const PcmRepository = {
    // Data 1
    async listTasks(payload: ListTasksPayload): Promise<ListTasksResponse> {
        const { data } = await API.get<ListTasksResponse>(
            `${pcmURL}/pcm_plan_tasks?${convertObToUrl(payload)}`
        );
        return data;
    },

    // Data 2
    async listTotalAnalysis(): Promise<listTotalAnalysisResponse> {
        const { data } = await API.get<listTotalAnalysisResponse>(
            `${pcmURL}/pcm_plan_tasks/badge`
        );
        return data;
    },
};

// console.log('==============>>>>>')
// console.log(PcmRepository)

export default PcmRepository;