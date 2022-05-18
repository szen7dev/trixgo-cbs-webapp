/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { ProjectRepository } from 'apis/item';
import type {
    Project,
    ProjectInfoPayload,
    ProjectListPayload,
    ProjectUserIsMemberParams
} from 'typings/items/project';

/*=====3.INTERFACE DEFINE=====*/
interface UseProject {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    list: Array<Project>;
    info: Project;
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
    isFetchList = false,
    isFetchInfo = false
}: UseProjectProps): UseProject => {
    const { data: detailData } =
        useQuery("project__info", () => ProjectRepository.fetchInfo(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchInfo,
        });

    const info = detailData?.data ?? {};

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
                return data?.nextCursor;
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

interface UseProjectCustom {
    isLoadingProjectsUserIsMember: boolean;
    totalRecordProjectsUserIsMember: number;
    totalPageProjectsUserIsMember: number;
    hasNextPageProjectsUserIsMember: boolean | undefined;
    listProjectsUserIsMember: Array<Project>;
    refetchProjectsUserIsMember: () => void;
    fetchNextPageProjectsUserIsMember: () => void;
    fetchPreviousPageProjectsUserIsMember: () => void;
}

// Khai báo params cho hook
type UseProjectCustomProps = {
    paramsProjectsUserIsMember?: ProjectUserIsMemberParams,
    isFetchProjectsUserIsMember?: boolean,
}

// Khai báo hook
export const useProjectCustom = ({
    paramsProjectsUserIsMember = {},
    isFetchProjectsUserIsMember = false,
}: UseProjectCustomProps): UseProjectCustom => {

    const {
        isLoading: isLoadingProjectsUserIsMember,
        data,
        refetch: refetchProjectsUserIsMember,
        fetchNextPage: fetchNextPageProjectsUserIsMember,
        fetchPreviousPage: fetchPreviousPageProjectsUserIsMember,
        hasNextPage: hasNextPageProjectsUserIsMember
    } = useInfiniteQuery(
        ['project--list_is_member', paramsProjectsUserIsMember],
        async ({ pageParam }: any) =>
            ProjectRepository.fetchListIsMember({
                lastestID: pageParam ?? "",
                ...paramsProjectsUserIsMember,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchProjectsUserIsMember
        }
    );

    const listProjectsUserIsMember = (data?.pages || []).flatMap((d: any) => d?.data?.listRecords);
    const totalRecordProjectsUserIsMember = data?.pages[0]?.data?.totalRecord || 0;
    const totalPageProjectsUserIsMember = data?.pages[0]?.data?.totalPage || 0;

    return {
        isLoadingProjectsUserIsMember,
        listProjectsUserIsMember,
        refetchProjectsUserIsMember,
        fetchNextPageProjectsUserIsMember,
        fetchPreviousPageProjectsUserIsMember,
        hasNextPageProjectsUserIsMember,
        totalRecordProjectsUserIsMember,
        totalPageProjectsUserIsMember
    }
}