import API from "../repository";
import { convertObToUrl } from "utils";

import {
    AddConversationToFolderPayload,
    AddConversationToFolderResponse,
    AddFolderPayload,
    AddFolderResponse,
    CheckExistConversationResponse,
    ConversationInformarionResponse,
    ConvversationInformationPayload,
    CreateConversationPayload,
    CreateConversationResponse,
    DeleteConversationPayload,
    DeleteConversationResponse,
    DeleteFolderPayload,
    DeleteFolderResponse,
    DeleteHistoryConversationPayload,
    DeleteHistoryConversationResponse,
    GeneralGroupByMemberPayload,
    GeneralGroupByMemberResponse,
    HideConversationPayload,
    HideConversationResponse,
    LeaveConversationPayload,
    LeaveConversationResponse,
    ListConversationPayload,
    ListConversationResponse,
    ListFoldersConversationPayload,
    ListFoldersConversationResponse,
    ListMembersOfConversationPayload,
    ListMembersOfConversationResponse,
    MarkReadConversationPayload,
    MarkReadConversationResponse,
    MediasOfConversationPayload,
    MediasOfConversationResponse,
    PinConversationPayload,
    PinConversationResponse,
    UpdateConversationPayload,
    UpdateConversationResponse,
    UpdateFolderPayload,
    UpdateFolderResponse,
    UpdateMuteConversationPayload,
    UpdateMuteConversationResponse
} from "typings/apis/messages/listConversation";
const getListConversationURL = "/api/chatting/conversations/list-conversation-with-page";
const getListMembersOfConversationURL = "/api/chatting/conversations/list-members-conversation";
const checkExistConversation = "/api/chatting/conversations/check-exists-conversation";
const createConversation = "/api/chatting/conversations/create-conversation";
const mediasOfConversation = "/api/chatting/conversations/list-message-media-conversation";
const generalGroupOfMember = "/api/chatting/conversations/info-general-group-by-member";
const conversationInformation = "/api/chatting/conversations/info-conversation";
const listFolder = "/api/chatting/conversations/list-folder";
const createFolder = "/api/chatting/conversations/create-folder";
const updateFolder = "/api/chatting/conversations/update-folder";
const deleteFolder = "/api/chatting/conversations/delete-folder";
const addConversationToFolder = "/api/chatting/conversations/update-conversation-to-folder";
const updateMuteConversation = "/api/chatting/conversations/update-mute-conversation";
const updateConversation = "/api/chatting/conversations/update-conversation";
const pinConversation = "/api/chatting/conversations/update-pin-conversation";
const hideConversation = "/api/chatting/conversations/update-hide-conversation";
const markReadConversation = "/api/chatting/conversations/mark-read-conversation";
const deleteHistoryConversation = "/api/chatting/conversations/delete-history-conversation";
const deleteConversation = "/api/chatting/conversations/delete-conversation";
const leaveConversation = "/api/chatting/conversations/member-leave-conversation";

const ListConversationRepository = {
    async getListConversation(payload: ListConversationPayload): Promise<ListConversationResponse> {
        const { data } = await API.get<ListConversationResponse>(
            `${getListConversationURL}?${convertObToUrl(payload)}`
        );

        return data;
    },

    async getListMembersOfConversation(payload: ListMembersOfConversationPayload): Promise<ListMembersOfConversationResponse> {
        const { data } = await API.get<ListMembersOfConversationResponse>(
            `${getListMembersOfConversationURL}?${convertObToUrl(payload)}`
        )

        return data;
    },

    async createConversation(payload: CreateConversationPayload): Promise<CreateConversationResponse> {
        const {data} = await API.post<CreateConversationResponse>(
            `${createConversation}`,
            payload
        )

        return data;
    },

    async checkExistConversation(memberId: string): Promise<CheckExistConversationResponse> {
        const { data } = await API.get<CheckExistConversationResponse>(
            `${checkExistConversation}?memberID=${memberId}`
        )

        return data
    },

    async getListImagesOfConversation(payload: MediasOfConversationPayload): Promise<MediasOfConversationResponse> {
        const {data} = await API.get<MediasOfConversationResponse>(
            `${mediasOfConversation}?${convertObToUrl(payload)}`
        )

        return data;
    },

    async getListGeneralGroupByMember(payload: GeneralGroupByMemberPayload): Promise<GeneralGroupByMemberResponse> {
        const {data} = await API.get<GeneralGroupByMemberResponse>(
            `${generalGroupOfMember}?${convertObToUrl(payload)}`
        )

        return data;
    },

    async getConverationInformation(payload: ConvversationInformationPayload): Promise<ConversationInformarionResponse> {
        const {data} = await API.get<ConversationInformarionResponse>(
            `${conversationInformation}?${convertObToUrl(payload)}`
        )

        return data;
    },

    async getListFoldersConversation(payload: ListFoldersConversationPayload) : Promise<ListFoldersConversationResponse> {
        const {data} = await API.get(
            `${listFolder}?${convertObToUrl(payload)}`
        )

        return data;
    },

    async addFolder(payload: AddFolderPayload) : Promise<AddFolderResponse> {
        const {data} = await API.post(
            `${createFolder}`,
            {...payload}
        )

        return data;
    },

    async updateFolder(payload: UpdateFolderPayload) : Promise<UpdateFolderResponse> {
        const {data} = await API.put(
            `${updateFolder}`,
            {...payload}
        )

        return data;
    },

    async deleteFolder(payload: DeleteFolderPayload) : Promise<DeleteFolderResponse> {
        const {data} = await API.delete(
            `${deleteFolder}?${convertObToUrl(payload)}`
        )

        return data;
    },

    async addConversationToFolder(payload: AddConversationToFolderPayload) : Promise<AddConversationToFolderResponse> {
        const {data} = await API.put(
            `${addConversationToFolder}`,
            {...payload}
        )

        return data;
    },

    async updateMuteConversation(payload: UpdateMuteConversationPayload) : Promise<UpdateMuteConversationResponse> {
        const {data} = await API.put(
            `${updateMuteConversation}`,
            {...payload}
        )

        return data;
    },

    async updateConversation(payload: UpdateConversationPayload) : Promise<UpdateConversationResponse> {
        const {data} = await API.put(
            `${updateConversation}`,
            {...payload}
        );

        return data;
    },

    async pinConversation(payload: PinConversationPayload) : Promise<PinConversationResponse> {
        const {data} = await API.put(
            `${pinConversation}`,
            {...payload}
        )

        return data;
    },

    async hideConversation(payload: HideConversationPayload) : Promise<HideConversationResponse> {
        const {data} = await API.put(
            `${hideConversation}`,
            {...payload}
        )

        return data;
    },

    async markReadConversation(payload: MarkReadConversationPayload) : Promise<MarkReadConversationResponse> {
        const {data} = await API.get(
            `${markReadConversation}?${convertObToUrl(payload)}`,
        )

        return data;
    },

    async deleteHistoryConversation(payload: DeleteHistoryConversationPayload) : Promise<DeleteHistoryConversationResponse> {
        const {data} = await API.delete(
            `${deleteHistoryConversation}?${convertObToUrl(payload)}`,
        )

        return data;
    },

    async deleteConversation(payload: DeleteConversationPayload) : Promise<DeleteConversationResponse> {
        const {data} = await API.delete(
            `${deleteConversation}?${convertObToUrl(payload)}`
        )

        return data;
    },

    async leaveConversation(payload: LeaveConversationPayload) : Promise<LeaveConversationResponse> {
        const {data} = await API.get(
            `${leaveConversation}?${convertObToUrl(payload)}`
        )

        return data;
    }
};

export default ListConversationRepository;
