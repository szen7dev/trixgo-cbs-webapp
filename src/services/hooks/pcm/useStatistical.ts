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
