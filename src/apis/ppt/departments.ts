import classNames from "classnames";

import {
  DepartmentListData,
  DepartmentResponse,
  DepartmentsAnalysisData,
  DataEnum,
  NestedPartial,
  DataDepartmentResponse,
  // DepartmentAllResponse
} from "typings/ppt/department";
import { DepartmentEnumType } from "typings/ppt";
import API from "../repository";

const DOCUMENT_URL = "/api/item";

type DepartmentsRepositoryType = {
  getDepartmentsAnalysis: () => Promise<
    DepartmentResponse<DepartmentsAnalysisData>
  >;
  getDepartmentList<
    T extends DepartmentEnumType | undefined,
    S extends
      | keyof DataEnum<undefined, undefined>[T extends undefined
          ? DepartmentEnumType.PROJECT
          : T]
      | undefined,
    P extends
      | (S extends keyof DataEnum<undefined, undefined>[T extends undefined
          ? DepartmentEnumType.PROJECT
          : T]
          ? S
          : keyof DataEnum<undefined, undefined>[T extends undefined
              ? DepartmentEnumType.PROJECT
              : T])
      | undefined,
    Sn extends
      | keyof DataEnum<P, undefined>[T extends DepartmentEnumType
          ? T
          : DepartmentEnumType.PROJECT]
      | undefined
  >(pageParams: {
    type?: T;
    select?: S[];
    populates?: {
      path?: P[];
      select?: Sn[];
    };
  }): Promise<
    DepartmentResponse<DepartmentListData<DataDepartmentResponse<T, S, P, Sn>>>
  >;
};

export const DepartmentsRepository: DepartmentsRepositoryType = {
  async getDepartmentsAnalysis() {
    const { data } = await API.get(`${DOCUMENT_URL}/departments/analysis`);
    return data;
  },
  async getDepartmentList(pageParams) {
    const select = classNames(pageParams.select);
    const { data } = await API.get(`${DOCUMENT_URL}/departments`, {
      params: {
        ...pageParams,
        select,
        populates: pageParams.populates
          ? {
              path: classNames(pageParams.populates.path),
              select: classNames(pageParams.populates.select),
            }
          : undefined,
      },
    });
    return data;
  },
};
