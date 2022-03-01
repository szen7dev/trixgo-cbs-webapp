import moment from "moment";

export const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getMessageTimeDuration = (modifyAt: string): string => {
  if (!modifyAt || !modifyAt.length) return "";

  const now = moment(new Date()); //Todays date
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
