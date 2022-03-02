export type DatahubTypes = {
  _id: string;
  type: number;
  level: number;
  numberOfContractors: number;
  popular: number;
  contractors: Array<any>;
  state: number;
  name: string;
  userCreate: string;
  description: string;
  modifyAt: DateString;
  createAt: DateString;
  createdAt: DateString;
  updatedAt: DateString;
};

export type DatahubTypesParams = {
  limit?: number;
  type?: number;
  select?: string;
  lastestID?: string;
  level?: number;
  keyword?: string;
};

export type DatahubTypesBody = {
  type: number;
  popular: number;
  name: string;
  description: string;
};