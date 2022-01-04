import { useReducer } from 'react';

type IR<S, A> = (state: S, action: A) => S

interface ReducerActionsProps {
	type: string;
	payload: unknown;
}

type dispatch = (...any: unknown[]) => void;
type TAction = (dispatch: React.Dispatch<ReducerActionsProps>) => dispatch;
type IActions<K> = {
	[key in keyof K]: dispatch;
}

type ActionsProps<A> = {
	[key in keyof A]: TAction
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useCustomReducer<_R, A, S>(
	reducer: IR<S, ReducerActionsProps>,
	action: ActionsProps<A>,
	defaultValues: S): [S, IActions<A>] {
	const [state, dispatch] = useReducer(reducer, defaultValues);

	const boundActions: { [key: string]: unknown } = {}

	for (const key in action) {
		boundActions[key] = action[key](dispatch)
	}

	return [state, boundActions as IActions<A>];
}

export default useCustomReducer;