import API from "../repository";

import { ListMediasPayload, ListMediasResponse, infoMediaResponse, MediaPayload, PostResponse } from "typings/pcm";
import { convertObToUrl } from "helpers";

const pcmURL = "/api/subject_pcm";

const SocialRepository = {
    async createMedia(payload: MediaPayload): Promise<PostResponse> {
        const { data } = await API.post<PostResponse>(
            `${pcmURL}`,
            payload
        );
        return data;
    },
    async updateMedia(payload: MediaPayload): Promise<PostResponse> {
        const { data } = await API.put<PostResponse>(
            `${pcmURL}`,
            payload
        );
        return data;
    },
    async deleteMedia(id: string): Promise<infoMediaResponse> {
        const { data } = await API.delete<infoMediaResponse>(
            `${pcmURL}?mediaID=${id}`
        );
        return data;
    },
    async mediaInfo(id: string): Promise<infoMediaResponse> {
        const { data } = await API.get<infoMediaResponse>(
            `${pcmURL}/${id}`
        );
        return data;
    },
    async listMedias(payload: ListMediasPayload): Promise<ListMediasResponse> {
        const { data } = await API.get<ListMediasResponse>(
            `${pcmURL}/pcm_plan_tasks?${convertObToUrl(payload)}`
        );
        return data;
    },
};

export default SocialRepository;
