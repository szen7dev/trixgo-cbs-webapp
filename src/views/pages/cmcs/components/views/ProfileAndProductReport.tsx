import { FC } from "react";

const ProfileAndProductReport: FC = () => {
  return (
    <div className="bg-primary-light h-full text-center py-4">
      <p className="font-bold text-primary-gray text-lg">Hồ sơ, sản phẩm</p>
      <div className="flex flex-col items-center gap-3 mt-4">
        <div className="h-16 w-40 flex flex-col items-center justify-around rounded bg-cbs-gray">
          <p className="text-base">2.632</p>
          <p className="text-primary-gray">Hồ sơ văn bản</p>
        </div>
        <div className="h-16 w-40 flex flex-col items-center justify-around rounded bg-cbs-gray">
          <p className="text-base">8</p>
          <p className="text-primary-gray">Hồ sơ thanh toán</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileAndProductReport;
