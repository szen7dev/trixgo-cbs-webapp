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

interface IMethodComment {
  setComment: dispatch;
  setCommentReply: dispatch;
  uploadImage: dispatch;
  cancelUploadImage: dispatch;
  removeUploadedImage: dispatch;
  errorUploadImage: dispatch;
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
