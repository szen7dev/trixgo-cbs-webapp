/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, Reducer, Dispatch as ReactDispatch } from "react";

import {
  Dispatch,
  ReducerActionsProps,
  IR,
  DispatchProps,
} from "typings/ppt/reducer";

function useCustomReducer<
  R extends Reducer<any, any>,
  A extends Record<any, (dispatch: ReactDispatch<DispatchProps>) => any>,
  S
>(reducer: R, action: A, defaultValues: S): [S, Dispatch<A>] {
  const [state, dispatch] = useReducer(
    reducer as IR<S, ReducerActionsProps>,
    defaultValues
  );

  const boundActions: { [key: string]: unknown } = {};

  for (const key in action) {
    boundActions[key] = action[key](dispatch);
  }

  return [state, boundActions as Dispatch<A>];
}

export default useCustomReducer;
