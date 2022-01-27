import { useInfiniteQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import TaskRepository from "apis/task";
import { Task, CheckList, CheckListPayload } from "typings/task";

type UseTask = {
  listTasks: Array<Task>;
  isLoadingListTask: boolean;
  totalRecord: number | undefined;
  totalPages: number | undefined;
  hasNextPage: boolean | undefined;
  refetchListTask: () => void;
  nextPageListTask: () => void;
  prevPageListTask: () => void;
};

export const useTask = (typeStatus?: number, type?: number): UseTask => {
  const {
    isLoading: isLoadingListTask,
    data: dataListTask,
    refetch: refetchListTask,
    fetchNextPage: nextPageListTask,
    fetchPreviousPage: prevPageListTask,
    hasNextPage,
  } = useInfiniteQuery(
    // https://react-query.tanstack.com/reference/useInfiniteQuery
    ["list_tasks", type, typeStatus],
    async ({ pageParam }: any) => {
      return TaskRepository.listTask({
        lastestID: pageParam || "",
        type: type || 1,
        typeStatus: typeStatus || 4,
        select: "assignee lastLog checklist description name expiredTime percentage project",
        populates: JSON.stringify({
          path: "assignee lastLog project",
          select: "name fullname image author content createAt sign",
        }),
      });
    },
    {
      getNextPageParam: ({ data }: any) => {
        return data?.nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
    }
  );

  const listTasks = []
    .concat(...(dataListTask?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);

  // console.log('============12333')
  // console.log(listTasks)

  const totalRecord = dataListTask?.pages[0]?.data?.totalRecord;
  const totalPages = dataListTask?.pages[0]?.data?.totalPages;

  return {
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
    // https://react-query.tanstack.com/reference/useInfiniteQuery
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
      enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
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
