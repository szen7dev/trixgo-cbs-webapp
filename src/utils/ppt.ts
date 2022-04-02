import moment from "moment";
import { DepartmentOnBudgetKey, DepartmentOnTimeKey, DEPARTMENT_STATUS } from "typings/ppt";

// Date loaded percentage
export const dateLoadedPercentage = (startDate: Date, endDate: Date, loadedDate: Date): number => {
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
export const switchOnTimeBudget = (onTime: DepartmentOnTimeKey, budget: DepartmentOnBudgetKey): { message: string; className: string } => {
  return DEPARTMENT_STATUS[onTime][budget];
};

// Format number locale
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("en-US").format(number);
};

// Serial queue class
export class SerialQueue {
  constructor(max = 1) {
    this.max = max;
  }
  max: number;
  // List queue
  queue: Array<() => Promise<any>> = [];
  running: Array<Promise<any>> = [];
  add(fn: () => Promise<any>): void {
    this.queue.push(fn);
    if (!this.running.length) this.run();
  }

  run(): void {
    const nextQueue = this.queue.shift();
    if (nextQueue) {
      const promise = nextQueue();
      promise.then(() => {
        this.running.shift();
        this.run();
      });
      this.running.push(promise);
    }
  }

  upsert(fn: () => Promise<any>): void {
    if (this.running.length && this.queue.length >= this.max) {
      this.queue.pop();
      this.queue.push(fn);
      if (!this.running.length) this.run();
    } else this.add(fn);
  }

  addIfNotRunning(fn: () => Promise<any>): void {
    if (!this.running.length) this.add(fn);
  }
}

export function convertToInternationalCurrencySystem(value: number) {
	const { format } = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 2 })
	// Nine Zeroes for Billions
	return Math.abs(Number(value)) >= 1.0e+9

		? format(value / 1.0e+9) + "B"
		// Six Zeroes for Millions 
		: Math.abs(Number(value)) >= 1.0e+6

			? format(Number(value) / 1.0e+6) + "M"
			// Three Zeroes for Thousands
			: Math.abs(Number(value)) >= 1.0e+3

				? format(Number(value) / 1.0e+3) + "K"

				: Math.abs(Number(value));
}