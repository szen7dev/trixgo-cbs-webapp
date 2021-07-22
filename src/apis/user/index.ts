import API from "apis/repository";

import {
  GetFriendContactsPayload,
  GetFriendContactsResponse,
} from "typings/apis/user";

import { GET_FRIEND_CONTACTS_API_URL } from "utils/constants";

const usersURL = "/users";

const UserRepository = {
  async getFriendContacts(
    params: GetFriendContactsPayload
  ): Promise<GetFriendContactsResponse> {
    const { data } = await API.get<GetFriendContactsResponse>(
      `${usersURL}${GET_FRIEND_CONTACTS_API_URL}`,
      {
        params,
      }
    );

    return data;
  },
};

export default UserRepository;
