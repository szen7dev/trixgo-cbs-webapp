import API from "../repository";

import { TIME_SHEET_URL } from ".";

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
        path: "assignee human project position work",
        select: "_id fullname name",
      },
      ...params,
    },
  });
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

interface SalaryParentRepository {
  fetchListSalary: (
    params: ListSalaryPayload
  ) => Promise<QuerySalaryParentResponse>;
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
}

export const salaryParentRepository: SalaryParentRepository = {
  fetchListSalary: async (params) => {
    return fetchListSalary(params);
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
};
