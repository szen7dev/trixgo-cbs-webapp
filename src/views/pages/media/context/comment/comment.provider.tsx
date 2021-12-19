import { FC, ReactNode, useReducer } from "react";

import CommentContext, { initialState } from "./comment.context";

import { CommentState, CommentActions } from "./comment";

type Props = {
  children: ReactNode;
};

const reducer = (state: CommentState, action: CommentActions): CommentState => {
  switch (action.type) {
    case "SET_LIST_COMMENTS":
      return {
        ...state,
        ...action.payload
      };
    case "ADD_COMMENT": {
      const key = action.payload.parentID ? 'commentsReply' : 'comments';
      const newComment = {
        [key]: {
          ...[key],
          ...action.payload
        }
      }
      return {
        ...state,
        ...newComment
      };
    }
    case "DELETE_COMMENT":
        return {
            ...state
        }
    default:
      return state;
  }
};

const CommentProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<
    (state: CommentState, action: CommentActions) => CommentState
  >(reducer, initialState);

  return (
    <CommentContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
