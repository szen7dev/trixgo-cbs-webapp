import API from "../../repository";

import type {
    DocumentInserPayload,
    DocumentInserResponse,
    DocumentUpdatePayload,
    DocumentUpdateResponse,
    DocumentQueryPayload,
    DocumentQueryResponse
} from 'typings/document/document';

const DOCUMENT_URL = "/api/document";

interface DocumentRepository {
    insert: (data: DocumentInserPayload) => Promise<DocumentInserResponse>;
    update: (data: DocumentUpdatePayload) => Promise<DocumentUpdateResponse>;
    fetchList: (data: any) => Promise<DocumentQueryResponse>;
}

export const documentRepository: DocumentRepository = {
    insert: async (data) => inserDocument(data),
    update: async (data) => updateDocument(data),
    fetchList: async (params) => fetchListDocument(params),
}

async function fetchListDocument(params : any) {
    const { data } = await API.get(`${DOCUMENT_URL}/list-document`, {
        params: {
            select: 'name sign author project sign date createAt',
            populates: {
                "path": "author sender storage",
                "select": "fullname bizfullname sign image name"
            },
            ...params,
        }
    })
    return data;
}

async function inserDocument(data: any) {
    const { data: result } = await API.post(`${DOCUMENT_URL}/insert-document`, data);
    return result;
}

async function updateDocument(data: any) {
    const { data: result } = await API.put(`${DOCUMENT_URL}/update-document`, data);
    return result;
}