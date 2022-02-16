/* eslint-disable @typescript-eslint/no-explicit-any */
export type Action<T extends (...args: any[]) => any> = (
  dispatch: React.Dispatch<DispatchProps>
) => T;

export interface DispatchProps {
	type: string;
	payload?: any;
}

export interface ReducerActionsProps {
	type: string;
	payload?: unknown;
}

export interface ProviderState {
	initialValue?: {
		[key: string]: any;
	};
}

export type Effect<A> = (action: A) => any;
export type IR<S, A> = (state: S, action: A) => S;

// Type actions with parameters
export type Dispatch<A> = {
	[key in keyof A]: A[key] extends (...args: infer _A) => infer R ? R : never;
}

export type DispatchAction = React.Dispatch<DispatchProps>;