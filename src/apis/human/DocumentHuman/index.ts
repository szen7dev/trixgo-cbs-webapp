import API from "../../repository";

import type {
    HumanInsertPayload,
    HumanInsertResponse,
    HumanUpdatePayload,
    HumanUpdateResponse,
    HumanQueryResponse,
    HumanExportResponse
} from 'typings/human/human';

const CONTACT_DOCUMENT_URL = "/api/human/contact_documents";

interface documentHumanRepository {
    insert: (data: HumanInsertPayload) => Promise<HumanInsertResponse>;
    update: (data: HumanUpdatePayload) => Promise<HumanUpdateResponse>;
    fetchList: (data: any) => Promise<HumanQueryResponse>;
    fetchFilterList: (data: any) => Promise<HumanQueryResponse>;
    downloadTemplateImportExcelHuman: (data: any) => Promise<HumanExportResponse>;
    importHumanFromExcel: (data: any) => Promise<HumanExportResponse>;
    exportHuman: (data: any) => Promise<HumanExportResponse>;
}

export const documentHumanRepository: documentHumanRepository = {
    insert: data => inserHuman(data),
    update: data => updateHuman(data),
    fetchList: params => fetchListHuman(params),
    fetchFilterList: params => fetchFilterListHuman(params),
    downloadTemplateImportExcelHuman: params => downloadTemplateImportExcelHuman(params), 
    importHumanFromExcel: params => importHumanFromExcel(params), 
    exportHuman: params => exportHuman(params), 
}

async function fetchListHuman(params : any) {
    const { data } = await API.get(`${CONTACT_DOCUMENT_URL}`, {
        params: {
            select: 'name phone email sign author createAt note status area area1 area2 department position gender birthday contractType workingStatus identity address taxid insuranceSign insuranceDate contractDate',
            populates: {
                "path": "userCreate contact",
                "select": "fullname sign image name parent",
                // populate: {
                //     "path": "parent",
                //     "select": "name parent",
                //     "model": "area",
                //     populate: {
                //         "path": "parent",
                //         "select": "name parent",
                //         "model": "area",
                //     }
                // }
            },
            ...params,
        }
    })
    return data;
}

async function fetchFilterListHuman(params : any) {
    const { data } = await API.get(`${CONTACT_DOCUMENT_URL}/filter`, {
        params: {
            // select: 'name phone email sign author createAt note status area area1 area2 department position gender birthday contractType workingStatus identity address taxid insuranceSign insuranceDate contractDate',
            populates: {
                "path": "userCreate contact",
                "select": "fullname sign image name parent",
                // populate: {
                //     "path": "parent",
                //     "select": "name parent",
                //     "model": "area",
                //     populate: {
                //         "path": "parent",
                //         "select": "name parent",
                //         "model": "area",
                //     }
                // }
            },
            ...params,
        }
    })
    return data;
}

async function inserHuman(data: any) {
    const { data: result } = await API.post(`${CONTACT_DOCUMENT_URL}/insert-Human`, data);
    return result;
}

async function updateHuman(data: any) {
    const { data: result } = await API.put(`${CONTACT_DOCUMENT_URL}/update-Human`, data);
    return result;
}

async function downloadTemplateImportExcelHuman(data: any) {
    const { data: result } = await API.post(`${CONTACT_DOCUMENT_URL}/download-template-excel`, data);
    return result;
}
    
// Import Human từ dữ liệu file excel
async function importHumanFromExcel(data: any) {
    const { data: result } = await API.post(`${CONTACT_DOCUMENT_URL}/import-from-excel`, data);
    return result;
}

async function exportHuman<T>(params: any): Promise<T> {
    const { data } = await API.post<any>(
        `${CONTACT_DOCUMENT_URL}/export-excel`, params
    );
    return data;
}