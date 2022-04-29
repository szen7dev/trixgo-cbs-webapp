import { useInfiniteQuery, useMutation } from "react-query";
import TaskRepository from "apis/task";
import {
  Task,  addTaskPayload,
  CheckList, CheckListPayload,
  UpdateCheckListPayload,
  ChildTask, ChildTaskPayload,
  ResponseProps, ResponsePayload,
  CommentPayload, ListCommentsPayload,
  AddRelationUserPayload,
  CopyTaskPayload,
  UpdateStatusCheckListPayload,
  ReactionCommentPayload,
  ListReactionPayload,
  ReactionCommentProps,
  updateTaskPayload,
  CommentProps,
  UpdateResponsePayload
} from "typings/task";

/**
 * ============================ ************* ===============================
 * ============================ 	 PCM TASK   ===============================
 * ============================ ************* ===============================
 */

type UseTask = {
  addRelationUserAsync: (payload: AddRelationUserPayload) => Promise<any>;
  copyTaskAsync: (payload: CopyTaskPayload) => Promise<any>;
  listTasks: Array<Task>;
  addTaskAsync: (payload: addTaskPayload) => Promise<any>;
  updateTaskAsync: (payload: updateTaskPayload) => Promise<any>;
  isLoadingListTask: boolean;
  totalRecord: number | undefined;
  totalPages: number | undefined;
  hasNextPage: boolean | undefined;
  refetchListTask: () => void;
  nextPageListTask: () => void;
  prevPageListTask: () => void;
};

type UseTaskProps = Partial<{
  params: Partial<{
    keyword?: string;
    typeStatus?: string;
    statusNe?: string;
    groupID?: string;
    companyOfAssignee?: string;
    isPassPermision?: string;
    projectID?: string;
    type?: number;
    status?: string;
  }>
  isFetch: boolean;
}>

