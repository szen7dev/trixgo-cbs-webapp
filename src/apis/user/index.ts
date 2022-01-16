import API from "../repository";

import { 
    UpdateUser, UpdatePasswordUser, PostResponse, ListFriendsPayload, ListUserResponse
} from "typings/user";
import { convertObToUrl } from "helpers";
const userURL = "/api/auth/users";
const friendUrl = "/api/auth/users/list-friend"
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
    async listFriends(payload: ListFriendsPayload): Promise<ListUserResponse> {
        const { data } = await API.get<ListFriendsPayload>(
            `${friendUrl}?${convertObToUrl(payload)}`
        );
        return data;
    },
};

export default UserRepository;
