/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { DepartmentResponse } from "./../../typings/ppt/department.d";
import classNames from "classnames";

import {
  DepartmentListData,
  DepartmentsAnalysisData,
  DataEnum,
  DataDepartmentResponse,
} from "typings/ppt/department";
import { APIResponse, DepartmentEnumType } from "typings/ppt";
import API from "../repository";

const DOCUMENT_URL = "/api/item";

async function getDepartmentList<
  T extends DepartmentEnumType | undefined,
  S extends (keyof DataEnum<undefined, undefined>[T extends undefined
    ? DepartmentEnumType.PROJECT
    : T])[],
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
  select?: S;
  populates?: {
    path?: P[];
    select?: Sn[];
  };
}) {
  const select = classNames(pageParams.select);
  const { data } = await API.get<
    APIResponse & {
      data: DepartmentListData<DataDepartmentResponse<T, S, P, Sn>>;
    }
  >(`${DOCUMENT_URL}/departments`, {
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
}

export const DepartmentsRepository = {
  async getDepartmentsAnalysis() {
    const { data } = await API.get<
      APIResponse & { data: DepartmentsAnalysisData }
    >(`${DOCUMENT_URL}/departments/analysis`);

    return data;
  },
  getDepartmentList,
};
