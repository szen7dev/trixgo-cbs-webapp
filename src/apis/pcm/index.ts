import API from "../repository";

import { convertObToUrl } from "utils";

import { AddConditionTaskReportPayload, FilesPcmGroupByContractResponse, FilesPcmGroupByDateResponse, ListFilesPcmGroupByContract, ListFilesPcmGroupByDate, ListFilesPcmPayload, ListReportsPayload, ListTasksPayload, ListTasksResponse, listTotalAnalysisResponse, SendMailTaskPayload, UpdateConditionTaskReportPayload } from "typings/pcm";

const pcmURL = "/api/subject_pcm";

const PcmRepository = {
    async sendMailDetailTask(payload: SendMailTaskPayload): Promise<any> {
        const { data } = await API.post<any>(
            `${pcmURL}/pcm_plan_tasks/send-email-to-member-in-task`, payload
        );
        return data;
    },

    async addConditionTaskReport(payload: AddConditionTaskReportPayload): Promise<any> {
        const { data } = await API.post<any>(
            `${pcmURL}/pcm_plan_reports`, payload
        );
        return data;
    },

    async updateConditionTaskReport(payload: UpdateConditionTaskReportPayload): Promise<any> {
        const { data } = await API.put<any>(
            `${pcmURL}/pcm_plan_reports`, payload
        );
        return data;
    },

    async getInfoReports(id: string): Promise<any> {
        const { data } = await API.get<any>(
            `${pcmURL}/pcm_plan_reports?${convertObToUrl({
                select: "name company description conditionPin author type createAt",
                populates: JSON.stringify({
                    path: "company author",
                    select: "_id name sign bizfullname image"
                }),
                subjectID: id
            })}`
        );
        return data;
    },

    async listReports(payload: ListReportsPayload): Promise<any> {
        const { data } = await API.get<any>(
            `${pcmURL}/pcm_plan_reports?${convertObToUrl({
                select: "name company description conditionPin author type createAt",
                populates: JSON.stringify({
                    path: "company author",
                    select: "_id name sign bizfullname image"
                }),
                ...payload
            })}`
        );
        return data;
    },

    async listFilesPcm(payload: ListFilesPcmPayload): Promise<any> {
        const { data } = await API.get<any>(
            `${pcmURL}/pcm_files?${convertObToUrl({
                // populates: JSON.stringify({
                //     path: "project contract",
                //     select: "_id name sign"
                // }),
                ...payload
            })}`
        );
        return data;
    },

    async listFilesPcmGroupByDate(payload: ListFilesPcmGroupByDate): Promise<FilesPcmGroupByDateResponse> {
        const { data } = await API.get<FilesPcmGroupByDateResponse>(
            `${pcmURL}/pcm_files/group-by-date?${convertObToUrl(payload)}`
        );
        return data;
    },

    async listFilesPcmGroupByContract(payload: ListFilesPcmGroupByContract): Promise<FilesPcmGroupByContractResponse> {
        const { data } = await API.get<FilesPcmGroupByContractResponse>(
            `${pcmURL}/pcm_files/group-by-contract?${convertObToUrl(payload)}`
        );
        return data;
    },
    
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
    
    // remove many pcm_plan_group
    async removeManyPcmPlanGroup(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${pcmURL}/pcm_plan_groups/remove-many`, { params: payload }
        );
        return data;
    },

    // info pcm_group
    async infoPcmPlanGroup(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${pcmURL}/pcm_plan_groups?${convertObToUrl({
                select: "name sign members admins userUpdate project",
                populates: JSON.stringify({
                    path: "members",
                    select: "_id bizfullname email level image"
                }),
                ...payload,
            })}`
        );
        return data;
    },

    async fetchListPCMWithAmountProjects(params?: any) {
        const { data } = await API.get(`${pcmURL}/pcm_plan_tasks/amount-task-of-projects`, {
            params: {
                ...params
            }
        });
        return data;
    },

    async fetchListCompanyOfAssigneeAndAmountTask(params?: any) {
        const { data } = await API.get(`${pcmURL}/pcm_plan_tasks/amount-task-of-company_of_assignee`, {
            params: {
                ...params
            }
        });
        return data;
    }
};

// console.log('==============>>>>>')
// console.log(PcmRepository)

export default PcmRepository;