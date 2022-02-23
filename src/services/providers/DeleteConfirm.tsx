import React, { FC, ReactNode, useReducer } from "react";

import DeleteConfirmContext, { initialState } from "services/contexts/DeleteConfirm";

import { DeleteConfirmState, DeleteConfirmActions } from "typings/app";
import { DeleteConfirm } from "shareComponents/common/DeleteConfirm";

type Props = {
  children: ReactNode;
};

const reducer = (state: DeleteConfirmState, action: DeleteConfirmActions): DeleteConfirmState => {
  switch (action.type) {
    case "OPEN_DELETE_CONFIRM":
      return {
        ...state,
        isDeleteConfirmOpen: true,
        deleteConfirmContent: {
          ...state.deleteConfirmContent,
          ...action.payload
        },
      };
    case "CLOSE_DELETE_CONFIRM":
      return {
        ...state,
        isDeleteConfirmOpen: false,
        deleteConfirmContent: {
          title: "Bạn có muốn xóa không?",
          message: "Dữ liệu của bạn sẽ bị xóa vĩnh viễn và bạn không thể khôi phục lại dữ liệu này",
          deleteAction: () => undefined
        },
      };
    default:
      return state;
  }
};

const DeleteConfirmProvider: FC<Props> = ({ children
}) => {
  const [state, dispatch] = useReducer<
    (state: DeleteConfirmState, action: DeleteConfirmActions) => DeleteConfirmState
  >(reducer, initialState);

  return (
    <DeleteConfirmContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <DeleteConfirm />
      {children}
    </DeleteConfirmContext.Provider>
  );
};

export default DeleteConfirmProvider;
