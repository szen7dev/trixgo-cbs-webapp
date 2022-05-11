import { FC } from "react";
import { calculateExpireTime } from "utils/time";

type Props = {
  expiredTime: string;
};

export const TypeStatusLabel: FC<Props> = ({ expiredTime }) => {
  const compare = calculateExpireTime(Date.now(), new Date(expiredTime).getTime(), 'days');

  const labels = [
    {
      id: compare === 0,
      name: "Ngày nay",
      textColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    // {
    //   id: compare === 7,
    //   name: "Tuần tới",
    //   textColor: "text-yellow-500",
    //   bgColor: "bg-yellow-100",
    // },
    {
      id: compare > 7,
      name: "> 7 ngày",
      textColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      id: compare < 0,
      name: "Quá hạn",
      textColor: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      id: compare > 0,
      name: "Chưa tới hạn",
      textColor: "text-green-500",
      bgColor: "bg-green-100",
    },
  ];

  const label = labels.find((item) => item.id === true);

  return (
    <div>
      {label && (
        <span className={`px-2 py-1 rounded-xl ${label.textColor} ${label.bgColor}`}>
          {label.name}
        </span>
      )}
    </div>
  );
};