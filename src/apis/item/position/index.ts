import API from "../../repository";
import type { QueryParam } from 'typings/items/position';

const appUserURL = `/api/item/positions`;

export const PositionRepository = {
    async listPosition(payload: QueryParam): Promise<any> {
        const { data } = await API.get<any>(
            appUserURL, {
                params: payload
            }
        );
        return data;
    },
};