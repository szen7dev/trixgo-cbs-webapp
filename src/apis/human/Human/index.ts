import API from "../../repository";

import type {
    HumanInsertPayload,
    HumanInsertResponse,
    HumanUpdatePayload,
    HumanUpdateResponse,
    HumanQueryResponse,
    HumanExportResponse
} from 'typings/human/human';

const CONTACT_URL = "/api/item/contacts";

interface HumanRepository {
    insert: (data: HumanInsertPayload) => Promise<HumanInsertResponse>;
    update: (data: HumanUpdatePayload) => Promise<HumanUpdateResponse>;
    fetchList: (data: any) => Promise<HumanQueryResponse>;
    fetchFilterList: (data: any) => Promise<HumanQueryResponse>;
    downloadTemplateImportExcelHuman: (data: any) => Promise<HumanExportResponse>;
    importHumanFromExcel: (data: any) => Promise<HumanExportResponse>;
    exportHuman: (data: any) => Promise<HumanExportResponse>;
}

export const humanRepository: HumanRepository = {
    insert: data => inserHuman(data),
    update: data => updateHuman(data),
    fetchList: params => fetchListHuman(params),
    fetchFilterList: params => fetchFilterListHuman(params),
    downloadTemplateImportExcelHuman: params => downloadTemplateImportExcelHuman(params), 
    importHumanFromExcel: params => importHumanFromExcel(params), 
    exportHuman: params => exportHuman(params), 
}

async function fetchListHuman(params : any) {
    const { data } = await API.get(`${CONTACT_URL}`, {
        params: {
            select: 'name sign author project date createAt description note store amount status storeSign publish datahubContact',
            populates: {
                "path": "author sender storage publish datahubContact",
                "select": "fullname bizfullname sign image name"
            },
            ...params,
        }
    })
    return data;
}

async function fetchFilterListHuman(params : any) {
    const { data } = await API.get(`${CONTACT_URL}/filter-human`, {
        params: {
            select: 'name sign author project date createAt description note store amount status storeSign publish datahubContact',
            populates: {
                "path": "author sender storage project publish datahubContact",
                "select": "fullname bizfullname sign image name"
            },
            ...params,
        }
    })
    return data;
}

async function inserHuman(data: any) {
    const { data: result } = await API.post(`${CONTACT_URL}/insert-Human`, data);
    return result;
}

async function updateHuman(data: any) {
    const { data: result } = await API.put(`${CONTACT_URL}/update-Human`, data);
    return result;
}

async function downloadTemplateImportExcelHuman(data: any) {
    const { data: result } = await API.post(`${CONTACT_URL}/download-template-excel`, data);
    return result;
}
    
// Import Human từ dữ liệu file excel
async function importHumanFromExcel(data: any) {
    const { data: result } = await API.post(`${CONTACT_URL}/import-from-excel`, data);
    return result;
}

async function exportHuman(data: any) {
    const { data: result } = await API.post(`${CONTACT_URL}/export-Human`, data);
    return result;
}