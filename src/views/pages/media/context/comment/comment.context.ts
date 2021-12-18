import { Dispatch, createContext } from "react";

import { CommentState, CommentActions } from "./comment";

export const initialState: CommentState = {
  comments: [],
  commentsReply: [],
};

const CommentContext = createContext<{
  state: CommentState;
  dispatch: Dispatch<CommentActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default CommentContext;
