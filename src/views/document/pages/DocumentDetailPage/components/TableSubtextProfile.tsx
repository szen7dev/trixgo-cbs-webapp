import React, { FC, HTMLAttributes, useCallback, useState, useContext } from "react";
import moment from "moment";
import { Link } from 'react-router-dom';
import cn from "classnames";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import { useMutationDocumentChild } from "services/hooks/document/useDocumentChild";
import type { UseQueryListDocumentChild } from "services/hooks/document/useDocumentChild";
import styles from "views/support/styles/support.module.css";
import { useQueryDetailDocument } from "services/hooks/ppt/useDocument";
import { ModalContext } from "views/document/contexts/modal";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import {useDispatch} from "react-redux";
import {setFilterDropdown, resetAllFilterAndKeyword} from "redux/reducer/DocumentProjectSlice";

// ========= Global Components =========
import {
  DropdownSearchableV2,
  Loader,
} from "shareComponents/common";

interface TableSubtextProfileProps extends HTMLAttributes<HTMLTableElement> {
  docChildPayload: UseQueryListDocumentChild;
}
export const TableSubtextProfile: FC<TableSubtextProfileProps> = ({
  docChildPayload,
  ...props
}) => {
  const dispatch = useDispatch();
  const [recordSelected, setSelectRecord] = useState<any>({});
  const { updateDocumentChildAsync } = useMutationDocumentChild();
  const { onFetchDetailDocumentAsync }   = useQueryDetailDocument();
  const { toggleModal, updateModal } = useContext(ModalContext);
  console.log({ ModalContext: useContext(ModalContext) })
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  type TimeRangeHandle = React.ElementRef<typeof TimeRangeDropdown>;
 
  const datahubRef = React.useRef<DropdownHandle>(null);
  const typesRef = React.useRef<DropdownHandle>(null);
  const directionsRef = React.useRef<DropdownHandle>(null);
  const contractsRef = React.useRef<DropdownHandle>(null);
  const storagesRef = React.useRef<DropdownHandle>(null);
  const fromToRef = React.useRef<TimeRangeHandle>(null);

  const resetAllFilter = () => {
    datahubRef.current&&datahubRef.current.resetDropdown();
    typesRef.current&&typesRef.current.resetDropdown();
    directionsRef.current&&directionsRef.current.resetDropdown();
    storagesRef.current&&storagesRef.current.resetDropdown();
    contractsRef.current&&contractsRef.current.resetDropdown();
    fromToRef.current&&fromToRef.current.resetTimeRange();
}

  const handleOnClickUpdate = React.useCallback((record) => async () => {
    const result = await onFetchDetailDocumentAsync(record._id);
    toggleModal();
    updateModal({
        departmentId: result.project._id,
        departmentInfo: result,
        title: "Cập nhật",
        initialValues: result,
        onSubmit: async (values: any) => {
            const result = await updateDocumentChildAsync({
                ...values,
                documentID: record._id,
            });
            if (result.status === 200) {
                setSelectRecord({});
                resetAllFilter();
                dispatch(resetAllFilterAndKeyword({}));
                // refetchListDocument();
                // setPageIndex(0);
                // ref.current&&ref.current.resetPaginate();
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
      onFetchDetailDocumentAsync,
      // refetchListDocument,
      toggleModal,
      updateDocumentChildAsync,
      updateModal,
  ]
  );
  
  const renderSeeMoreButton = React.useCallback(
    (_docChildPayload: UseQueryListDocumentChild) => {
      const condition =
        _docChildPayload.totalRecord &&
        _docChildPayload.totalRecord -
          _docChildPayload.listDocumentChild.length >
          0;
      return condition ? (
        <button
          className="text-primary text-[13px]"
          onClick={() => _docChildPayload.fetchNextPageDocumentChild()}
        >
          {`Xem thêm (${
            Number(_docChildPayload.totalRecord) -
            _docChildPayload.listDocumentChild.length
          })`}
        </button>
      ) : (
        <></>
      );
    },
    []
  );
  return (
    <>
      {
          recordSelected._id&&
          <button
              onClick={handleOnClickUpdate(recordSelected)}
              className={"flex items-center justify-center mx-3 ml-6"}>
              <img src={iconPencil} alt={"-----"} className={"w-[18px] h-[18px]"}/>
          </button>
      }
      <table className="w-full text-black mt-3" {...props}>
        <thead>
          <tr className="text-left">
            <th className={cn("py-1 text-center", styles.theadInput)}>
                <div className="border-gray-300 flex items-center justify-center">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        // defaultChecked={getStateCheckedAll()}
                        // onClick={onClickCheckAll}
                    />
                </div>
            </th>
            <th className="font-normal text-cbs-subtext px-3 py-2.5">
              Nội dung
            </th>
            <th className="font-normal text-cbs-subtext px-3 py-2.5">
              Số hiệu
            </th>
            <th className="font-normal text-cbs-subtext px-3 py-2.5">
              Ngày tháng
            </th>
            <th className="font-normal text-cbs-subtext px-3 py-2.5">
              Đơn vị ban hành
            </th>
            <th className="font-normal text-cbs-subtext px-3 py-2.5">
              Ghi chú
            </th>
            <th className="font-normal text-cbs-subtext px-3 py-2.5">
              Địa chỉ lưu trữ
            </th>
          </tr>
        </thead>
        <tbody>
          {(docChildPayload?.listDocumentChild?.length) ? docChildPayload.listDocumentChild?.map((doc, i) => (
            <tr key={doc._id}>
              <td className="px-4 py-2.5 border-cbs-border">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        checked={doc._id === recordSelected._id}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectRecord(doc);
                                return null;
                            }
                            setSelectRecord({});
                            return null;
                        }}
                    />
                </td>
              <td className="py-3 px-3">
                  <Link to={`/pm/project/${doc?.project}/document/${doc._id}`} className="ml-3 mr-3">
                    {doc.name || ''}
                  </Link>
                </td>
              <td className="py-3 px-3">{doc.sign || ''}</td>
              <td className="py-3 px-3">{moment(doc.date).isValid() && moment(doc.date).format('DD/MM/YYYY') || ''}</td>
              <td className="py-3 px-3">{doc.publish?.name || ''}</td>
              <td className="py-3 px-3">{doc.note || ''}</td>
              <td className="py-3 px-3">{doc.storage?.name || ''}</td>
            </tr>
          )) : <></>}
          {renderSeeMoreButton(docChildPayload)}
        </tbody>
      </table>
    </>
  );
};