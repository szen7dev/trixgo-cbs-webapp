import { DatahubArea } from "./area";
import { DatahubTypes } from "./datahubtypes";
import { DatahubProjects } from "./projects";

export type DatahubContractBase = {
  projectType: number;
  buildingType: number;
  buildingGrade: number;
  basementNumber: number;
  basementArea: number;
  floorNumber: number;
  floorArea: number;
  value: number;
  vatValue: number;
  date: DateString;
  startTime: DateString;
  endTime: DateString;
  status: number;
  files?: [];
  state: number;
  _id: string;
  id: string;
  contractor: string;
  project: string | null | DatahubProjects;
  field: string | null | DatahubTypes;
  name: string;
  userCreate: string;
  client: string;
  area1: string | DatahubArea;
  area2: string | DatahubArea;
  area3: string | DatahubArea;
  sign: string;
  note: string;
  modifyAt: DateString;
  createAt: DateString;
  createdAt: DateString;
  updatedAt: DateString;
  __v: 0;
};

export type DatahubContract<T = keyof DatahubContractBase> = Pick<
  DatahubContractBase,
  T
>;

type test = DatahubContract<string>;

export type DatahubContractBody = {
  datahubPackageID?: string;
  contractor: string;
  project: string;
  field: string;
  name: string;
  sign?: string;
  note?: string;
  value: number;
  vatValue: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  status: number;
};
