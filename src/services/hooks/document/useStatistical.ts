import { useQuery } from "react-query";
import { StatisticalRepository } from 'apis/document';

import type {
    StatisticQueryDocumentPayload,
    StatisticProps
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
