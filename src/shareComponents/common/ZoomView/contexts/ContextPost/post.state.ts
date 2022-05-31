import { ImageProps } from "typings/common";
import { User } from "typings/user";

export const state = {
  mediaID: "",
  type: "post", // post or comment
  author: undefined,
  createAt: "",
  images: [] as ImageProps[], // list image
  index: 0, // index init image
};

export type PostState = Omit<typeof state, "type" | "author"> & {
  type?: "post" | "comment" | "reply";
  description?: string;
  author?: User;
  createAt?: string;
};
