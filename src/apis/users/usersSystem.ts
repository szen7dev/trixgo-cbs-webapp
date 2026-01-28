import API from "../repository";
import type { QueryParam, UserSystemPayload, ListUserInProjectPayload, DataResponse } from 'typings/users/userSystem';
import { USER_URL } from '.';

const selectUserProperties = "_id bizfullname fullname email image company department position level status lastLog numLog phone note storageUse startingTime createAt modifyAt contacts";
const populateUserProperties = JSON.stringify({
    path: "company department position contacts",
    select: "_id name sign"
})

export const UserSystemRepository = {
    async listUserInProject(params: ListUserInProjectPayload): Promise<DataResponse> {
        const { data } = await API.get<Promise<DataResponse>>(
            USER_URL, {
            params: {
                select: selectUserProperties,
                populates: populateUserProperties,
                ...params,
            }
        })
        return data;
    },

    async listUsersSystem(params?: QueryParam): Promise<any> {
        const { data } = await API.get<Promise<any>>(
            USER_URL, {
            params: {
                select: selectUserProperties,
                populates: populateUserProperties,
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
                select: selectUserProperties
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
    },

    async importUserSystem(data: any) {
        const { data: result } = await API.post(`${USER_URL}/import-from-excel`, data);
        return result;
    }

    // async importUserSystem(payload: UserSystemPayload): Promise<any> {
    //     const { data } = await API.post<Promise<any>>(
    //         `${USER_URL}/import-from-excel`,
    //         payload
    //     )
    //     return data;
    // }
}