import { FC, ReactNode, useReducer } from "react";

import SocketContext, { initialState } from "services/contexts/Socket";

import { SocketState, SocketActions, SocketErrorProps } from "typings/socket";

type Props = {
  children: ReactNode;
};

const reducer = (state: SocketState<SocketErrorProps>, action: SocketActions): SocketState<SocketErrorProps> => {
  switch (action.type) {
    case "CONNNECT":
      return {
        ...state,
        connected: true,
      };
    case "DISCONNNECT":
      return {
        ...state,
        connected: false,
      };
    case "CONNNECT_ERROR":
      return {
        ...state,
        ...action.payload,
        connected: false,
      };
    default:
      return state;
  }
};

const SocketProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<
    (state: SocketState<SocketErrorProps>, action: SocketActions) => SocketState<SocketErrorProps>
  >(reducer, initialState);

  return (
    <SocketContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
