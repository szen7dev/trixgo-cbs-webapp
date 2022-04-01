import moment from "moment";

Date.prototype.addHours = function(h) {
	this.setTime(this.getTime() + (h*60*60*1000));
	return this;
}

Date.prototype.addMinutes = function(m) {
	this.setTime(this.getTime() + (m * 60 * 1000));
	return this;
}

Date.prototype.addDays = function(days: number) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export const getDates = (startDate: any, stopDate: any) => {
  const dateArray = [];
  let currentDate = startDate;

  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

export const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getMessageTimeDuration = (modifyAt: string): string => {
  if (!modifyAt || !modifyAt.length) return "";

  const now = moment(new Date()); // Todays date
  const start = moment(modifyAt); // Start date
  const duration = moment.duration(now.diff(start));

  const years = duration.asYears();

  if (years >= 1) return `${years.toFixed()} years`;

  const months = duration.asMonths();

  if (months >= 1) return `${months.toFixed()} months`;

  const days = duration.asDays();

  if (days >= 1) return `${days.toFixed()} days`;

  const hours = duration.asHours();

  if (hours >= 1) return `${hours.toFixed()} hours`;

  const minutes = duration.asMinutes();

  if (minutes >= 1) return `${minutes.toFixed()} minutes`;

  return "Just now";
};

export const addDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export const calculateExpireTime = (currentTimestamp: any, expireTimestamp: any, type: any) => {
  const currentDate = new Date(currentTimestamp);
  const expireDate  = new Date(expireTimestamp);

  // Get Hours
  const minutesCurrent = currentDate.getMinutes();
  const minutesExpire = expireDate.getMinutes();

  // Get Hours
  const hoursCurrent = currentDate.getHours();
  const hoursExpire = expireDate.getHours();

  // Get date
  const dateCurrent = currentDate.getDate();
  const dateExpire = expireDate.getDate();

  // Get month
  const monthCurrent = currentDate.getMonth();
  const montExpire = expireDate.getMonth();

  // Get year
  const yearCurrent = currentDate.getFullYear();
  const yearExpire = expireDate.getFullYear();

  const current = moment([yearCurrent, monthCurrent, dateCurrent, hoursCurrent, minutesCurrent]);
  const expire = moment([yearExpire, montExpire, dateExpire, hoursExpire, minutesExpire]);

  return expire.diff(current, type);
}