import { FC } from "react";

type Props = {
  color?: string;
  checklist: string;
  percentage: number;
};

const ListProgress: FC<Props> = ({ color, checklist, percentage }) => {
  return (
    <div>
      <div className="text-[13px] text-primary-gray text-right">
        <span>{checklist}</span>
        <span className="ml-1">({`${percentage}%`})</span>
      </div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-[6px] text-[13px] flex rounded border">
          <div
            style={{ width: `${percentage}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${color}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ListProgress;
