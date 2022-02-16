/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, Reducer, Dispatch as ReactDispatch } from "react";

import { ReducerActionsProps, IR, DispatchProps } from "typings/ppt/reducer";

function useCustomReducer<
  R extends Reducer<any, any>,
  A extends (dispatch: ReactDispatch<DispatchProps>) => any,
  S
>(reducer: R, action: A, defaultValues: S): [S, ReturnType<A>] {
  const [state, dispatch] = useReducer(
    reducer as IR<S, ReducerActionsProps>,
    defaultValues
  );

  const boundActions = action(dispatch);

  return [state, boundActions];
}

export default useCustomReducer;
