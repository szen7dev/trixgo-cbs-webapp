/* eslint-disable @typescript-eslint/no-explicit-any */
import { DispatchProps } from "typings/ppt/reducer";
interface IFile {
  [key: string]: any;
}

interface ISTATE {
  files: IFile;
  images: IFile;
}

type IDispatch = (payload: any) => () => void;

type TReducer = (state: ISTATE, action: DispatchProps) => ISTATE;

interface IMethod {
  [key: string]: dispatch;
}

export type TUseUpload<T> = (
  reducer: TReducer,
  action: IActions,
  defaultValues: ISTATE
) => [ISTATE, T];

type dispatch<T extends (...args: any) => any> = (...payload: T) => void;
type TAction = (dispatch: React.Dispatch<DispatchProps>) => dispatch;

interface IActions {
  [key: string]: TAction;
}
