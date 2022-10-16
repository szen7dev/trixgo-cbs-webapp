import API from "../../repository";

import type {
    DocumentChildInserPayload,
    DocumentChildInserResponse,
    DocumentChildUpdatePayload,
    DocumentChildUpdateResponse,
    DocumentChildQueryPayload,
    DocumentChildQueryResponse
} from 'typings/document/document-child';

const DOCUMENT_URL = "/api/document";

interface DocumentChildRepository {
    insert: (data: DocumentChildInserPayload) => Promise<DocumentChildInserResponse>;
    update: (data: DocumentChildUpdatePayload) => Promise<DocumentChildUpdateResponse>;
    fetchList: (data: DocumentChildQueryPayload) => Promise<DocumentChildQueryResponse>;
}

export const documentChildRepository: DocumentChildRepository = {
    insert: async (data) => inserDocumentChild(data),
    update: async (data) => updateDocumentChild(data),
    fetchList: async (params) => fetchListDocumentChild(params),
}

async function fetchListDocumentChild(params : any) {
    const { data } = await API.get(`${DOCUMENT_URL}/list-document`, {
        params: {
            select: 'name sign author project parent',
            populates: {
                "path": "author sender storage publish",
                "select": "fullname bizfullname sign image name"
            },
            ...params,
        }
    })
    return data;
}

async function inserDocumentChild(data: any) {
    const { data: result } = await API.post(`${DOCUMENT_URL}/insert-document`, data);
    return result;
}

async function updateDocumentChild(data: any) {
    const { data: result } = await API.put(`${DOCUMENT_URL}/update-document`, data);
    return result;
}