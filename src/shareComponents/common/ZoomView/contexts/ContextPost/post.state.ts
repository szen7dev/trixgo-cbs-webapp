import { ImageProps } from "typings/media";

export const state = {
  /** Media id */
  mediaID: "",

  type: "post", // post or comment

  images: [] as ImageProps[], // list image
  index: 0, // index init image
};

export type PostState = Omit<typeof state, "type"> & {
  type?: "post" | "comment" | "reply";
};
