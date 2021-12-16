import { combineReducers } from 'redux';
import DemoSlice from './DemoSlice';
import MediaSlice from './SocialSlice';
import FinancialPlanningDetailSlice from './FinancialPlanningDetailSlice';

const rootReducer = combineReducers({
    demo: DemoSlice,
    medias: MediaSlice,
    financialPlanningDetails: FinancialPlanningDetailSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
