/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { v4 as uuid } from "uuid";

export const commentDummy = (content: string) => ({
  _id: uuid(),
  state: 1,
  media: "620b09c36a97815180b079b5",
  file: "620b09c06a97815180b079b1",
  comment: {
    _id: uuid(),
    files: [],
    images: [],
    amountCommentReply: 0,
    amountReaction: 0,
    content: content,
    createAt: new Date().toISOString(),
  },
  userCreate: {
    _id: "6078102a1283502250f8ba12",
    image: "3222c61c-d206-44c2-aa5d-bd315407344f.jpg",
    createAt: "2021-04-15T10:06:34.000Z",
    fullname: "Nguyễn Hữu Hiệp",
  },
  createAt: "2022-02-16T13:37:25.118Z",
  modifyAt: "2022-02-16T13:37:25.118Z",
  parent: "620cfcb66b34852bbd2cd0a1",
  createdAt: "2022-02-16T13:37:25.119Z",
  updatedAt: "2022-02-16T13:37:25.119Z",
  __v: 0,
});
