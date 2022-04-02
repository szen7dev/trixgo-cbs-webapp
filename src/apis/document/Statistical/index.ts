import API from "../../repository";

import {
    StatisticQueryDocumentPayload,
    StatisticQueryDocumentResponse,
    ListProjectWithAmountDocumentPayload,
    ListProjectWithAmountDocumentResponse
} from 'typings/document/statistical';

const DOCUMENT_URL = "/api/document";

interface StatisticalRepository {
    fetchStatisticalByType: (params: StatisticQueryDocumentPayload) => Promise<StatisticQueryDocumentResponse>;
    fetchListProjectWithAmountDocuments: (params: ListProjectWithAmountDocumentPayload) => Promise<ListProjectWithAmountDocumentResponse>;
}

export const statisticalRepository: StatisticalRepository = {
    fetchStatisticalByType: async (params) => fetchStatisticalByType(params),
    fetchListProjectWithAmountDocuments: async (params) => fetchListProjectWithAmountDocuments(params),
}

async function fetchStatisticalByType(params: any) {
    const { data } = await API.get(`${DOCUMENT_URL}/statistical_by_type`, {
        params: {
            ...params
        }
    });
    return data;
}

async function fetchListProjectWithAmountDocuments(params?: any) {
    const { data } = await API.get(`${DOCUMENT_URL}/amount-document-by-projects`, {
        params: {
            ...params
        }
    });
    return data;
}