import {DeleteConfirmContent} from "typings/app";
import {useDispatch} from "react-redux";
import {openDeleteConfirmAction, closeDeleteConfirmAction} from "redux/reducer/DeleteConfirm"

type UseDeleteConfirm = {
  openDeleteConfirm: (payload: DeleteConfirmContent) => void;
  closeDeleteConfirm: () => void;
};

export const useDeleteConfirm = (): UseDeleteConfirm => {
  const dispatch = useDispatch();

  const openDeleteConfirm = (payload: DeleteConfirmContent) => {
    dispatch(openDeleteConfirmAction(payload));
  };

  const closeDeleteConfirm = () => {
    dispatch(closeDeleteConfirmAction());
  };

  return {
    openDeleteConfirm,
    closeDeleteConfirm,
  };
};
