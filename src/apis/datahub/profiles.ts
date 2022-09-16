/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import API from "apis/repository";
import { ResponseList } from "typings/apis/response";
import { DatahubPrams } from "typings/datahub/api";
import { DatahubProfile } from "typings/datahub/profile";
import { url } from ".";

export function buildDatahubProfilesKey(options: Partial<ParamsGetDatahubProfiles>): string[] {
  return ["datahub_profiles", JSON.stringify(options)];
}

export type ParamsGetDatahubProfiles = { contractorID: string } & DatahubPrams;
async function getDatahubProfileList(params: ParamsGetDatahubProfiles) {
  const { data } = await API.get<ResponseList<DatahubProfile>>(`${url}/datahub_profiles`, {
    params,
  });
  return data;
}

export { getDatahubProfileList };
