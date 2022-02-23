import { useReducer } from 'react';
import { IActions, IMethod, ISTATE, TReducer } from './Upload/upload';

function useCustomReducer<T extends IMethod>(reducer: TReducer,
	action: IActions,
	defaultValues: ISTATE): [ISTATE, T] {
	const [state, dispatch] = useReducer(reducer, defaultValues);

	const boundActions: IMethod = {}

	for (const key in action) {
		boundActions[key] = action[key](dispatch)
	}

	return [state, boundActions as T];
}

export default useCustomReducer;