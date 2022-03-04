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
import { DatahubCompanies } from "typings/datahub/company";
import { DatahubArea } from "typings/datahub/area";

// Đường dẫn Endpoint
const url = "/api/datahub";
const DatahubRepository = {
  // ==== DatahubTypes ====
  async getDatahubType<T = undefined>(
    params: { datahubID: string } & DatahubTypesParams
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
  async updateProject(datahubProjectID: string, body: DatahubProjectsBody) {
    const { data } = await API.put<ResponseCreate<DatahubProjects>>(
      `${url}/datahub_projects`,
      { datahubProjectID, ...body }
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
