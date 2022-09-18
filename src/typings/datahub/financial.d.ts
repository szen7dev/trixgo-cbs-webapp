export type DatahubFinancialBase = {
  _id: string;
  fiscalYear: number;
  asset: number;
  liabilitiy: number;
  netWorth: number;
  currentAsset: number;
  shortTermLiabilitiy: number;//
  workingCapital: number;
  grossRevenue: number;
  grossConstructionRevenue: number;//
  grossProfit: number;
  grossProfitAfterTax: number;
  files: [];
  state: number;
  userCreate: string;
  userUpdate: string;
  modifyAt: DateString;
  createAt: DateString;
  createdAt: DateString;
  updatedAt: DateString;
};

export type DatahubFinancial<T = keyof DatahubFinancialBase> = Pick<
  DatahubFinancialBase,
  T
>;

export type DatahubFinancialBody = {
  contractor?: string;
  datahubFinreportID?: string;
  fiscalYear?: number;
  asset?: number;
  files?: string[];
  liabilitiy?: number;
  netWorth?: number;
  currentAsset?: number;
  shortTermLiabilitiy?: number;//
  workingCapital?: number;
  grossRevenue?: number;
  grossConstructionRevenue?: number;//
  grossProfit?: number;
  grossProfitAfterTax?: number;
};
