import { APIResponse } from "./apis/response";
import {listTotalAnalysisProps} from "./pcm";

export type ListDevicePayload = {
    year: number;
};

export type ListDeviceResponse = APIResponse & {
    data: listDeviceProps
};

export type ListDeviceProps = APIResponse & {
    data: {
        _id: {
            type: number
        },
        amountAccesses: number
    };
};
export type SupportProps = {
    checklist: string,
};

export type Device = {
    _id?: {
        type: number
    },
    amountAccesses: number
};

export type CheckList = {
    _id: string;
    name: string;
    expiredTime: string;
    typeStatus: number;
    checklist: string;
    assignee: Assignee;
  };