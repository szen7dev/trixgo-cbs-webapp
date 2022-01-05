import { SetComments } from "./../../../media/context/comment/comment.d";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";

import commentsTypes from "./comment.types";

interface DispatchProps {
  type: string;
  payload: any;
}

type Action = (
  dispatch: Dispatch<DispatchProps>
) => (...payload: any[]) => void;

interface ActionsCommentProps {
  setComment: Action;
  viewMoreComments: Action;
  viewMoreCommentsReply: Action;
  addComment: Action;
  updateComment: Action;
  deleteComment: Action;
  [key: string]: Action;
}
const actionsUploadImages: ActionsCommentProps = {
  setComment: (dispatch) => (payload) =>
    dispatch({
      type: commentsTypes.SET_COMMENTS,
      payload: payload,
    }),
  viewMoreComments: (dispatch) => (id: number, progress: number) =>
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
