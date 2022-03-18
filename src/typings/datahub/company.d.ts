export type DatahubCompanies = {
  _id: string;
  field: number;
  type: string[];
  scale: number;
  show: number;
  owners: string[];
  supporters: string[];
  adreport: string[];
  humanreport: string[];
  image: string;
  name: string;
  sign: string;
  taxid: string;
  phone: string;
  address: string;
  email: string;
  website: string;
  slogan: string;
  userCreate: string;
  modifyAt: DateString;
  createAt: DateString;
  timeActive: DateString;
  __v: 0;
};

export type DatahubComapniesBody = {
  type: number;
  popular: number;
  name: string;
  description: string;
};
