interface DatahubCommonInspection {
  state: number;
  name: string;
  userCreate: string;
  sign: string;
  description: string;
  modifyAt: string;
  createAt: string;
  createdAt: string;
  updatedAt: string;
}

interface DatahubInspection extends DatahubCommonInspection {
  _id: string;
  type: number;
}

interface DatahubInspectionCheckList extends DatahubCommonInspection {
  _id: string;
}

interface DatahubInspectionBody {
  type: number;
  name: string;
  sign: string;
  description: string;
  inspectionDocID?: string;
  inspectionChecklistID?: string;
}
