/* eslint-disable @typescript-eslint/no-explicit-any */
interface IFile {
  [key: string]: any;
}

interface ISTATE {
  files: IFile;
  images: IFile;
}
interface IAction {
  type: string;
  payload: any;
}

type IDispatch = (payload: any) => () => void;

type TReducer = (state: ISTATE, action: IAction) => ISTATE;

interface IMethod {
  setUploadFile: dispatch;
  setUploadImage: dispatch;
  setUploadImage: dispatch;
  setUploadImageProgress: dispatch;
  successUploadImage: dispatch;
  failureUploadImage: dispatch;
  uploadImage: dispatch;
	cancelUploadImage: dispatch;

  setUploadFile: dispatch;
  setUploadFileProgress: dispatch;
  successUploadFile: dispatch;
  failureUploadFile: dispatch;
  uploadFile: dispatch;
	cancelUploadFile: dispatch;
  [key: string]: dispatch;
}

export type TUseUpload = (
  reducer: TReducer,
  action: IActions,
  defaultValues: IState
) => [ISTATE, IMethod];

type dispatch<T extends (...args: any) => any> = (...payload: T) => void;
type TAction = (dispatch: React.Dispatch<IAction>) => dispatch;

interface IActions {
  [key: string]: TAction;
}
