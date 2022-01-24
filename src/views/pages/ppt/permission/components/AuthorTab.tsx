import { FC } from "react";

import Paginate from "components/common/Paginate";
import DropdownSearchable from "components/common/DropdownSearch";

const AuthorTab: FC = () => {
  return (
    <main className="h-full">
      <header className="h-[50px] border border-primary-border flex items-center justify-between pl-6 pr-5">
        <p className="text-lg">Ban giám đốc</p>

        <DropdownSearchable
          className="w-[322px] pl-5 bg-cbs-table-header"
          classNameInput="h-[28px] bg-cbs-table-header"
          isMultiple={false}
          allowClearValueSingleInput={false}
          showTriangle={true}
          maxWidthInput="max-w-none"
          renderSelectedItem={(item) => <span>{item.text}</span>}
          classNameItem="p-0"
          data={[
            {
              _id: 1,
              content: "Kết quả trả về 1",
            },
            {
              _id: 2,
              content: "Kết quả trả về 2",
            },
            {
              _id: 3,
              content: "Kết quả trả về 3",
            },
          ]}
          formatItem={{
            id: "_id",
            text: "content",
          }}
          inlineSearch={false}
          disableSearch={false}
          searchInputClassName="h-[40px] w-[322px] px-[46px]"
        />
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className="w-2/6 pb-1 pt-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Chức năng
              </div>
            </th>
            <th className="w-1/6 pb-1 pt-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Xem
              </div>
            </th>
            <th className="w-1/6 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Thêm
              </div>
            </th>
            <th className="w-1/6 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Sửa
              </div>
            </th>
            <th className="w-1/6 pb-1 pt-1 font-normal">
              <div className="font-normal pl-2">Xóa</div>
            </th>
          </tr>
        </thead>

        <tbody className="bg-primary-light text-left">
          <tr className="border-b border-primary-border h-10">
            <td className="p-2">Báo cáo quản trị</td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="p-2">Cấu trúc dữ liệu</td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                defaultChecked
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="p-2">Báo cáo đầu tư</td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="p-2">Báo cáo quản trị công việc</td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="p-2">Báo cáo quản trị hồ sơ</td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="p-2">Báo cáo khác</td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                defaultChecked
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
            <td className="p-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Paginate />
    </main>
  );
};

export default AuthorTab;
