/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import modalTypes from "./modal.types";

// Typescript
import { DispatchAction } from "typings/ppt/reducer";

const modalActions = (dispatch: DispatchAction) => ({
  toggleModal: () => {
    return dispatch({
      type: modalTypes.TOGGLE_MODAL,
    });
  },
  openAddUserRelation() {
    return dispatch({
      type: modalTypes.OPEN_ADD_USER_RELATION,
    });
  },
  openAddNotificationEmail() {
    return dispatch({ type: modalTypes.OPEN_ADD_NOTIFICATION_EMAIL });
  },
});

export default modalActions;
