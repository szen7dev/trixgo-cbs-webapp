import API from "../repository";

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
    AreaResponse
} from "typings/human";

const CONTACT_URL = "/api/item";
const CONTACT_DOCUMENT_URL = "/api/human";

async function fetchListHuman<T>(params: HumanPayload): Promise<T> {
    const { data } = await API.get(
        `${CONTACT_URL}/contacts`,
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
                "path": "company contact files contract",
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

async function fetchListDepartment(params: DepartmentPayload) {
    const { data } = await API.get(
        `${CONTACT_URL}/departments`, {
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
        `${CONTACT_URL}/positions`, {
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
        `${CONTACT_URL}/doctypes`, {
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
        `${CONTACT_URL}/areas`, {
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

const HumanRepository = {
    fetchListHuman: async (params: HumanPayload): Promise<ListHumanResponse> => fetchListHuman<ListHumanResponse>(params),
    fetchDetailHuman: async (params: {
        contactID: string
    }): Promise<HumanInfo> => fetchListHuman<HumanInfo>({
        populates: {
            "path": `company contact contractType department workingStatus other educationalBackground major workplace position area1 area2`,
            "select": "name sign"
        },
        ...params,
    }),
    fetchListContactDocument: async (params: ContactDocumentPayload): Promise<ContactDocumentResponse> =>
        fetchListContactDocument<ContactDocumentResponse>(params),

    fetchListDepartment: async (params: DepartmentPayload): Promise<DepartmentResponse> =>
        fetchListDepartment(params),

    fetchListPosition: async (params: PositionPayload): Promise<PositionResponse> =>
        fetchListPosition(params),

    fetchListDoctype: async (params: DoctypePayload): Promise<DoctypeResponse> =>
        fetchListDoctype(params),

    fetchListAreas: async (params: AreaPayload): Promise<AreaResponse> =>
        fetchListArea(params),
};

export default HumanRepository
