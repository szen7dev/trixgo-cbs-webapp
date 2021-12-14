import { Dispatch, createContext } from "react";

import { SocketState, SocketActions, SocketErrorProps } from "typings/socket";

export const initialState: SocketState<SocketErrorProps> = {
  connected: false,
  error: {
    message: ''
  },
};

const SocketContext = createContext<{
  state: SocketState<SocketErrorProps>;
  dispatch: Dispatch<SocketActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default SocketContext;
