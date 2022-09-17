import { DatahubPrams } from "typings/datahub/api";
import { DatahubArea } from "typings/datahub/area";

export function buildDatahubAreaKey(options: DatahubPrams): string[] {
  return ["datahub_area", JSON.stringify(options)];
}

export function convertAreaToString(area: DatahubArea): string {
  let v = area.name;
  if (typeof area.parent === "object") {
    v += ", " + convertAreaToString(area.parent);
  }
  return v;
}
