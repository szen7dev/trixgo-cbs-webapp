import API from "../../repository";

import { convertObToUrl } from "utils";

const URL = "/api/fnb";

const fnbDashboardRepository = {
    async getListByProperty(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            // `${URL}/orders/get-list-by-property?${convertObToUrl(payload)}`
            `${URL}/orders/get-list-by-property`, {
                params: {
                  ...payload
                }
            }
        );
     
        return data;
    },
};

export default fnbDashboardRepository;