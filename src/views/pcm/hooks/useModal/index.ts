import useCustomReducer from "services/hooks/useCustomReducer";
import modalActions from "./modal.actions";
import modalReducers from "./modal.reducer";
import modalState from "./modal.state";

const useModal = () =>
  useCustomReducer(modalReducers, modalActions, modalState);
export default useModal;
