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
    // case "SET_COMMENTS_REPLY":
    //   return {
    //     ...state,
    //     commentsReply: {
    //       [action.payload[0].parent]: action.payload
    //     }
    //   }
    case "VIEW_MORE_COMMENTS":
      return {
        ...state,
        comments: [...action.payload, ...state.comments]
      }
    case "VIEW_MORE_COMMENTS_REPLY":
      console.log({ ['PAYLOAD_VIEW_MORE_COMMENTS_REPLY']: action.payload });
      return {
        ...state,
        commentsReply: {
          ...state.commentsReply,
          [action.payload.parent]: [
            ...action.payload.comments,
            ...state.commentsReply[action.payload.parent] || []
          ]
        }
      }
    case "ADD_COMMENT": {
      console.log({ ['PAYLOAD_ADD_COMMENT']: action.payload });
      
      const key = action.payload.parent ? 'commentsReply' : 'comments';
      let newComment = {};

      if(key === 'commentsReply') {
        newComment = {
          [key]: {
            ...state[key],
            [action.payload.parent]: [
              ...state[key][action.payload.parent] || [],
              action.payload
            ]
          }
        }
      } else{
        newComment = {
          [key]: [
            ...state[key],
            {
              ...action.payload
            }
          ]
        }
      }

      return {
        ...state,
        ...newComment
      };
    }
    case "DELETE_COMMENT": {
      const newState = { ...state };
      if(action.payload.parent){
        delete newState.commentsReply[action.payload._id];
      } else{
        newState.comments = newState.comments.filter(comment => comment._id !== action.payload._id);
      }
      return newState;
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
