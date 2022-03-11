import { APIResponse } from "./apis/response";

export type SendMailTaskPayload = {
  taskID: string;
  title: string;
  notice: string;
  members: string[];
}

// Kiểu dữ liệu từ client truyền lên server để lấy data API
export type ListTasksPayload = {
  lastestID?: string;
  limit?: number;
  companyID?: string;
  populates? : string;
  populates1? : string;
  filter? : string;
};

// Thuộc tính 1 mẩu tin
export type PcmPlanTaskProps = {
  _id: string;
  name: string,
  assignee: {
    _id: string,
    fullname: string,
    image: string,
    createAt: string,
  },
  checklist: string,
  lastLog?: {
    _id: string,
    content: string,
    author: {
      _id: string,
      fullname: string,
      image: string,
      createAt: string,
    },
    createAt: string,
  }
};

// Kiểu dữ liệu trả về
export type ListTasksResponse = APIResponse & {
  data: {
    listRecords: Array<PcmPlanTaskProps>;
    totalRecord: number;
    totalPages?: number;
  };
};

export type listTotalAnalysisProps = {
  amountTask: number,
  amountTaskIsRFa: number,
  amountTaskIsRFis: number,
  amountTaskIsFlags: number,
  amountTaskIsAssignee: number,
  amountTaskIsDraft: number,
}

export type listTotalAnalysisResponse = APIResponse & {
  data: listTotalAnalysisProps;
};