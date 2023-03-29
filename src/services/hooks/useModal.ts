import { ReactNode, useContext } from "react";

import ModalContext from "services/contexts/Modal";

type UseModal = {
  isModalOpen: boolean;
  openModal: (payload: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode;
};

export const useModal = (): UseModal => {
  const { dispatch, state } = useContext(ModalContext);

  const openModal = (payload: ReactNode) => {
    dispatch({
      type: "OPEN_MODAL",
      payload,
    });
  };

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
    });
  };

  return {
    isModalOpen: state.isModalOpen,
    openModal,
    closeModal,
    modalContent: state.modalContent,
  };
};
