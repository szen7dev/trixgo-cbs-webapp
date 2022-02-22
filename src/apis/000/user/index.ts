import API from "../repository";

import { 
    UpdateUser, UpdatePasswordUser, PostResponse, ListFriendsPayload, ListUserResponse, UserCodeResponse, CheckCodeUser, CheckCodeResponse, AddFriendPayLoad, UnFriendPayLoad, UpdateAvatarUser, AcceptRequestFriend, RemoveRequestFriend, ListRequestsPayload
} from "typings/user";
import { convertObToUrl } from "helpers";
const userURL = "/api/auth/users";
const friendUrl = "/api/auth/users/messageList-friend"
const codeUrl = "/api/personal/friend-request/get-code"
const checkCodeUrl = "/api/personal/friend-request/check-code"
const requestFriendUrl = "/api/auth/users/messageList-user-receiver-from-friends"
const UserRepository = {
    /**
     * MEDIA
     * @param payload
     * @returns 
     */
    async updateUser(payload: UpdateUser): Promise<PostResponse> {
        const { data } = await API.put<PostResponse>(
            `${userURL}`,
            payload
        );
        return data;
    },
    async updatePasswordUser(payload: UpdatePasswordUser): Promise<PostResponse> {
        const { data } = await API.put<PostResponse>(
            `${userURL}`,
            payload
        );
        return data;
    },
    async updateAvatarUser(payload: UpdateAvatarUser): Promise<PostResponse> {
        const { data } = await API.put<PostResponse>(
            `${userURL}`,
            payload
        );
        return data;
    },
    async checkCodeUser(payload: CheckCodeUser): Promise<CheckCodeResponse> {
        const { data } = await API.post<PostResponse>(
            `${checkCodeUrl}?code=${payload.code}`,
        );
        return data;
    },
    async listFriends(payload: ListFriendsPayload): Promise<ListUserResponse> {
        const { data } = await API.get<ListFriendsPayload>(
            `${friendUrl}?${convertObToUrl(payload)}`
        );
        return data;
    },
    async getCodeUser(): Promise<UserCodeResponse> {
        const { data } = await API.get<UserCodeResponse>(
          `${codeUrl}`
        );
        return data;
    },
    async requestAddFriend(payload: AddFriendPayLoad): Promise<any> {
        const { data } = await API.put(
            `${userURL}`,
            payload
        );
        return data;
    },
    async requestUnFriend(payload: UnFriendPayLoad): Promise<any> {
        const { data } = await API.put(
            `${userURL}`,
            payload
        );
        return data;
    },
    async listRequestFriends(payload: ListRequestsPayload): Promise<ListUserResponse> {
        const { data } = await API.get<ListRequestsPayload>(
            `${requestFriendUrl}?${convertObToUrl(payload)}`
        );
        return data;
    },
    async acceptRequestFriend(payload: AcceptRequestFriend): Promise<any> {
        const { data } = await API.put(
            `${userURL}`,
            payload
        );
        return data;
    },
    async removeRequestFriend(payload: RemoveRequestFriend): Promise<any> {
        const { data } = await API.put(
            `${userURL}`,
            payload
        );
        return data;
    },
};

export default UserRepository;
