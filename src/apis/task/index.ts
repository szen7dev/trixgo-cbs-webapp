import API from "../repository";

import {
  TaskListParams,
  TaskInfoParams,
  ListTaskResponse,
  ListCheckListPayload,
  ListCheckListResponse,
  CheckListPayload,
  UpdateCheckListPayload,
  ChildTaskPayload,
  ListChildTaskPayload,
  ListChildTaskResponse,
  ResponsePayload,
  ResponseResponse,
  ListResponsePayload,
  SearchResponsePayload,
  AddRelationUserPayload,
  CopyTaskPayload,
  MoveTaskToParentPayload,
  MoveTaskToGroupPayload,
  addTaskPayload,
  addTaskResponse,
  CommentPayload,
  ListCommentsPayload,
  UpdateStatusCheckListPayload,
  ReactionCommentPayload,
  ListReactionPayload,
  updateTaskPayload,
  UpdateResponsePayload
} from "typings/task";
import { convertObToUrl } from "utils";

const populatesTask = JSON.stringify({
  path: "group contract author assignee related parent project company field approver authorAttachs assigneeAttachs signatures openedUsers",
  select: "_id name fullname bizfullname image sign _id name nameOrg description size path mimeType type author createAt members company",
  populate: {
    path: "author",
    select: "_id bizfullname image"
  }
})

const populatesResponse = JSON.stringify({
  path: "task files images author",
  select: "_id bizfullname image position name nameOrg path size mimeType description author createAt",
  populate: {
    path: "author position",
    select: "_id bizfullname image name sign"
  }
});

const populatesComment = JSON.stringify({
  path: "author lastestReplyID files images task",
  select: "_id bizfullname image name nameOrg description path mimeType size author type parent content files images amountCommentReply amountReaction createAt task company project group",
  populate: {
      path: 'author lastestReplyID files images task',
      select: '_id bizfullname image name nameOrg description path mimeType size author type parent content files images amountCommentReply amountReaction createAt task company project group'
  }
});

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

  async updateTask(payload: updateTaskPayload): Promise<any> {
    const { data } = await API.put<any>(
      `${pcmURL}/pcm_plan_tasks`,
      payload
    );
    return data;
  },

  async listTask(payload: TaskListParams): Promise<ListTaskResponse> {
    const { data } = await API.get<ListTaskResponse>(
      `${pcmURL}/pcm_plan_tasks?${convertObToUrl({
        select: "assignee lastLog checklist description name expiredTime status percentage project actualFinishTime amountChecklist amountFinishedChecklist",
        populates: JSON.stringify({
          path: "assignee lastLog project",
          select: "name fullname bizfullname image author content createAt sign",
          populate: {
            path: "author",
            select: "_id fullname bizfullname image",
          }
        }),
        ...payload
      })}`
    );
    return data;
  },

  async taskInfo(payload: TaskInfoParams): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_plan_tasks?${convertObToUrl({
        select: "name description type typeStatus status draft priority project contract parent checklist createAt field group author assignee related expiredTime actualFinishTime responses assigneeAttachs authorAttachs timeApproved valueApproved approver percentage signatures openedUsers comments amountComment amountResponse amountMarkedResponse startTime subtype flags milestone",
        populates: populatesTask,
        ...payload
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

  async copyTask(payload: CopyTaskPayload): Promise<any> {
    const { data } = await API.post<any>(
      `${pcmURL}/pcm_plan_tasks/copy-task`,
      payload
    );
    return data;
  },

  async moveTaskToParent(payload: MoveTaskToParentPayload): Promise<any> {
    const { data } = await API.post<any>(
      `${pcmURL}/pcm_plan_tasks/move-task-to-parent`,
      payload
    );
    return data;
  },

  async moveTaskToGroup(payload: MoveTaskToGroupPayload): Promise<any> {
    const { data } = await API.post<any>(
      `${pcmURL}/pcm_plan_tasks/move-task-to-group`,
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
    payload: UpdateCheckListPayload
  ): Promise<any> {
    const { data } = await API.put<any>(
      `${pcmURL}/pcm_plan_tasks`,
      payload
    );
    return data;
  },

  async updateStatusChecklist(
    payload: UpdateStatusCheckListPayload
  ): Promise<any> {
    const { data } = await API.put<any>(
      `${pcmURL}/pcm_plan_tasks`,
      {
        taskID: payload.checklistID,
        status: payload.status
      }
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
        populates: populatesResponse,
        ...payload,
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

  /**
   * ============================ *********************** ===============================
   * ============================ 	 BÌNH LUẬN CÔNG VIỆC  ===============================
   * ============================ *********************** ===============================
   */
  async createComment(payload: CommentPayload): Promise<any> {
    const { data } = await API.post<any>(
      `${pcmURL}/pcm_comments`,
      {
        populates: populatesComment,
        ...payload,
      }
    );
    return data;
  },
  async updateComment(payload: CommentPayload | UpdateResponsePayload): Promise<any> {
    const { data } = await API.put<any>(
      `${pcmURL}/pcm_comments`,
      {
        populates: populatesComment,
        ...payload,
      }
    );
    return data;
  },
  async deleteComment(id: string): Promise<{ error: boolean, message: string }> {
    const { data } = await API.delete<{ error: boolean, message: string }>(
      `${pcmURL}/pcm_comments?commentID=${id}`
    );
    return data;
  },
  async listComments(payload: ListCommentsPayload): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_comments?${convertObToUrl({
        populates: populatesComment,
          ...payload,
      })}`
    );
    return data;
  },

  async reactionComment(payload: ReactionCommentPayload): Promise<any> {
    const { data } = await API.post<any>(
      `${pcmURL}/pcm_comments/reactions`,
      payload
    );
    return data;
  },
  async listReactionsComment(payload: ListReactionPayload): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_comments/reactions?${convertObToUrl({
          populates: JSON.stringify({
            path: 'author',
            select: "_id bizfullname image"
          }),
          ...payload,
      })}`
    );
    return data;
  },
};

export default TaskRepository;