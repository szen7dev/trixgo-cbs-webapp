import React, { FC, Fragment, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Transition } from "@headlessui/react";
import moment from "moment";

import DocumentDropdown from "views/pages/document/components/DocumentDropdown";
import ButtonCreate from "views/pages/document/components/common/ButtonCreate";
import ButtonMore from "views/pages/document/components/common/ButtonMore";
import SearchInput from "components/common/SearchInput";
import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import GroupActions from "views/pages/document/components/projects/GroupActions";
import { Context as ContextModal } from "views/pages/document/contexts/contextModal";
import Paginate from "components/common/Paginate";
import Loader from "components/shared/Loader";

import { useQueryListDocument } from "services/hooks/ppt/useDocument";

import { IPackage, IProjects } from "typings/document";

const pkgs: Array<IPackage> = Array.from(Array(2).keys()).map((_, i) => ({
  id: i,
  title: "Thẻ lọc chính",
}));

const DocumentProjectPage: FC = () => {
  const [pkg, setPkg] = useState<IPackage>(pkgs[0]);
  const { toggleModal } = useContext(ContextModal);
  const { id: departmentID } = useParams<{ id: string }>();
  const [pageParam, setPageParam] = useState<any>({});
  const [cursorPage, setCursorPage] = useState<string[]>([]);

  const { data, totalRecord, totalPages, loading, nextCursor } =
    useQueryListDocument(departmentID, pageParam);
  const [isShow, setIsShow] = useState<boolean>(false);

  const toggleModalConfirm = () => {
    setIsShow(!isShow);
  };

  const handleNextPage = React.useCallback(() => {
    if (nextCursor) {
      setPageParam({ lastestID: nextCursor });
    }
  }, [nextCursor]);

  const handlePrevPage = React.useCallback(() => {
    const currentIndex = cursorPage.findIndex(
      (cursor) => cursor === pageParam?.lastestID
    );
    if (currentIndex >= 0) {
      setPageParam({ lastestID: cursorPage[currentIndex - 1] }); // lấy id trước đó
    }
  }, [cursorPage, pageParam]);

  React.useEffect(() => {
    if (nextCursor) {
      const currentIndex = cursorPage.findIndex(
        (cursor) => cursor === nextCursor
      );
      if (currentIndex < 0) {
        setCursorPage([...cursorPage, nextCursor]); // lưu lại con trỏ trang
      }
    }
  }, [cursorPage, nextCursor, pageParam?.lastestID]);

  return (
    <>
      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-wrap items-center w-full px-4 gap-x-2 text-black py-1">
          <span className="text-x-large mr-7">Danh sách</span>
          <SearchInput
            classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2"
            onChange={() => 1}
          />
          <DocumentDropdown
            data={pkgs}
            value={pkg.title}
            onSelectValue={setPkg}
          />
          <DropdownFilterButton />
          <GroupActions className="flex items-center flex-1" />

          <ButtonCreate onClick={toggleModal} />
          <ButtonMore />
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading && <Loader absolute={true} className="border-primary" />}
          {!loading && (
            <table
              className="text-black text-medium border-separate space-x-0 space-y-0"
              style={{ borderSpacing: 0 }}
            >
              <thead className="">
                <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
                  <th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                    <span className="pl-2 border-l border-cbs-border">
                      Nội dung
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                    <span className="pl-2 border-l border-cbs-border">
                      Chủ thể ban hành
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                    <span className="pl-2 border-l border-cbs-border">
                      Mã hiệu
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                    <span className="pl-2 border-l border-cbs-border">
                      Ngày văn bản
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                    <span className="pl-2 border-l border-cbs-border">
                      Mã hiệu lưu
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                    <span className="pl-2 border-l border-cbs-border">
                      Số lượng
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                    <span className="pl-2 border-l border-cbs-border">
                      Tình trạng
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                    <span className="pl-2 border-l border-cbs-border">
                      Ghi chú
                    </span>
                  </th>
                  <th
                    className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border"
                    style={{ minWidth: "150px" }}
                  >
                    <span className="pl-2 border-l border-cbs-border">
                      Địa chỉ lưu trữ
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-small">
                {data.map((document, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-left hover:bg-cbs-active-comment"
                    >
                      <td className="px-4 py-2.5 border-b border-cbs-border">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                      </td>
                      <td className="px-2 w-[271px] py-2.5 border-b border-cbs-border">
                        <Link to={`/document/project/asd/document/doc`}>
                          <p>{document?.name || ""}</p>
                          <p className="mt-1.5 text-primary-gray">
                            {`${document?.author?.fullname || ""}-${
                              moment(document.createAt).isValid() &&
                              moment(document.createAt).format("DD/MM/YYYY")
                            }`}
                          </p>
                        </Link>
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2 w-[150px]">
                        {document?.sender?.name}
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2 w-[166px]">{document.sign}</td>
                      <td className="py-2.5 border-b border-cbs-border px-2 w-24 text-right">
                        {moment(document.date).isValid() &&
                          moment(document.date).format("DD/MM/YYYY")}
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2">
                        {document?.storeSign?.name}
                      </td>
                      <td
                        className="py-2.5 border-b border-cbs-border px-2 whitespace-nowrap text-right min-w-[85px]"
                        style={{ width: "1%" }}
                      >
                        {document.amount}
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2 box-border">
                        {document.status}
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2 box-border">
                        {document.note}
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2">{document?.storage?.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div style={{ height: 39 }} />
      {/* Footer */}
      <Paginate
        totalPages={totalPages}
        totalRecord={totalRecord}
        nextPageAction={handleNextPage}
        prevPageAction={handlePrevPage}
        isFetching={loading}
        hasNextPage
      />
      <Transition.Root appear show={isShow} as={Fragment}>
        <div className="fixed inset-0 overflow-y-auto" style={{ zIndex: 51 }}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-dark bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-flex flex-col text-black w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white">
                <div className="p-5 mb-4 text-xl leading-6 font-bold">
                  Bạn có muốn xóa không?
                </div>
                <div className="text-right pt-6 pb-5 px-8 text-base leading-5 border-t border-gray-100">
                  <button
                    className="py-1.5 px-3 border bg-white hover:bg-gray-100 shadow-xl rounded-md mr-2"
                    onClick={toggleModalConfirm}
                  >
                    Hủy
                  </button>
                  <button
                    className="py-1.5 px-3 border border-primary bg-primary hover:bg-opacity-90 text-white rounded-md"
                    onClick={toggleModalConfirm}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition.Root>
    </>
  );
};

export default DocumentProjectPage;
