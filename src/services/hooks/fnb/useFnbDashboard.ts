/*=====1.LIBRARY=====*/
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import fnbRepository from 'apis/fnb/dashboard';
export const useFnbDashboard = ({
    params = {},
    isFetchListOrderByProperty = false
}: any): any => {

    const { data: detailData, isLoading: listOrderByPropertyIsLoading, refetch: refetchListOrderByProperty } =
        useQuery("fnb_dashboard_list_by_property", () => fnbRepository.getListByProperty(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchListOrderByProperty,
        });
        
    const listOrderByProperty = detailData?.data;
    return {
        listOrderByProperty,
        listOrderByPropertyIsLoading,
        refetchListOrderByProperty
    }
}