import { ParamsGetDatahubProfiles } from "./profiles";

export function buildDatahubFinancialKey(options: Partial<ParamsGetDatahubProfiles>): string[] {
  return ["datahub_financial", JSON.stringify(options)];
}
