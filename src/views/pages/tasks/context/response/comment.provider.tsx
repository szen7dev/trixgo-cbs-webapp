import { FC, ReactNode, useReducer } from "react";

import CommentContext, { initialState } from "./comment.context";

import { CommentsState, CommentActions } from "./comment";

type Props = {
  children: ReactNode;
};

const reducer = (state: CommentsState, action: CommentActions): CommentsState => {
  switch (action.type) {
    case "SET_COMMENTS":
      return {
        ...state,
        comments: action.payload
      }
    case "VIEW_MORE_COMMENTS":
      return {
        ...state,
        comments: [...state.comments, ...action.payload]
      }
    case "VIEW_PREVIOUS_COMMENTS":
      return {
        ...state,
        comments: [...action.payload, ...state.comments]
      }
    case "ADD_COMMENT": {
      const newComment = {
        comments: [
          ...state.comments,
          {
            ...action.payload
          }
        ]
      };

      return {
        ...state,
        ...newComment
      };
    }
    default:
      return state;
  }
};

const CommentProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<
    (state: CommentsState, action: CommentActions) => CommentsState
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
