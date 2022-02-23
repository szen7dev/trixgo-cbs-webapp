import createDataContext from "../createDataContext";
import modalActions from "./comment.actions";

import fileUploadReducer, { INITIAL_STATE } from "./comment.reducer";

export const { Context: CommentContext, Provider: CommentProvider } = createDataContext(fileUploadReducer, modalActions, INITIAL_STATE);