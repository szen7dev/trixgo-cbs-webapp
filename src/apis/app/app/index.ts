import API from "../../repository";
import type { QueryParam } from 'typings/apps/app';

const appURL = `/api/auth/apps`;

export const AppRepository = {
    async listApps(payload: QueryParam): Promise<any> {
        const { data } = await API.get<any>(
            appURL, {
                params: payload
            }
        );
        return data;
    },
};
