import createDataContext from "../createDataContext";
import modalActions from "./modal.actions";

import modalReducers, { INITIAL_STATE } from "./modal.reducer";

export const { Context, Provider } = createDataContext(modalReducers, modalActions, INITIAL_STATE);