import moment from "moment";
import { DepartmentOnBudgetKey, DepartmentOnTimeKey, DEPARTMENT_STATUS } from "typings/ppt";

// Date loaded percentage
export const dateLoadedPercentage = (
  startDate: Date,
  endDate: Date,
  loadedDate: Date
): number => {
  const start = moment(startDate);
  const end = moment(endDate);
  const loaded = moment(loadedDate);
  const duration = moment.duration(end.diff(start));
  const durationLoaded = moment.duration(loaded.diff(start));
  return durationLoaded.asMilliseconds() / duration.asMilliseconds();
};

// Format date
export const formatDate = (date: Date): string => {
  return moment(date).format("DD/MM/YY");
};

// Switch ontime and budget return string
export const switchOnTimeBudget = (
  onTime: DepartmentOnTimeKey,
  budget: DepartmentOnBudgetKey
): { message: string; className: string } => {
  return DEPARTMENT_STATUS[onTime][budget];
};

// Format number locale
export const formatNumber = (number: number): string => {
	return new Intl.NumberFormat("en-US").format(number);
};