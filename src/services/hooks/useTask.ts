import { useInfiniteQuery } from "react-query";
import TaskRepository from "apis/task";
import { Task, CheckList } from "typings/task";

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
        select: "assignee lastLog checklist description name expiredTime percentage project",
        populates: JSON.stringify({
          path: "assignee",
          select: "name fullname image",
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
