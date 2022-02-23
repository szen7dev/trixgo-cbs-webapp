import { ImageProps, MediaAuthor } from "typings/media";

export const state = {
  /** Media id */
  mediaID: "",

  type: "post", // post or comment

  author: undefined,
  createAt: "",
  images: [] as ImageProps[], // list image
  index: 0, // index init image
};

export type PostState = Omit<typeof state, "type" | "author"> & {
  type?: "post" | "comment" | "reply";
  author?: MediaAuthor;
  createAt?: string,
};
