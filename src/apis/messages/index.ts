import API from "../repository";
import { convertObToUrl } from "utils";

import {
    AddFolderPayload,
    AddFolderResponse,
    CheckExistConversationResponse,
    ConversationInformarionResponse,
    ConvversationInformationPayload,
    CreateConversationPayload,
    CreateConversationResponse,
    DeleteFolderPayload,
    DeleteFolderResponse,
    GeneralGroupByMemberPayload,
    GeneralGroupByMemberResponse,
    ListConversationPayload,
    ListConversationResponse,
    ListFoldersConversationPayload,
    ListFoldersConversationResponse,
    ListMembersOfConversationPayload,
    ListMembersOfConversationResponse,
    MediasOfConversationPayload,
    MediasOfConversationResponse,
    UpdateFolderPayload,
    UpdateFolderResponse
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
    }
};

export default ListConversationRepository;
