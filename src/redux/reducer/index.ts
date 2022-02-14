import { combineReducers } from 'redux';
import DemoSlice from './DemoSlice';
import FinancialPlanningDetailSlice from './FinancialPlanningDetailSlice';
import TimesheetDetailSlice from './Timesheet'
import ListConverSationSlice from './messages/ListConversation';
import ListMessageSlice from './messages/ListMessage';
import ShareMessageSlice from './messages/ShareMessage';
import DeleteAndRevokeMessageSlice from './messages/DeleteAndRevokeMessage';

const rootReducer = combineReducers({
    demo: DemoSlice,
    financialPlanningDetails: FinancialPlanningDetailSlice,
    timesheetDetail: TimesheetDetailSlice,
    listConversation: ListConverSationSlice,
    listMessage: ListMessageSlice,
    shareMessage: ShareMessageSlice,
    deleteAndRevokeMessage: DeleteAndRevokeMessageSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
