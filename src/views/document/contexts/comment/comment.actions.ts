import commentsTypes from "./comment.types";
import { DispatchAction } from "typings/ppt/reducer";

const actionsComments = (dispatch: DispatchAction) => ({
  setComment: (payload: any) =>
    dispatch({
      type: commentsTypes.SET_COMMENTS,
      payload: payload,
    }),
  viewMoreComments: (id: number, progress: number) =>
    dispatch({
      type: commentsTypes.VIEW_MORE_COMMENTS,
      payload: {
        id,
        progress,
      },
    }),
  viewMoreCommentsReply: (payload: any) =>
    dispatch({
      type: commentsTypes.VIEW_MORE_COMMENTS_REPLY,
      payload,
    }),
  addComment: (payload: any) =>
    dispatch({ type: commentsTypes.ADD_COMMENT, payload }),
  updateComment: (payload: any) =>
    dispatch({ type: commentsTypes.UPDATE_COMMENT, payload }),
  deleteComment: (payload: any) =>
    dispatch({ type: commentsTypes.DELETE_COMMENT, payload }),
});

export default actionsComments;
