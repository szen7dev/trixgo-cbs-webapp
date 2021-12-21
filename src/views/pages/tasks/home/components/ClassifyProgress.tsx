import { FC } from "react";

type Props = {
  onClickBar: (key: string) => void;
};

const ClassifyProgress: FC<Props> = ({ onClickBar }) => {
  const outDatePercent = (8 / 50) * 100;
  const nextWeekPercent = (12 / 50) * 100;
  const moreThanSevenDaysPercent = (30 / 50) * 100;

  return (
    <div className="flex w-full h-[12px] mt-1">
      <button
        className="flex items-center justify-center bg-red-500"
        style={{ width: `${outDatePercent}%` }}
        onClick={() => onClickBar("OUT_DATE")}
      >
        <span className="text-white" style={{ fontSize: 10 }}>
          8
        </span>
      </button>
      <button
        className="flex items-center justify-center bg-yellow-500"
        style={{ width: `${nextWeekPercent}%` }}
        onClick={() => onClickBar("NEXT_WEEK")}
      >
        <span className="text-white" style={{ fontSize: 10 }}>
          12
        </span>
      </button>
      <button
        className="flex items-center justify-center bg-green-500"
        style={{ width: `${moreThanSevenDaysPercent}%` }}
        onClick={() => onClickBar("MORE_THAN_SEVEN_DAYS")}
      >
        <span className="text-white" style={{ fontSize: 10 }}>
          30
        </span>
      </button>
    </div>
  );
};

export default ClassifyProgress;
