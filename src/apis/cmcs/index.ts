import API from "../repository";
import {
  DeleteContractPayload,
  GetContractListPayload,
  GetInfoContractPayload,
  InsertContractPayload,
  UpdateContractPayload,
} from "typings/cmcs";

const cmcsURL = "/api/item";

const CmcsRepository = {
  async getListContract(payload: GetContractListPayload): Promise<any> {
    const { filter, populates, limit, outin } = payload;

    const { data } = await API.get(
      `${cmcsURL}/contracts?filter=${filter}&limit=${limit}&populates=${populates}&outin=${outin}`
    );
    return data;
  },

  async getInfoContract(payload: GetInfoContractPayload): Promise<any> {
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
};

export default CmcsRepository;
