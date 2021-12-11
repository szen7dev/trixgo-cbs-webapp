import { useReducer } from 'react';
import { dispatch, IMethod, TUseUpload } from './upload';

interface IBoundActions {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: dispatch<any>
}

const useUpload: TUseUpload = (reducer, action, defaultValues) => {
	const [state, dispatch] = useReducer(reducer, defaultValues);

	const boundActions: IBoundActions = {}

	for (const key in action) {
		boundActions[key] = action[key](dispatch)
	}
	return [state, boundActions as IMethod];
}

export default useUpload;