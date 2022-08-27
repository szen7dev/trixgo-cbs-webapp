import API from "../../repository";
import { convertObToUrl } from "utils";

const ITEM_URL = "/api/item";

export const ProjectRepository = {
    fetchListIsMember: (params: any): Promise<any> => fetchListIsMember(params),
    fetchList: (params: any): Promise<any> => fetchList(params),
    fetchInfo: (params: any): Promise<any> => fetchInfo(params),
};

async function fetchListIsMember(params: any): Promise<any> {
    const { data } = await API.get(
        `${ITEM_URL}/list-department-is-members?${convertObToUrl({
            select: "name description sign company image startTime expiredTime milestones numberOfDocs completedMilestones stage createAt members",
            populates: JSON.stringify({
                path: "members company",
                select: "fullname bizfullname name sign image"
            }),
            ...params
        })}`
    )
    return data
}

async function fetchList(params: any): Promise<any> {
    const { data } = await API.get(
        `${ITEM_URL}/departments?${convertObToUrl({
            populates: JSON.stringify({
                path: "members",
                select: "fullname bizfullname name sign image"
            }),
            ...params
        })}`
    )
    return data
}

async function fetchInfo(params: any): Promise<any> {
    const { data } = await API.get(
        `${ITEM_URL}/departments?${convertObToUrl({
            populates: JSON.stringify({
                path: "members photos",
                select: "fullname bizfullname name sign image nameOrg path description size author createAt",
                populate: {
                    path: "author",
                    select: "_id bizfullname image"
                }
            }),
            ...params
        })}`
    )
    return data
}