import API from "../repository";

import { ListDeviceResponse, ListDevicePayload } from "typings/support";

const spURL = "/api/analysis/history_traffics/statistics_device_access_by_year";

const SupportRepository = {
    async listDeviceAccess(payload: ListDevicePayload): Promise<ListDeviceResponse> {
        const { data } = await API.get<ListDeviceResponse>(spURL, {data: payload});
        return data;
    },

};

export default SupportRepository;