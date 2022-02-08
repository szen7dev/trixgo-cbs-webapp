import API from "../repository";

const DOCUMENT_URL = "/api/item";

type DepartmentsRepositoryType = {
  getDepartmentsAnalysis: () => Promise<
    DepartmentResponse<DepartmentsAnalysisData>
  >;
  getDepartmentList: (
    pageParams: any
  ) => Promise<DepartmentResponse<DepartmentListData>>;
};

export const DepartmentsRepository: DepartmentsRepositoryType = {
  async getDepartmentsAnalysis() {
    const { data } = await API.get(`${DOCUMENT_URL}/departments/analysis`);
    return data;
  },
  async getDepartmentList(pageParams) {
    const { data } = await API.get(`${DOCUMENT_URL}/departments`, {
      params: pageParams,
    });
    return data;
  },
};
