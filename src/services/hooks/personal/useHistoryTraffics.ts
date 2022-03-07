import { useQuery } from "react-query";
import AnalysisRepository from "apis/personal/history";
type UseHistoryTraffics = {
    listHistoryTraffics: Array<any>,
    totalRecord: number | undefined,
    totalPage: number | undefined,
    nextCursor: string,
    refetchListHistoryTraffics: () => void,
};

export const useHistoryTraffics = (params?: any, pageParam = '' ) : UseHistoryTraffics => {
    // Danh sách lịch sử truy cập
    const {
        data,
        refetch: refetchListHistoryTraffics
    } = useQuery(
        ["list_friends", { pageParam }, params?.keyword],
        async () => {
            return AnalysisRepository.listHistoryTrafficsOfMe({
                lastestID: pageParam || "",
                ...params,
            })
        },
        { keepPreviousData: true }
    );

    const listHistoryTraffics = data?.data?.listRecords
    const totalRecord = data?.data?.totalRecord
    const totalPage = data?.data?.totalPage
    const nextCursor = data?.data?.nextCursor

    return {
        listHistoryTraffics,
        totalRecord,
        totalPage,
        nextCursor,
        refetchListHistoryTraffics,
    }
}