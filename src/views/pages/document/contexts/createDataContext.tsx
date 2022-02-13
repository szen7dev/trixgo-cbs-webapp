import { Context, createContext, FC, useReducer } from 'react';

interface IAction {
	type: string;
	payload?: unknown;
}

interface ReducerActionsProps {
	type: string;
	payload?: any;
}

type dispatch = (...any: unknown[]) => void;
type TAction = (dispatch: React.Dispatch<IAction>) => dispatch;
type IActions<K> = {
	[key in keyof K]: dispatch;
}

type ActionsProps<A> = {
	[key in keyof A]: TAction
}

interface ProviderState {
	initialValue?: {
		[key: string]: any;
	};
}

type IR<S, A> = (state: S, action: A) => S

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createDataContext<_R, A, S>(
	reducer: IR<S, ReducerActionsProps>,
	action: ActionsProps<A>,
	defaultValues: S
): { Context: Context<{ state: S } & IActions<A>>, Provider: FC<ProviderState> } {
	const Context = createContext<{ state: S } & IActions<A>>(Object.assign({ state: defaultValues }));

	const Provider: FC<ProviderState> = ({ children, initialValue }) => {
		const [state, dispatch] = useReducer(reducer, Object.assign(defaultValues, initialValue));

		const boundActions: { [key: string]: unknown } = {}

		for (const key in action) {
			boundActions[key] = action[key](dispatch)
		}
		return (
			<Context.Provider value={Object.assign({ state, ...boundActions })}>
				{children}
			</Context.Provider>
		)
	}

	return { Context, Provider }
}

export default createDataContext;