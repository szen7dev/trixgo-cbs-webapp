import { ResponseProps } from 'typings/task';

export type CommentsState = {
    comments: ResponseProps[]
};

export type CommentState = ResponseProps;

export type SetComments = {
    type: 'SET_COMMENTS' | 'VIEW_MORE_COMMENTS' | 'VIEW_PREVIOUS_COMMENTS',
    payload: ResponseProps[]
}

export type AddComment = {
    type: 'ADD_COMMENT',
    payload: ResponseProps
}

export type CommentActions =
  | SetComments
  | AddComment