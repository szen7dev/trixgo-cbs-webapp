import API from "../repository";

import { 
    MediaPayload,
    ListMediasPayload,
    CommentResponse,
    ListMediaResponse,
    ListCommentResponse,
    MediaInfoResponse, 

    CommentPayload,
    ListCommentsPayload,

    MediaReactionPayload,
    ListReactionMediaPayload,
    ReactionCommentPayload,
    ListReactionCommentPayload,

    ListSeenPayload
} from "typings/media";
import { convertObToUrl } from "utils";

const populatesMedia = JSON.stringify({
    path: "company department other author files images",
    select: "_id name sign nameOrg description path size mimeType type createAt bizfullname image position department members",
    populate: {
        path: "position department",
        select: "_id name sign"
    },
})

const populatesComment = JSON.stringify({
    path: "author lastestReplyID files images media",
    select: "_id bizfullname image name nameOrg description path mimeType size author type parent content files images amountCommentReply amountReaction createAt media",
    populate: {
        path: 'author lastestReplyID files images media',
        select: '_id bizfullname image name nameOrg description path mimeType size author type parent content files images amountCommentReply amountReaction createAt media'
    }
})

const mediaURL = "/api/medias";

const MediaRepository = {
    /**
     * MEDIA
     */
    async createMedia(payload: MediaPayload): Promise<MediaInfoResponse> {
        const { data } = await API.post<MediaInfoResponse>(
            `${mediaURL}`,
            payload
        );
        return data;
    },
    async updateMedia(payload: MediaPayload): Promise<MediaInfoResponse> {
        const { data } = await API.put<MediaInfoResponse>(
            `${mediaURL}`,
            payload
        );
        return data;
    },
    async updateViewMedia(id: string): Promise<MediaInfoResponse> {
        const { data } = await API.put<MediaInfoResponse>(
            `${mediaURL}/views`,
            { mediaID: id }
        );
        return data;
    },
    async deleteMedia(id: string): Promise<any> {
        const { data } = await API.delete<any>(
            `${mediaURL}?mediaID=${id}`
        );
        return data;
    },
    async mediaInfo(id: string): Promise<MediaInfoResponse> {
        const { data } = await API.get<MediaInfoResponse>(
            `${mediaURL}/${id}?${convertObToUrl({
                populates: populatesMedia
            })}`
        );
        return data;
    },
    async listMedias(payload: ListMediasPayload): Promise<ListMediaResponse> {
        const { data } = await API.get<ListMediaResponse>(
            `${mediaURL}?${convertObToUrl({
                ...payload,
                populates: populatesMedia
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
    async listReactions(payload: ListReactionMediaPayload): Promise<any> {
        const { data } = await API.get<any>(
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
            {
                ...payload,
                populates: populatesComment
            }
        );
        return data;
    },
    async updateComment(payload: CommentPayload): Promise<CommentResponse> {
        const { data } = await API.put<CommentResponse>(
            `${mediaURL}/comments`,
            {
                ...payload,
                populates: populatesComment
            }
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
                populates: populatesComment
            })}`
        );
        return data;
    },

    /**
     * REACTION COMMENT
     */
    async reactionCommentMedia(payload: ReactionCommentPayload): Promise<any> {
        const { data } = await API.post<any>(
            `${mediaURL}/reactions/comments/media`,
            payload
        );
        return data;
    },
    async reactionCommentFile(payload: ReactionCommentPayload): Promise<any> {
        const { data } = await API.post<any>(
            `${mediaURL}/reactions/comments/file`,
            payload
        );
        return data;
    },
    async listReactionsComment(payload: ListReactionCommentPayload): Promise<any> {
        const { data } = await API.get<any>(
            `${mediaURL}/reactions/comments?${convertObToUrl({
                ...payload,
                populates: JSON.stringify({
                path: 'author',
                select: "_id bizfullname image"
                })
            })}`
        );
        return data;
    },
};

export default MediaRepository;
