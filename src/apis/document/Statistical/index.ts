import API from "../../repository";

import {
    StatisticQueryDocumentPayload,
    StatisticQueryDocumentResponse,
} from 'typings/document/statistical';

const DOCUMENT_URL = "/api/document";

interface StatisticalRepository {
    fetchStatisticalByType: (params: StatisticQueryDocumentPayload) => Promise<StatisticQueryDocumentResponse>;
}

export const statisticalRepository: StatisticalRepository = {
    fetchStatisticalByType: async (params) => fetchStatisticalByType(params),
}

async function fetchStatisticalByType(params: any) {
    const { data } = await API.get(`${DOCUMENT_URL}/statistical_by_type`, {
        params: {
            ...params
        }
    });
    return data;
}