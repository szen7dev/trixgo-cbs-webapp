import { FC } from "react";

import N04BT1 from "assets/images/N04B.T1-C2605.svg";

const CmcsPage: FC = () => {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-2xl mb-4">
        <span>Chào mừng đến với hệ thống </span>
        <span className="font-bold">Quản lý hợp đồng</span>
      </div>

      <p className="text-center text-base mb-14" style={{ maxWidth: 525 }}>
        Toàn bộ thông tin về giá trị ký hợp đồng, sản lượng thực hiện, doanh thu
        và tiền về được quản lý tập trung. Dễ dàng lập kế hoạch tài chính
      </p>

      <div>
        <img src={N04BT1} alt="N04BT1" />
      </div>

      <p className="font-bold text-2xl text-primary mt-9">
        Đa dạng hóa dữ liệu
      </p>

      <p className="text-base max-w-xs text-center mt-4">
        Dữ liệu nhiều chiều trực quan, dễ dàng ra quyết định điều hành chính xác
      </p>

      <div className="mt-11 flex gap-3">
        <div className="bg-primary w-2 h-2 rounded-full cursor-pointer" />
        <div className="bg-accent-light w-2 h-2 rounded-full cursor-pointer" />
        <div className="bg-accent-light w-2 h-2 rounded-full cursor-pointer" />
      </div>
    </main>
  );
};

export default CmcsPage;
