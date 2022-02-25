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
    MediaReactionPayload,
    ListSeenPayload
} from "typings/media";
import { CommentResponse, ListCommentResponse } from 'typings/common';
import { convertObToUrl } from "utils";

const mediaURL = "/api/medias";
const commentURL = "/api/reaction";

const MediaRepository = {
    /**
     * MEDIA
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
    async updateViewMedia(id: string): Promise<PostResponse> {
        const { data } = await API.put<PostResponse>(
            `${mediaURL}/views`,
            { mediaID: id }
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
            `${mediaURL}/${id}?${convertObToUrl({
                populates: JSON.stringify({
                    path: "files images author",
                    select: "_id name nameOrg path size mimeType type createAt bizfullname image position department",
                    populate: {
                        path: "position department",
                        select: "_id name sign"
                    }
                })
            })}`
        );
        return data;
    },
    async listMedias(payload: ListMediasPayload): Promise<ListResponse> {
        const { data } = await API.get<ListResponse>(
            `${mediaURL}?${convertObToUrl({
                ...payload,
                populates: JSON.stringify({
                    path: "company department other author",
                    select: "_id name sign bizfullname image"
                })
            })}`
        );
        return data;
    },
    async listSeensMedia(payload: ListSeenPayload): Promise<any> {
        const { data } = await API.get<any>(
            `${mediaURL}/seens?${convertObToUrl({
                ...payload,
                populates: JSON.stringify({
                    path: "author",
                    select: "_id bizfullname image"
                })
            })}`
        );
        return data;
    },
    async listReactions(payload: ListReactionPayload): Promise<ListResponse> {
        const { data } = await API.get<ListResponse>(
            `${mediaURL}/reactions?${convertObToUrl({
                ...payload,
                populates: JSON.stringify({
                    path: "author",
                    select: "_id bizfullname image"
                })
            })}`
        );
        return data;
    },
    async reactionMedia(payload: MediaReactionPayload): Promise<any> {
        const { data } = await API.post<any>(
            `${mediaURL}/reactions`,
            payload
        );
        return data;
    },

    /**
     * COMMENT MEDIA
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
            `${commentURL}/comments`,
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
            `${mediaURL}/comments?${convertObToUrl({
                ...payload,
                populates: JSON.stringify({
                    path: "author lastestReplyID files images",
                    select: "_id bizfullname image name nameOrg path mimeType size author type parent content files images amountCommentReply amountReaction createAt",
                    populate: {
                        path: 'author files images',
                        select: '_id bizfullname image name nameOrg path size mimeType type createAt'
                    }
                })
            })}`
        );
        return data;
    },
};

export default MediaRepository;
