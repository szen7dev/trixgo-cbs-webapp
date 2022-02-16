import { FC } from "react";

const QuickReport: FC = () => {
  return (
    <>
      <p className="font-bold text-lg py-2 text-primary-gray">Báo cáo nhanh</p>
      <div>
        <p className="underline font-bold uppercase">HỢP ĐỒNG 1</p>
        <p>
          Đã có cấp phép xây dựng và thông báo khởi công đã gửi ra phường. Hồ sơ
          thiết kế bản vẽ thi công đã có để phục vụ việc triển khai. Đã có dự
          toán và khối lượng ban đầu
        </p>
      </div>
      <div>
        <p className="underline font-bold uppercase">HỢP ĐỒNG 2</p>
        <p>Đã có cấp phép xây dựng và thông báo khởi công đã gửi ra phường.</p>
      </div>

      <p className="py-2 text-primary">Xem tất cả</p>
    </>
  );
};

export default QuickReport;
