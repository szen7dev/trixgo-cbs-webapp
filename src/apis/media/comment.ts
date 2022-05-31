import API from "../repository";

import { CommentPayload } from "typings/media";
import {
  Comment,
  CommentDetail,
  ListCommentResponse,
} from "typings/ppt/comment";

const populatesComment = JSON.stringify({
  path: "author lastestReplyID files images media",
  select:
    "_id bizfullname image name nameOrg description path mimeType size author type parent content files images amountCommentReply amountReaction createAt media",
  populate: {
    path: "author lastestReplyID files images media",
    select:
      "_id bizfullname image name nameOrg description path mimeType size author type parent content files images amountCommentReply amountReaction createAt media",
  },
});

const mediaURL = "/api/medias";

const CommentRepository = {
  /**
   * COMMENT MEDIA
   * @param payload
   * @returns
   */
  async createComment(payload: CommentPayload) {
    const { data } = await API.post<{
      data: Comment;
      message: string;
      error: boolean;
			code?: number;
    }>(mediaURL + "/comments", payload);
    return data;
  },
  async updateComment(payload: CommentPayload) {
    const { data } = await API.put<{
      data: CommentDetail;
      message: string;
      error: boolean;
      code?: number;
    }>(mediaURL + "/comments", payload);
    return data;
  },
  async deleteComment(id: string) {
    const { data } = await API.delete<{
      error: boolean;
      data: any;
      message: string;
    }>(mediaURL + "/comments", { params: { commentID: id } });
    return data;
  },
  async listComments(payload: {
    mediaID: string;
    lastestID?: string;
    parentID?: string;
  }) {
    const { data } = await API.get<ListCommentResponse>(
      mediaURL + "/comments",
      {
        params: {
          populates: populatesComment,
          mediaID: payload.mediaID,
          lastestID: payload.lastestID,
          parentID: payload.parentID,
        },
      }
    );
    return data;
  },
};

export default CommentRepository;
