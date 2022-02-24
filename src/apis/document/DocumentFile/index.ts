import API from "../../repository";

import type {
    DocumentFileQueryPayload,
    DocumentFileQueryResponse
} from 'typings/document/document-file';

const DOCUMENT_URL = "/api/document";

interface DocumentFileRepository {
    fetchList: (params: DocumentFileQueryPayload) => Promise<DocumentFileQueryResponse>
}

export const documentFileRepository: DocumentFileRepository = {
    fetchList: async (params) => fetchListDocumentFile(params),
}

async function fetchListDocumentFile(params: any) {
    const { data } = await API.get(`${DOCUMENT_URL}/document_files`, {
        params: {
            select: 'name document file createAt',
            populates: {
                "path": "file",
                "select": "app name nameOrg url size",
                "populate": {
                    "path": "author",
                    "select": "fullname image bizfullname"
                }
            },
            ...params,
        }
    })
    return data;
}
