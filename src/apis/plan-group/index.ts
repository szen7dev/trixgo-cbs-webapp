import API from "../repository";
import type { 
    QueryParam,
    GroupResponse
} from 'typings/planGroup';

const GroupRepository = {
    async groupList(payload: QueryParam): Promise<GroupResponse> {
        const { data } = await API.get<GroupResponse>(
            "/api/subject_pcm/pcm_plan_groups", {
                params: {
                    populates: JSON.stringify({
                        path: "project",
                        select: "_id name fullname bizfullname image sign"
                    }),
                    ...payload
                }
            }
        );
        return data;
    },
};

export default GroupRepository;