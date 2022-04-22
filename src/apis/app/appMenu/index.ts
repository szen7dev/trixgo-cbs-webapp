import API from "../../repository";
import { convertObToUrl } from "utils";

import {
    AppMenuListCompanyParams,
    AppMenuListCompanyResponse
} from 'typings/apps/appMenu';

const APP_MENU_URL = "/api/auth/app_menus";

export const AppMenuRepository = {
    fetchListCompany: (params: AppMenuListCompanyParams): Promise<AppMenuListCompanyResponse> => fetchListCompany(params),
};

async function fetchListCompany(params: AppMenuListCompanyParams): Promise<AppMenuListCompanyResponse> {
    const { data } = await API.get(
        `${APP_MENU_URL}/get-list-company?${convertObToUrl(params)}`
    )
    return data;
}