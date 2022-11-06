/*=====1.LIBRARY=====*/
import { useInfiniteQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import inspection from "apis/inspection/";

/*=====3.INTERFACE DEFINE=====*/
interface useInspectionAreasInterface {
    isLoading: boolean;
    isFetching: boolean;
    totalRecord: number;
    hasNextPage: boolean | undefined;
    list: Array<any>; // "any" needed to review
    refetch: () => void;
    fetchNextPage: () => void;
    data: any;
}

// Khai báo params cho hook
type UseInspectionAreasProps = {
    payload?: any, // "any" needed to review
    isFetchList?: boolean,
    isFetchInfo?: boolean,
}

// Khai báo hook
export const useInspectionAreas = ({
    payload = {},
    isFetchList = false, // nếu = true thì gọi api get info, ngược lại không gọi
    isFetchInfo = false //  nếu = true thì gọi api get info, ngược lại không gọi
}: UseInspectionAreasProps): useInspectionAreasInterface => {
    // Get List
    const {
        isLoading,
        isFetching,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        [`inspection_areas__list${payload}`, payload],
        async ({ pageParam }) => {
            return inspection.inspectionAreas({
                lastestID: pageParam || "",
                ...payload,
            });
        },
        {
            getNextPageParam: ({ data }: any) => { return data?.nextCursor ?? undefined; },
            refetchOnWindowFocus: false,
            enabled: isFetchList
        }
    );

    const list = []
        .concat(...(data?.pages || [])
            .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;

    // Return data
    return {
        isLoading,
        isFetching,
        list,
        totalRecord,
        hasNextPage,
        refetch,
        fetchNextPage,
        data
    }
}
