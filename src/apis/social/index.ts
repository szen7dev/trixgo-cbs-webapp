import API from "../repository";

import { 
    ListResponse,
    ListReactionPayload,
    ListMediasPayload,
    infoMediaResponse,
    MediaPayload,
    PostResponse, 
    CommentPayload,
    ListCommentsPayload,
    MediaReactionPayload
} from "typings/social";
import { CommentResponse, ListCommentResponse } from 'typings/common';
import { convertObToUrl } from "helpers";

const mediaURL = "/api/medias";
const commentURL = "/api/reaction";

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
    async listMedias(payload: ListMediasPayload): Promise<ListResponse> {
        const { data } = await API.get<ListResponse>(
            `${mediaURL}?${convertObToUrl(payload)}`
        );
        return data;
    },
    async listReactions(payload: ListReactionPayload): Promise<ListResponse> {
        const { data } = await API.get<ListResponse>(
            `${mediaURL}/reaction?${convertObToUrl(payload)}`
        );
        return data;
    },
    async reactionMedia(payload: MediaReactionPayload): Promise<any> {
        const { data } = await API.post<any>(
            `${mediaURL}/reaction`,
            payload
        );
        return data;
    },

    /**
     * COMMENT MEDIA
     * @param payload
     * @returns 
     */
    async createComment(payload: CommentPayload): Promise<CommentResponse> {
        const { data } = await API.post<CommentResponse>(
            `${mediaURL}/comments`,
            payload
        );
        return data;
    },
    async updateComment(payload: CommentPayload): Promise<CommentResponse> {
        const { data } = await API.put<CommentResponse>(
            `${commentURL}/comment_cores`,
            payload
        );
        return data;
    },
    async deleteComment(id: string): Promise<{ error: boolean, message: string }> {
        const { data } = await API.delete<{ error: boolean, message: string }>(
            `${mediaURL}/comments?commentID=${id}`
        );
        return data;
    },
    async listComments(payload: ListCommentsPayload): Promise<ListCommentResponse> {
        const { data } = await API.get<ListCommentResponse>(
            `${mediaURL}/comments?${convertObToUrl(payload)}`
        );
        return data;
    },
};

export default SocialRepository;
