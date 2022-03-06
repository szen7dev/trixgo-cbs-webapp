/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import API from "../repository";

// Convert Object sang URL query => khi client truyền lên
// import { convertObToUrl } from "utils";

// Khai báo chính xác kiểu trả về nếu biết
import { ResponseList, ResponseCreate } from "typings/datahub/api";
import {
  DatahubTypes,
  DatahubTypesParams,
  DatahubTypesBody,
} from "typings/datahub/datahubtypes";
import {
  DatahubProjects,
  DatahubProjectsBody,
  DatahubProjectsParams,
} from "typings/datahub/projects";
import { DatahubFinancial } from "typings/datahub/financial";
import { DatahubCompanies } from "typings/datahub/company";
import { DatahubArea } from "typings/datahub/area";

// Đường dẫn Endpoint
const url = "/api/datahub";
const DatahubRepository = {
  // ==== DatahubTypes ====
  async getDatahubType<T = undefined>(
    params: { datahubTypeID: string } & DatahubTypesParams
  ) {
    const { data } = await API.get<ResponseCreate<DatahubTypes<T>>>(
      `${url}/datahub_types`,
      { params }
    );
    return data;
  },
  async getDatahubTypesList(params?: DatahubTypesParams) {
    const { data } = await API.get<ResponseList<DatahubTypes>>(
      `${url}/datahub_types`,
      { params }
    );
    return data;
  },
  async createDatahubTypes(body: DatahubTypesBody) {
    const { data } = await API.post<ResponseCreate<DatahubTypes>>(
      `${url}/datahub_types`,
      body
    );
    return data;
  },
  async updateDatahubTypes(body: DatahubTypesBody & { datahubID: string }) {
    const { data } = await API.put<ResponseCreate<DatahubTypes>>(
      `${url}/datahub_types`,
      body
    );
    return data;
  },
  // ==== DatahubProjects ====
  async getProject<T = undefined>(
    params: { datahubProjectID: string } & DatahubProjectsParams
  ) {
    const { data } = await API.get<ResponseCreate<DatahubProjects<T>>>(
      `${url}/datahub_projects`,
      { params }
    );
    return data;
  },
  async getProjectList(params?: DatahubProjectsParams) {
    const { data } = await API.get<ResponseList<DatahubProjects>>(
      `${url}/datahub_projects`,
      { params }
    );
    return data;
  },
  async createProject(body: DatahubProjectsBody) {
    const { data } = await API.post<ResponseCreate<DatahubProjects>>(
      `${url}/datahub_projects`,
      body
    );
    return data;
  },
  async updateProject(
    body: DatahubProjectsBody & { datahubProjectID: string }
  ) {
    const { data } = await API.put<ResponseCreate<DatahubProjects>>(
      `${url}/datahub_projects`,
      body
    );
    return data;
  },
  // ==== Datahub Financial ====
  async getDatahubFinancial(
    params: { contractorID: string } & DatahubProjectsParams
  ) {
    const { data } = await API.get<ResponseList<DatahubFinancial>>(
      `${url}/datahub_finreports`,
      { params }
    );
    return data;
  },
  // ==== DatahubCompanies ====
  async companiesList(params?: DatahubProjectsParams) {
    const { data } = await API.get<ResponseList<DatahubCompanies>>(
      "/api/auth/companies",
      { params }
    );
    return data;
  },
  async getCompany(params: { companyID: string } & DatahubProjectsParams) {
    const { data } = await API.get<ResponseCreate<DatahubCompanies>>(
      "/api/auth/companies",
      { params }
    );
    return data;
  },
  async areaList(params?: DatahubProjectsParams) {
    const { data } = await API.get<ResponseList<DatahubArea>>(
      "/api/ITEM/areas",
      { params }
    );
    return data;
  },
};

// console.log('==============>>>>>')
// console.log(DatahubRepository)

export default DatahubRepository;
