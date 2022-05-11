import modalTypes from "./modal.types";

import { DispatchAction } from "typings/ppt/reducer";

const modalActions = (dispatch: DispatchAction) => ({
  toggleModal: () => {
    return dispatch({ type: modalTypes.TOGGLE_MODAL });
  },
  openAddUserRelation() {
    return dispatch({ type: modalTypes.OPEN_ADD_USER_RELATION });
  },
  openAddNotificationEmail() {
    return dispatch({ type: modalTypes.OPEN_ADD_NOTIFICATION_EMAIL });
  },
  openMoveTaskToParent() {
    return dispatch({ type: modalTypes.OPEN_MOVE_TASK_TO_PARENT });
  },
  openMoveTaskToGroup() {
    return dispatch({ type: modalTypes.OPEN_MOVE_TASK_TO_GROUP });
  },
  openUpdateMilestone() {
    return dispatch({ type: modalTypes.OPEN_UPDATE_MILESTONE });
  },
});

export default modalActions;
