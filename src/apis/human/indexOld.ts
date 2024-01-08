import API from "../repository";
import type { AxiosRequestConfig } from 'axios';
import type {
    ListHumanResponse,
    HumanPayload,
    HumanInfo,
    ContactDocumentPayload,
    ContactDocumentResponse,
    DepartmentPayload,
    DepartmentResponse,
    PositionPayload,
    PositionResponse,
    DoctypePayload,
    DoctypeResponse,
    AreaPayload,
    AreaResponse,
    CreateContactResponse,
    MutationContactPayload,
    CreateContactDocumentPayload,
    UpdateContactDocumentPayload,
    UpdateFileContactDocumentPayload,
    RemoveFileContactDocumentPayload,
    MutationContactDocument,
    QueryContractPayload,
    QueryContractResponse
} from "typings/human";

const ITEM_URL = "/api/item";
const CONTACT_DOCUMENT_URL = "/api/human";
const BUDGET_WORK_URL = "/api/budget";

async function fetchListHuman<T>(params: HumanPayload): Promise<T> {
    const { data } = await API.get(
        `${ITEM_URL}/contacts`,
        {
            params: {
                populates: {
                    "path": "company position department documents contractType workingStatus workplace area2",
                    "select": "_id name sign members certificateGrade",
                    "populate": {
                        "path": "educationalBackground2 field2 certificateType certificateName parent",
                        "select": "name",
                        "populate": {
                            "path": "parent",
                            "select": "name"
                        }
                    },
                    
                },
                type: 1,
                ...params,
            },
        }
    )
    return data
}

async function fetchListContactDocument<T>(params: ContactDocumentPayload): Promise<T> {
    const { data } = await API.get(
        `${CONTACT_DOCUMENT_URL}/contact_documents`, {
        params: {
            populates: {
                "path": "company contact files contract position2 educationalBackground2 field2 certificateName certificateType",
                "select": "name sign size url userCreate createAt nameOrg description path image gender",
                "populate": {
                    "path": "userCreate project position",
                    "select": "name fullname bizfullname projectType buildingGrade"
                }
            },
            ...params,
        }
    }
    );
    return data;
}

async function exportHuman<T>(params: any): Promise<T> {
    const { data } = await API.post<any>(
        `${ITEM_URL}/contacts/export-contact`, params
    );
    return data;
}

async function requestCreateContactDocument<T>(body: T): Promise<{ error: boolean; data: T }> {
    const { data } = await API.post(
        `${CONTACT_DOCUMENT_URL}/contact_documents`,
        body
    )
    return data;
}

async function requestUpdateContactDocument<T>(body: T): Promise<{ error: boolean; data: T }> {
    const { data } = await API.put(
        `${CONTACT_DOCUMENT_URL}/contact_documents`,
        body
    )
    return data;
}

async function requestDeleteContactDocument(contactDocumentID: string): Promise<any> {
    const { data } = await API.delete(
        `${CONTACT_DOCUMENT_URL}/contact_documents`, {
        params: {
            contactDocumentID
        }
    }

    )
    return data;
}

async function requestUpdateFileContractDocument<T>(_data: T, configs?: AxiosRequestConfig): Promise<any> {
    const { data } = await API.put(
        `${CONTACT_DOCUMENT_URL}/contact_documents`, _data, configs
    )
    return data
}

async function requestCreateContact(formData: MutationContactPayload): Promise<CreateContactResponse> {
    const { data } = await API.post(
        `${ITEM_URL}/contacts`,
        {
            ...formData
        }
    )
    return data;
}

async function requestUpdateContact(formData: MutationContactPayload): Promise<CreateContactResponse> {
    const { data } = await API.put(
        `${ITEM_URL}/contacts`,
        {
            ...formData
        }
    )
    return data;
}

async function fetchListDepartment(params: DepartmentPayload) {
    const { data } = await API.get(
        `${ITEM_URL}/departments`, {
        params: {
            populates: {
                "path": "members",
                "select": "fullname bizfullname name sign image"
            },
            filter: { "name": 1, "description": 1, "sign": 1, "members": 0 },
            ...params
        }
    }
    )
    return data;
}

async function fetchListPosition(params: PositionPayload) {
    const { data } = await API.get(
        `${ITEM_URL}/positions`, {
        params: {
            populates: {
                "path": "parent",
                "select": "name sign parent level",
                "populate": {
                    "path": "parent",
                    "select": "name sign parent level"
                }
            },
            select: 'name description',
            ...params
        }
    }
    )
    return data;
}

async function fetchListDoctype(params: DoctypePayload) {
    const { data } = await API.get(
        `${ITEM_URL}/doctypes`, {
        params: {
            select: 'name type company',
            populates: {
                path: 'company',
                select: 'sign name'
            },
            ...params
        }
    }
    )
    return data;
}

async function fetchListContact(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/contacts`, {
        params: {
            select: 'name type company phone taxid sign',
            populates: {
                path: 'company',
                select: 'sign name'
            },
            ...params
        }
    }
    )
    return data;
}

async function fetchListContract(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/contracts`, {
        params: {
            select: 'name type company',
            populates: {
                path: 'company',
                select: 'sign name'
            },
            ...params
        }
    }
    )
    return data;
}

