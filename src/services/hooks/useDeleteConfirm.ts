import { useContext } from "react";

import DeleteConfirmContext from "services/contexts/DeleteConfirm";
import {DeleteConfirmContent} from "typings/app";

type UseDeleteConfirm = {
  isDeleteConfirmOpen: boolean;
  openDeleteConfirm: (payload: DeleteConfirmContent) => void;
  closeDeleteConfirm: () => void;
  deleteConfirmContent: DeleteConfirmContent;
};

export const useDeleteConfirm = (): UseDeleteConfirm => {
  const { dispatch, state } = useContext(DeleteConfirmContext);

  const openDeleteConfirm = (payload: DeleteConfirmContent) => {
    dispatch({
      type: "OPEN_DELETE_CONFIRM",
      payload,
    });
  };

  const closeDeleteConfirm = () => {
    dispatch({
      type: "CLOSE_DELETE_CONFIRM",
    });
  };

  return {
    isDeleteConfirmOpen: state.isDeleteConfirmOpen,
    openDeleteConfirm,
    closeDeleteConfirm,
    deleteConfirmContent: state.deleteConfirmContent,
  };
};
