import createDataContext from "services/contexts/createDataContext";

import modalActions from "./modal.actions";

import modalReducers from "./modal.reducer";
import { modalState } from "./modal.state";

export const { Provider: ModalProvider, Context: ModalContext } =
  createDataContext(modalReducers, modalActions, modalState);
