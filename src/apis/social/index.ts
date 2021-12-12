import API from "../repository";

import { ListMediasPayload, ListMediasResponse, infoMediaResponse, MediaPayload, PostResponse } from "typings/social";
import { convertObToUrl } from "helpers";

const mediaURL = "/api/medias";

const SocialRepository = {
    async createMedia(payload: MediaPayload): Promise<PostResponse> {
        const { data } = await API.post<PostResponse>(
            `${mediaURL}`,
            payload
        );
        return data;
    },
    async deleteMedia(id: string): Promise<infoMediaResponse> {
        const { data } = await API.delete<infoMediaResponse>(
            `${mediaURL}?mediaID=${id}`
        );
        return data;
    },
    async mediaInfo(id: string): Promise<infoMediaResponse> {
        const { data } = await API.get<infoMediaResponse>(
            `${mediaURL}/${id}`
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
