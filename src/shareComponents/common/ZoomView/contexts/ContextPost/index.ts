/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { state } from "./post.state";
import postReducer from "./post.reducer";
import postActions from "./post.actions";
import useComments from "../../hooks/useComments";

export type ContextPostType = { state: typeof state } & ReturnType<
  typeof postActions
> &
  ReturnType<typeof useComments>;

export const ContextPost = createContext<ContextPostType>(state as any);
export const { Provider: ProviderPost } = ContextPost;
export { postActions, postReducer, state };
