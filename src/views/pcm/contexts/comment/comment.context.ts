import { Dispatch, createContext } from "react";

import { CommentsState, CommentActions } from "./comment";

export const initialState: CommentsState = {
  comments: [],
  commentsReply: {}
}

const CommentContext = createContext<{
  state: CommentsState;
  dispatch: Dispatch<CommentActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default CommentContext;
