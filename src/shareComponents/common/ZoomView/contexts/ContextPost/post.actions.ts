/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import postTypes from "./post.types";

import { DispatchAction } from "typings/ppt/reducer";
import { Comment } from "typings/ppt/comment";

const postActions = (dispatch: DispatchAction) => ({
  // ====== MODAL ======
  openComment: (comment: Comment, index: number) => {
    if (!comment.comment) return;
    return dispatch({
      type: postTypes.OPEN_MODAL,
      payload: {
        mediaID: comment.comment._id,
        images: comment.comment.images,
        index,
        type: "comment",
        author: comment.comment.author,
        createAt: comment.comment.createAt,
      },
    });
  },

  // ====== IMAGE ======
  setIndex: (index: number) => {
    return dispatch({
      type: postTypes.SET_INDEX_IMAGE,
      payload: index,
    });
  },
});

export default postActions;
