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
import MiniChatSlice from './messages/MiniChat';
import PopUpSendFileAndImageSlice from './messages/PopupSendImageAndFile';
import RightClickMenuSlice from './RightClickMenu';
import UnreadMessagesSlice from './messages/UnreadMessages';
import ListFoldersSlice from './messages/ListFolders';
import CreateUpdateFolderSlice from './messages/CreateUpdateFolder';
import DeleteConfirmFolderSlice from './messages/DeleteConfirmFolder';
import AddConversationToFolderSlice from './messages/AddConversationToFolder';
import UsersSeenDetailSlice from './messages/UsersSeenDetail';
import NotificationMuteSlice from './messages/NotificationMute';
import DeleteConfirmSlice from './DeleteConfirm';
import ConfigConversationSlice from './messages/ConversationConfigModal';
import UserSlice from './UserInfo';
import MessageNPSVoteDetailSlice from './messages/MessageNPSVoteDetail';

const combinedReducer = combineReducers({
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
    miniChat: MiniChatSlice,
    popUpSendFileAndImage: PopUpSendFileAndImageSlice,
    rightClickMenu: RightClickMenuSlice,
    unreadMessages: UnreadMessagesSlice,
    listFolders: ListFoldersSlice,
    createUpdateFolder: CreateUpdateFolderSlice,
    deleteConfirmFolder: DeleteConfirmFolderSlice,
    addConversationToFolder: AddConversationToFolderSlice,
    usersSeenDetail: UsersSeenDetailSlice,
    notificationMute: NotificationMuteSlice,
    deleteConfirm: DeleteConfirmSlice,
    configConversation: ConfigConversationSlice,
    user: UserSlice,
    messageNpsVoteDetail: MessageNPSVoteDetailSlice
});
const rootReducer = (state: any, action: any) => {
    if (action.type === 'user/logout') {
        state = undefined;
    }
    return combinedReducer(state, action);
};
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
