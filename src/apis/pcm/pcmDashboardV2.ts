import API from "../repository";
const pcmURL = "/api/subject_pcm";

const pcmDashboardV2 = {
  async searchBySubject(payload: any): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_comments/search-by-subject`,
      {
        params: payload
      }
    );
    return data;
  },
  async pcmFiles(payload: any): Promise<any> {
    const { data } = await API.get<any>(`${pcmURL}/pcm_files/filter`, {
      params: payload
    });
    return data;
  },
  async pcmPlanTaskNotification(payload: any): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_plan_tasks/notification`,
      {
        params: payload,
      }
    );
    return data;
  },
  async pcmDynamicReport(payload: any): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_plan_tasks/dynamic-report`,
      {
        params: payload,
      }
    );
    return data;
  },
  async pcmCommentGetListByProperty(payload: any): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_comments/get-list-by-property`,
      {
        params: payload,
      }
    );
    return data;
  },
  async pcmPlanTaskGetListByProperty(payload: any): Promise<any> {
    const { data } = await API.get<any>(
      `${pcmURL}/pcm_plan_tasks/get-list-by-property`,
      {
        params: payload,
      }
    );
    return data;
  },
};

export default pcmDashboardV2;
