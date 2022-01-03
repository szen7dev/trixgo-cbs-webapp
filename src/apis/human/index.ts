import API from "../repository";

import type { 
    ListHumanResponse,
    HumanPayload,
    HumanInfo,
    ContactDocumentPayload,
    ContactDocumentResponse
} from "typings/human";

const CONTACT_URL = "/api/item";
const CONTACT_DOCUMENT_URL = "/api/human";

async function fetchListHuman<T>(params: HumanPayload): Promise<T> {
    const { data } = await API.get(
        `${CONTACT_URL}/contacts`,
        {
            params: {
                filter: {"company": 1, "name": 1, "createAt": 1, "image": 1 },
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
};
 
export default HumanRepository
