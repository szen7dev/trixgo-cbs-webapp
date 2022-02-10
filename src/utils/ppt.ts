import moment from "moment";

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

const enumProjectStatus = [
  [
    { message: "Đúng tiến độ, đúng ngân sách", className: "bg-red-400" },
    { message: "Đúng tiến độ, đúng ngân sách", className: "bg-red-400" },
  ],
  [
    { message: "Đúng tiến độ, đúng ngân sách", className: "bg-red-400" },
    { message: "Đúng tiến độ, đúng ngân sách", className: "bg-red-400" },
  ],
];

// Switch ontime and budget return string
export const switchOnTimeBudget = (
  onTime: number,
  budget: number
): { message: string; className: string } => {
  return enumProjectStatus[onTime][budget];
};
