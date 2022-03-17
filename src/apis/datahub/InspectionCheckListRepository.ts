/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import API from "../repository";

// Convert Object sang URL query => khi client truyền lên
// import { convertObToUrl } from "utils";

// Khai báo chính xác kiểu trả về nếu biết
import { ResponseCreate, ResponseList } from "typings/apis/response";
import { DatahubPrams } from "typings/datahub/api";

type InspectQueryParams = {
  inspectionID?: string;
  inspectionChecklistID?: string;
};

// Đường dẫn Endpoint
const url = "/api/datahub";
const InspectionCheckListRepository = {
  // ==== Datahub Inspection Check List ====
  async get<T extends InspectQueryParams>(params: T & DatahubPrams) {
    // Get List and Specific item
    const { data } = await API.get<
      T["inspectionChecklistID"] extends string
        ? ResponseCreate<DatahubInspectionCheckList>
        : ResponseList<DatahubInspectionCheckList>
    >(`${url}/datahub_inspection_checklists`, { params });
    return data;
  },
  async create(body: Omit<DatahubInspectionBody, "type">) {
    // Create new item
    const { data } = await API.post<ResponseCreate<DatahubInspectionCheckList>>(
      `${url}/datahub_inspection_checklists`,
      body
    );
    return data;
  },
  async update(
    body: Omit<DatahubInspectionBody, "type"> & {
      inspectionChecklistID: string;
    }
  ) {
    // Update item
    const { data } = await API.put<ResponseCreate<DatahubInspectionCheckList>>(
      `${url}/datahub_inspection_checklists`,
      body
    );
    return data;
  },
  async delete(params: { inspectionChecklistID: string }) {
    // Remove one item
    const { data } = await API.delete<
      ResponseCreate<DatahubInspectionCheckList>
    >(`${url}/datahub_inspection_checklists`, { params });
    return data;
  },
};

export default InspectionCheckListRepository;
