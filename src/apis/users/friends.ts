import API from "../repository";
import type { 
    ListFriendPayload,
    QueryFriendResponse
} from 'typings/users/friends';

import { USER_URL } from '.';

async function fetchListFriend<T>(params?: ListFriendPayload): Promise<T> {
    const { data } = await API.get(
        `${USER_URL}/list-friend`, {
        params: {
            select: '_id fullname bizfullname email phone image',
            populates: JSON.stringify({
                path: "company",
                select: "_id name sign"
            }),
            ...params,
        }
    }
    )
    return data;
}

interface ListFriendRepository {
    fetchListFriend: (params?: ListFriendPayload) => Promise<QueryFriendResponse>;
}

export const friendRepository: ListFriendRepository = {
    fetchListFriend: async (params) => {
        return fetchListFriend(params)
    },
}
