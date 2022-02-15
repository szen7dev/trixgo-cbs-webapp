import { combineReducers } from 'redux';
import DemoSlice from './DemoSlice';
import FinancialPlanningDetailSlice from './FinancialPlanningDetailSlice';
import TimesheetDetailSlice from './Timesheet'
import ListConverSationSlice from './messages/ListConversation';
import ListMessageSlice from './messages/ListMessage';
import ShareMessageSlice from './messages/ShareMessage';
import ContactMessageSlice from './messages/ContactMessage';
import DeleteAndRevokeMessageSlice from './messages/DeleteAndRevokeMessage';
import CreatePollSlice from './messages/CreatePoll';
import CreateReminderSlice from './messages/CreateReminder';
import CreateNPSMessageSlice from './messages/CreateNPSMessage';

const rootReducer = combineReducers({
    demo: DemoSlice,
    financialPlanningDetails: FinancialPlanningDetailSlice,
    timesheetDetail: TimesheetDetailSlice,
    listConversation: ListConverSationSlice,
    listMessage: ListMessageSlice,
    shareMessage: ShareMessageSlice,
    contactMessage: ContactMessageSlice,
    deleteAndRevokeMessage: DeleteAndRevokeMessageSlice,
    createPoll: CreatePollSlice,
    createReminder: CreateReminderSlice,
    createNPSMessage: CreateNPSMessageSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
