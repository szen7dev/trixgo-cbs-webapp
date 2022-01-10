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
type DataDevice = {
    type: number;
    amountAccesses: number;
};
type Device = {
    _id: {
        month: number
    }
    data: DataDevice[];
};
export type arTypeDevice = {
    type: number,
}