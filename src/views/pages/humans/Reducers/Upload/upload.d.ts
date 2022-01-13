/* eslint-disable @typescript-eslint/no-explicit-any */
interface IFile {
  [key: string]: any;
}

interface ISTATE {
  files: IFile;
}
interface IAction {
  type: string;
  payload: any;
}

type IDispatch = (payload: any) => () => void;

type TReducer = (state: ISTATE, action: IAction) => ISTATE;

interface IMethodFileCommon {
  removeAllFiles: (id?: number | string) => void;
}

export interface IMethodFiles {
  setUploadFile: dispatch;
  setUploadFileProgress: dispatch;
  setIDFileUploaded: dispatch;
  successUploadFile: dispatch;
  failureUploadFile: dispatch;
  uploadFile: dispatch;
  cancelUploadFile: dispatch;
  removeUploadedFile: dispatch;
  removeAllFiles: (id?: number | string) => void;
}

interface IMethod {
  [key: string]: dispatch;
}

export type TUseUpload<T> = (
  reducer: TReducer,
  action: IActions,
  defaultValues: ISTATE
) => [ISTATE, T];

type dispatch<T extends (...args: any) => any> = (...payload: T) => void;
type TAction = (dispatch: React.Dispatch<IAction>) => dispatch;

interface IActions {
  [key: string]: TAction;
}
