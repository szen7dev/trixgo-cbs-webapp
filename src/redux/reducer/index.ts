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
import DetailNPSMessageSlice from './messages/DetailNPSMessage';
import AddUserToConversationSlice from './messages/AddUserToConversation';
import SearchMessageSlice from './messages/SearchMessage';

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
    detailNPSMessage: DetailNPSMessageSlice,
    addUserToConversation: AddUserToConversationSlice,
    searchMessage: SearchMessageSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
