/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import API from "../repository";

// Convert Object sang URL query => khi client truyền lên
import { convertObToUrl } from "utils";

// Khai báo chính xác kiểu trả về nếu biết
import { Response } from "typings/datahub/api";
import { DatahubTypes, DatahubTypesParams } from "typings/datahub/datahubtypes";

// Đường dẫn Endpoint
const url = "/api/datahub";
const DatahubRepository = {
  async datahubTypes(params?: DatahubTypesParams) {
    const { data } = await API.get<Response<DatahubTypes>>(
      `${url}/datahub_types`,
      { params }
    );
    return data;
  },
};

// console.log('==============>>>>>')
// console.log(DatahubRepository)

export default DatahubRepository;
