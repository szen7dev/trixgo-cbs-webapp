import API from "../repository";

import {
  ListTaskPayload,
  ListTaskResponse,
  ListCheckListPayload,
  ListCheckListResponse,
  CheckListPayload,
  ResponsePayload,
  ResponseResponse,
  ListResponsePayload,
  SearchResponsePayload,
} from "typings/task";
import { convertObToUrl } from "utils";

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
        select: "name description type typeStatus project parent checklist createAt group author assignee related expiredTime responses assigneeAttachs authorAttachs timeApproved valueApproved approver percentage signatures comments amountResponse amountMarkedResponse",
        populates: JSON.stringify({
          path: "group author assignee related parent project company approver",
          select: "_id name fullname bizfullname image sign",
        }),
      })}`
    );

    return data;
  },

  async addChecklist(
    payload: CheckListPayload
  ): Promise<any> {
    const { data } = await API.post<any>(
      `${pcmURL}/pcm_plan_tasks`,
      payload
    );
    return data;
  },

  async updateChecklist(
    payload: CheckListPayload
  ): Promise<any> {
    const { data } = await API.put<any>(
      `${pcmURL}/pcm_plan_tasks`,
      payload
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

  async addResponse(
    payload: ResponsePayload
  ): Promise<ResponseResponse> {
    const { data } = await API.post<ResponseResponse>(
      `${pcmURL}/pcm_comments`,
      {
        ...payload,
        populates: JSON.stringify({
          path: "author",
          select: "_id bizfullname image"
        })
      }
    );
    return data;
  },

  async updateMarkResponse(
    payload: { commentID: string, taskID: string, official: boolean }
  ): Promise<any> {
    const { data } = await API.put<any>(
      `${pcmURL}/pcm_comments/mark`,
      payload
    );
    return data;
  },

  async listResponse(
    payload: ListResponsePayload
  ): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_comments?${convertObToUrl({
        populates: JSON.stringify({
          path: "task files images author",
          select: "_id bizfullname image name nameOrg path size createAt",
          options: {
            limit: 5,
          },
        }),
        ...payload,
        type: 2
      })}`
    );
    return data;
  },

  async searchResponseById(
    payload: SearchResponsePayload
  ): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_comments/search-by-id?${convertObToUrl({
        select: "comment official type task userCreate createAt",
        populates: JSON.stringify({
          path: "task files images author",
          select: "_id bizfullname image name nameOrg path size createAt",
          options: {
            limit: 5,
          },
        }),
        ...payload
      })}`
    );
    return data;
  },
};

export default TaskRepository;