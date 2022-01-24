import { combineReducers } from 'redux';
import DemoSlice from './DemoSlice';
import FinancialPlanningDetailSlice from './FinancialPlanningDetailSlice';
import TimesheetDetailSlice from './Timesheet'
import ListConverSationSlice from './messages/ListConversation';
import ListMessageSlice from './messages/ListMessage';

const rootReducer = combineReducers({
    demo: DemoSlice,
    financialPlanningDetails: FinancialPlanningDetailSlice,
    timesheetDetail: TimesheetDetailSlice,
    listConversation: ListConverSationSlice,
    listMessage: ListMessageSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
