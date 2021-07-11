import { Dispatch, createContext } from "react";

import { ModalState, ModalActions } from "typings/app";

export const initialState: ModalState = {
  isModalOpen: false,
  modalContent: null,
};

const ModalContext = createContext<{
  state: ModalState;
  dispatch: Dispatch<ModalActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default ModalContext;
