export const DEPARTMENT_STAGE = [
  {
    value: 1,
    text: "Đang phát triển",
    path: "/",
    className: "bg-cbs-primary",
    key: "developing",
  },
  {
    value: 2,
    text: "Lập kế hoạch",
    path: "/",
    className: "bg-cbs-schedule-nextweek",
    key: "planning",
  },
  {
    value: 3,
    text: "Thiết kế",
    path: "/",
    className: "bg-cbs-purple",
    key: "design",
  },
  {
    value: 4,
    text: "Đấu thầu",
    path: "/",
    className: "bg-pink-600",
    key: "bidding",
  },
  {
    value: 5,
    text: "Xây dựng",
    path: "/",
    className: "bg-cbs-green",
    key: "build",
  },
  { value: 6, text: "Khác", path: "/", className: "bg-cbs-gray", key: "Other" },
];

export const DEPARTMENT_STATUS = {
  1: {
    1: { message: "Đúng tiến độ, đúng ngân sách", className: "bg-red-400" },
    2: { message: "Đúng tiến độ, vượt ngân sách", className: "bg-red-400" },
  },
  2: {
    1: { message: "Chậm tiến độ, đúng ngân", className: "bg-red-400" },
    2: { message: "Chậm tiến độ, vượt ngân", className: "bg-red-400" },
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {}