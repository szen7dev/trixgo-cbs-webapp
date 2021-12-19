export type CommentsState = {
    comments: CommentProps[],
    commentsReply: {
        [key: string]: CommentProps[]
    }
};

export type CommentState = CommentProps;

export type SetComments = {
    type: 'SET_COMMENTS' | 'SET_COMMENTS_REPLY' | 'VIEW_MORE_COMMENTS' | 'VIEW_MORE_COMMENTS_REPLY',
    payload: CommentProps[]
}

export type AddComment = {
    type: 'ADD_COMMENT',
    payload: CommentProps
}

export type DeleteComment = {
    type: 'DELETE_COMMENT',
    payload: {
        _id: string,
        parent: string,
    }
}

export type UpdateComment = {
    type: 'UPDATE_COMMENT',
    payload: CommentProps
}

export type CommentActions =
  | SetComments
  | AddComment
  | DeleteComment
  | UpdateComment