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

const populatesComment = JSON.stringify({
  path: "author lastestReplyID files images",
  select: "_id bizfullname image name nameOrg description path mimeType size author type parent content files images amountCommentReply amountReaction createAt",
  populate: {
      path: 'author files images',
      select: '_id bizfullname image name nameOrg description path size mimeType type createAt'
  }
})

const mediaURL = "/api/medias";

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
      mediaURL + "/comments/file"
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
    fileID?: string;
    lastestID?: string;
    parentID?: string;
  }) {
    const { data } = await API.get<Response<ListRecord<Comment>>>(
      mediaURL + "/comments/file",
      {
        params: {
          populates: populatesComment,
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
