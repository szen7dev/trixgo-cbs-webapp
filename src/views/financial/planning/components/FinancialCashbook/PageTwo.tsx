import { FC, useContext, useEffect, useState } from "react";

// Hook
import useCheckedList from "services/hooks/ppt/useCheckedList";

import { DropdownFilterButton } from "views/document/sharedComponents/common";
import {
  Paginate,
  SearchInput,
  GroupActions,
  ButtonCreate,
  ButtonMore,
} from "shareComponents/common";
import { ModalContainer } from "shareComponents/common";
import { Link } from "react-router-dom";
import ModalCreateFinancial from "./ModalCreateFinancial";

const PageTwo: FC = () => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState<boolean>(false);
  const [data, setData] = useState<{ id: number; [key: string]: any }[]>([]);
  const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data);

  useEffect(() => {
    document.title = "Trixgo | Sổ quỹ"
    setData(
      Array.from({ length: 30 }).map((_, index) => ({
        id: index,
        content: "Theo dõi sổ quỹ Công ty Cổ phần PGI partners tháng 11 năm 2021",
        opening_balance: 250000000000,
        increased_balance: 1250000000000,
        closing_balance: 1250000000000,
        created_by: "Nguyễn Thị Ngân-CPMI",
        updated_by: "Hương-CPMI",
        created_at: "15:30 22/12/2021",
        updated_at: "17:20 14/11/21",
      }))
    );
  }, []);

  const handleClickRow = (id: number) => handleChangeCheckbox(undefined, { id });
  const toggleDeleteModal = () => setIsShowDeleteModal(!isShowDeleteModal);
  const toggleCreateModal = () => setVisibleCreateModal(!visibleCreateModal);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
        <span className="text-x-large mr-7">Hồ sơ dự thầu</span>
        <SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
        <DropdownFilterButton />
        <GroupActions className="flex items-center flex-1" onClickTrash={toggleDeleteModal} />

        <ButtonCreate onClick={toggleCreateModal} />
        <ButtonMore />
      </div>
      <div className="flex-1 overflow-y-auto">
        <table
          className="text-black text-medium border-separate space-x-0 space-y-0 w-full"
          style={{ borderSpacing: 0 }}
        >
          <thead className="">
            <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
              <th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border w-1">
                <input
                  className="cbs-checkbox"
                  type="checkbox"
                  value="all"
                  id="flexCheckDefault"
                  onClick={handleCheckAll}
                  ref={checkboxRef}
                />
              </th>
              <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Nội dung</span>
              </th>
              <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Số dư đầu kỳ</span>
              </th>
              <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Phát sinh trong kỳ</span>
              </th>
              <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Số dư cuối kỳ</span>
              </th>
              <th
                className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border"
                style={{ minWidth: "150px" }}
              >
                <span className="pl-2 border-l border-cbs-border">Khởi tạo</span>
              </th>
              <th
                className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border"
                style={{ minWidth: "150px" }}
              >
                <span className="pl-2 border-l border-cbs-border">Cập nhật lần cuối</span>
              </th>
              <th
                className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border"
                style={{ minWidth: "150px" }}
              >
                <span className="pl-2 border-l border-cbs-border">Người được truy cập</span>
              </th>
            </tr>
          </thead>
          <tbody className="text-small">
            {data.map(
              ({
                id,
                content,
                opening_balance,
                increased_balance,
                closing_balance,
                created_by,
                updated_by,
                created_at,
                updated_at,
              }) => {
                return (
                  <tr
                    key={id}
                    className="text-left hover:bg-cbs-active-comment cursor-pointer"
                    onClick={(e) => handleClickRow(id)}
                  >
                    <td
                      className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        className="cbs-checkbox"
                        type="checkbox"
                        value={id}
                        checked={Boolean(assigned[id])}
                        onChange={(e) => handleChangeCheckbox(e, { id })}
                      />
                    </td>
                    <td
                      className="pt-2.5 pb-3 px-2 border-b border-cbs-border"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        to={{ pathname: "/financial/cashbook/cashbookId", state: 2 }}
                        className="hover:text-cbs-primary"
                      >
                        {content}
                      </Link>
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">
                      {parseInt(opening_balance).toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">
                      {parseInt(increased_balance).toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">
                      {parseInt(closing_balance).toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">
                      {created_by}
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">
                      {updated_at + " " + updated_by}
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                      <div className="flex">
                        <img
                          src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg"
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                        <img
                          src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg"
                          alt=""
                          className="w-6 h-6 rounded-full -ml-1.5"
                        />
                        <img
                          src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg"
                          alt=""
                          className="w-6 h-6 rounded-full -ml-1.5"
                        />
                        <div
                          className="h-6 w-6 rounded-full -ml-1.5 bg-cbs-border text-white flex justify-center items-center"
                          style={{ fontSize: "10px" }}
                        >
                          +15
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
      <Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" />
      <ModalContainer isModalOpen={visibleCreateModal} toggle={() => null}>
        <div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalCreateFinancial toggle={toggleCreateModal} />
        </div>
      </ModalContainer>
      <ModalContainer isModalOpen={isShowDeleteModal} toggle={() => ""}>
        <div className="inline-flex flex-col text-black w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white">
          <div className="p-5 mb-4 text-xl leading-6 font-bold">Bạn có muốn xóa không?</div>
          <div className="text-right pt-6 pb-5 px-8 text-base leading-5 border-t border-gray-100">
            <button className="py-1.5 px-5 mr-2 uppercase" onClick={toggleDeleteModal}>
              Hủy
            </button>
            <button
              className="py-1.5 px-3 border border-primary bg-primary hover:bg-opacity-90 text-white rounded-md"
              onClick={toggleDeleteModal}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default PageTwo;
