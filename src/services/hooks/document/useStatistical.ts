import { useQuery } from "react-query";
import { StatisticalRepository } from 'apis/document';
import { useInfiniteQuery } from "react-query";

import type {
    StatisticQueryDocumentPayload,
    StatisticProps,
    ListProjectWithAmountDocumentPayload
} from 'typings/document/statistical';

interface UseQueryStatistical {
    data: StatisticProps[];
    isLoading: boolean;
}
export const useQueryStatistical = (params: StatisticQueryDocumentPayload): UseQueryStatistical => {
    const res = useQuery(
        ['statistical_document', {params}],
        async () => {
            return StatisticalRepository.fetchStatisticalByType(params);
        }
    );

    const { data, isLoading } = res;
    return {
        data: data?.data.listRecords || [],
        isLoading,
    }
}

// DANH SÁCH DỰ ÁN VÀ SỐ LƯỢNG VĂN BẢN
interface UseQueryListProjectAndAmountDocument {
    listProject: [];
    listAmountDocument: [];
    isLoading: boolean;
}
export const useQueryListProjectAndAmountDocument = (params: ListProjectWithAmountDocumentPayload): UseQueryListProjectAndAmountDocument => {
    const res = useQuery(
        ['project_and_amount_document', {params}],
        async () => {
            return StatisticalRepository.fetchListProjectWithAmountDocuments(params);
        }
    );

    const { data, isLoading } = res;
    return {
        listProject: data?.data.listProject,
        listAmountDocument: data?.data.listAmountDocument,
        isLoading,
    }
}
