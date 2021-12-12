import API from "../repository";

import { ListMediasPayload, ListMediasResponse, MediaPayload, PostResponse } from "typings/social";
import { convertObToUrl } from "helpers";

const mediaURL = "/api/medias";

const SocialRepository = {
    async createPost(payload: MediaPayload): Promise<PostResponse> {
        const { data } = await API.post<PostResponse>(
            `${mediaURL}`,
            payload
        );
        return data;
    },
    async listMedias(payload: ListMediasPayload): Promise<ListMediasResponse> {
        const { data } = await API.get<ListMediasResponse>(
            `${mediaURL}?${convertObToUrl(payload)}`
        );
        return data;
    },
};

export default SocialRepository;
