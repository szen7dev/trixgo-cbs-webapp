export type ItemListConversation = {
    _id: string;
    members: any[];
    authors: string[];
    usersPin: any[];
    name: string;
    modifyAt: string;
    createAt: string;
    createdAt: string;
    updatedAt: string;
    arrMissMessage: any[];
    usersMute: any[];
    tasks: any[];
    __v: number;
    usersHide: any[];
    lastMessage: {
        _id: string;
        content: string;
        status: number;
        type: number;
        usersSeen: string[];
        sender: {
            _id: string;
            image: string;
            company: string;
            fullname: string;
        },
        updatedAt: string;
        [key: string]: any;
    };
    usersMissMessage: {amount: number; userID: string;}[];
    avatar: {
        _id: string;
        conversation: string;
        file: {
            _id: string;
            url: string;
        },
        createdAt: string;
        updatedAt: string;
        __v: number;
        url: string;
    },
    description: string;
    messagesPin: string[];
    [key: string]: any;
}
export type DataListConversation = {
    listRecords: ItemListConversation[];
    // listConversationPin: ItemListConversation[];
    limit: number;
    totalRecord: number;
    nextCursor: string;
}

export type ListConversationResponse = {
    error: boolean;
    data: DataListConversation;
    status: number;
};

export type ListConversationPayload = {
    keyword?: string;
    lastestID?: string;
    limit?: number;
};

export type ListMembersOfConversationPayload = {
    conversationID: string;
}
export type ItemMembersOfConversation = {
    _id: string;
    image: string;
    sendToFriends: any[];
    receiveFromFriends: any[];
    friends: string[];
    email: string;
    fullname: string;
    position: string;
    recentlyFriends: string[];
    [key: string]: any;
}
export type ListMembersOfConversationResponse = {
    error: boolean;
    data: {
        listRecords: ItemMembersOfConversation[];
        limit: number;
        totalRecord: number;
        nextCursor: string;
    };
    status: number;
};

export type CheckExistConversationResponse = {
    error: boolean;
    data: any;
    status: number;
};

export type CreateConversationPayload = {
    name: string;
    description: string;
    isPrivate: boolean
    membersID: string[]
}

export type CreateConversationResponseBodyData = {
    config: {
        configHighlight: number,
        configSeeOldMessage: number,
        configEditInfo: number,
        configCreateNote: number,
        configCreatePoll: number,
        configPinMessage: number,
        configSendMessage: number
    },
    members: string[],
    authors: string[],
    messagesPin: string[],
    usersHide: string[],
    state: number,
    _id: string,
    name: string,
    description: string,
    modifyAt: string,
    createAt: string,
    usersMissMessage: string[],
    usersDeleteHistory: string[],
    usersMute: string[],
    createdAt: string,
    updatedAt: string,
    __v: number
}

export type CreateConversationResponse = {
    error: boolean;
    data: CreateConversationResponseBodyData;
    status: number;
};