async function fetchListBudgetWork(params: any) {
    const { data } = await API.get(
        `${BUDGET_WORK_URL}/budget_works`, {
        params: {
            select: 'name sign amount unitPrice quantity',
            ...params
        }
    }
    )
    return data;
}

async function fetchListAccount(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/accounts`, {
        params: {
            select: 'name description',
            populates: {
                path: 'company',
                select: 'sign name'
            },
            ...params
        }
    }
    )
    return data;
}

async function fetchListGood(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/goods`, {
        params: {
            select: 'name unit description',
            populates: {
                path: 'company',
                select: 'sign name'
            },
            ...params
        }
    }
    )
    return data;
}

const APP_CMCS = "/api/cmcs";
async function fetchListContractIPC(params: any) {
    const { data } = await API.get(
        `${APP_CMCS}/contract_ipcs`, {
        params: {
            select: 'name type company',
            populates: {
                path: 'company',
                select: 'sign name'
            },
            ...params
        }
    }
    )
    return data;
}

async function fetchListWarehouse(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/warehouses`, {
        params: {
            select: 'name type company',
            populates: {
                path: 'company',
                select: 'sign name'
            },
            ...params
        }
    }
    )
    return data;
}

async function fetchListProject(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/departments`, {
        params: {
            select: 'name type company sign',
            populates: {
                path: 'company',
                select: 'sign name'
            },
            ...params
        }
    }
    )
    return data;
}

async function fetchListArea(params: AreaPayload) {
    const { data } = await API.get(
        `${ITEM_URL}/areas`, {
        params: {
            populates: {
                "path": "parent",
                "select": "name sign parent level",
                "populate": {
                    "path": "parent",
                    "select": "name sign parent level"
                }
            },
            filter: {
                "company": 1,
                "name": 1,
                "sign": 1,
                "description": 1,
                "createAt": 1,
                "type": 1
            },
            ...params
        }
    }
    )
    return data;
}

async function fetchListContracts(params: QueryContractPayload): Promise<QueryContractResponse> {
    const { data } = await API.get(
        `${ITEM_URL}/contracts`, {
        params: {
            populates: {
                "path": "company",
                "select": "name sign"
            },
            select: 'company name sign description createAt',
            ...params
        }
    }
    )
    return data;
}

const HumanRepository = {
    fetchListHuman: async (params: HumanPayload): Promise<ListHumanResponse> => fetchListHuman<ListHumanResponse>(params),
    fetchDetailHuman: async (params: {
        contactID: string;
    }): Promise<HumanInfo> => fetchListHuman<HumanInfo>({
        populates: {
            "path": `company contact contractType department workingStatus other educationalBackground major workplace position area area1 area2 documents linkUser userUpdate`,
            "select": "name sign parent members educationalBackground2 field2 linkUser fullname",
            "populate": {
                "path": "parent educationalBackground2 field2",
                "select": "name sign parent level",
                populate: {
                    "path": "parent",
                    "select": "name sign level"
                }
            },
        },
        ...params,
    }),
    exportHuman: (params: any): Promise<any> => exportHuman<any>(params),

    fetchListContactDocument: async (params: ContactDocumentPayload): Promise<ContactDocumentResponse> => fetchListContactDocument<ContactDocumentResponse>(params),
    requestCreateContactDocument: async (body: CreateContactDocumentPayload): Promise<MutationContactDocument> => requestCreateContactDocument(body),
    requestUpdateContactDocument: async (body: UpdateContactDocumentPayload): Promise<MutationContactDocument> => requestUpdateContactDocument(body),
    requestDeleteContactDocument,
    requestUpdateFileContractDocument: async (body: UpdateFileContactDocumentPayload, configs?: AxiosRequestConfig): Promise<any> => requestUpdateFileContractDocument(body, configs),
    requestRemoveFileContractDocument: async (body: RemoveFileContactDocumentPayload): Promise<any> => requestUpdateFileContractDocument(body),

    fetchListDepartment: async (params: DepartmentPayload): Promise<DepartmentResponse> =>
        fetchListDepartment(params),

    fetchListPosition: async (params: PositionPayload): Promise<PositionResponse> =>
        fetchListPosition(params),

    fetchListDoctype: async (params: DoctypePayload): Promise<DoctypeResponse> =>
        fetchListDoctype(params),
    fetchListContact: async (params: any): Promise<any> =>
        fetchListContact(params),
    fetchListContract: async (params: any): Promise<any> =>
        fetchListContract(params),
    fetchListBudgetWork: async (params: any): Promise<any> =>
        fetchListBudgetWork(params),
    fetchListAccount: async (params: any): Promise<any> =>
        fetchListAccount(params),
    fetchListGood: async (params: any): Promise<any> =>
        fetchListGood(params),
    fetchListContractIPC: async (params: any): Promise<any> =>
        fetchListContractIPC(params),
    fetchListWarehouse: async (params: any): Promise<any> =>
        fetchListWarehouse(params),
    fetchListProject: async (params: any): Promise<any> =>
        fetchListProject(params),

    fetchListAreas: async (params: AreaPayload): Promise<AreaResponse> =>
        fetchListArea(params),

    requestCreateContact,
    requestUpdateContact,
    fetchListContracts,
};

export default HumanRepository
