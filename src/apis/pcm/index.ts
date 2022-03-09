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

    // Danh sách pcm_plan_group
    async listPcmPlanGroup(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${pcmURL}/pcm_plan_groups?${convertObToUrl({
                select: "name sign members userUpdate",
                limit: 20,
                ...payload,
            })}`
        );
        return data;
    },

    // insert pcm_plan_group
    async insertPcmPlanGroup(payload: any): Promise<any> {
        console.log({ payload });
        const { data } = await API.post<any>(
            `${pcmURL}/pcm_plan_groups`, payload
        );
        return data;
    },

    // update pcm_plan_group
    async updatePcmPlanGroup(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${pcmURL}/pcm_plan_groups`, payload
        );
        return data;
    },

    // info pcm_group
    async infoPcmPlanGroup(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${pcmURL}/pcm_plan_groups?${convertObToUrl({
                select: "name sign members userUpdate project",
                populates: JSON.stringify({
                    path: "members",
                    select: "_id bizfullname email level image"
                }),
                ...payload,
            })}`
        );
        return data;
    },
};

// console.log('==============>>>>>')
// console.log(PcmRepository)

export default PcmRepository;