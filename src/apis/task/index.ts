import API from "../repository";

import { ListTaskPayload, ListTaskResponse } from "typings/task";
import { convertObToUrl } from "helpers";

const pcmURL = "/api/subject_pcm";

const TaskRepository = {
  async listTask(payload: ListTaskPayload): Promise<ListTaskResponse> {
    const { data } = await API.get<ListTaskResponse>(
      `${pcmURL}/pcm_plan_tasks?${convertObToUrl(payload)}`
    );
    return data;
  },

  async taskInfo(taskID: string): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_plan_tasks?${convertObToUrl({
        taskID,
        select:
          "name description checklists bidPrice bidPriceAdjustment bidPriceDiscount createAt parent group author assignee related expiredTime  suid actualStartTime parent comments responses assigneeAttachs authorAttachs",
        populates: JSON.stringify({
          value: "group author assignee related",
          select: "_id name fullname image",
        }),
      })}`
    );

    return data;
  },
};

export default TaskRepository;
