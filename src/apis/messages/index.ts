import API from "../repository";
import { convertObToUrl } from "helpers";

import {
    CheckExistConversationResponse,
    CreateConversationPayload,
    CreateConversationResponse, GeneralGroupByMemberPayload, GeneralGroupByMemberResponse,
    ListConversationPayload,
    ListConversationResponse,
    ListMembersOfConversationPayload,
    ListMembersOfConversationResponse,
    MediasOfConversationPayload,
    MediasOfConversationResponse
} from "typings/apis/messages/listConversation";
const getListConversationURL = "/api/chatting/conversations/list-conversation-with-page";
const getListMembersOfConversationURL = "/api/chatting/conversations/list-members-conversation";
const checkExistConversation = "/api/chatting/conversations/check-exists-conversation";
const createConversation = "/api/chatting/conversations/create-conversation";
const mediasOfConversation = "/api/chatting/conversations/list-message-media-conversation";
const generalGroupOfMember = "/api/chatting/conversations/info-general-group-by-member";

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
    }

};

export default ListConversationRepository;
