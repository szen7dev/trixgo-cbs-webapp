import API from "../../repository";

import type {
    DocumentChildInserPayload,
    DocumentChildInserResponse,
    DocumentChildUpdatePayload,
    DocumentChildUpdateResponse,
} from 'typings/document/document-child';

const DOCUMENT_URL = "/api/document";

interface DocumentChildRepository {
    insert: (data: DocumentChildInserPayload) => Promise<DocumentChildInserResponse>;
    update: (data: DocumentChildUpdatePayload) => Promise<DocumentChildUpdateResponse>;
}

export const documentChildRepository: DocumentChildRepository = {
    insert: async (data) => inserDocumentChild(data),
    update: async (data) => updateDocumentChild(data),
}

async function inserDocumentChild(data: any) {
    const { data: result } = await API.post(`${DOCUMENT_URL}/insert-document`, data);
    return result;
}

async function updateDocumentChild(data: any) {
    const { data: result } = await API.put(`${DOCUMENT_URL}/update-document`, data);
    return result;
}