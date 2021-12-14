export type SocketErrorProps = {
    message: string
}

export type SocketState<IState> = {
    connected?: boolean;
    error?: IState;
};

export type ConnectSocket = {
    type: "CONNNECT";
};

export type DisconnnectSocket = {
    type: "DISCONNNECT";
};

export type ConnectSocketError = {
    type: "CONNNECT_ERROR";
    payload: SocketErrorProps
};

export type SocketActions =
    | ConnectSocket
    | DisconnnectSocket
    | ConnectSocketError