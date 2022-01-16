import API from "../repository";
import type { 
    ListFriendPayload,
    QueryFriendResponse
} from 'typings/users/firends';

import { USER_URL } from '.';

async function fetchListFriend<T>(params?: ListFriendPayload): Promise<T> {
    const { data } = await API.get(
        `${USER_URL}/list-friend`, {
        params: {
            select: 'fullname image',
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
