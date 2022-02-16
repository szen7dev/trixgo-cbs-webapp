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
        select: "name description type typeStatus project parent checklist createAt group author assignee related expiredTime responses assigneeAttachs authorAttachs timeApproved valueApproved approver percentage signatures comments amountResponse amountResponseMarked",
        populates: JSON.stringify({
          path: "group author assignee related parent project approver",
          select: "_id name fullname image sign",
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
      `${pcmURL}/pcm_plan_task_comments`,
      payload
    );
    return data;
  },

  async updateMarkResponse(
    payload: { commentTemplateID: string, taskID: string, isMarked: boolean }
  ): Promise<any> {
    const { data } = await API.put<any>(
      `${pcmURL}/pcm_plan_task_comments`,
      payload
    );
    return data;
  },

  async listResponse(
    payload: ListResponsePayload
  ): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_plan_task_comments?${convertObToUrl({
        select: "comment isMarked type task userCreate createAt",
        populates: JSON.stringify({
          path: "comment userCreate",
          select: "_id bizfullname fullname image files images content",
          populate: {
            path: 'images files',
            options: {
              limit: 5,
            },
            select: '_id name nameOrg path description createAt userCreate',
            populate: {
              path: 'userCreate',
              select: '_id bizfullname'
            }
          }
        }),
        ...payload
      })}`
    );
    return data;
  },

  async searchResponseById(
    payload: SearchResponsePayload
  ): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_plan_task_comments/search?${convertObToUrl({
        select: "comment isMarked type task userCreate createAt",
        populates: JSON.stringify({
          path: "comment userCreate",
          select: "_id bizfullname fullname image files images content",
          populate: {
            path: 'images files',
            options: {
              limit: 5,
            },
            select: '_id name nameOrg path description createAt userCreate',
            populate: {
              path: 'userCreate',
              select: '_id bizfullname'
            }
          }
        }),
        ...payload
      })}`
    );
    return data;
  },
};

export default TaskRepository;