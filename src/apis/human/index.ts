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

async function fetchListHuman<T>(params: HumanPayload): Promise<T> {
    const { data } = await API.get(
        `${ITEM_URL}/contacts`,
        {
            params: {
                filter: { "company": 1, "name": 1, "createAt": 1, "image": 1 },
                populates: {
                    "path": "company position",
                    "select": "name sign"
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
                "path": "company contact files contract position2 educationalBackground2 field2",
                "select": "name sign size url userCreate createAt",
                "populate": {
                    "path": "userCreate project",
                    "select": "fullname projectType buildingGrade"
                }
            },
            ...params,
        }
    }
    );
    return data;
}

async function requestCreateContactDocument<T>(body: T): Promise<{error: boolean; data: T}> {
    const { data } = await API.post(
        `${CONTACT_DOCUMENT_URL}/contact_documents`,
        body
    )
    return data;
}

async function requestUpdateContactDocument<T>(body: T): Promise<{error: boolean; data: T}> {
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
                "select": "fullname name sign image"
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
            select: 'name type',
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
            "path": `company contact contractType department workingStatus other educationalBackground major workplace position area area1 area2`,
            "select": "name sign parent",
            "populate": {
                "path": "parent",
                "select": "name sign parent level",
                populate: {
                    "path": "parent",
                    "select": "name sign level"
                }
            },
        },
        ...params,
    }),
    fetchListContactDocument: async (params: ContactDocumentPayload): Promise<ContactDocumentResponse> =>
        fetchListContactDocument<ContactDocumentResponse>(params),
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

    fetchListAreas: async (params: AreaPayload): Promise<AreaResponse> =>
        fetchListArea(params),

    requestCreateContact,
    requestUpdateContact,
    fetchListContracts,
};

export default HumanRepository
