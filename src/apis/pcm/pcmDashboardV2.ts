import API from "../repository";
const pcmURL = "/api/subject_pcm";

const pcmDashboardV2 = {
  async searchBySubject(payload: any): Promise<any> {
    const { data } = await API.post<any>(
      `${pcmURL}/pcm_comments/search-by-subject`, payload
    );
    return data;
  },
};

export default pcmDashboardV2;
