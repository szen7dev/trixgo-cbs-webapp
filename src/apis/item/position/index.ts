import API from "../../repository";
import type { QueryParam } from 'typings/items/position';

const POSITION_URL = `/api/item/positions`;

export const PositionRepository = {
    async listPosition(payload: QueryParam): Promise<any> {
        const { data } = await API.get<any>(
            POSITION_URL, {
                params: payload
            }
        );
        return data;
    },
    async addPosition(params: any) {
        const { data } = await API.post(POSITION_URL, params);
        return data;
    },

    async updatePosition(params: any) {
        const { data } = await API.put(POSITION_URL, params);
        return data;
    },

    async deletePosition(ids: Array<string>) {
        const { data } = await API.delete(POSITION_URL, {
            params: {
                positionsID: ids
            }
        });

        return data;
    }
};