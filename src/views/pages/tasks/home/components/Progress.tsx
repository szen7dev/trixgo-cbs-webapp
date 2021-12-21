import { FC } from "react";

const ListProgress: FC = () => {
  return (
    <div>
      <div className="text-[13px] text-primary-gray text-right">
        <span>3/10</span>
        <span className="ml-1">(30%)</span>
      </div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-[6px] text-[13px] flex rounded border">
          <div
            style={{ width: "30%" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ListProgress;
