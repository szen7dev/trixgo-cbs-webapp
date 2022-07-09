import React, { FC, Fragment, useContext, useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { Menu } from '@headlessui/react';
import { toast } from "react-toastify";
import moment from "moment";
import debounce from "lodash/debounce";

// ========== Context ==========
import { ModalContext } from "views/document/contexts/modal";

// ========= Global Components =========
import { Paginate, Loader, ButtonCreate, DropdownOption } from "shareComponents/common";

// ========== Components ==========
import {
  DropdownFilterButton,
  GroupActions,
  SearchInput,
} from "views/document/sharedComponents/common";

// ========== Hooks ==========
import {
  useQueryListDocument,
  useQueryDetailDocument,
} from "services/hooks/ppt/useDocument";
import { useQueryDetailDepartment } from "services/hooks/items/useDepartment";
import { useMutationDocumentChild } from "services/hooks/document/useDocumentChild";
import { useHistoryTraffics } from "services/hooks/auth/useAuth";
import { useDocumentCustom } from "services/hooks/document/useDocument";

// ========== Utils ==========
import { APP_ID } from 'apis/localdb';
import { createLinkAndClick } from "utils";

const payloadHistoryTraffic: any = {
  appID: APP_ID.PCM.id,
  menuID: APP_ID.PCM.menuPcmProject.document.id,
  type: "1"
};

export const DocumentProjectPage: FC = () => {
  //_____Start history traffict
	const { createHistoryTraffics } = useHistoryTraffics();

	//_____End history traffict
  const location = useLocation()
  const { toggleModal, updateModal } = useContext(ModalContext);
  const { id: departmentID } = useParams<{ id: string }>();
  const [pageParam, setPageParam] = useState<any>({});
  const [cursorPage, setCursorPage] = useState<string[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [recordSelected, setSelectRecord] = useState<any>({});
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});

  const { data, totalRecord, totalPages, loading, nextCursor, refetch } = useQueryListDocument(departmentID, pageParam, "");
  const { insertDocumentChildAsync, updateDocumentChildAsync } = useMutationDocumentChild();
  const { onFetchDetailDepartmentAsync } = useQueryDetailDepartment();
  const { onFetchDetailDocumentAsync }   = useQueryDetailDocument();
  const { exportDocumentAsync } = useDocumentCustom({});

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

  const handleCreate = React.useCallback(async () => {
    const result = await onFetchDetailDepartmentAsync(departmentID);
    toggleModal();
    updateModal({
      departmentId: departmentID,
      departmentInfo: result,
      title: "Thêm mới",
      onSubmit: async (values: any) => {
        const result = await insertDocumentChildAsync({
          ...values,
          departmentID,
        });
        if (result.status === 200) {
          refetch();
          toggleModal();
          updateModal({
            departmentInfo: {},
          });
        }
      },
    });
  }, [
    departmentID,
    insertDocumentChildAsync,
    onFetchDetailDepartmentAsync,
    refetch,
    toggleModal,
    updateModal,
  ]);

  const handleOnClickUpdate = React.useCallback(
    (record) => async () => {
      const result = await onFetchDetailDocumentAsync(record._id);
      toggleModal();
      updateModal({
        departmentId: departmentID,
        departmentInfo: {
          company: {
            _id: record.company,
          },
        },
        title: "Cập nhật",
        initialValues: result,
        onSubmit: async (values: any) => {
          const result = await updateDocumentChildAsync({
            ...values,
            documentID: record._id,
          });
          if (result.status === 200) {
            refetch();
            toggleModal();
            updateModal({
              departmentInfo: {},
              initialValues: {},
            });
          }
        },
      });
    },
    [
      departmentID,
      onFetchDetailDocumentAsync,
      refetch,
      toggleModal,
      updateDocumentChildAsync,
      updateModal,
    ]
  );

  const handleOnFilter = React.useCallback((values) => {
    setPageParam(() => ({ ...values }));
    return true;
  }, []);

  const handleOnCancelFilter = React.useCallback(() => {
    setPageParam({});
  }, []);

  useEffect(() => {
  	createHistoryTraffics({...payloadHistoryTraffic, type: 1});
	}, []);

  useEffect(() => {
    if (nextCursor) {
      const currentIndex = cursorPage.findIndex(
        (cursor) => cursor === nextCursor
      );
      if (currentIndex < 0) {
        setCursorPage([...cursorPage, nextCursor]); // lưu lại con trỏ trang
      }
    }
  }, [cursorPage, nextCursor, pageParam?.lastestID]);

  const handleExport = async () => {
		try {
			setStateExport({ isExporting: true });
			const { error, data } = await exportDocumentAsync({
        filterParams: { departmentID }
      });

			if(error) {
				return toast.warn(data?.message);
			}

			data && createLinkAndClick(data, '_self');
		} catch (error: any) {
      toast.error(error.message)
		} finally {
			setStateExport({ isExporting: false });
		}
	}

  if(stateExport.isExporting) {
    return <Loader className="border-primary" />
  }

  return (
    <>
      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-wrap items-center justify-between w-full px-4 gap-x-2 text-black py-1">
          <div className="flex flex-wrap items-center">
            <span className="text-x-large mr-7">Danh sách</span>
            {/* <DocumentDropdown
              data={pkgs}
              value={pkg.title}
              onSelectValue={setPkg}
            /> */}
            <SearchInput
              classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2"
              onChange={debounce((e) => {
                handleOnFilter({
                  keyword: e.target.value,
                });
              }, 500)}
            />
            <DropdownFilterButton
              onSubmit={handleOnFilter}
              onCancel={handleOnCancelFilter}
              initialValues={pageParam}
            />
            {Object.keys(recordSelected).length > 0 && (
              <GroupActions
                className="flex items-center flex-1"
                onClickPencil={handleOnClickUpdate(recordSelected)}
              />
            )}
          </div>
          <div className="flex flex-wrap items-center">
            <ButtonCreate onClick={handleCreate} />
            <DropdownOption>
              <Menu.Item onClick={handleExport}>
                <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-3"}>
                  <img src="/images/common/icons8-download-48.png" alt="Download Excel" />
                  <div className={"flex-1 text-left ml-4"}>
                    Download Excel
                  </div>
                </div>
              </Menu.Item>
            </DropdownOption>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading && <Loader absolute={true} className="border-primary" />}
          {data.length === 0 && (
            <h2 className="text-center">Không có kết quả được trả về</h2>
          )}
          {!loading && data.length > 0 && (
            <table
              className="text-black text-medium border-separate space-x-0 space-y-0"
              style={{ borderSpacing: 0 }}
            >
              <thead className="">
                <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
                  <th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '30px' }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '25%' }}>
                    <span className="pl-2 border-l border-cbs-border">
                      Nội dung
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '15%' }}>
                    <span className="pl-2 border-l border-cbs-border">
                      Chủ thể ban hành
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '10%' }}>
                    <span className="pl-2 border-l border-cbs-border">
                      Mã hiệu
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '5%' }}>
                    <span className="pl-2 border-l border-cbs-border">
                      Ngày văn bản
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '5%' }}>
                    <span className="pl-2 border-l border-cbs-border">
                      Mã hiệu lưu
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '5%' }}>
                    <span className="pl-2 border-l border-cbs-border">
                      Số lượng
                    </span>
                  </th>
                  <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '10%' }}>
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
                    style={{ width: '10%' }}
                  >
                    <span className="pl-2 border-l border-cbs-border">
                      Địa chỉ lưu trữ
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((document, index) => {
                  let linkRef;
                  if(location.pathname.includes("/document/project/")){
                    linkRef = `/document/project/${document.project._id}/detail/${document._id}`
                  }else{
                    linkRef = `/pcm/project/${document.project._id}/document/${document._id}`
                  }
                  return (
                    <tr
                      key={index}
                      className="text-left hover:bg-cbs-active-comment"
                    >
                      <td className="px-4 py-2.5 border-b border-cbs-border">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={document._id === recordSelected._id}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectRecord(document);
                              return null;
                            }
                            setSelectRecord({});
                            return null;
                          }}
                        />
                      </td>
                      <td className="px-2 w-[271px] py-2.5 border-b border-cbs-border">
                        <Link to={linkRef}>
                          <p className="text-cbs-highlight-color">{document?.name || ""}</p>
                          <p className="mt-1.5 text-primary-gray">
                            {`${document?.author?.fullname || ""}-${
                              moment(document.createAt).isValid() &&
                              moment(document.createAt).format("DD/MM/YYYY")
                            }`}
                          </p>
                        </Link>
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2">
                        {document?.sender?.name}
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2">
                        {document?.sign}
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2 w-24 text-right">
                        {moment(document.date).isValid() && moment(document.date).format("DD/MM/YYYY")}
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2">
                        {document?.storeSign}
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2 whitespace-nowrap text-right">
                        {document.amount}
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2 box-border">
                        {document.status}
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2 box-border">
                        {document.note}
                      </td>
                      <td className="py-2.5 border-b border-cbs-border px-2">
                        {document?.storage?.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
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
