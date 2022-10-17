import API from "../repository";
import { convertObToUrl } from "utils";
const inspectionURL = "/api/inspection";

const inspection = {
    async inspectionDocs(payload: any): Promise<any> {
        const { data } = await API.get<any>(
            `${inspectionURL}/docs?${convertObToUrl({
                // select: "name sign fullname image",
                populates: JSON.stringify({
                    path:"area parentArea group parentGroup author companyOfAuthor assignee companyOfAssignee related",
                    
                }),
                ...payload
            })}`
        );
        return data;
    },
  };
  
export default inspection;