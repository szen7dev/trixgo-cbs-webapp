import API from "apis/repository";
import { ResponseData } from "typings/apis/response";
import { url } from ".";

// Datahub packageslist
type DatahubPackage = {
  _id: {
    contractor: {
      _id: string;
      name: string;
      address: string;
      sign: string;
      image: string;
    };
  };
  amount: 1;
};
type ParamsGetDatahubPackage = {
  fieldID?: string;
  areaID?: string;
  contractorID?: string;
  level?: number;
};
async function getDatahubPackageList(
  option: 2,
  params: ParamsGetDatahubPackage
): Promise<ResponseData<{ number1: number; number2: number; number3: number; number4: number }>>;
async function getDatahubPackageList(
  option: 1,
  params: ParamsGetDatahubPackage
): Promise<ResponseData<DatahubPackage[]>>;
async function getDatahubPackageList(
  option: number,
  params: ParamsGetDatahubPackage
): Promise<ResponseData<any>> {
  const { data } = await API.get<ResponseData<any>>(
    `${url}/datahub_packages/get-list-by-property`,
    { params: { option, ...params } }
  );
  return data;
}

export function buildKeyDatahubPackage(
  options: { mode: number } & ParamsGetDatahubPackage
): (string | number)[] {
  return ["datahub_packages", JSON.stringify(options)];
}

export { getDatahubPackageList };
