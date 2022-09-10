import API from "../repository";

// Convert Object sang URL query => khi client truyền lên
import { convertObToUrl } from "utils";

import {
  ListContractsPayload,
  ListContractsResponse,
  InfoContractPayload,
  InsertContractPayload,
  UpdateContractPayload,
  DeleteContractPayload, ListByFilterContractsPayload, ListContractsByFilterResponse,
} from "typings/cmcs";

// Đường dẫn Endpoint
const cmcsURL = "/api/item";

const CmcsRepository = {

  // Data 1
  async getListContract(payload: ListContractsPayload): Promise<ListContractsResponse> {
    const { data } = await API.get<ListContractsResponse>(
      `${cmcsURL}/contracts?${convertObToUrl(payload)}`
    );
    return data;
  },

  // Data 2

  async getInfoContract(payload: InfoContractPayload): Promise<any> {
    const { contractID, populates, select } = payload;

    const { data } = await API.get(
      `${cmcsURL}/contracts?contractID=${contractID}&populates=${populates}&select=${select}`
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

  async listByFilter(payload: ListByFilterContractsPayload): Promise<ListContractsByFilterResponse> {
    const { data } = await API.get(
        `${cmcsURL}/list-contract-by-filter`,
        {
          params: {
            // select: 'name sign author project date createAt description note store amount status storeSign',
            populates: {
              "path": "project",
              "select": "sign name"
            },
            ...payload,
          }
        }
    )

    return data;
  }
};

export default CmcsRepository;
