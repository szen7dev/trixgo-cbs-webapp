import API from "../repository";

import { ListDeviceResponse, ListDevicePayload } from "typings/support";
import { convertObToUrl } from "helpers";

const spURL = "/api/analysis/history_traffics";

const SupportRepository = {
    async listDeviceAccess(payload: ListDevicePayload): Promise<ListDeviceResponse> {
        const { data } = await API.get<ListDeviceResponse>(
            `${spURL}/statistics_by_device_access?${convertObToUrl(payload)}`
        );
        return data;
    },

};

export default SupportRepository;
