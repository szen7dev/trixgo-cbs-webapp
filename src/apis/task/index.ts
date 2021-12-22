import API from "../repository";

import {
  ListTaskPayload,
  ListTaskResponse,
  ListCheckListPayload,
  ListCheckListResponse,
} from "typings/task";
import { convertObToUrl } from "helpers";

const pcmURL = "/api/subject_pcm";

const TaskRepository = {
  async listTask(payload: ListTaskPayload): Promise<ListTaskResponse> {
    const { data } = await API.get<ListTaskResponse>(
      `${pcmURL}/pcm_plan_tasks?${convertObToUrl(payload)}`
    );
    return data;
  },

  async listCheckList(
    payload: ListCheckListPayload
  ): Promise<ListCheckListResponse> {
    const { data } = await API.get<ListCheckListResponse>(
      `${pcmURL}/pcm_plan_tasks?${convertObToUrl(payload)}`
    );
    return data;
  },

  async taskInfo(taskID: string): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_plan_tasks?${convertObToUrl({
        taskID,
        select:
          "name description checklists type parent checklist bidPrice bidPriceAdjustment bidPriceDiscount createAt group author assignee related expiredTime responses assigneeAttachs authorAttachs",
        populates: JSON.stringify({
          value: "group author assignee related parent",
          select: "_id name fullname image",
        }),
      })}`
    );

    return data;
  },
};

export default TaskRepository;
