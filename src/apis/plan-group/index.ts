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
                    select: 'name sign',
                    filter: '{"name": 1, "createAt": 1 , "project": 1, "group": 1, "assignee": 1, "expiredTime": 1, "subType": 1, "status": 1}',
                    populates: '{"path": "project", "select": "name fullname bizfullname image sign"}',
                    ...payload,
                }
            }
        );
        return data;
    },
};

export default GroupRepository;