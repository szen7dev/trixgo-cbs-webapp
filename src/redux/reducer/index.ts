import { combineReducers } from 'redux';
import DemoSlice from './DemoSlice';
import FinancialPlanningDetailSlice from './FinancialPlanningDetailSlice';
import TimesheetDetailSlice from './Timesheet'
import ListConverSationSlice from './messages/ListConversation';
import ListMessageSlice from './messages/ListMessage';
import ShareMessageSlice from './messages/ShareMessage';
import DeleteAndRevokeMessageSlice from './messages/DeleteAndRevokeMessage';
import CreatePollSlice from './messages/CreatePoll';
import CreateReminderSlice from './messages/CreateReminder';

const rootReducer = combineReducers({
    demo: DemoSlice,
    financialPlanningDetails: FinancialPlanningDetailSlice,
    timesheetDetail: TimesheetDetailSlice,
    listConversation: ListConverSationSlice,
    listMessage: ListMessageSlice,
    shareMessage: ShareMessageSlice,
    deleteAndRevokeMessage: DeleteAndRevokeMessageSlice,
    createPoll: CreatePollSlice,
    createReminder: CreateReminderSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
