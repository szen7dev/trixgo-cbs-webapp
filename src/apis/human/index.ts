import API from "../repository";

import type { ListHumanResponse, HumanPayload } from "typings/human";

const contactURL = "/api/item";

const HumanRepository = {
    fetchListHuman: async (params: HumanPayload): Promise<ListHumanResponse> => {
        const { data } = await API.get<ListHumanResponse>(
            `${contactURL}/contacts`,
            {
                params: {
                    filter: {"company": 1, "name": 1, "createAt": 1, "image": 1 },
                    populates: {"path": "company position", "select": "name sign"},
                    type: 1,
                    ...params,
                },
            }
        )
        return data
    }
}
 
export default HumanRepository
