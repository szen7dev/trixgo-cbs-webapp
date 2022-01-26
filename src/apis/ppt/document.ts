import API from "../repository";

import type {
    ListDocumentQueryPayload,
    ListDocumentQueryResponse,
} from 'typings/ppt';

const DOCUMENT_URL = '/api/document';

async function fetchListDocument(params: ListDocumentQueryPayload): Promise<ListDocumentQueryResponse> {
    const { data } = await API.get(
        `${DOCUMENT_URL}/list-document`, {
        params: {
            populates: {
                "path": "author project sender storage userCreate",
                "select": "fullname sign image phone name"
            },
            // select: 'name sign author project sender date storeSign amount status note storage userCreate createAt',
            ...params,
        }
    }
    )
    return data;
}

interface DocumentRepository {
    fetchListDocument: (params: ListDocumentQueryPayload) => Promise<ListDocumentQueryResponse>;
}

export const documentRepository: DocumentRepository = {
    fetchListDocument: async (params) => {
        return fetchListDocument(params)
    },
}
