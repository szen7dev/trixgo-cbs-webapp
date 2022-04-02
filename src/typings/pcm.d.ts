import { APIResponse } from "./apis/response";
import { Company } from "./common";
import { User } from "./user";

/**
 * ============================ *************** ===============================
 * ============================ 	 PCM REPORT   ===============================
 * ============================ *************** ===============================
 */

export type AddConditionTaskReportPayload = {
  name: string,
  description?: string
}

export type UpdateConditionTaskReportPayload = {
  subjectID: string,
  conditionPin: Partial<{
    keyword: string,
    assigneeID: string,
    authorID: string,
    fromDate: string,
    toDate: string,
    projectID: string,
    isproposal: number,
    isExpired: number,
    status: number
  }>
}

export type InfoReportPayload = {
  subjectID?: string,
  select?: string,
  populates?: string
}

export type ListReportsPayload = {
  keyword?: string,
  limit?: string,
  lastestID?: string,
  select?: string,
  populates?: string
}

export type PcmReport = {
  _id: string,
  name: string,
  description: string,
  conditionPin: any,
  company: Company,
  author: User,
  type: number,
  createAt: string
}

/**
 * ============================ ************* ===============================
 * ============================ 	 PCM TASK   ===============================
 * ============================ ************* ===============================
 */

export type ListTasksPayload = {
  lastestID?: string;
  limit?: number;
  companyID?: string;
  populates? : string;
  populates1? : string;
  filter? : string;
};

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

/**
 * ============================ ************* ===============================
 * ============================ 	 PCM FILE   ===============================
 * ============================ ************* ===============================
 */

export type ListFilesPcmPayload = {
  companyID?: string,
  projectID?: string,
  groupID?: string,
  taskID?: string,
  type?: number,
  keyword?: string,
  limit?: string,
  lastestID?: string,
  select?: string,
  populates?: string
}

/**
 * ============================ ********** ===============================
 * ============================ 	 OTHER   ===============================
 * ============================ ********** ===============================
 */

export type SendMailTaskPayload = {
  taskID: string;
  title: string;
  notice: string;
  members: string[];
}


// DANH SÁCH DỰ ÁN VÀ SỐ LƯỢNG VĂN BẢN
export interface ListProjectWithListAmountTaskPayload {
  fromDate?: string;
  toDate?: string;
}

export interface ListProjectWithListAmountTaskResponse extends APIResponse {
  data: {
      listProject: any,
      listAmountTask: any,
      listAmountTaskOverdueWork: any,
      listAmountTaskNextWeekWork: any,
      listAmountTaskMoreThan7Days: any,
      listAmountTaskFinish: any,
  }
}

