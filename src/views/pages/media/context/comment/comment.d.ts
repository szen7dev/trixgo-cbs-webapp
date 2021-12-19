export type CommentState = {
    comments: CommentProps[],
    commentsReply: CommentProps[]
};

export type SetListComments = {
    type: 'SET_LIST_COMMENTS',
    payload: CommentProps[]
}

export type AddComment = {
    type: 'ADD_COMMENT',
    payload: CommentProps
}

export type DeleteComment = {
    type: 'DELETE_COMMENT',
    payload: {
        _id: string
    }
}

export type UpdateComment = {
    type: 'UPDATE_COMMENT',
    payload: CommentProps
}

export type CommentActions =
  | SetListComments
  | AddComment
  | DeleteComment
  | UpdateComment