/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import API from "../repository";

import { CommentPayload } from "typings/media";
import {
  Comment,
  CommentDetail,
  ListCommentResponse,
} from "typings/ppt/comment";

const mediaURL = "/api/medias";
const commentURL = "/api/reaction";

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
    }>(mediaURL + "/comments", payload);
    return data;
  },
  async updateComment(payload: CommentPayload) {
    const { data } = await API.put<{
      data: CommentDetail;
      message: string;
      error: boolean;
    }>(commentURL + "/comments", payload);
    return data;
  },
  async deleteComment(id: string) {
    const { data } = await API.delete<{ error: boolean; message: string }>(
      mediaURL + "/comments",
      { params: { commentID: id } }
    );
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
          populates: {
            path: "comment userCreate lastestReplyID",
            select:
              "_id fullname image parent content files images amountCommentReply amountReaction createAt",
            populate: {
              path: "files images comment userCreate lastestReplyID",
              select:
                "_id name nameOrg path size type fullname image content files images amountCommentReply amountReaction",
              populate: {
                path: "files images",
                select: "_id name nameOrg path size type",
              },
            },
          },
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
