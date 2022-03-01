import { FC } from "react";

type Props = {
  status: number;
};

export const TypeStatusLabel: FC<Props> = ({ status }) => {
  const labels = [
    {
      id: 1,
      name: "Ngày nay",
      textColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      name: "Tuần tới",
      textColor: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      id: 3,
      name: "> 7 ngày",
      textColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      id: 4,
      name: "Quá hạn",
      textColor: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      id: 5,
      name: "Chưa tới hạn",
      textColor: "text-green-500",
      bgColor: "bg-green-100",
    },
  ];

  const label = labels.find((item) => item.id === status);

  return (
    <div>
      {label && (
        <span
          className={`px-3 py-1 rounded-xl ${label.textColor} ${label.bgColor}`}
        >
          {label.name}
        </span>
      )}
    </div>
  );
};
