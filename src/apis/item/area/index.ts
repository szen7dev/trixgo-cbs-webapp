import API from "../../repository";
import { convertObToUrl } from "utils";
import { ListAreaPayload } from "typings/items/area";

const areaURL = "/api/item/areas";

const AreaRepository = {
    /**
     * DANH SÁCH KHU VỰC
     */
    async listAreas(payload: ListAreaPayload): Promise<any> {
        const { data } = await API.get<any>(
            `${areaURL}?${convertObToUrl({
                select: "_id parent level name sign userCreate",
                populates: JSON.stringify({
                    path: "userCreate",
                    select: "_id bizfullname image"
                }),
                ...payload
            })}`
        );
        return data;
    },
};

export default AreaRepository;