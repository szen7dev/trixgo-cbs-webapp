import API from "../repository";
import type { QueryParam, UserSystemPayload } from 'typings/users/userSystem';
import { USER_URL } from '.';

export const UserSystemRepository = {
    async listUsersSystem(params?: QueryParam): Promise<any> {
        const { data } = await API.get<Promise<any>>(
            USER_URL, {
            params: {
                populates: JSON.stringify({
                    path: "company department position",
                    select: "_id name sign"
                }),
                ...params,
            }
        })
        return data;
    },
    async infoUsersSystem(userID: string): Promise<any> {
        const { data } = await API.get<Promise<any>>(
            USER_URL, {
            params: {
                userID,
                // select: "_id fullname email company department position level"
            }
        })
        return data;
    },
    async addUserSystem(payload: UserSystemPayload): Promise<any> {
        const { data } = await API.post<Promise<any>>(
            USER_URL,
            payload
        )
        return data;
    },
    async updateUserSystem(payload: UserSystemPayload): Promise<any> {
        const { data } = await API.put<Promise<any>>(
            USER_URL,
            payload
        )
        return data;
    },
    async deleteUserSystem(usersID: string[]): Promise<any> {
        const { data } = await API.delete<Promise<any>>(
            USER_URL, {
            params: { usersID }
        })
        return data;
    }
}