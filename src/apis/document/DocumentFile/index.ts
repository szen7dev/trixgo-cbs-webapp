import API from "../../repository";

import type {
    DocumentFileQueryPayload,
    DocumentFileQueryResponse
} from 'typings/document/document-file';

const DOCUMENT_URL = "/api/document";
interface DocumentFileRepository {
    fetchList: (params: DocumentFileQueryPayload) => Promise<DocumentFileQueryResponse>
    insertDocumentFile: (params: any) => Promise<any>
    deleteDocumentFile: (params: any) => Promise<any>
}

export const documentFileRepository: DocumentFileRepository = {
    fetchList: (params) => fetchListDocumentFile(params),
    insertDocumentFile: (params) => insertDocumentFile(params),
    deleteDocumentFile: (params) => deleteDocumentFile(params),
}

async function fetchListDocumentFile(params: any) {
    const { data } = await API.get(`${DOCUMENT_URL}/document_files`, {
        params: {
            select: 'name document file createAt',
            populates: {
                "path": "file",
                "select": "app name nameOrg size path description",
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

async function insertDocumentFile(params: any) {
    const { data } = await API.post(`${DOCUMENT_URL}/add-file-attachment`, params)
    return data;
}

async function deleteDocumentFile(params: any) {
    const { data } = await API.delete(`${DOCUMENT_URL}/document_files`, {
        params
    })
    return data;
}