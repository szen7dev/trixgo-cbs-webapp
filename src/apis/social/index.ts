import API from "../repository";

// import {
//     SIGN_IN_API_URL,
// } from "utils/constants";

import { ListMediasPayload, ListMediasResponse } from "typings/social";
import { convertObToUrl } from "helpers";

const mediaURL = "/api/medias";

const SocialRepository = {
    async listMedias(payload: ListMediasPayload): Promise<ListMediasResponse> {
        const { data } = await API.get<ListMediasResponse>(
            `${mediaURL}/${convertObToUrl(payload)}`
        );
        return data;
    },
};

export default SocialRepository;
