import { SetComments } from "./../../../media/context/comment/comment.d";
/* eslint-disable @typescript-eslint/no-explicit-any */

import commentsTypes from "./comment.types";

// Typescript;
import { Action } from "typings/ppt/reducer";

type ActionsCommentProps = {
  setComment: Action<(payload: any) => void>;
  viewMoreComments: Action<(id: number, progress: number) => void>;
  viewMoreCommentsReply: Action<(payload: any) => void>;
  addComment: Action<(payload: any) => void>;
  updateComment: Action<(payload: any) => void>;
  deleteComment: Action<(payload: any) => void>;
};
const actionsUploadImages: ActionsCommentProps = {
  setComment: (dispatch) => (payload) =>
    dispatch({
      type: commentsTypes.SET_COMMENTS,
      payload: payload,
    }),
  viewMoreComments: (dispatch) => (id, progress) =>
    dispatch({
      type: commentsTypes.VIEW_MORE_COMMENTS,
      payload: {
        id,
        progress,
      },
    }),
  viewMoreCommentsReply: (dispatch) => (payload) =>
    dispatch({
      type: commentsTypes.VIEW_MORE_COMMENTS_REPLY,
      payload,
    }),
  addComment: (dispatch) => (payload) =>
    dispatch({ type: commentsTypes.ADD_COMMENT, payload }),
  updateComment: (dispatch) => (payload) =>
    dispatch({ type: commentsTypes.UPDATE_COMMENT, payload }),
  deleteComment: (dispatch) => (payload) =>
    dispatch({ type: commentsTypes.DELETE_COMMENT, payload }),
};

const actionsComments = {
  ...actionsUploadImages,
};

export default actionsComments;
