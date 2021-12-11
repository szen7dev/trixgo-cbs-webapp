import { combineReducers } from 'redux';
import DemoSlice from './DemoSlice';
const rootReducer = combineReducers({
    demo: DemoSlice
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
