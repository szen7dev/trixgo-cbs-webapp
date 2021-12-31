import API from "../repository";

import type { ListHumanResponse, HumanPayload, HumanInfo } from "typings/human";

const contactURL = "/api/item";

async function fetchListHuman<T>(params: HumanPayload): Promise<T> {
    const { data } = await API.get(
        `${contactURL}/contacts`,
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

const HumanRepository = {
    fetchListHuman: (params: HumanPayload): Promise<ListHumanResponse> => fetchListHuman<ListHumanResponse>(params),
    fetchDetailHuman: (params: {
        contactID: string
    }): Promise<HumanInfo> => fetchListHuman<HumanInfo>({
        ...params,
        populates: {
            "path": "company position area1 area2 department linkUser workplace other",
            "select": "name sign"
        },
    }),
};
 
export default HumanRepository
