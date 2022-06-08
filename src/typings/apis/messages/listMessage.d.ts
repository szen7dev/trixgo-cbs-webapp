import {ItemListConversation} from "./listConversation";

export type ItemMessage = {
    _id: string;
    receivers: {_id: string; image: string; fullname: string}; bizfullname: string[];
    content: string;
    status: number;
    type: number;
    listSeen: {_id: string; image: string; fullname: string; bizfullname: string}[];
    usersDelete: any[];
    membersAssigned: any[];
    sender: {_id: string; image: string; fullname: string; bizfullname: string};
    conversation: string;
    modifyAt: string;
    createAt: string;
    parent: {
        content: string;
        conversation: string;
        createAt: string;
        createdAt: string;
        files: {status: number; usersDelete: any[]; _id: string; file: any; [key: string]: any;}[];
        modifyAt: string;
        reactions: string[];
        receivers: string[];
        sender: {
            fullname: string;
            image: string;
            _id: string;
        }
        state: number;
        status: number;
        type: number;
        updatedAt: string;
        usersAssigned: {
            amountAppUse: number
            birthDay: string
            bizfullname: string
            bookmarks: any[]
            company: string
            converMiss: any[]
            createAt: string
            department: string
            departmentContacts: any[]
            devices: any[]
            displayHomeConfig: number
            displayPcmConfig: number
            email: string
            emailConfig: number
            friends: string[]
            fullname: string
            gender: number
            image: string
            lang: string
            lastLog: string
            level: number
            modifyAt: string
            noticeConfig: number
            numLog: number
            password: string
            platform: number
            position: string
            receiveFromFriends: any[]
            recentlyFriends: any[]
            reputation: number
            sendToFriends: any[]
            signature: string
            status: number
            storageUse: number
            tags: any[]
            updatedAt: string
            userUpdate: string
            username: string
            __v: number
            _id: string
        }[];
        usersDelete: any[];
        usersSeen: string[];
        __v: number;
        _id: string;
    }
    files: {
        status: number;
        usersDelete: any[];
        _id: string;
        file: {
            file: {
                _id: string;
                status: number;
                app: string;
                name: string;
                url: string;
                fakeUrl: string;
                size: number;
                userCreate: string;
                modifyAt: string;
                createAt: string;
                createdAt: string;
                updatedAt: string;
                __v: number;
                nameOrg: string;
                path: string;
                isDraft: boolean;
            };
            _id: string;
            status: number;
            app: string;
            name: string;
            url: string;
            fakeUrl: string;
            size: number;
            userCreate: string;
            modifyAt: string;
            createAt: string;
            createdAt: string;
            updatedAt: string;
            __v: number;
            nameOrg: string;
            path: string;
            isDraft: boolean;
        };
        [key: string]: any;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    reminder: {
        accepts: any[]
        content: string
        createdAt: string
        notifyFor: string
        rejects: any[]
        remindTime: string
        repeat: string
        state: number
        status: number
        updatedAt: string
        __v: number
        _id: string
    };
    reactions: {
        _id: string;
        type: number;
        userCreate : {
            _id: string;
            fullname: string;
            bizfullname: string;
            image: string;
        }
    }[];
    poll: {
        createdAt: string
        name: string
        options: {
            createAt: string
            title: string
            usersVote: {
                bizfullname: string
                fullname: string
                image: string
                _id: string
            }[]
            _id: string
        }[]
        state: number
        status: number
        updatedAt: string
        __v: number
        _id: string
    }
    usersAssigned: {
        amountAppUse: number
        birthDay: string
        bizfullname: string
        bookmarks: any[]
        company: string
        converMiss: any[]
        createAt: string
        department: string
        departmentContacts: any[]
        devices: any[]
        displayHomeConfig: number
        displayPcmConfig: number
        email: string
        emailConfig: number
        friends: string[]
        fullname: string
        gender: number
        image: string
        lang: string
        lastLog: string
        level: number
        modifyAt: string
        noticeConfig: number
        numLog: number
        password: string
        phone: string
        platform: number
        position: string
        receiveFromFriends: any[]
        recentlyFriends: any[]
        reputation: number
        sendToFriends: any[]
        signature: string
        status: number
        storageUse: number
        tags: any[]
        updatedAt: string
        userUpdate: string
        username: string
        __v: number
        _id: string
    }[],
    nps: {
        _id: string,
        createAt: string,
        modifyAt: string,
        status: number,
        type: number,
        state: number,
        usersVote: {_id: string, user: { _id: string, bizfullname: string, image: string }, score: number, reason: { _id: string }}[],
        service: {
            _id: string,
            childs: {name: string, _id: string}[],
            name: string,
            type: number
        }
    }
    [key: string]: any;
}
export type ListMessageData = {
    totalRecord: number;
    listRecords: ItemMessage[];
    limit: number;
    currentPage: number;
    nextCursor: string;
}

export type ListMessageResponse = {
    error: boolean;
    data: ListMessageData;
    status: number;
};

export type ListMessagePayload = {
    lastestID?: string;
    conversationID?: string;
};


export type SendNormalMessagePayload = {
    conversationID: string;
    type: number;
    content: string;
}
export type SendNormalMessageResponse = {
    error: boolean;
    data: ItemMessage;
    status: number;
};

export type UpdateReminderMessagePayload = {
    conversationID: string;
    messageID: string;
    isJoin: boolean;
}
export type UpdateReminderMessageData = {
    infoMessageNotification: {
        content: string
        conversation: string
        createAt: string
        createdAt: string
        files: any[]
        modifyAt: string
        reactions: string[]
        receivers: string[]
        reminder: string
        sender: string
        state: number
        status: number
        type: number
        updatedAt: string
        usersAssigned: string[]
        usersDelete: string[]
        usersSeen: string[]
        __v: number
        _id: string
    };
    infoReminder: {
        accepts: string[]
        content: string
        createdAt: string
        notifyFor: string
        rejects: string[]
        remindTime: string
        repeat: string
        state: number
        status: number
        updatedAt: string
        __v: number
        _id: string
    }
};
export type UpdateReminderMessageResponse = {
    error: boolean;
    data: UpdateReminderMessageData;
    status: number;
};

export type ShareMessagePayload = {
    conversationsID: string[];
    messagesID: string[]
}

export type ShareMessageData = {
    results: {
        receivers: string[];
        content: string;
        status: number;
        type: number;
        listSeen: string[];
        usersDelete: any[];
        membersAssigned: any[];
        _id: string;
        conversation: string;
        sender: string;
        files: any[];
        modifyAt: string;
        createAt: string;
        createdAt: string;
        updatedAt: string;
        __v: number
    }[];
    errors: any[]
}

export type ShareMessageResponse = {
    error: boolean;
    data: ShareMessageData[];
    status: number;
};

export type PinnedMessagePayload = {
    conversationID: string;
    page?: number;
}

export type PinnedMessageData = {
    listRecords: ItemMessage[];
    limit: number;
    currentPage: number;
    totalRecord: number;
}

export type PinnedMessageResponse = {
    data: PinnedMessageData;
    error: boolean;
    status: number;
}

export type UpdatePinnedMessagePayload = {
    conversationID: string;
    messageID: string;
    isPin: boolean;
}

export type UpdatePinnedMessageData = {
    infoConversation: ItemListConversation;
    infoMessage: ItemMessage;
}

export type UpdatePinnedMessageResponse = {
    data: UpdatePinnedMessageData;
    error: boolean;
    status: number;
}

export type DeleteRevokeMessagePayload = {
    conversationID: string;
    filesID?: string[];
    messagesID: string[];
}

export type DeleteRevokeMessageResponse = {
    data: ItemMessage[];
    error: boolean;
    status: number;
}

export type UpdatePollPayload = {
    conversationID: string;
    messageID: string;
    newVotes?: string[];
    votesCancel?: string[];
    newOptions?: {
        title: string;
        usersVote?: string[]
    }[];
}

export type UpdatePollData = {
    infoMessage: ItemMessage[];
    infoMessageNotification: {
        content: string
        conversation: string
        createAt: string
        createdAt: string
        files: any[]
        modifyAt: string
        poll: string
        reactions: any[]
        receivers: string[]
        sender: string
        state: number
        status: number
        type: number
        updatedAt: string
        usersAssigned: string[]
        usersDelete: string[]
        usersSeen: string[]
        __v: number
        _id: string
    }
}

export type UpdatePollResponse = {
    data: UpdatePollData ;
    error: boolean;
    status: number;
}

export type AddUserToConversationPayload = {
    conversationID: string;
    membersID: string[];
}

export type AddUserToConversationResponse = {
    data: any ;
    error: boolean;
    status: number;
}

export type SearchMessageInConversationByIdPayload = {
    conversationID: string;
    messageID: string;
    filter?: string;
    select?: string;
}

export type SearchMessageInConversationByIdResponse = {
    data: any ;
    error: boolean;
    status: number;
}

export type UpdateSeenMessageConversationPayload = {
    conversationID: string;
    messagesID: string[];
}

export type UpdateSeenMessageConverastionResponse = {
    data: ItemMessage[];
    error: boolean;
    status: number;
}

export type UpdateNPSPayload = {
    conversationID: string;
    messageID: string;
    score?: number;
    reasons?: string[];
}

export type UpdateNPSData = {
    infoMessage: ItemMessage[];
    infoMessageNotification: {
        content: string
        conversation: string
        createAt: string
        createdAt: string
        files: any[]
        modifyAt: string
        poll: string
        reactions: any[]
        receivers: string[]
        sender: string
        state: number
        status: number
        type: number
        updatedAt: string
        usersAssigned: string[]
        usersDelete: string[]
        usersSeen: string[]
        __v: number
        _id: string
    }
}

export type UpdateNPSResponse = {
    data: UpdateNPSData ;
    error: boolean;
    status: number;
}

export type GetNPSDetailPayload = {
    conversationID: string,
    messageID: string
}

export type GetNPSScoreDetailData = {
    dataStatistics: {
        _id: {
            score: number
        },
        users: [
            {
                image: string,
                _id: string,
                bizfullname: string
            }[]
        ],
        avg: number,
        total: number
    }[],
    dataAverage: {
        scoreAverage: number,
        avgs: {
            _id: {
                score: number
            },
            users: [
                {
                    image: string,
                    _id: string,
                    bizfullname: string
                }[]
            ],
            avg: number,
            total: number
        }[]
    }
}

export type GetNPSScoreDetailResponse = {
    data: GetNPSScoreDetailData ;
    error: boolean;
    status: number;
}

export type GetNPSPleasantDetailItem = {
    reason: {
        _id: string,
        name: string,
        description: string
    },
    users: {
        image: string,
        _id: string,
        bizfullname: string
    }[],
    total: number
}
export type GetNPSPleasantDetailData = GetNPSPleasantDetailItem[]

export type GetNPSPleasantDetailResponse = {
    data: GetNPSPleasantDetailData;
    error: boolean;
    status: number;
}
