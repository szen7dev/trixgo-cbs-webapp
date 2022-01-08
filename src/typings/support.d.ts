import { type } from "os";
import { APIResponse } from "./apis/response";

export type ListDevicePayload = {
    year: number;
};

export type ListDeviceResponse = APIResponse & {
    data?: {
        listDevice?: Device[];
    }
};
type TypeAccesses = {
    type: number[];
    amountAccesses: number[];
}
export type Device = {
    _id: {
        month: number
    },
    type: number[],
    amountAccesses: number[],
    data: [
        {
            type: number,
            amountAccesses: number
        }
    ]

};

export type arTypeDevice = {
    type: number,
}