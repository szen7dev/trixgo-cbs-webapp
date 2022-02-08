export type ItemMessage = {
    _id: string;
    receivers: {_id: string; image: string; fullname: string}[];
    content: string;
    status: number;
    type: number;
    listSeen: {_id: string; image: string; fullname: string}[];
    usersDelete: any[];
    membersAssigned: any[];
    sender: {_id: string; image: string; fullname: string};
    conversation: string;
    modifyAt: string;
    createAt: string;
    parent: {
        content: string;
        conversation: string;
        createAt: string;
        createdAt: string;
        files: {status: number; usersDelete: any[]; _id: string; file: string}[];
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
        usersAssigned: any[];
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
            _id: string;
            file: {
                _id: string;
                status: number;
                app: string;
                name: string;
                url: string;
                size: number;
                userCreate: string;
                modifyAt: string;
                createAt: string;
                createdAt: string;
                updatedAt: string;
                __v: number;
            };
        };
        [key: string]: any;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    reminder: {
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
        receivers: string[],
        content: string,
        status: number,
        type: number,
        listSeen: string[],
        usersDelete: any[],
        membersAssigned: any[],
        _id: string,
        conversation: string,
        sender: string,
        files: any[],
        modifyAt: string,
        createAt: string,
        createdAt: string,
        updatedAt: string,
        __v: number
    }[],
    errors: any[]
}

export type ShareMessageResponse = {
    error: boolean;
    data: ShareMessageData[];
    status: number;
};