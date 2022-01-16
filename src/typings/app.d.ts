import { ReactNode } from "react";

import { ThunkAction, Action } from "@reduxjs/toolkit";

import Store from "data/store";

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type ModalState = {
  isModalOpen: boolean;
  modalContent: ReactNode;
};
export type OpenModal = {
  type: "OPEN_MODAL";
  payload: ReactNode;
};
export type CloseModal = {
  type: "CLOSE_MODAL";
};
export type ModalActions = OpenModal | CloseModal;

export type Theme = "light" | "dark";
export type ThemeState = {
  theme: Theme;
};
export type ToggleTheme = {
  type: "TOGGLE_THEME";
  payload: Theme;
};
export type ThemeActions = ToggleTheme;

export type RowPlanningFinancial = {
  collapsed: boolean;
  _id: string|number;
  tt?: string|number;
  content?: string;
  ngayDuKien?: string;
  duKienThu?: string|number;
  thucTheThu?: string|number;
  duKienChi?: string|number;
  thucTeChi?: string|number;
  ngayThucTe?: string;
  hopDong?: string|number;
  ghiChu?: string;
  childrens?: RowPlanningFinancial[]
}

export type DeleteConfirmContent = {
  deleteAction: () => void;
  title?: string;
  message?: string;
}

export type DeleteConfirmState = {
  isDeleteConfirmOpen: boolean;
  deleteConfirmContent: DeleteConfirmContent;
};
export type OpenDeleteConfirm = {
  type: "OPEN_DELETE_CONFIRM";
  payload: DeleteConfirmContent;
};
export type CloseDeleteConfirm = {
  type: "CLOSE_DELETE_CONFIRM";
};
export type DeleteConfirmActions = OpenDeleteConfirm | CloseDeleteConfirm;

export type PopupSendFilesContent = {
  files: any[];
  sendType: "image"|"file";
  defaultSendType: "image"|"file";
  conversationID: string;
  handleSendFile: (message: any, useCompress=true) => void
}

export type PopupSendFilesState = {
  isShowPopupSendFiles: boolean;
  popSendFilesContent: PopupSendFilesContent;
}

export type OpenPopupSendFiles = {
  type: "OPEN_POPUP_SEND_FILES";
  payload: PopupSendFilesContent;
}

export type ClosePopupSendFiles = {
  type: "CLOSE_POPUP_SEND_FILES"
}

export type SetSendTypePopupSendFiles = {
  type: "SET_SEND_TYPE",
  payload: "image"|"file"
}

export type PopupSendFilesActions = OpenPopupSendFiles | ClosePopupSendFiles | SetSendTypePopupSendFiles;
