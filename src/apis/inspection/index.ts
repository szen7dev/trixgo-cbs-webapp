import API from "../repository";
import { convertObToUrl } from "utils";
import { CreateInspectionDocsResponse, MutationInspectionDocsPayload } from "typings/inspection/docs";
const inspectionURL = "/api/inspection";

const inspection = {
    async inspectionDocs(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${inspectionURL}/docs?${convertObToUrl({
                // select: "name sign fullname image",
                populates: JSON.stringify({
                    path: "area parentArea group parentGroup author companyOfAuthor assignee companyOfAssignee related project",
                }),
                ...payload
            })}`
        );
        return data;
    },

    async createDocs(formData: MutationInspectionDocsPayload): Promise<CreateInspectionDocsResponse> {
        const { data } = await API.post(
            `${inspectionURL}/docs`,
            {
                ...formData
            }
        )
        return data;
    },

    async inspectionAreas(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${inspectionURL}/areas?${convertObToUrl({
                // select: "name sign fullname image",
                populates: JSON.stringify({ path: "area", }),
                ...payload
            })}`
        );
        return data;
    },

    async inspectionGroups(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${inspectionURL}/groups?${convertObToUrl({
                // select: "name sign fullname image",
                populates: JSON.stringify({ path: "area", }),
                ...payload
            })}`
        );
        return data;
    },
};

export default inspection;