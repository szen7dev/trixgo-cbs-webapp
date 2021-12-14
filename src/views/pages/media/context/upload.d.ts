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

interface IMethodImages {
  setUploadImage: dispatch;
  setUploadImageProgress: (id: number | string, progress: number) => void;
  successUploadImage: (id: number | string) => void;
  failureUploadImage: dispatch;
  uploadImage: dispatch;
  cancelUploadImage: dispatch;
  removeUploadedImage: dispatch;
  errorUploadImage: dispatch;
}

interface IMethodFiles {
  setUploadFile: dispatch;
  setUploadFileProgress: dispatch;
  successUploadFile: dispatch;
  failureUploadFile: dispatch;
  uploadFile: dispatch;
  cancelUploadFile: dispatch;
  removeUploadedFile: dispatch;
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
