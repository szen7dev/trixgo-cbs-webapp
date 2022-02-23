/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FileProps } from "typings/media";
import useCustomReducer from "../useCustomReducer";
import uploadActions from "./upload.actions";
import fileUploadReducer, { INITIAL_STATE } from "./upload.reducer";
import { modifyUploadedFiles } from "./upload.utils";

interface Props {
  files?: FileProps[];
  images?: FileProps[];
}

function useUploadFile(params?: Props) {
  return useCustomReducer(
    fileUploadReducer,
    uploadActions,
    modifyUploadedFiles(INITIAL_STATE, params?.files||[], params?.images||[])
  );
}
export default useUploadFile;