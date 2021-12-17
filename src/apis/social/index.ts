import API from "../repository";

import { 
    ListMediasPayload,
    ListMediasResponse,
    infoMediaResponse,
    MediaPayload,
    PostResponse,
    CommentMediaPayload,
    CommentMediaResponse
} from "typings/social";
import { convertObToUrl } from "helpers";

const mediaURL = "/api/medias";

const SocialRepository = {
    /**
     * MEDIA
     * @param payload
     * @returns 
     */
    async createMedia(payload: MediaPayload): Promise<PostResponse> {
        const { data } = await API.post<PostResponse>(
            `${mediaURL}`,
            payload
        );
        return data;
    },
    async updateMedia(payload: MediaPayload): Promise<PostResponse> {
        const { data } = await API.put<PostResponse>(
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

    /**
     * COMMENT MEDIA
     * @param payload
     * @returns 
     */
    async createComment(payload: CommentMediaPayload): Promise<CommentMediaResponse> {
        const { data } = await API.post<CommentMediaResponse>(
            `${mediaURL}/comment`,
            payload
        );
        return data;
    },
    async updateComment(payload: CommentMediaPayload): Promise<CommentMediaResponse> {
        const { data } = await API.put<CommentMediaResponse>(
            `${mediaURL}/comment`,
            payload
        );
        return data;
    },
    async deleteCommentMedia(id: string): Promise<CommentMediaResponse> {
        const { data } = await API.delete<CommentMediaResponse>(
            `${mediaURL}?mediaID=${id}`
        );
        return data;
    },
};

export default SocialRepository;
