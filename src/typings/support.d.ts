import { APIResponse } from "./apis/response";

export type ListDevicePayload = {
    year: number;
};

export type ListDeviceResponse = APIResponse & {
    data?: {
        listDevice?: Device[];
    }
};

export type Device = {
    _id: {
        month: number
    },
    data: [
        {
            type: number,
            amountAccesses: number
        }
    ]

};