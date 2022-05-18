import API from "../../repository";

// Convert Object sang URL query => khi client truyền lên
import { convertObToUrl } from "utils";

import {
  ListContractsPayload,
  ListContractsResponse,
  InfoContractPayload,
  InsertContractPayload,
  UpdateContractPayload,
  DeleteContractPayload,
} from "typings/cmcs";

// Đường dẫn Endpoint
const cmcsURL = "/api/item";

const ContractRepository = {

  async getListContract(payload: ListContractsPayload): Promise<ListContractsResponse> {
    const { data } = await API.get<ListContractsResponse>(
      `${cmcsURL}/contracts?${convertObToUrl(payload)}`
    );
    return data;
  },

  async getListContractIsMembers(payload: ListContractsPayload): Promise<ListContractsResponse> {
    const { data } = await API.get<ListContractsResponse>(
      `${cmcsURL}/list-contract-is-members?${convertObToUrl(payload)}`
    );
    return data;
  },

  async getInfoContract(payload: InfoContractPayload): Promise<any> {
    const { data } = await API.get(
      `${cmcsURL}/contracts?${convertObToUrl(payload)}`
    );
    return data;
  },

  async insertContract(payload: InsertContractPayload): Promise<any> {
    const { data } = await API.post(`${cmcsURL}/contracts`, payload);
    return data;
  },

  async updateContract(payload: UpdateContractPayload): Promise<any> {
    const { data } = await API.put(`${cmcsURL}/contracts`, payload);
    return data;
  },

  async deleteContract(payload: DeleteContractPayload): Promise<any> {
    const { contractID } = payload;

    const { data } = await API.delete(
      `${cmcsURL}/contracts?contractID=${contractID}`
    );
    return data;
  },

  // Thêm/Xóa thành viên trong hợp đồng
  async addOrRemoveMemberToDepartment(body: { contractID: string, members?: string[], admins?: string[], adminsRemove?: string[], membersRemove?: string[] }) {
    const { data } = await API.put<any>('/api/item/contracts', body);
    return data;
  },

  async statisticalStatusByOntimeOnbudget(payload: { projectID: string}): Promise<any> {
    const { data } = await API.get(
      `${cmcsURL}/contracts/statistical-status-by-ontime-onbudget?${convertObToUrl(payload)}`
    );
    return data;
  },
};

export default ContractRepository;