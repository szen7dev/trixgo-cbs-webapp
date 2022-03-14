interface DatahubInspection {
  type: number;
  state: number;
  _id: string;
  name: string;
  userCreate: string;
  sign: string;
  description: string;
  modifyAt: string;
  createAt: string;
  createdAt: string;
  updatedAt: string;
}

interface DatahubInspectionBody {
  type: number;
  name: string;
  sign: string;
  description: string;
  inspectionDocID?: string;
}