export const useTask = ({
  params = {},
  isFetch = false
}: UseTaskProps): UseTask => {
  const { mutateAsync: addTaskAsync } =
    useMutation((payload: addTaskPayload) =>
      TaskRepository.addTask(payload)
    );

  const { mutateAsync: updateTaskAsync } =
    useMutation((payload: updateTaskPayload) =>
      TaskRepository.updateTask(payload)
    );

  const { mutateAsync: addRelationUserAsync } =
    useMutation((payload: AddRelationUserPayload) =>
      TaskRepository.addRelationUser(payload)
    );

  const { mutateAsync: copyTaskAsync } =
    useMutation((payload: CopyTaskPayload) =>
      TaskRepository.copyTask(payload)
    );

  const {
    isLoading: isLoadingListTask,
    data: dataListTask,
    refetch: refetchListTask,
    fetchNextPage: nextPageListTask,
    fetchPreviousPage: prevPageListTask,
    hasNextPage,
  } = useInfiniteQuery(
    ["list_tasks", params],
    async ({ pageParam }: any) => {
      return TaskRepository.listTask({
        lastestID: pageParam || "",
        ...params
      });
    },
    {
      getNextPageParam: ({ data }: any) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: isFetch ?? false,
    }
  );

  const listTasks = []
    .concat(...(dataListTask?.pages || [])
    .map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const totalRecord = dataListTask?.pages[0]?.data?.totalRecord;
  const totalPages = dataListTask?.pages[0]?.data?.totalPage;

  return {
    addRelationUserAsync,
    copyTaskAsync,
    updateTaskAsync,
    addTaskAsync,
    listTasks,
    isLoadingListTask,
    totalRecord,
    hasNextPage,
    totalPages,
    refetchListTask,
    nextPageListTask,
    prevPageListTask,
  };
};

/**
 * ============================ *********************** ===============================
 * ============================ 	 PHẢN HỒI LIÊN QUAN   ===============================
 * ============================ *********************** ===============================
 */

type UseRelatedResponse = {
  addResponseAsync: (payload: ResponsePayload) => Promise<any>;
  updateResponseAsync: (payload: UpdateResponsePayload) => Promise<any>,
  listResponses: Array<ResponseProps>;
  totalRecord: number;
  refetchListResponses: () => void;
  nextPageListResponses: () => void;
  hasNextPageListResponses: boolean | undefined;
};

type UseRelatedResponseProps = {
  params?: Partial<{
    taskID: string
  }>,
  isFetch?: boolean;
}

export const useRelatedResponse = ({ params = {}, isFetch = false } : UseRelatedResponseProps) : UseRelatedResponse => {
  const { mutateAsync: addResponseAsync } =
    useMutation((payload: ResponsePayload) =>
      TaskRepository.addResponse(payload)
    );

  const { mutateAsync: updateResponseAsync } =
    useMutation((payload: UpdateResponsePayload) =>
        TaskRepository.updateComment(payload)
    );

  const {
    data: dataListResponses,
    fetchNextPage: nextPageListResponses,
    hasNextPage: hasNextPageListResponses,
    refetch: refetchListResponses,
  } = useInfiniteQuery(
    ["list_responses", params],
    async ({ pageParam }: any) => {
      return TaskRepository.listResponse({
        limit: 5,
        lastestID: pageParam || "",
        ...params
      });
    },
    {
      getNextPageParam: ({ data }: any) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: isFetch,
    }
  );

  const listResponses = []
    .concat(...(dataListResponses?.pages || [])
    .map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const totalRecord = dataListResponses?.pages[0]?.data?.totalRecord || 0;

  return {
    addResponseAsync,
    updateResponseAsync,
    listResponses,
    totalRecord,
    refetchListResponses,
    nextPageListResponses,
    hasNextPageListResponses
  }
}

/**
 * ============================ ************** ===============================
 * ============================ 	 CHECKLIST   ===============================
 * ============================ ************** ===============================
 */

type UseCheckList = {
  addChecklistAsync: (payload: CheckListPayload) => Promise<any>,
  updateChecklistAsync: (payload: UpdateCheckListPayload) => Promise<any>,
  updateStatusChecklistAsync: (payload: UpdateStatusCheckListPayload) => Promise<any>,
  listCheckList: Array<CheckList>;
  isLoadingListCheckList: boolean;
  totalRecord: number | undefined;
  totalPages: number | undefined;
  hasNextPage: boolean | undefined;
  refetchListCheckList: () => void;
  nextPageListCheckList: () => void;
  prevPageListCheckList: () => void;
};

type UseCheckListProps = {
  parentID?: string,
  limit?: number,
  isFetchChecklist?: boolean,
}

export const useCheckList = ({
  parentID,
  limit = 5,
  isFetchChecklist = false
} : UseCheckListProps): UseCheckList => {
  const { mutateAsync: addChecklistAsync } =
    useMutation((payload: CheckListPayload) =>
      TaskRepository.addChecklist(payload)
    );

  const { mutateAsync: updateChecklistAsync } =
    useMutation((payload: UpdateCheckListPayload) =>
      TaskRepository.updateChecklist(payload)
    );

  const { mutateAsync: updateStatusChecklistAsync } =
    useMutation((payload: UpdateStatusCheckListPayload) =>
      TaskRepository.updateStatusChecklist(payload)
    );

  const {
    isLoading: isLoadingListCheckList,
    data: dataListCheckList,
    refetch: refetchListCheckList,
    fetchNextPage: nextPageListCheckList,
    fetchPreviousPage: prevPageListCheckList,
    hasNextPage,
  } = useInfiniteQuery(
    ["list_checkList", parentID, limit],
    async ({ pageParam }: any) => {
      return TaskRepository.listCheckList({
        limit,
        lastestID: pageParam || "",
        parentID: parentID || "",
        isChecklist: 1,
        isSortChecklist: 1,
        select: "assignee lastLog checklist status description name expiredTime percentage project parent type",
        populates: JSON.stringify({
          path: "assignee",
          select: "name fullname bizfullname image",
        }),
      });
    },
    {
      getNextPageParam: ({ data }: any) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: isFetchChecklist,
    }
  );

  const listCheckList = []
    .concat(...(dataListCheckList?.pages || [])
    .map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const totalRecord = dataListCheckList?.pages[0]?.data?.totalRecord;
  const totalPages = dataListCheckList?.pages[0]?.data?.totalPage;

  return {
    addChecklistAsync,
    updateChecklistAsync,
    updateStatusChecklistAsync,
    listCheckList,
    isLoadingListCheckList,
    totalRecord,
    hasNextPage,
    totalPages,
    refetchListCheckList,
    nextPageListCheckList,
    prevPageListCheckList,
  };
};

/**
 * ============================ ************************** ===============================
 * ============================ 	 VIỆC CON (CHILD TASK)   ===============================
 * ============================ ************************** ===============================
 */

type UseChildTask = {
  addChildTaskAsync: (payload: ChildTaskPayload) => Promise<any>,
  updateChildTaskAsync: (payload: ChildTaskPayload) => void,
  listChildTask: Array<ChildTask>;
  isLoadingListChildTask: boolean;
  totalRecord: number | undefined;
  totalPages: number | undefined;
  hasNextPage: boolean | undefined;
  refetchListChildTask: () => void;
  nextPageListChildTask: () => void;
  prevPageListChildTask: () => void;
};

type UseChildTaskProps = {
  parentID?: string,
  limit?: number,
  isFetchChildTask?: boolean,
}

export const useChildTask = ({
  parentID,
  limit = 5,
  isFetchChildTask = false
} : UseChildTaskProps): UseChildTask => {
  const { mutateAsync: addChildTaskAsync } =
    useMutation((payload: ChildTaskPayload) =>
      TaskRepository.addChildTask(payload)
    );

  const { mutateAsync: updateChildTaskAsync } =
    useMutation((payload: ChildTaskPayload) =>
      TaskRepository.updateChildTask(payload)
    );

  const {
    isLoading: isLoadingListChildTask,
    data: dataListChildTask,
    refetch: refetchListChildTask,
    fetchNextPage: nextPageListChildTask,
    fetchPreviousPage: prevPageListChildTask,
    hasNextPage,
  } = useInfiniteQuery(
    ["list_child_task", parentID, limit],
    async ({ pageParam }: any) => {
      return TaskRepository.listChildTask({
        limit,
        lastestID: pageParam || "",
        parentID: parentID || "",
        isChildTask: 1,
        isSortChildTask: 1,
        select: "assignee lastLog status description name expiredTime percentage project parent type",
        populates: JSON.stringify({
          path: "assignee",
          select: "name fullname bizfullname image",
        }),
      });
    },
    {
      getNextPageParam: ({ data }: any) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: isFetchChildTask,
    }
  );

  const listChildTask = []
    .concat(...(dataListChildTask?.pages || [])
    .map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const totalRecord = dataListChildTask?.pages[0]?.data?.totalRecord;
  const totalPages = dataListChildTask?.pages[0]?.data?.totalPage;

  return {
    addChildTaskAsync,
    updateChildTaskAsync,
    listChildTask,
    isLoadingListChildTask,
    totalRecord,
    hasNextPage,
    totalPages,
    refetchListChildTask,
    nextPageListChildTask,
    prevPageListChildTask,
  };
};

/**
 * ============================ ************** ===============================
 * ============================ 	 BÌNH LUẬN   ===============================
 * ============================ ************** ===============================
 */

type UseCommentPcm = {
  // REACTION COMMENT
  reactionCommentAsync: (payload: ReactionCommentPayload) => Promise<any>,
  listReactionsComment: Array<ReactionCommentProps>,
  totalRecordReactions: number,
  isLoadingListReactions: boolean,
  refetchListReactions: () => void,
  nextPageListReactions: () => void,
  hasNextPageReactions: boolean | undefined,
  // COMMENT
  createCommentAsync: (payload: CommentPayload) => Promise<any>,
  updateCommentAsync: (payload: CommentPayload) => Promise<any>,
  deleteCommentAsync: (id: string) => Promise<{ error: boolean; message: string; }>,
  listComments: Array<CommentProps>,
  totalRecord: number,
  limit: number,
  nextCursor: string | undefined,
  isLoadingListComments: boolean,
  refetchListComments: () => void,
  nextPageListComments: () => void,
  prevPageListComments: () => void,
  hasNextPageComments: boolean | undefined,
}

type UseCommentPcmProps = {
  key?: string,
  params?: ListCommentsPayload | ListReactionPayload,
  isFetchComment?: boolean,
  isFetchCommentReaction?: boolean
}

export const useCommentPcm = ({
  key,
  params = {},
  isFetchComment = false,
  isFetchCommentReaction = false
}: UseCommentPcmProps) : UseCommentPcm => {

  const { mutateAsync: createCommentAsync } =
      useMutation((payload: CommentPayload) =>
          TaskRepository.createComment(payload)
      );

  const { mutateAsync: deleteCommentAsync } =
      useMutation((id: string) =>
          TaskRepository.deleteComment(id)
      );

  const { mutateAsync: updateCommentAsync } =
      useMutation((payload: CommentPayload) =>
          TaskRepository.updateComment(payload)
      );

  const { mutateAsync: reactionCommentAsync } =
      useMutation((payload: ReactionCommentPayload) =>
          TaskRepository.reactionComment(payload)
      );

  const {
      isLoading: isLoadingListComments,
      refetch: refetchListComments,
      data: dataListComments,
      fetchNextPage: nextPageListComments,
      fetchPreviousPage: prevPageListComments,
      hasNextPage: hasNextPageComments
  } =
    useInfiniteQuery(
      [key || "list_comments", params],
      async ({ pageParam }: any) =>
      TaskRepository.listComments({
        lastestID: pageParam ?? "",
        ...params
      }),
      {
        getNextPageParam: ({ data }: any) => {
          return data?.nextCursor ?? undefined;
        },
        refetchOnWindowFocus: false,
        enabled: isFetchComment
      }
    );

  const {
    isLoading: isLoadingListReactions,
    refetch: refetchListReactions,
    data: dataListReactions,
    hasNextPage: hasNextPageReactions,
    fetchNextPage: nextPageListReactions,
  } =
    useInfiniteQuery(
      ["list_reactions_comment", params],
      async ({ pageParams }: any) =>
      TaskRepository.listReactionsComment({
        lastestID: pageParams ? pageParams : "",
        ...params
      }),
      {
        getNextPageParam: ({ nextCursor }: any) => {
            return nextCursor || undefined;
        },
        refetchOnWindowFocus: false,
        enabled: isFetchCommentReaction
      }
    );

  const listReactionsComment = []
    .concat(...(dataListReactions?.pages || [])
    .map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const totalRecordReactions = dataListReactions?.pages[0]?.data?.totalRecord || 0;

  const listComments = []
    .concat(...(dataListComments?.pages || [])
    .map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const totalRecord = dataListComments?.pages[0]?.data?.totalRecord || 0;
  const nextCursor = dataListComments?.pages[0]?.data?.nextCursor;
  const limit = dataListComments?.pages[0]?.data?.limit || 5;

  return {
    // REACTION COMMENT
    reactionCommentAsync,
    listReactionsComment,
    totalRecordReactions,
    isLoadingListReactions,
    hasNextPageReactions,
    refetchListReactions,
    nextPageListReactions,
    // COMMENT
    createCommentAsync,
    updateCommentAsync,
    deleteCommentAsync,
    listComments,
    limit,
    totalRecord,
    nextCursor,
    isLoadingListComments,
    refetchListComments,
    nextPageListComments,
    prevPageListComments,
    hasNextPageComments
  }
}