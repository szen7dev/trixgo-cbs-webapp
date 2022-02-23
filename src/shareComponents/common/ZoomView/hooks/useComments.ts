import {
  CommentWithReply,
  CommentBody,
  Response,
  ListRecord,
  CommentDetail,
} from "typings/ppt/comment.d";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import CommentImageRepository from "apis/media/CommentImageRepository";
import { useMemo } from "react";

type Payload = {
  mediaID: string;
  fileID: string;
  lastestID?: string | undefined;
  limit?: number | undefined;
  companyID?: string | undefined;
  parentID?: string | undefined;
  filter?: string | undefined;
  select?: string | undefined;
  populates?: string | undefined;
};

const useComments = (payload: Payload) => {
  const key = ["list_comments_image", payload.mediaID, payload.fileID];

  const { mutateAsync: deleteCommentAsync, isLoading: isLoadingDelete } =
    useMutation(CommentImageRepository.deleteComment);

  const { mutateAsync: updateCommentAsync, isLoading: isLoadingUpdate } =
    useMutation(CommentImageRepository.updateComment);

  const {
    isLoading: isLoadingList,
    refetch: refetchListComments,
    data,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery(
    key,
    async ({ pageParam = "" }) => {
      const response = await CommentImageRepository.listComments({
        lastestID: pageParam,
        mediaID: payload.mediaID,
        fileID: payload.fileID,
        // ...payload,
      });

      return {
        data: {
          listRecords: response.data.listRecords.map((comment) => {
            const newCommnet: CommentWithReply = {
              ...comment,
              listReply: {
                data: comment.lastestReplyID ? [comment.lastestReplyID] : [],
                nextCursor: comment.lastestReplyID
                  ? comment.lastestReplyID._id
                  : null,
              },
            };
            return newCommnet;
          }),
          limit: response.data.limit,
          totalRecord: response.data.totalRecord,
          nextCursor: response.data.nextCursor,
        },
        error: response.error,
        message: response.message,
      } as Response<ListRecord<CommentWithReply>>;
    },
    {
      getNextPageParam: ({ nextCursor }: any) => {
        return nextCursor || undefined;
      },
      getPreviousPageParam({ data }) {
        return data.nextCursor;
      },
      refetchOnWindowFocus: false,
      enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
      keepPreviousData: true,
      refetchOnMount: false,
    }
  );

  const queryClient = useQueryClient();

  async function createComment<
    P extends CommentBody,
    C extends P["parentID"] extends string
      ? [{ page: number; commentIdx: number }]
      : []
  >(payload: P, ...options: C) {
    try {
      const {
        error,
        data: _data,
        message,
        code,
      } = await CommentImageRepository.createComment(payload);

      // Promise delay two second
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      if (error || code) {
        if (message) return toast.error(message);
        throw new Error((_data as any)[0].message as string);
      } else
        queryClient.setQueryData<typeof data>(key, (old) => {
          if (old) {
            // Create reply comment;
            if (options[0]) {
              const { page, commentIdx } = options[0];
              (
                old.pages[page].data.listRecords[commentIdx]
                  .comment as CommentDetail
              ).amountCommentReply++;
              old.pages[page].data.listRecords[commentIdx].listReply.data.push(
                _data
              );

              // Create main;
            } else {
              old.pages[0].data.totalRecord++;

              old.pages[old.pages.length - 1].data.listRecords.push({
                ..._data,
                listReply: { data: [], nextCursor: null },
              });
            }
          }
          return old;
        });
    } catch (error: unknown) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  /**
   *
   * @param payload Comment payload
   * @returns Promise<void>
   */
  async function updateComment<
    P extends Omit<CommentBody, "parentID"> & {
      commentID: string;
      parentID: string;
    },
    C extends {
      page: number;
      commentIdx: number;
      replyIdx?: number;
    }
  >(payload: P, { page, commentIdx, replyIdx }: C) {
    try {
      const {
        error,
        data: _data,
        message,
        code,
      } = await updateCommentAsync(payload);
      if (error || code) {
        if (message) return toast.error(message);
        throw new Error((_data as any)[0].message as string);
      } else
        queryClient.setQueryData<typeof data>(key, (old) => {
          if (old) {
            if (typeof replyIdx === "number") {
              // Update reply comment;
              old.pages[page].data.listRecords[commentIdx].listReply.data[
                replyIdx
              ].comment = _data;
            } else {
              // Update comment
              old.pages[page || 0].data.listRecords[commentIdx || 0].comment =
                _data;
            }
          }
          return old;
        });

      // return data;
    } catch (error: unknown) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  /**
   *
   * @param id comment id
   */
  const deleteComment = async (
    id: string,
    options: {
      page: number;
      commentIdx: number;
      replyIdx?: number;
    }
  ) => {
    try {
      const { error, data: _data, message } = await deleteCommentAsync(id);
      error && toast.error(message);
      if (error) {
        if (message) return toast.error(message);
        throw new Error((_data as any)[0].message as string);
      } else
        queryClient.setQueryData<typeof data>(key, (old) => {
          if (old) {
            if (typeof options.replyIdx === "number") {
              // Update reply comment;
              old.pages[options.page || 0].data.listRecords[
                options.commentIdx || 0
              ].listReply.data.splice(options.replyIdx || 0, 1);
              (
                old.pages[options.page || 0].data.listRecords[
                  options.commentIdx || 0
                ].comment as CommentDetail
              ).amountCommentReply--;
            } else {
              // Update comment
              old.pages[0].data.totalRecord--;
              delete old.pages[options.page || 0].data.listRecords[
                options.commentIdx || 0
              ];
            }
          }
          return old;
        });
    } catch (error: unknown) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  /**
   *
   * @param lastestID Id of lastest reply comment
   * @param parentID Id of comment
   * @param page page index of comment list (useInfiniteQuery)
   * @param commentIdx index of page's comment (useInfiniteQuery)
   */
  const fetchReplyComment = async (
    lastestID: string | undefined | null,
    parentID: string,
    page: number,
    commentIdx: number
  ) => {
    if (!lastestID) return;
    const { error, data: _data } = await CommentImageRepository.listComments({
      lastestID,
      mediaID: payload.mediaID,
      parentID,
      fileID: payload.fileID,
    });

    if (!error && _data.listRecords.length) {
      queryClient.setQueryData<typeof data>(key, (old) => {
        if (old) {
          old.pages[page || 0].data.listRecords[
            commentIdx
          ].listReply.data.unshift(..._data.listRecords);
          old.pages[page || 0].data.listRecords[
            commentIdx
          ].listReply.nextCursor = _data.nextCursor;
        }
        return old;
      });
    }
  };

  const currentComment = useMemo(
    () =>
      data?.pages.reduce((acc, page) => page.data.listRecords.length + acc, 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.pages.length, data?.pages[0].data.totalRecord]
  );

  return {
    currentComment,

    createComment,
    deleteComment,
    updateComment,

    isLoadingList,
    // isLoadingCreate,
    isLoadingDelete,
    isLoadingUpdate,

    refetchListComments,
    fetchNextPage,
    fetchPreviousPage,
    data,

    fetchReplyComment,
  };
};

export default useComments;
