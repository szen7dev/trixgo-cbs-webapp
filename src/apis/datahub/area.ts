import { DatahubPrams } from "typings/datahub/api";

export function buildDatahubAreaKey(options: DatahubPrams): string[] {
  return ["datahub_area", JSON.stringify(options)];
}
