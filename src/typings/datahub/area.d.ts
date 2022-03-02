export type DatahubArea = {
  _id: string;
  childs: string[];
  level: number;
  name: string;
  sign: string;
  parent: string;
  userCreate: string;
  modifyAt: DateString;
  createAt: DateString;
  modifyAt: DateString;
  __v: 0;
};

export type DatahubAreaBody = {
  type: number;
  popular: number;
  name: string;
  description: string;
};
