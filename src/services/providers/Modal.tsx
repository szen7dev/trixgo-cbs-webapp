import { FC, ReactNode, useReducer } from "react";

import ModalContext, { initialState } from "services/contexts/Modal";

import Modal from "components/common/Modal";

import { ModalState, ModalActions } from "typings/app";

type Props = {
  children: ReactNode;
};

const reducer = (state: ModalState, action: ModalActions): ModalState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isModalOpen: true,
        modalContent: action.payload,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        modalContent: null,
      };
    default:
      return state;
  }
};

const ModalProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<
    (state: ModalState, action: ModalActions) => ModalState
  >(reducer, initialState);

  return (
    <ModalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
