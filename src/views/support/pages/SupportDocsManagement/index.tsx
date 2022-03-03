import { FC, useState } from "react";
import cn from "classnames";
import { useParams } from "react-router-dom";

import { useModal } from "services/hooks/useModal";
import { Paginate, SearchInput } from "shareComponents/common";

import { CreateNewMember } from "./components";

import PolygonIcon from "assets/images/icon-polygon.svg";
import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";
import DeleteIcon from "assets/images/icons8-remove.svg";
import MemberIcon from "assets/images/member-icon.svg";

import styles from "views/support/styles/support.module.css";

export const SupportDocsManagementPage: FC = () => {
  const [itemChecked, setItemChecked] = useState(false);
  const { openModal } = useModal();

  const { appID, companyID, appName } = useParams<{ appID: string, companyID: string, appName: string }>();
  console.log({ appID, companyID, appName });

  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">{appName}</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            onChange={(event) => console.log(event.target.value)}
          />
          {itemChecked && (
            <div className="border-l-2 border-primary-border ml-5 pl-5">
              <img src={DeleteIcon} alt="Delete" />
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
                    "inline-block w-[600px] h-[630px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded-lg"
                  }
                >
                  <CreateNewMember />
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
          <tr className="text-left text-sm">
            <th className={cn("py-1 text-center", styles.theadInput)}>
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
            <th className="w-1/5 py-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Tài khoản
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Email
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Admin
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Member
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="font-normal pl-2">Xóa bỏ</div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-primary-border h-10">
            <td className="p-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
                checked={itemChecked}
                onClick={() => setItemChecked(!itemChecked)}
              />
            </td>
            <td className="py-1 px-2 flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="rounded-full mr-2"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </td>
            <td className="p-2">huongnpt@gmail.com</td>
            <td className="p-2">
              <input type="radio" defaultChecked />
            </td>
            <td className="p-2">
              <input type="radio" />
            </td>
            <td className="p-2 text-negative">Xóa bỏ</td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="p-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2 flex items-center">
              <img
                src={MemberIcon}
                alt="Member"
                className="rounded-full mr-2"
              />
              <p>Nguyễn Phan Thanh Hương-CPMI</p>
            </td>
            <td className="p-2">huongnpt@gmail.com</td>
            <td className="p-2">
              <input type="radio" />
            </td>
            <td className="p-2">
              <input type="radio" defaultChecked />
            </td>
            <td className="p-2 text-negative">Xóa bỏ</td>
          </tr>
        </tbody>
      </table>

      <Paginate />
    </main>
  );
};