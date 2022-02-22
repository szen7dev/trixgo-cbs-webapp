import API from "../repository";

import { addTaskPayload, addTaskResponse } from "typings/addTask";

const AddTaskRepository = {
  async addTask(payload: addTaskPayload): Promise<addTaskResponse> {
    const { data } = await API.post<addTaskResponse>(
      `/api/subject_pcm/pcm_plan_tasks`,
      payload
    );
    return data;
  }
};

export default AddTaskRepository;
