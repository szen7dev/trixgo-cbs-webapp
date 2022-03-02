import { useInfiniteQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import TaskRepository from "apis/task";
import { Task, CheckList, CheckListPayload, ResponseProps, ResponsePayload } from "typings/task";
import { useSocket } from 'services/hooks/useSocket';

type UseTask = {
  addResponse: (payload: ResponsePayload) => Promise<{ result: ResponseProps } | undefined>;
  listResponses: Array<ResponseProps>;
  totalRecordResponse: number;
  refetchListResponse: () => void;
  listTasks: Array<Task>;
  isLoadingListTask: boolean;
  totalRecord: number | undefined;
  totalPages: number | undefined;
  hasNextPage: boolean | undefined;
  refetchListTask: () => void;
  nextPageListTask: () => void;
  prevPageListTask: () => void;
};

type Props = {
  taskID?: string;
  typeStatus?: number;
  type?: number;
  isMarked?: boolean;
}

export const useTask = ({ taskID, isMarked, typeStatus, type }: Props): UseTask => {
  const { current: socket }: any = useSocket();

  const { mutateAsync: addResponseAsync } =
    useMutation((payload: ResponsePayload) =>
      TaskRepository.addResponse(payload)
    );

  const addResponse = async (payload: ResponsePayload) => {
    try {
      const { error, data, message } = await addResponseAsync(payload);

      if(error) {
        toast.warning(message)
      } else{
        toast.success('Tạo phản hồi thành công');
      }

      socket.emit('NOTIFICATION_CSS_RECEIVE_NEW_NOTIFICATION', {
          receivers: data.receivers
      });

      return data;
    } catch (error: unknown) {
      if (typeof error === "string") {
          toast.error(error);
      } else if (error instanceof Error) {
          toast.error(error.message);
      }
    }
  };

  const {
    data: dataListResponse,
    refetch: refetchListResponse,
  } = useInfiniteQuery(
    ["list_responses", taskID, isMarked || false],
    async ({ pageParam }: any) => {
      return TaskRepository.listResponse({
        taskID,
        limit: 5,
        lastestID: pageParam || "",
        isMarked: isMarked || false,
      });
    },
    {
      getNextPageParam: ({ data }: any) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const {
    isLoading: isLoadingListTask,
    data: dataListTask,
    refetch: refetchListTask,
    fetchNextPage: nextPageListTask,
    fetchPreviousPage: prevPageListTask,
    hasNextPage,
  } = useInfiniteQuery(
    ["list_tasks", type, typeStatus],
    async ({ pageParam }: any) => {
      return TaskRepository.listTask({
        lastestID: pageParam || "",
        type: type || 1,
        typeStatus: typeStatus || 4,
        select: "assignee lastLog checklist description name expiredTime percentage project",
        populates: JSON.stringify({
          path: "assignee lastLog project",
          select: "name fullname bizfullname image author content createAt sign",
          populate: {
            path: "author",
            select: "_id fullname bizfullname image",
          }
        }),
      });
    },
    {
      getNextPageParam: ({ data }: any) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const listTasks = []
    .concat(...(dataListTask?.pages || [])
    .map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const listResponses = []
    .concat(...(dataListResponse?.pages || [])
    .map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  const totalRecordResponse = dataListResponse?.pages[0]?.data?.totalRecord || 0;
  const totalRecord = dataListTask?.pages[0]?.data?.totalRecord;
  const totalPages = dataListTask?.pages[0]?.data?.totalPage;

  return {
    addResponse,
    listResponses,
    totalRecordResponse,
    refetchListResponse,
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

type UseCheckList = {
  addChecklist: (payload: CheckListPayload) => void,
  updateChecklist: (payload: CheckListPayload) => void,
  listCheckList: Array<CheckList>;
  isLoadingListCheckList: boolean;
  totalRecord: number | undefined;
  totalPages: number | undefined;
  hasNextPage: boolean | undefined;
  refetchListCheckList: () => void;
  nextPageListCheckList: () => void;
  prevPageListCheckList: () => void;
};

export const useCheckList = (parentID?: string, limit = 5): UseCheckList => {
  const { mutateAsync: addChecklistAsync } =
    useMutation((payload: CheckListPayload) =>
      TaskRepository.addChecklist(payload)
    );

  const { mutateAsync: updateChecklistAsync } =
    useMutation((payload: CheckListPayload) =>
      TaskRepository.updateChecklist(payload)
    );

  const addChecklist = async (payload: CheckListPayload) => {
    try {
        const { error, message } = await addChecklistAsync(payload);

        if (error) {
          return toast.warning(message);
        }
 
        toast.success('Tạo checklist thành công');
    } catch (error: unknown) {
        if (typeof error === "string") {
            toast.error(error);
        } else if (error instanceof Error) {
            toast.error(error.message);
        }
    }
  };

  const updateChecklist = async (payload: CheckListPayload) => {
    try {
        const { error, message } = await updateChecklistAsync(payload);

        if (error) {
          return toast.warning(message);
        }
 
        toast.success('Cập nhật checklist thành công');
    } catch (error: unknown) {
        if (typeof error === "string") {
            toast.error(error);
        } else if (error instanceof Error) {
            toast.error(error.message);
        }
    }
  };

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
        type: 2,
        isSortChecklist: 1,
        select: "assignee lastLog checklist description name expiredTime percentage project",
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
      enabled: true,
    }
  );

  const listCheckList = []
    .concat(
      ...(dataListCheckList?.pages || []).map((d: any) => d.data?.listRecords)
    )
    .filter(Boolean);
  const totalRecord = dataListCheckList?.pages[0]?.data?.totalRecord;
  const totalPages = dataListCheckList?.pages[0]?.data?.totalPages;

  return {
    addChecklist,
    updateChecklist,
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
