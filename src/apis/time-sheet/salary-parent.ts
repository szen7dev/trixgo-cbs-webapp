import API from "../repository";

import { TIME_SHEET_URL } from ".";
import { convertObToUrl } from "utils";

import type {
  ListSalaryPayload,
  QuerySalaryParentResponse,
  InsertSalaryParentPayload,
  InsertSalaryParentResponse,
  UpdateSalaryParentPayload,
  UpdateSalaryParentResponse,
  DeleteSalaryParentPayload,
  DeleteSalaryParentResponse,
  QueryDetailSalaryParentResponse,
} from "typings/salary";

export async function fetchListSalary<T>(
  params?: ListSalaryPayload
): Promise<T> {
  const { data } = await API.get(`${TIME_SHEET_URL}/expert_salary`, {
    params: {
      populates: {
        path: "assignee human project funda position work userCreate userUpdate",
        select: "_id fullname name",
      },
      ...params,
    },
  });
  return data;
}

export async function fetchListByProperty<T>(
  params?: any
): Promise<T> {
  const { data } = await API.get(`${TIME_SHEET_URL}/expert_salary/get-list-by-property`, {
    params: {
      ...params,
    },
  })
  return data;
}

export async function insertSalary<P, R>(payload: P): Promise<R> {
  const { data } = await API.post(`${TIME_SHEET_URL}/expert_salary`, payload);
  return data;
}

export async function updateSalary<P, R>(payload: P): Promise<R> {
  const { data } = await API.put(`${TIME_SHEET_URL}/expert_salary`, payload);
  return data;
}

export async function deleteSalary<P, R>(payload: P): Promise<R> {
  const { data } = await API.delete(`${TIME_SHEET_URL}/expert_salary`, {
    data: payload,
  });
  return data;
}

export async function exportExcel(payload: any): Promise<any> {
  const { data } = await API.get<any>(
      `${TIME_SHEET_URL}/expert_salary/export-excel?${convertObToUrl(payload)}`
  )
  return data
}

interface SalaryParentRepository {
  fetchListSalary: (
    params: ListSalaryPayload
  ) => Promise<QuerySalaryParentResponse>;
  fetchListByProperty: (
    params: ListSalaryPayload
  ) => Promise<any>;
  fetchDetailSalary: (
    params: ListSalaryPayload
  ) => Promise<QueryDetailSalaryParentResponse>;
  insertSalary: (
    payload: InsertSalaryParentPayload
  ) => Promise<InsertSalaryParentResponse>;
  updateSalary: (
    payload: UpdateSalaryParentPayload
  ) => Promise<UpdateSalaryParentResponse>;
  deleteSalary: (
    payload: DeleteSalaryParentPayload
  ) => Promise<DeleteSalaryParentResponse>;
  exportExcel: (payload: any) => Promise<any>;
}

export const salaryParentRepository: SalaryParentRepository = {
  fetchListSalary: async (params) => {
    return fetchListSalary(params);
  },
  fetchListByProperty: async (params) => {
    return fetchListByProperty(params);
  },
  fetchDetailSalary: async (params) => {
    return fetchListSalary(params);
  },
  insertSalary: async (payload) => {
    return insertSalary(payload);
  },
  updateSalary: (payload) => {
    return updateSalary(payload);
  },
  deleteSalary: (payload) => {
    return deleteSalary(payload);
  },
  exportExcel: (payload) => {
    return exportExcel(payload);
  }
};
