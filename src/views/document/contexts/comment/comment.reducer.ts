/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommentProps } from "typings/document";
import commentTypes from "./comment.types";

type CommentsState = {
	comments: CommentProps[],
	commentsReply: {
			[key: string]: CommentProps[]
	}
};

interface ActionProps {
  type: string;
  payload?: any;
}

type UploadReducer<S, A> = (state: S, action: A) => S;

export const INITIAL_STATE: CommentsState = {
  comments: [],
  commentsReply: {}
}

const fileUploadReducer: UploadReducer<CommentsState, ActionProps> = (
  state,
  action
) => {
  switch (action.type) {
    case commentTypes.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case commentTypes.VIEW_MORE_COMMENTS:
      return {
        ...state,
        comments: [...action.payload, ...state.comments],
      };
    case commentTypes.VIEW_MORE_COMMENTS_REPLY:
      return {
        ...state,
        commentsReply: {
          ...state.commentsReply,
          [action.payload.parent]: [
            ...action.payload.comments,
            ...(state.commentsReply[action.payload.parent] || []),
          ],
        },
      };
    case commentTypes.ADD_COMMENT: {
      const key = action.payload.parent ? "commentsReply" : "comments";
      let newComment = {};

      if (key === "commentsReply") {
        newComment = {
          [key]: {
            ...state[key],
            [action.payload.parent]: [
              ...(state[key][action.payload.parent] || []),
              action.payload,
            ],
          },
        };
      } else {
        newComment = {
          [key]: [
            ...state[key],
            {
              ...action.payload,
            },
          ],
        };
      }

      return {
        ...state,
        ...newComment,
      };
    }
    case commentTypes.UPDATE_COMMENT: {
      const key = action.payload.parent ? "commentsReply" : "comments";
      const cloneState = { ...state };

      if (key === "commentsReply" && action.payload.parent) {
        const index = state[key][action.payload.parent]?.findIndex(
          (val) => val._id === action.payload.commentID
        );
        index !== -1 &&
          (cloneState[key][action.payload.parent][index] =
            action.payload.body);
      }

      if (key === "comments") {
        const index = state[key].findIndex(
          (val) => val._id === action.payload.commentID
        );
        index !== -1 && (cloneState[key][index] = action.payload.body);
      }

      return cloneState;
    }
    case commentTypes.DELETE_COMMENT: {
      const newState = { ...state };
      if (action.payload.parent) {
        delete newState.commentsReply[action.payload._id];
      } else {
        newState.comments = newState.comments.filter(
          (comment) => comment._id !== action.payload._id
        );
      }
      return newState;
    }
    default:
      return state;
  }
};

export default fileUploadReducer;
