import { FC } from "react";
import Avatar from "assets/images/thumbnail2.png";

const Executor: FC = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 rounded-full bg-red-500" />
      <img src={Avatar} alt="Thumbnail" className="w-4 h-4 rounded-full" />
      <span className="text-[13px]">Phùng Thị Hà-TRX</span>
    </div>
  );
};

export default Executor;
