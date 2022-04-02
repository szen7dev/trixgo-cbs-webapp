/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DepartmentOnTimeKey,
  DepartmentOnBudgetKey,
  DepartmentEnumType,
} from "./index";

// Response form
export type DepartmentResponse<T> = {
  error: boolean;
  data: T;
  status?: number;
};

// Analysis
export type DataBlock1 = Array<{
  _id: {
    ontime: number;
    onbudget: number;
  };
  amount: number;
}>;

export type DataBlock2 = Array<{
  _id: null | string;
  budget: number;
  forecastBudget: number;
  contractValueContractPlusValueContractVatValue: number;
  contractAmountPaid: number;
}>;

export type DataBlock3 = Array<{
  _id: {
    stage: number;
  };
  amount: number;
}>;
export type DepartmentsAnalysisData = {
  dataBlock1: DataBlock1;
  dataBlock2: DataBlock2;
  dataBlock3: DataBlock3;
};

// Subfield
export type AreaData = {
  _id: string;
  childs: string[];
  level: number;
  name: string;
  sign: string;
  modifyAt: string;
  createAt: string;
  userCreate: string;
  __v: number;
};

export type CompanyData = {
  _id: string;
  field: number;
  scale: number;
  owners: string[];
  name: string;
  modifyAt: string;
  createAt: string;
  timeActive: string;
  __v: number;
  image: string;
  address: string;
  phone: string;
  sign: string;
  slogan: string;
  taxid: string;
  userUpdate: string;
  adreport: string[];
  description: string;
  show: number;
  website: string;
  supporters: string[];
};

// List departments
export type DepartmentListData<T> = {
  listRecords: T[];
  limit: number;
  totalRecord: number;
  totalPage: number;
  nextCursor: string | null;
};

export type DataCommon<P, Sn> = {
  _id: string;
  childs: string[];
  level: number;
  admins: string[];
  members: string[];
  image: string;
  type: number;
  stage?: number;
  status: number;
  contracts: string[];
  packages: string[];
  projectType: number;
  projectCapital: number;
  buildingType: number;
  buildingGrade: number;
  planGroups: string[];
  investmentAmount: number;
  name: string;
  sign: string;
  modifyAt: string;
  createAt: string;
  userCreate: string;
  position: string[];
  __v: number;
  numberOfDocs: number;
  company: "company" extends P
    ? undefined extends Sn
      ? CompanyData
      : Pick<CompanyData, Sn>
    : null;
  area: "area" extends P
    ? undefined extends Sn
      ? AreaData
      : Pick<AreaData, Sn>
    : string;
};

export type DataProjectPart<P, Sn> = {
  ontime?: DepartmentOnTimeKey;
  onbudget?: DepartmentOnBudgetKey;
  startTime: string;
  expiredTime: string;
  actualStartTime: string | null;
  actualFinishTime: string | null;
  budget: number;
  forecastBudget: number;
  contractValue: number;
  contractPlusValue: number;
  contractVatValue: number;
  contractAmountPaid: number;
  milestones: number;
  completedMilestones: number;
};

export type DataDepartmentPart<P, Sn> = {
  topics: string[];
  startDate: string | null;
  endDate: string | null;
  description: string;
  owner: string;
  address: string;
  pm: string;
  assistant: string;
  parent: string;
};

export type DataProject<P, Sn> = DataCommon<P, Sn> & DataProjectPart<P, Sn>;
export type DataDepartment<P, Sn> = DataCommon<P, Sn> &
  DataDepartmentPart<P, Sn>;

type ExcludeString<O> = {
  [K in keyof O as O[K] extends string | string[] | null | number | never
    ? never
    : K]: Exclude<O[K], string | null>;
};

type ExcludeObject<O, P> = P extends keyof O
  ? {
      [K in keyof O as O[K] extends object | object[] | null | never
        ? never
        : K]: Exclude<O[K], object | null>;
    }
  : O;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type NestedPartial<T, K extends keyof T> = UnionToIntersection<Pick<T, K>[K]>;

export type DataEnum<P, Sn> = {
  [DepartmentEnumType.PROJECT]: DataProject<P, Sn>;
  [DepartmentEnumType.DEPARTMENT]: DataDepartment<P, Sn>;
};

export type DataDepartmentResponse<T, S, P, Sn> = S extends (infer K)[]
  ? Pick<
      DataEnum<P, undefined>[T extends DepartmentEnumType
        ? T
        : DepartmentEnumType.PROJECT],
      K
    >
  : undefined;

// undefined extends S
//   ? // S is undefined - done
//     undefined extends P
//     ? // P is undefined - done
//       DataEnum<undefined, undefined>[T extends DepartmentEnumType
//         ? T
//         : DepartmentEnumType.PROJECT]
//     : // P is defined - done
//     undefined extends Sn
//     ? // Sn is undefined - done
//       DataEnum<P, undefined>[T extends DepartmentEnumType
//         ? T
//         : DepartmentEnumType.PROJECT]
//     : // Sn is defined - done
//       DataEnum<P, Sn>[T extends DepartmentEnumType
//         ? T
//         : DepartmentEnumType.PROJECT]
//   : // S is key; - done
//   undefined extends P
//   ? // P is undefined - done
//     Pick<
//       DataEnum<undefined, undefined>[T extends DepartmentEnumType
//         ? T
//         : DepartmentEnumType.PROJECT],
//       S
//     >
//   : // P is defined - done
//   undefined extends Sn
//   ? // Sn is undefined - done
//     Pick<
//       DataEnum<P, undefined>[T extends DepartmentEnumType
//         ? T
//         : DepartmentEnumType.PROJECT],
//       S
//     >
//   : // Sn is defined - done
//     Pick<
//       DataEnum<P, Sn>[T extends DepartmentEnumType
//         ? T
//         : DepartmentEnumType.PROJECT],
//       S
//     >;
