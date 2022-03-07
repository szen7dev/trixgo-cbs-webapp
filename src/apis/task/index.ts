import API from "../repository";

import {
  ListTaskPayload,
  ListTaskResponse,
  ListCheckListPayload,
  ListCheckListResponse,
  CheckListPayload,
  ChildTaskPayload,
  ListChildTaskPayload,
  ListChildTaskResponse,
  ResponsePayload,
  ResponseResponse,
  ListResponsePayload,
  SearchResponsePayload,
  AddRelationUserPayload,
  addTaskPayload,
  addTaskResponse
} from "typings/task";
import { convertObToUrl } from "utils";

const populatesResponse = JSON.stringify({
  path: "task files images author",
  select: "_id bizfullname image name nameOrg path size mimeType description author createAt",
  // options: {
  //   limit: 5,
  // },
  populate: {
    path: "author",
    select: "_id bizfullname image"
  }
})

const pcmURL = "/api/subject_pcm";

const TaskRepository = {
  /**
   * ============================ ************* ===============================
   * ============================ 	 PCM TASK   ===============================
   * ============================ ************* ===============================
   */
  async addTask(payload: addTaskPayload): Promise<addTaskResponse> {
    const { data } = await API.post<addTaskResponse>(
      `${pcmURL}/pcm_plan_tasks`,
      payload
    );
    return data;
  },

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
          path: "group author assignee related parent project company approver authorAttachs",
          select: "_id name fullname bizfullname image sign _id name nameOrg size path mimeType type author createAt",
          populate: {
            path: "author",
            select: "_id bizfullname image"
          }
        }),
      })}`
    );

    return data;
  },

  async addRelationUser(payload: AddRelationUserPayload): Promise<any> {
    const { data } = await API.put<any>(
      `${pcmURL}/pcm_plan_tasks`,
      payload
    );
    return data;
  },

  /**
   * ============================ ************** ===============================
   * ============================ 	 CHECKLIST   ===============================
   * ============================ ************** ===============================
   */
  async addChecklist(
    payload: CheckListPayload
  ): Promise<any> {
    const { data } = await API.post<any>(
      `${pcmURL}/pcm_plan_tasks`,
      {
        select: "_id name assignee expiredTime parent status parent type",
        populates: JSON.stringify({
          path: "assignee",
          select: "_id bizfullname fullname image"
        }),
        ...payload,
      }
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

  /**
   * ============================ ************** ===============================
   * ============================ 	 CHILD TASK  ===============================
   * ============================ ************** ===============================
   */
   async addChildTask(payload: ChildTaskPayload): Promise<any> {
    const { data } = await API.post<any>(
      `${pcmURL}/pcm_plan_tasks`,
      {
        select: "_id name assignee expiredTime parent status parent type",
        populates: JSON.stringify({
          path: "assignee",
          select: "_id bizfullname fullname image"
        }),
        ...payload,
      }
    );
    return data;
  },

  async updateChildTask(payload: ChildTaskPayload): Promise<any> {
    const { data } = await API.put<any>(
      `${pcmURL}/pcm_plan_tasks`,
      payload
    );
    return data;
  },

  async listChildTask(payload: ListChildTaskPayload): Promise<ListChildTaskResponse> {
    const { data } = await API.get<ListChildTaskResponse>(
      `${pcmURL}/pcm_plan_tasks?${convertObToUrl(payload)}`
    );
    return data;
  },

  /**
   * ============================ *********************** ===============================
   * ============================ 	 PHẢN HỒI LIÊN QUAN   ===============================
   * ============================ *********************** ===============================
   */
  async addResponse(payload: ResponsePayload): Promise<ResponseResponse> {
    const { data } = await API.post<ResponseResponse>(
      `${pcmURL}/pcm_comments`,
      {
        ...payload,
        populates: populatesResponse
      }
    );
    return data;
  },

  async updateMarkResponse(payload: { commentID: string, taskID: string, official: boolean }): Promise<any> {
    const { data } = await API.put<any>(
      `${pcmURL}/pcm_comments/mark`,
      payload
    );
    return data;
  },

  async listResponse(payload: ListResponsePayload): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_comments?${convertObToUrl({
        populates: populatesResponse,
        ...payload,
        type: 2
      })}`
    );
    return data;
  },

  async searchResponseById(payload: SearchResponsePayload): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_comments/search-by-id?${convertObToUrl({
        populates: populatesResponse,
        ...payload
      })}`
    );
    return data;
  },
};

export default TaskRepository;