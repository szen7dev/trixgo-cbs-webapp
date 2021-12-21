import { FC } from "react";

import TaskHomeHeader from "./components/TaskHomeHeader";
import ListProgress from "./components/Progress";
import Executor from "./components/Executor";

const TaskHomePage: FC = () => {
  return (
    <>
      <div>
        <TaskHomeHeader />
      </div>
      {/* Table */}
      <div className="task-management-content overflow-auto">
        {/* Table Header */}
        <div className={" flex flex-col w-full"}>
          <table>
            <thead className="bg-gray-50 header sticky z-10">
              <tr>
                <th className="px-2 py-2 text-[13px] border w-[41px]">TT</th>
                <th className="px-2 py-2 text-[13px] border w-[229px] text-left">
                  Nội dung công việc
                </th>
                <th className="px-2 py-2 text-[13px] border w-[90px] text-left">
                  Thời hạn
                </th>
                <th className="px-2 py-2 text-[13px] border w-[196px] text-left">
                  Thực hiện
                </th>
                <th className="px-2 py-2 text-[13px] border w-[143px] text-left">
                  Tiến trình
                </th>
                <th className="px-2 py-2 text-[13px] border w-[181px] text-left">
                  Mô tả/ghi chú
                </th>
                <th className="px-2 py-2 text-[13px] border text-left">
                  Thảo luận
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border bg-cbs-active-comment">
                <td colSpan={1} className="w-[41px] p-2 text-[13px] font-bold">
                  A1
                </td>
                <td colSpan={6} className="p-2 border-l">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-bold">VIỆC QUÁ HẠN</span>
                    <button className="text-primary text-[13px]">
                      Xem thêm (12)
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-2 border">1</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border">
                  Xây dựng mẫu BoQ cho công tác preliminaries
                </td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="p-2 border">2</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border"></td>
                <td className="border p-2">
                  Gửi anh Hiển, anh xem công việc này đã xong và đóng lại giúp
                  em - Hiệp-PGI 8h ago
                </td>
              </tr>
              <tr>
                <td className="p-2 border">3</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border">
                  Xây dựng mẫu BoQ cho công tác preliminaries
                </td>
                <td className="border p-2"></td>
              </tr>

              <tr className="border bg-cbs-active-comment">
                <td colSpan={1} className="w-[41px] p-2 text-[13px] font-bold">
                  A2
                </td>
                <td colSpan={6} className="p-2 border-l">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-bold">VIỆC TUẦN TỚI</span>
                    <button className="text-primary text-[13px]">
                      Xem thêm (12)
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-2 border">1</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border">
                  Xây dựng mẫu BoQ cho công tác preliminaries
                </td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="p-2 border">2</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border"></td>
                <td className="border p-2">
                  Gửi anh Hiển, anh xem công việc này đã xong và đóng lại giúp
                  em - Hiệp-PGI 8h ago
                </td>
              </tr>
              <tr>
                <td className="p-2 border">3</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border">
                  Xây dựng mẫu BoQ cho công tác preliminaries
                </td>
                <td className="border p-2"></td>
              </tr>

              <tr className="border bg-cbs-active-comment">
                <td colSpan={1} className="w-[41px] p-2 text-[13px] font-bold">
                  A3
                </td>
                <td colSpan={6} className="p-2 border-l">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-bold">
                      {"VIỆC > 7 NGÀY TIẾP THEO"}
                    </span>
                    <button className="text-primary text-[13px]">
                      Xem thêm (12)
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-2 border">1</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border">
                  Xây dựng mẫu BoQ cho công tác preliminaries
                </td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="p-2 border">2</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border"></td>
                <td className="border p-2">
                  Gửi anh Hiển, anh xem công việc này đã xong và đóng lại giúp
                  em - Hiệp-PGI 8h ago
                </td>
              </tr>
              <tr>
                <td className="p-2 border">3</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border">
                  Xây dựng mẫu BoQ cho công tác preliminaries
                </td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="p-2 border">1</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border">
                  Xây dựng mẫu BoQ cho công tác preliminaries
                </td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="p-2 border">2</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border"></td>
                <td className="border p-2">
                  Gửi anh Hiển, anh xem công việc này đã xong và đóng lại giúp
                  em - Hiệp-PGI 8h ago
                </td>
              </tr>
              <tr>
                <td className="p-2 border">3</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border">
                  Xây dựng mẫu BoQ cho công tác preliminaries
                </td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="p-2 border">1</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border">
                  Xây dựng mẫu BoQ cho công tác preliminaries
                </td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="p-2 border">2</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border"></td>
                <td className="border p-2">
                  Gửi anh Hiển, anh xem công việc này đã xong và đóng lại giúp
                  em - Hiệp-PGI 8h ago
                </td>
              </tr>
              <tr>
                <td className="p-2 border">3</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border">
                  Xây dựng mẫu BoQ cho công tác preliminaries
                </td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="p-2 border">1</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border">
                  Xây dựng mẫu BoQ cho công tác preliminaries
                </td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="p-2 border">2</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border"></td>
                <td className="border p-2">
                  Gửi anh Hiển, anh xem công việc này đã xong và đóng lại giúp
                  em - Hiệp-PGI 8h ago
                </td>
              </tr>
              <tr>
                <td className="p-2 border">3</td>
                <td className="p-2 border">
                  CHG.THT.Chào giá dự án Sunrise Resort
                </td>
                <td className="p-2 border">25/12/2021</td>
                <td className="p-2 border">
                  <Executor />
                </td>
                <td className="p-2 border">
                  <ListProgress />
                </td>
                <td className="p-2 border">
                  Xây dựng mẫu BoQ cho công tác preliminaries
                </td>
                <td className="border p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TaskHomePage;
