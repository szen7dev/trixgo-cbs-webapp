export type AcceptRequestFriend = {
    acceptFriendRequestID: string,
};
export type RemoveRequestFriend = {
    removeFriendRequestID: string,
};

export type PostResponse = APIResponse & {
    data: User;
    message: string;
};

export type UserCodeResponse = APIResponse & {
    data: CodeUser;
};

export type CheckCodeUser = {
    code: string,
}; 

export type CodeUser = {
    state: 1,
    user: string,
    code: string,
    expiredTime: string,
    modifyAt: string,
    createAt: string,
    updatedAt: string,
};

export type CheckCodeResponse = APIResponse & {
    data: {
        user: User,
        code: string,
        expiredTime: string
    }
};

export type ListFriendsPayload = {
    lastestID?: string;
    limit?: number;
    type?: string;
    keyword?: string;
    select?: string;
    populates?: string;
};

export type ListRequestsPayload = {
    limit?: number;
    type?: string;
    keyword?: string;
    select?: string;
    populates?: string;
};

export type ListUserResponse = APIResponse & {
    data: {
        listRecords: Array<any>;
        limit?: number;
        totalRecord?: number;
        totalPages?: number;
        nextCursor?: string;
    };
};

export type AddFriendPayLoad = {
    sendRequestToFriendID: string,
}; 

export type UnFriendPayLoad = {
    unFriendID: string,
}; 