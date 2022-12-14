import API from "../repository";

import type {
    ListDocumentQueryPayload,
    ListDocumentQueryResponse,
    DocumentInfoQueryPayload,
    DocumentInfoQueryResponse
} from 'typings/ppt';

const DOCUMENT_URL = '/api/document';

interface DocumentRepository {
    fetchListDocument: (params: ListDocumentQueryPayload) => Promise<ListDocumentQueryResponse>;
    fetchDocumentInfo: (params: DocumentInfoQueryPayload) => Promise<DocumentInfoQueryResponse>;
}
    
export const documentRepository: DocumentRepository = {
    fetchListDocument: async (params) => fetchListDocument(params),
    fetchDocumentInfo: async (params) => fetchDocumentInfo(params),
}

async function fetchDocumentInfo(params: DocumentInfoQueryPayload): Promise<DocumentInfoQueryResponse> {
    const { data } = await API.get(
        `${DOCUMENT_URL}/info-document`, {
            params: {
                populates: {
                    "path": "company contract userUpdate files property package project sender receiver author storage field publish parent",
                    "select": "_id path name sign type fullname members company"
                },
                select: 'company userUpdate name sign type description project package approver requestResponse date storage createAt updatedAt receivedDate expiredResponse modifyAt value amount amountDelivery direction storeSign style status receiver property field note parent completeStatus contract publish deadline',
                ...params,
            }
        }
    );
    return data;
}

async function fetchListDocument(params: ListDocumentQueryPayload): Promise<ListDocumentQueryResponse> {
    const { data } = await API.get(
        `${DOCUMENT_URL}/list-document`, {
        params: {
            populates: {
                "path": "author project sender storage userCreate publish",
                "select": "fullname bizfullname sign image phone name"
            },
            // select: 'name sign author project sender date storeSign amount status note storage userCreate createAt',
            ...params,
        }
    }
    )
    return data;
}