import { useQuery } from "react-query";
import PcmRepository from 'apis/pcm';

import type {
    ListProjectWithListAmountTaskPayload
} from 'typings/pcm.d';

// DANH SÁCH DỰ ÁN VÀ SỐ LƯỢNG VĂN BẢN
interface UseQueryListProjectWithListAmountTask {
    listProject: [];
    listAmountTask: [];
    listAmountTaskOverdueWork: [];
    listAmountTaskNextWeekWork: [];
    listAmountTaskMoreThan7Days: [];
    listAmountTaskFinish: [];
    isLoading: boolean;
}

interface useQueryListCompanyOfAssigneeAndAmountTaskResponse {
    listCompany: [];
    listCompanyAndTaskOverdueWork: [];
    listCompanyAndTaskNextWeekWork: [];
    listCompanyAndTaskMoreThan7Days: [];
    listCompanyAndTaskFinish: [],
    isLoading: boolean;
}

interface useQueryAmountTaskMilestoneResponse {
    taskOverdueWork: [];
    taskNextWeekWork: [];
    taskMoreThan7Days: [];
    taskAll: [],
    taskFinish: [],
    isLoading: boolean;
}

interface listCompanyOfAssigneeAndAmountTaskPayload {
    projectID: string;
    isPassPermision?: number
}

export const useQueryListProjectWithListAmountTask = (params: ListProjectWithListAmountTaskPayload): UseQueryListProjectWithListAmountTask => {
    const res = useQuery(
        ['pcm_task_and_amount', {params}],
        async () => {
            return PcmRepository.fetchListPCMWithAmountProjects(params);
        }
    );
    
    const { data, isLoading } = res;
    return {
        listProject: data?.data.listProject,
        listAmountTask: data?.data.listAmountTask,
        listAmountTaskOverdueWork: data?.data.listAmountTaskOverdueWork,
        listAmountTaskNextWeekWork: data?.data.listAmountTaskNextWeekWork,
        listAmountTaskMoreThan7Days: data?.data.listAmountTaskMoreThan7Days,
        listAmountTaskFinish: data?.data.listAmountTaskFinish,
        isLoading,
    }
}

/**
 * Name: Thống kê số lượng công ty(CompanyOfAssignee) trong dự án
 * Author: Depv
 */
export const useQueryListCompanyOfAssigneeAndAmountTask = (params: listCompanyOfAssigneeAndAmountTaskPayload): useQueryListCompanyOfAssigneeAndAmountTaskResponse => {
    const res = useQuery(
        ['list_company_of_assignee_and_amount_task', {params}],
        async () => {
            return PcmRepository.fetchListCompanyOfAssigneeAndAmountTask(params);
        }
    );
    
    const { data, isLoading } = res;
    return {
        listCompany: data?.data.listCompany,
        listCompanyAndTaskOverdueWork: data?.data.listCompanyAndTaskOverdueWork,
        listCompanyAndTaskNextWeekWork: data?.data.listCompanyAndTaskNextWeekWork,
        listCompanyAndTaskMoreThan7Days: data?.data.listCompanyAndTaskMoreThan7Days,
        listCompanyAndTaskFinish: data?.data.listCompanyAndTaskFinish,
        isLoading,
    }
}

/**
 * Name: Thống kê số task theo milestone trong dự án
 * Author: Depv
 */
export const useQueryAmountTaskMilestone = (params: listCompanyOfAssigneeAndAmountTaskPayload): useQueryAmountTaskMilestoneResponse => {
    const res = useQuery(
        ['list_amount_task_milestone', {params}],
        async () => {
            return PcmRepository.fetchAmountTaskMilestone(params);
        }
    );
    
    const { data, isLoading } = res;
    return {
        taskOverdueWork: data?.data.taskOverdueWork,
        taskNextWeekWork: data?.data.taskNextWeekWork,
        taskMoreThan7Days: data?.data.taskMoreThan7Days,
        taskAll: data?.data.taskAll,
        taskFinish: data?.data.taskFinish,
        isLoading,
    }
}