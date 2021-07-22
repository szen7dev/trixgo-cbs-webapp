import { APIResponse } from "./response";
import { User } from "../auth";

export type GetFriendContactsPayload = {
  userId: string;
};

export type GetFriendContactsResponse = APIResponse & {
  result: User[];
};
