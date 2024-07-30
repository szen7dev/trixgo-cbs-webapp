import API from "../../repository";

import type {
    DocumentInserPayload,
    DocumentInserResponse,
    DocumentUpdatePayload,
    DocumentUpdateResponse,
    DocumentQueryResponse,
    DocumentExportResponse
} from 'typings/document/document';

const DOCUMENT_URL = "/api/document";

interface DocumentRepository {
    insert: (data: DocumentInserPayload) => Promise<DocumentInserResponse>;
    update: (data: DocumentUpdatePayload) => Promise<DocumentUpdateResponse>;
    fetchList: (data: any) => Promise<DocumentQueryResponse>;
    fetchFilterList: (data: any) => Promise<DocumentQueryResponse>;
    downloadTemplateImportExcelDocument: (data: any) => Promise<DocumentExportResponse>;
    importDocumentFromExcel: (data: any) => Promise<DocumentExportResponse>;
    exportDocument: (data: any) => Promise<DocumentExportResponse>;
}

export const documentRepository: DocumentRepository = {
    insert: data => inserDocument(data),
    update: data => updateDocument(data),
    fetchList: params => fetchListDocument(params),
    fetchFilterList: params => fetchFilterListDocument(params),
    downloadTemplateImportExcelDocument: params => downloadTemplateImportExcelDocument(params), 
    importDocumentFromExcel: params => importDocumentFromExcel(params), 
    exportDocument: params => exportDocument(params), 
}

async function fetchListDocument(params : any) {
    const { data } = await API.get(`${DOCUMENT_URL}/list-document`, {
        params: {
            select: 'name sign author project date createAt description note store amount status storeSign publish datahubContact files',
            populates: {
                "path": "author sender storage publish datahubContact files",
                "select": "fullname sign image name nameOrg path"
            },
            ...params,
        }
    })
    return data;
}

async function fetchFilterListDocument(params : any) {
    const { data } = await API.get(`${DOCUMENT_URL}/filter-document`, {
        params: {
            select: 'name sign author project date createAt description note store amount status storeSign publish datahubContact files',
            populates: {
                "path": "author sender storage publish datahubContact files",
                "select": "fullname sign image name nameOrg path"
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

async function downloadTemplateImportExcelDocument(data: any) {
    const { data: result } = await API.post(`${DOCUMENT_URL}/download-template-excel`, data);
    return result;
}
    
// Import Document từ dữ liệu file excel
async function importDocumentFromExcel(data: any) {
    const { data: result } = await API.post(`${DOCUMENT_URL}/import-from-excel`, data);
    return result;
}

async function exportDocument(data: any) {
    const { data: result } = await API.post(`${DOCUMENT_URL}/export-document`, data);
    return result;
}