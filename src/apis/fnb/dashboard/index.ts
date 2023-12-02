import API from "../../repository";

const URL = "/api/fnb";

const fnbDashboardRepository = {
    async getListByProperty(payload: any): Promise<any> {
        const { data } = await API.get<any>(
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