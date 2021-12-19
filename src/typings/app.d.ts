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
