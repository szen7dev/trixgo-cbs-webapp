/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context, createContext, Dispatch as ReactDispatch, FC, Reducer, useEffect, useReducer } from 'react';

// Typescript 
import { Dispatch, Effect, ReducerActionsProps, IR, DispatchProps, ProviderState } from 'typings/ppt/reducer';

function createDataContext<R extends Reducer<any, any>, A extends (dispatch: ReactDispatch<DispatchProps>) => any, S>(
	reducer: R,
	action: A,
	defaultValues: S,
	effect?: Effect<Dispatch<A>>
): { Context: Context<{ state: S } & ReturnType<A>>, Provider: FC<ProviderState> } {
	const Context = createContext(Object.assign({
		state: defaultValues,
	}));

	const Provider: FC<ProviderState> = ({ children, initialValue }) => {
		const [state, dispatch] = useReducer(reducer as IR<S, ReducerActionsProps>, Object.assign(defaultValues, initialValue));

		const boundActions: ReturnType<A> = action(dispatch)

		useEffect(() => {
			if (effect) effect(boundActions);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		return (
			<Context.Provider value={Object.assign({ state, ...boundActions })}>
				{children}
			</Context.Provider>
		)
	}

	return { Context, Provider }
}

export default createDataContext;
