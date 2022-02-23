/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import API from "../repository";

import {
  Comment,
  CommentDetail,
  ListRecord,
  Response,
} from "typings/ppt/comment";

export type CommentBody = {
  mediaID: string; // *required
  fileID: string; // *required
  content: string; // *required

  parentID?: string;
  files?: string[];
  images?: string[];
};

const mediaURL = "/api/medias";
const commentURL = "/api/reaction";

const CommentImageRepository = {
  /**
   * COMMENT IMAGE
   * @param payload
   * @returns
   */
  async createComment(payload: CommentBody) {
    const { data } = await API.post<Response<Comment>>(
      mediaURL + "/comments/file",
      payload
    );
    return data;
  },
  async updateComment(payload: CommentBody) {
    const { data } = await API.put<Response<CommentDetail>>(
      commentURL + "/comments/file"
    );
    return data;
  },
  async deleteComment(id: string) {
    const { data } = await API.delete<{
      error: boolean;
      message: string;
      data?: any;
    }>(mediaURL + "/comments/file", { params: { commentID: id } });
    return data;
  },
  async listComments(payload: {
    mediaID: string;
    fileID: string;
    lastestID?: string;
    parentID?: string;
  }) {
    const { data } = await API.get<Response<ListRecord<Comment>>>(
      mediaURL + "/comments/file",
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
          fileID: payload.fileID,
          lastestID: payload.lastestID,
          parentID: payload.parentID,
        },
      }
    );
    return data;
  },
};

export default CommentImageRepository;
