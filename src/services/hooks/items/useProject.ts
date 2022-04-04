/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { ProjectRepository } from 'apis/item';
import type { Project, ProjectInfoPayload, ProjectListPayload } from 'typings/items/project';

/*=====3.INTERFACE DEFINE=====*/
interface UseProject {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    list: Array<Project>;
    info: Project | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

// Khai báo params cho hook
type UseProjectProps = {
    params?: ProjectListPayload | ProjectInfoPayload,
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useProject = ({
    params = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseProjectProps): UseProject => {
    // Get info
    const { data: detailData } =
        useQuery("project__info", () => ProjectRepository.fetchInfo(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = detailData?.data;

    // Get List
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage
    } = useInfiniteQuery(
        ['project__list', params],
        async ({ pageParam }: any) =>
            ProjectRepository.fetchList({
                lastestID: pageParam ?? "",
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor ?? undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList
        }
    );

    const list = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;

    // Return data
    return {
        isLoading,
        list,
        info,
        totalRecord,
        totalPage,
        hasNextPage,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
    }
}
