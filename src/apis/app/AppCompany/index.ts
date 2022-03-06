import API from "../../repository";
import type { QueryParam, AppCompanyPayload } from 'typings/apps/appCompany';

const appCompanyURL = `/api/auth/app_companies`;

export const AppCompanyRepository = {
    async listAppsCompany(payload: QueryParam): Promise<any> {
        const { data } = await API.get<any>(
            appCompanyURL, {
                params: {
                    populates: JSON.stringify({
                        path: "company app userCreate",
                        select: "_id name bizfullname sign slug"
                    }),
                    ...payload,
                }
            }
        );
        return data;
    },
    async createAppCompany(payload: AppCompanyPayload): Promise<any> {
        const { data } = await API.post<any>(
            appCompanyURL,
            payload
        );
        return data;
    },
    async updateAppCompany(payload: AppCompanyPayload): Promise<any> {
        const { data } = await API.put<any>(
            appCompanyURL,
            payload
        );
        return data;
    },
};