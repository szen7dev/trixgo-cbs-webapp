import API from "../../repository";
import type { QueryParam, AddMemberToUserAppPayload, UpdateMemberAppUserPayload } from 'typings/apps/appUser';

const appUserURL = `/api/auth/app_users`;

export const AppUserRepository = {
    async listAppsUser(payload: QueryParam): Promise<any> {
        const { data } = await API.get<any>(
            appUserURL, {
                params: {
                    populates: JSON.stringify({
                        path: "company app user userCreate",
                        select: "_id name bizfullname email image sign"
                    }),
                    ...payload,
                }
            }
        );
        return data;
    },
    async addMemberToAppUser(payload: AddMemberToUserAppPayload): Promise<any> {
        const { data } = await API.post<any>(
            appUserURL,
            payload
        );
        return data;
    },
    async updateMemberAppUser(payload: UpdateMemberAppUserPayload): Promise<any> {
        const { data } = await API.put<any>(
            appUserURL,
            payload
        );
        return data;
    },
    async deleteMemberAppUser(payload: string[]): Promise<any> {
        const { data } = await API.delete<any>(
            appUserURL,
            {
                params: {
                    appUserIDs: payload
                }
            }
        );
        return data;
    },
};
