import { DatahubTypesParams } from "typings/datahub/datahubtypes";

export function buildDatahubTypeKey(
  options: { datahubTypeID?: string } & DatahubTypesParams
): string[] {
  return ["datahub_types", JSON.stringify(options)];
}
