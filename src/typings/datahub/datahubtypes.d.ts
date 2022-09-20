export type DatahubTypesBase = {
  _id: string;
  type: 1 | 2;
  level: number;
  numberOfContractors: number;
  numberOfPosts: number;
  numberOfViews: number;
  numberOfContracts: number;
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

export type DatahubTypes<T = keyof DatahubTypesBase> = Pick<
  DatahubTypesBase,
  T
>;

export type DatahubTypesParams = {
  limit?: number;
  type?: number;
  select?: string;
  lastestID?: string;
  level?: number;
  keyword?: string;
  parentID?: string;
};

export type DatahubTypesBody = {
  type: number;
  popular: number;
  name: string;
  description: string;
  parent?: string;
};
