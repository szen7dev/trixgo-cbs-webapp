/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import API from "../repository";

// Convert Object sang URL query => khi client truyền lên
// import { convertObToUrl } from "utils";
// Khai báo chính xác kiểu trả về nếu biết
import { ResponseCreate, ResponseList } from "typings/apis/response";
import { DatahubPrams } from "typings/datahub/api";
import { DatahubArea } from "typings/datahub/area";
import { DatahubCompanies } from "typings/datahub/company";
import { DatahubContract, DatahubContractBody } from "typings/datahub/contract";
import { DatahubTypes, DatahubTypesBody, DatahubTypesParams } from "typings/datahub/datahubtypes";
import { DatahubFinancial, DatahubFinancialBody } from "typings/datahub/financial";
import { DatahubProfile, DatahubProfileBody, DatahubProfileUpdate } from "typings/datahub/profile";
import { DatahubProjects, DatahubProjectsBody } from "typings/datahub/projects";

import { getDatahubPackageList } from "./package";
import { getDatahubProfileList } from "./profiles";

// Đường dẫn Endpoint
export const url = "/api/datahub";
const DatahubRepository = {
  // ==== DatahubTypes ====
  async getDatahubType<T = undefined>(params: { datahubTypeID: string } & DatahubTypesParams) {
    const { data } = await API.get<ResponseCreate<DatahubTypes<T>>>(`${url}/datahub_types`, {
      params,
    });
    return data;
  },
  async getDatahubTypesList(params?: DatahubTypesParams) {
    const { data } = await API.get<ResponseList<DatahubTypes>>(`${url}/datahub_types`, { params });
    return data;
  },
  async createDatahubTypes(body: DatahubTypesBody) {
    const { data } = await API.post<ResponseCreate<DatahubTypes>>(`${url}/datahub_types`, body);
    return data;
  },
  async updateDatahubTypes(body: DatahubTypesBody & { datahubID: string }) {
    const { data } = await API.put<ResponseCreate<DatahubTypes>>(`${url}/datahub_types`, body);
    return data;
  },
  // ==== DatahubProjects ====
  async getProject<T = undefined>(params: { datahubProjectID: string } & DatahubPrams) {
    const { data } = await API.get<ResponseCreate<DatahubProjects<T>>>(`${url}/datahub_projects`, {
      params,
    });
    return data;
  },
  async getProjectList(params?: DatahubPrams) {
    const { data } = await API.get<ResponseList<DatahubProjects>>(`${url}/datahub_projects`, {
      params,
    });
    return data;
  },
  async createProject(body: DatahubProjectsBody) {
    const { data } = await API.post<ResponseCreate<DatahubProjects>>(
      `${url}/datahub_projects`,
      body
    );
    return data;
  },
  async updateProject(body: DatahubProjectsBody & { datahubProjectID: string }) {
    const { data } = await API.put<ResponseCreate<DatahubProjects>>(
      `${url}/datahub_projects`,
      body
    );
    return data;
  },
  // ==== Datahub Financial ====
  async getDatahubFinancialList(params: { contractorID: string } & DatahubPrams) {
    const { data } = await API.get<ResponseList<DatahubFinancial>>(`${url}/datahub_finreports`, {
      params,
    });
    return data;
  },
  async getDatahubFinancial(
    params: { contractorID: string; datahubFinreportID: string } & DatahubPrams
  ) {
    const { data } = await API.get<ResponseList<DatahubFinancial>>(`${url}/datahub_finreports`, {
      params,
    });
    return data;
  },
  async createDatahubFinancial(body: DatahubFinancialBody) {
    const { data } = await API.post<ResponseCreate<DatahubFinancial>>(
      `${url}/datahub_finreports`,
      body
    );
    return data;
  },
  async updateDatahubFinancial(body: DatahubFinancialBody) {
    const { data } = await API.put<ResponseCreate<DatahubFinancial>>(
      `${url}/datahub_finreports`,
      body
    );
    return data;
  },

  // ==== Datahub Contract ====
  async getDatahubContractList(params: { contractorID: string } & DatahubPrams) {
    const { data } = await API.get<ResponseList<DatahubContract>>(`${url}/datahub_packages`, {
      params,
    });
    return data;
  },
  async getDatahubContract(
    params: { contractorID: string; datahubPackageID: string } & DatahubPrams
  ) {
    const { data } = await API.get<ResponseList<DatahubContract>>(`${url}/datahub_packages`, {
      params,
    });
    return data;
  },
  async createDatahubContract(body: DatahubContractBody) {
    const { data } = await API.post<ResponseCreate<DatahubContract>>(
      `${url}/datahub_packages`,
      body
    );
    return data;
  },
  async updateDatahubContract(body: DatahubContractBody) {
    const { data } = await API.put<ResponseCreate<DatahubContract>>(
      `${url}/datahub_packages`,
      body
    );
    return data;
  },

  // ==== Datahub Packages
  getDatahubPackageList,
  // ==== Datahub Contract ====
  async getDatahubInspection<T extends { inspectionDocID?: string } & DatahubPrams>(params: T) {
    // Get List and Specific item
    const { data } = await API.get<
      T["inspectionDocID"] extends string
        ? ResponseCreate<DatahubInspection>
        : ResponseList<DatahubInspection>
    >(`${url}/datahub_inspection_docs`, { params });
    return data;
  },
  async createDatahubInspection(body: DatahubInspectionBody) {
    // Create new item
    const { data } = await API.post<ResponseCreate<DatahubInspection>>(
      `${url}/datahub_inspection_docs`,
      body
    );
    return data;
  },
  async updateDatahubInspection(body: DatahubInspectionBody) {
    // Update item
    const { data } = await API.put<ResponseCreate<DatahubInspection>>(
      `${url}/datahub_inspection_docs`,
      body
    );
    return data;
  },
  async deleteDatahubInspection(params: { inspectionDocID: string }) {
    // Remove one item
    const { data } = await API.delete<ResponseCreate<DatahubInspection>>(
      `${url}/datahub_inspection_docs`,
      { params }
    );
    return data;
  },

  // ==== Datahub Profiles ====
  getDatahubProfileList,
  async getDatahubProfile(params: { datahubProfileID: string } & DatahubPrams) {
    const { data } = await API.get<ResponseList<DatahubProfile>>(`${url}/datahub_profiles`, {
      params,
    });
    return data;
  },
  async createDatahubProfile(body: DatahubProfileBody) {
    const { data } = await API.post<ResponseCreate<DatahubProfile>>(
      `${url}/datahub_profiles`,
      body
    );
    return data;
  },
  async updateDatahubProfile(body: DatahubProfileUpdate) {
    const { data } = await API.put<ResponseCreate<DatahubProfile>>(`${url}/datahub_profiles`, body);
    return data;
  },

  // ==== DatahubCompanies ====
  async companiesList(params?: DatahubPrams) {
    const { data } = await API.get<ResponseList<DatahubCompanies>>("/api/auth/companies", {
      params,
    });
    return data;
  },
  async getCompany(params: { companyID: string } & DatahubPrams) {
    const { data } = await API.get<ResponseCreate<DatahubCompanies>>("/api/auth/companies", {
      params,
    });
    return data;
  },
  async areaList(params?: DatahubPrams) {
    const { data } = await API.get<ResponseList<DatahubArea>>("/api/ITEM/areas", { params });
    return data;
  },
};

// console.log('==============>>>>>')
// console.log(DatahubRepository)

export default DatahubRepository;
