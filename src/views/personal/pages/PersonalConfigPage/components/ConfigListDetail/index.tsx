import { FC, useState } from "react";

import cn from "classnames";

import { useModal } from "services/hooks/useModal";

import { SearchInput } from "shareComponents/common";
// import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";

import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import FolderSettingIcon from "assets/images/icons8-folder-settings-96.svg";
import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
import LinkIcon from "assets/images/icons8-link-96.svg";
import FakeUser from "assets/images/fake-user.png";
import Thumbnail1 from "assets/images/thumbnail1.jpg";
import Thumbnail2 from "assets/images/thumbnail2.png";

import CreateConfigModal from "../../modal/CreateConfigModal";
import DeleteConfigModal from "../../modal/DeleteConfigModal";
import UpdateConfigModal from "../../modal/UpdateConfigModal";

import styles from "../../style.module.css";

export const ConfigListDetail: FC = () => {
  const [itemChecked, setItemChecked] = useState(false);

  const { openModal } = useModal();

  return (
    <main className="h-full">
      <header className="sticky top-0 z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Lịch sử truy cập</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            placeholder="Nhập từ khóa tìm kiếm"
            // eslint-disable-next-line no-console
            onChange={(event) => console.log(event.target.value)}
          />
          {/* <FinancialCashFlowFilterButton /> */}
          {itemChecked && (
            <div className="border-l-2 border-primary-border ml-5 pl-5 flex items-center">
              <button className="flex items-center mr-3">
                <img
                  className="w-[24px] h-[24px]"
                  alt="FolderSetting"
                  src={FolderSettingIcon}
                />
              </button>
              <button className="flex items-center mr-3">
                <img
                  className="w-[24px] h-[24px]"
                  alt="Share"
                  src={ShareIcon}
                />
              </button>
              <button className="flex items-center mr-3">
                <img className="w-[24px] h-[24px]" alt="Link" src={LinkIcon} />
              </button>
              <button
                className="flex items-center mr-3"
                onClick={() =>
                  openModal(
                    <div
                      className={
                        "inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
                      }
                    >
                      <UpdateConfigModal />
                    </div>
                  )
                }
              >
                <img
                  className="w-[24px] h-[24px]"
                  alt="Pencil"
                  src={PencilIcon}
                />
              </button>
              <button
                className="flex items-center mr-3"
                onClick={() =>
                  openModal(
                    <div
                      className={
                        "inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
                      }
                    >
                      <DeleteConfigModal />
                    </div>
                  )
                }
              >
                <img
                  className="w-[24px] h-[24px]"
                  alt="Trash"
                  src={TrashIcon}
                />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <button
            className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
            onClick={() =>
              openModal(
                <div
                  className={
                    "inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
                  }
                >
                  <CreateConfigModal />
                </div>
              )
            }
          >
            Tạo mới
          </button>
          <div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center ml-5 cursor-pointer">
            <img src={ThreeDotVerticalIcon} alt="Three Dot" />
          </div>
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className={cn("pb-1 pt-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
                <input
                  className="form-check-input mr-2"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  defaultChecked
                />
                <img src={PolygonIcon} alt="Polygon" />
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Nội dung
              </div>
            </th>
            <th className="w-1/6 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Người tạo
              </div>
            </th>
            <th className="w-1/6 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Cập nhật lần cuối
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1 font-normal">
              <div className="font-normal pl-2">Người được truy cập</div>
            </th>
          </tr>
        </thead>

        <tbody className="bg-primary-light text-left">
          <tr className="border-b border-primary-border h-10">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
                checked={itemChecked}
                onClick={() => setItemChecked(!itemChecked)}
              />
            </td>
            <td className="py-1 px-2">Việc của Trường năm 2022</td>
            <td className="py-1 px-2 text-primary-gray">
              Nguyễn Thị Ngân-CPMI
            </td>
            <td className="py-1 px-2 text-primary-gray">
              17:20 14/11/21 Hương-CPMI
            </td>
            <td className="py-1 px-2">
              <div className="flex relative">
                <img
                  src={FakeUser}
                  alt="User"
                  className="w-6 h-6 rounded-full z-0"
                />
                <img
                  src={Thumbnail1}
                  alt="User"
                  className="w-6 h-6 rounded-full absolute z-1 left-5"
                />
                <img
                  src={Thumbnail2}
                  alt="User"
                  className="w-6 h-6 rounded-full absolute z-2 left-10"
                />
                <div className="w-6 h-6 bg-primary-border rounded-full flex items-center justify-center absolute z-3 left-60px">
                  <span className="text-primary-light text-xs">+15</span>
                </div>
              </div>
            </td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2">Việc của Toàn năm 2022</td>
            <td className="py-1 px-2 text-primary-gray">
              Nguyễn Thị Ngân-CPMI
            </td>
            <td className="py-1 px-2 text-primary-gray">
              17:20 14/11/21 Hương-CPMI
            </td>
            <td className="py-1 px-2">
              <div className="flex relative">
                <img
                  src={FakeUser}
                  alt="User"
                  className="w-6 h-6 rounded-full z-0"
                />
                <img
                  src={Thumbnail1}
                  alt="User"
                  className="w-6 h-6 rounded-full absolute z-1 left-5"
                />
                <img
                  src={Thumbnail2}
                  alt="User"
                  className="w-6 h-6 rounded-full absolute z-2 left-10"
                />
                <div className="w-6 h-6 bg-primary-border rounded-full flex items-center justify-center absolute z-3 left-60px">
                  <span className="text-primary-light text-xs">+15</span>
                </div>
              </div>
            </td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2">Việc của Thu, Hà năm 2022</td>
            <td className="py-1 px-2 text-primary-gray">
              Nguyễn Thị Ngân-CPMI
            </td>
            <td className="py-1 px-2 text-primary-gray">
              17:20 14/11/21 Hương-CPMI
            </td>
            <td className="py-1 px-2">
              <div className="flex relative">
                <img
                  src={FakeUser}
                  alt="User"
                  className="w-6 h-6 rounded-full z-0"
                />
                <img
                  src={Thumbnail1}
                  alt="User"
                  className="w-6 h-6 rounded-full absolute z-1 left-5"
                />
                <img
                  src={Thumbnail2}
                  alt="User"
                  className="w-6 h-6 rounded-full absolute z-2 left-10"
                />
                <div className="w-6 h-6 bg-primary-border rounded-full flex items-center justify-center absolute z-3 left-60px">
                  <span className="text-primary-light text-xs">+15</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};
