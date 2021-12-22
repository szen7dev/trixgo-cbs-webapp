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
};

export default TaskRepository;
