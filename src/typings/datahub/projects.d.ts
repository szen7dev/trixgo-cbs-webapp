import { DatahubArea } from "./area";

type DatahubClient = {
  _id: string;
  field: number;
  type: any[];
  scale: number;
  show: number;
  owners: any[];
  supporters: string[];
  adreport: string[];
  humanreport: string[];
  name: string;
  sign: string;
  taxid: string;
  phone: string;
  address: string;
  slogan: string;
  userCreate: string;
  modifyAt: DateString;
  createAt: DateString;
  createdAt: DateString;
  __v: 0;
};

export type DatahubProjectBase = {
  _id: string;
  projectType: number;
  buildingType: number;
  buildingGrade: number;
  basementNumber: number;
  basementArea: number;
  floorNumber: number;
  floorArea: number;
  status: number;
  files: any[];
  state: number;
  name: string;
  userCreate: string;
  userUpdate: string;
  client: string | DatahubClient;
  address: string;
  area3: string | DatahubArea;
  area2: string | DatahubArea;
  area1: string | DatahubArea;
  location: string;
  sign: string;
  note: string;
  modifyAt: DateString;
  createAt: DateString;
  createdAt: DateString;
  updatedAt: DateString;
};

export type DatahubProjects<T = keyof DatahubProjectBase> =  Pick<DatahubProjectBase, T>

export type DatahubProjectsParams = {
  limit?: number;
  select?: string;
  lastestID?: string;
  populates?: {
    path: string;
    select?: string;
		populate?: string;
  } | string;
  keyword?: string;
};

export type DatahubProjectsBody = {
  client: string;
  address: string;
  area3: string;
  name: string;
  sign: string;
  note?: string;
  location?: string;
  projectType?: number;
  buildingType?: number;
  buildingGrade?: number;
  basementNumber?: number;
  basementArea?: number;
  floorNumber?: number;
  floorArea?: number;
  status?: number;
};
