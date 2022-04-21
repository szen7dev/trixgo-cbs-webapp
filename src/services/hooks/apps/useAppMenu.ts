/*=====1.LIBRARY=====*/
import { useQuery } from "react-query";

/*=====2.TYPING/APIS=====*/
import { AppMenuRepository } from "apis/app";
import type {
    AppMenuListCompany,
    AppMenuListCompanyParams,
} from 'typings/apps/appMenu';

/**
 * Hook app menu Custom
 */

interface UseAppMenu {
    listCompany: AppMenuListCompany[] | undefined;
    isLoadingListCompany: boolean;
}

type UseAppMenuProps = {
    paramsFetchListCompany?: AppMenuListCompanyParams,
    isFetchListCompany?: boolean,
}

export const useAppMenu = ({
    paramsFetchListCompany = {},
    isFetchListCompany = false
}: UseAppMenuProps) : UseAppMenu => {

    const { data: dataListCompany, isLoading: isLoadingListCompany } =
        useQuery("app_menu--list_company",
            () => AppMenuRepository.fetchListCompany(paramsFetchListCompany), {
            refetchOnWindowFocus: false,
            enabled: isFetchListCompany,
        });

    const listCompany = dataListCompany?.data;

    return {
        listCompany,
        isLoadingListCompany
    }
}