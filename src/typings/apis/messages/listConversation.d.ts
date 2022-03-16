import {ItemMessage} from "./listMessage";

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
            bizfullname: string;
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
        path: string;
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
    nextCursor: string|null;
}

export type ListConversationResponse = {
    error: boolean;
    data: DataListConversation;
    status: number;
};

export type ListConversationPayload = {
    keyword?: string;
    lastestID?: string|null;
    limit?: number;
    select?: string;
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

export type MediasOfConversationPayload = {
    conversationID: string;
    typeMessage: 1|2|3;
    senderID?: string;
    fromDate?: string;
    toDate?: string;
    dateCreate?: string;
    limit?: number
}
export type ItemMediaOfConversation = {
    dataFormat: string;
    messages: {
        name: string;
        nameOrg: string;
        size: number;
        url: string;
        _id: string;
        link: string;
        [key: string]: any;
    }[];
    _id: string;
}
export type MediasOfConversationResponseBodyData = {
    listRecords: ItemMediaOfConversation[];
    limit: number;
    totalRecord: number;
    nextCursor: string;
}

export type MediasOfConversationResponse = {
    error: boolean;
    data: any;
    status: number;
};

export type GeneralGroupByMemberPayload = {
    memberID: string;
};

export type GeneralGroupByMemberResponse = {
    error: boolean;
    data: ItemListConversation[];
    status: number;
}

export type ConvversationInformationPayload = {
    conversationID: string;
    filter?: string;
    select?: string;
}

export type ConversationInformarionResponse = {
    error: boolean;
    data: ItemListConversation;
    status: number;
}

export type ListFoldersConversationPayload = {
    limit?: number
    nextCursor?: string
}

export type FolderConversationItem = {
    _id: string
    includedConversations: string[],
    excludedConversations: string[],
    amountMissMessage: number,
    state: number,
    name: string
    author: string
    modifyAt: string
    createAt: string
    createdAt: string
    updatedAt: string
    __v: number
}

export type ListFoldersConversation = {
    listRecords: FolderConversationItem[],
    limit: number,
    totalRecord: number;
    nextCursor: string|null;
}

export type ListFoldersConversationResponse = {
    error: boolean;
    data: ListFoldersConversation;
    status: number;
}



export type AddFolderPayload = {
    name: string;
}

export type AddFolderResponse = {
    data: FolderConversationItem;
    error: boolean;
    status: number;
}

export type UpdateFolderPayload = {
    name: string;
    folderID: string;
}

export type UpdateFolderResponse = {
    data: FolderConversationItem;
    error: boolean;
    status: number;
}

export type DeleteFolderPayload = {
    folderID: string;
}

export type DeleteFolderResponse = {
    data: FolderConversationItem;
    error: boolean;
    status: number;
}

export type AddConversationToFolderPayload = {
    conversationID: string;
    addFoldersID: string[];
    removeFoldersID: string[];
}

export type AddConversationToFolderResponse = {
    data: ItemListConversation;
    error: boolean;
    status: number;
}

export type UpdateMuteConversationPayload = {
    conversationID: string;
    isMute: boolean;
    timeMute?: string;
}

export type UpdateMuteConversationResponse = {
    data: ItemListConversation;
    error: boolean;
    status: number;
}

export type UpdateConversationPayload = {
    conversationID: string;
    name?: string;
    description?: string;
    avatar?: string;
}
export type UpdateConversationData = { infoConversation: ItemListConversation, infoMessage: {data: ItemMessage} }
export type UpdateConversationResponse = {
    data: UpdateConversationData;
    error: boolean;
    status: number;
}

export type PinConversationPayload = {
    conversationID: string;
    isPin: boolean;
}

export type PinConversationResponse = {
    data: any,
    error: boolean;
    status: number;
}

export type HideConversationPayload = {
    conversationID: string;
    isHide: boolean;
}

export type HideConversationResponse = {
    data: ItemListConversation,
    error: boolean;
    status: number;
}

export type MarkReadConversationPayload = {
    conversationID: string;
}

export type MarkReadConversationResponse = {
    data: ItemListConversation,
    error: boolean;
    status: number;
}

export type DeleteHistoryConversationPayload = {
    conversationID: string;
}

export type DeleteHistoryConversationResponse = {
    data: ItemListConversation,
    error: boolean;
    status: number;
}

export type DeleteConversationPayload = {
    conversationID: string;
}

export type DeleteConversationData = ItemListConversation

export type DeleteConversationResponse = {
    data: DeleteConversationData;
    error: boolean;
    status: number;
}

export type ListReactionMessagePayload = {
    messageID: string;
    select?: string;
    populates?: string;
    lastestID?: string;
}
export type ListReactionMessageResponse = {
    data: any;
    error: boolean;
    status: number;
}

export type ListFileMessagePayload = {
    conversationID: string;
    lastestID?: string;
    authorID?: string;
    fromDate?: string;
    toDate?: string;
    type?: number;
    keyword?: string;
    select?: string;
    populates?: string;
    limit?: number;
}

export type ItemFileMessage = {
    app: string
    author: string
    company: string
    conversation: string
    createAt: string
    createdAt: string
    file: string
    mimeType: string
    modifyAt: string
    name: string
    nameOrg: string
    path: string
    size: number
    state: number
    type: number
    updatedAt: string
    __v: number
    _id: string
    [key: string]: any
}

export type ListFileMessageData = {
    listRecords: ItemFileMessage[],
    limit: number,
    totalRecord: number,
    nextCursor: string|null
}

export type ListFileMessageResponse = {
    data: ListFileMessageData;
    error: boolean;
    status: number;
}

export type ListLinksMessagePayload = {
    conversationID: string;
    lastestID?: string;
    authorID?: string;
    fromDate?: string;
    toDate?: string;
    type?: number;
    keyword?: string;
    select?: string;
    populates?: string;
    limit?: number;
    [key: string]: any
}

export type ItemLinkMessage = {
    _id: string,
    state: number,
    conversation: string,
    message: string,
    author: string,
    link: string,
    modifyAt: string,
    createAt: string,
    createdAt: string,
    updatedAt: string,
    __v: number
    [key: string]: any
}

export type ListLinksMessageData = {
    listRecords: ItemLinkMessage[],
    limit: number,
    totalRecord: number,
    nextCursor: string|null
}

export type ListLinksMessageResponse = {
    data: ListLinksMessageData;
    error: boolean;
    status: number;
}

export type ListMembersMessagePayload = {
    conversationID: string;
    lastestID?: string;
    type?: owner|admin|member;
    select?: string;
    populates?: string;
    limit?: number;
    [key: string]: any
}

export type ItemMemberMessage = {
    _id: string,
    member: {
        _id: string,
        image: string,
        bizfullname: string
        [key: string]: any
    },
    conversation: string,
    addedBy: {
        _id: string,
        image: string,
        bizfullname: string
        [key: string]: any
    },
    type: string,
    timeLastSeen: number
    [key: string]: any
}

export type ListMembersMessageData = {
    listRecords: ItemMemberMessage[],
    limit: number,
    totalRecord: number,
    nextCursor: string|null
}

export type ListMembersMessageResponse = {
    data: ListMembersMessageData;
    error: boolean;
    status: number;
}

export type LeaveConversationPayload = {
    conversationID: string;
}
export type LeaveConversationData = {
    infoConversation: ItemListConversation,
    infoMessage: {
        data: ItemMessage,
        error: boolean,
        status: number
    }
    [key: string]: any
}
export type LeaveConversationResponse = {
    data: LeaveConversationData;
    error: boolean;
    status: number;
}

export type RemoveMemberFromConversationPayload = {
    conversationID: string;
    memberID: string
}
export type RemoveMemberFromConversationData = {
    infoConversation: ItemListConversation,
    infoMessage: {
        data: ItemMessage,
        error: boolean,
        status: number
    }
    [key: string]: any
}
export type RemoveMemberFromConversationResponse = {
    data: RemoveMemberFromConversationData;
    error: boolean;
    status: number;
}

export type UpdateConfigConversationPayload = {
    conversationID: string;
    typeConfig: number;
    valueConfig: number
}

export type UpdateConfigConversationResponse = {
    data: ItemListConversation;
    error: boolean;
    status: number;
}

export type SetASAdminConversationPayload = {
    conversationID: string;
    memberID: string;
    isSetAdmin: boolean
}

export type SetASAdminConversationData = {
    infoConversation: ItemListConversation,
    infoMessage: {
        data: ItemMessage,
        error: boolean,
        status: number
    }
    [key: string]: any
}

export type SetASAdminConversationResponse = {
    data: SetASAdminConversationData;
    error: boolean;
    status: number;
}