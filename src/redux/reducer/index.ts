import { combineReducers } from 'redux';
import DemoSlice from './DemoSlice';
import MediaSlice from './SocialSlice';

const rootReducer = combineReducers({
    demo: DemoSlice,
    medias: MediaSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
