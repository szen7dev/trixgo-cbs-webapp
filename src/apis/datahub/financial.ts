import { ParamsGetDatahubProfiles } from "./profiles";

export function buildDatahubFinancialKey(options: Partial<ParamsGetDatahubProfiles>): string[] {
  return ["datahub_financials", JSON.stringify(options)];
}
