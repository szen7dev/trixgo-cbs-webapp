import API from "../../repository";
import type { QueryParam } from 'typings/apps/appUser';

const appUserURL = `/api/auth/app_users`;

export const AppUserRepository = {
    async listAppsUser(payload: QueryParam): Promise<any> {
        const { data } = await API.get<any>(
            appUserURL, {
                params: {
                    populates: JSON.stringify({
                        path: "company app user userCreate",
                        select: "_id name bizfullname image sign slug"
                    }),
                    ...payload,
                }
            }
        );
        return data;
    },
};