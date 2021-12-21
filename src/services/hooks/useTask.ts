import { useInfiniteQuery } from "react-query";
import TaskRepository from "apis/task";
import { Task } from "typings/task";

type UseTask = {
  listTasks: Array<Task>;
  isLoadingListTask: boolean;
  totalRecord: number | undefined;
};

export const useTask = (type?: number): UseTask => {
  const { isLoading: isLoadingListTask, data: dataListTask } = useInfiniteQuery(
    // https://react-query.tanstack.com/reference/useInfiniteQuery
    ["list_tasks", type],
    async ({ pageParams }: any) =>
      TaskRepository.listTask({
        lastestID: pageParams ? pageParams : "",
        type: type || 4,
        filter: JSON.stringify({
          assignee: 1,
          lastLog: 1,
          checklist: 1,
          description: 1,
          name: 1,
          expiredTime: 1,
          typeStatus: 1,
        }),
        populates: JSON.stringify({
          value: "assignee lastLog",
          select: "name fullname image author content createAt",
        }),
        populates1: JSON.stringify({
          value: "author",
          select: "name fullname",
        }),
      }),
    {
      getNextPageParam: ({ nextCursor }: any) => {
        return nextCursor || undefined;
      },
      refetchOnWindowFocus: false,
      enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
    }
  );

  const listTasks = []
    .concat(...(dataListTask?.pages || []).map((d: any) => d.data?.listRecords))
    .filter(Boolean);
  const totalRecord = dataListTask?.pages[0]?.data?.totalRecord;

  return {
    listTasks,
    isLoadingListTask,
    totalRecord,
  };
};
