import API from "../repository";

import { convertObToUrl } from "utils";

import {
    AddConditionTaskReportPayload,
    FilesPcmGroupByContractResponse,
    FilesPcmGroupByDateResponse,
    ListFilesPcmGroupByContract,
    ListFilesPcmGroupByDate,
    ListFilesPcmPayload,
    ListReportsPayload,
    ListTasksPayload,
    ListTasksResponse,
    listTotalAnalysisResponse,
    SendMailTaskPayload,
    UpdateTaskReportPayload,
    PcmCommentListParams,
    PcmCommentListResponse,
    PcmExportReportPayload,
} from "typings/pcm";

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

    async updateTaskReport(payload: UpdateTaskReportPayload): Promise<any> {
        const { data } = await API.put<any>(
            `${pcmURL}/pcm_plan_reports`, payload
        );
        return data;
    },

    async deleteTaskReport(payload: Array<string>): Promise<any> {
        const { data } = await API.delete<any>(
            `${pcmURL}/pcm_plan_reports`, {
                params: {
                    reportsID: payload
                }
            }
        );
        return data;
    },

    async getInfoReports(id: string): Promise<any> {
        const { data } = await API.get<any>(
            `${pcmURL}/pcm_plan_reports?${convertObToUrl({
                select: "name company description conditionPin members author type createAt",
                populates: JSON.stringify({
                    path: "company author members",
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
                select: "name company description members conditionPin author type createAt",
                populates: JSON.stringify({
                    path: "company author",
                    select: "_id name sign bizfullname image"
                }),
                ...payload
            })}`
        );
        return data;
    },

    async exportReport(payload: PcmExportReportPayload): Promise<any> {
        const { data } = await API.get<any>(
            `${pcmURL}/pcm_plan_reports/export-task-report?${convertObToUrl(payload)}`
        );
        return data;
    },

    async downloadExcelTask(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${pcmURL}/pcm_plan_tasks/download-excel?${convertObToUrl(payload)}`
        );
        return data;
    },

    // Api tải mẫu để import công việc
    async downloadTemplateImportExcelTask(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${pcmURL}/pcm_plan_tasks/download-template-import-excel?${convertObToUrl(payload)}`
        );
        return data;
    },
    
    // Import task từ dữ liệu file excel
    async importTaskFromExcel(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${pcmURL}/pcm_plan_tasks/import-task-from-excel`, payload
        );
        return data;
    },

    async listFilesPcm(payload: ListFilesPcmPayload): Promise<any> {
        const { data } = await API.get<any>(
            `${pcmURL}/pcm_files?${convertObToUrl({
                populates: JSON.stringify({
                    path: "project task author",
                    select: "_id name sign bizfullname"
                }),
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

    async listPcmPlanGroup(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${pcmURL}/pcm_plan_groups?${convertObToUrl({
                // select: "name sign members userUpdate amountTasks contract",
                limit: 20,
                ...payload,
            })}`
        );
        return data;
    },

    async insertPcmPlanGroup(payload: any): Promise<any> {
        const { data } = await API.post<any>(
            `${pcmURL}/pcm_plan_groups`, payload
        );
        return data;
    },

    async updatePcmPlanGroup(payload: any): Promise<any> {
        const { data } = await API.put<any>(
            `${pcmURL}/pcm_plan_groups`, payload
        );
        return data;
    },

    async removeManyPcmPlanGroup(payload: any): Promise<any> {
        const { data } = await API.delete<any>(
            `${pcmURL}/pcm_plan_groups/remove-many`, { params: payload }
        );
        return data;
    },

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
    },

    async fetchListCompanyOfAuthorAndAmountTask(params?: any) {
        const { data } = await API.get(`${pcmURL}/pcm_plan_tasks/amount-task-of-company_of_author`, {
            params: {
                ...params
            }
        });
        return data;
    },

    async fetchAmountTaskMilestone(params?: any) {
        const { data } = await API.get(`${pcmURL}/pcm_plan_tasks/amount-task-by-milestone`, {
            params: {
                ...params
            }
        });
        return data;
    },

    /**
     * PCM COMMENT
     */
    async fetchListPcmComments(params: PcmCommentListParams): Promise<PcmCommentListResponse> {
        const { data } = await API.get(
          `${pcmURL}/pcm_comments?${convertObToUrl(params)}`
        );
        return data;
    },
};

export default PcmRepository;