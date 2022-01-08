import { Dispatch, createContext } from "react";

import {DeleteConfirmActions, DeleteConfirmState} from "typings/app";

export const initialState: DeleteConfirmState = {
  isDeleteConfirmOpen: false,
  deleteConfirmContent: {
    title: "Bạn có muốn xóa không?",
    message: "Dữ liệu của bạn sẽ bị xóa vĩnh viễn và bạn không thể khôi phục lại dữ liệu này",
    deleteAction: () => undefined
  }
};

const DeleteConfirmContext = createContext<{
  state: DeleteConfirmState;
  dispatch: Dispatch<DeleteConfirmActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default DeleteConfirmContext;
