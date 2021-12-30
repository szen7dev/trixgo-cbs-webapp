import { APIResponse } from "./apis/response";
import {listTotalAnalysisProps} from "./pcm";

export type ListDevicePayload = {
    fromDate: string;
    toDate: string;
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

