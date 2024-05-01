import React, { FC, HTMLAttributes, useState, useContext } from "react";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import QRCodeIcon from "assets/images/document/qr-code.png";
// import iconPencil from "assets/images/icons8-pencil-96 1.png";
import { useMutationDocumentChild } from "services/hooks/document/useDocumentChild";
import styles from "views/support/styles/support.module.css";
import { useQueryDetailDocument } from "services/hooks/ppt/useDocument";
import { ModalContext } from "views/document/contexts/modal";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import {useDispatch} from "react-redux";
import {resetAllFilterAndKeyword} from "redux/reducer/DocumentProjectSlice";

// ========= Global Components =========
import { DropdownSearchableV2 } from "shareComponents/common";

type ButtonProps = {
    onClickDownload?: React.MouseEventHandler<HTMLButtonElement>;
    onClickShare?: React.MouseEventHandler<HTMLButtonElement>;
    onClickCopy?: React.MouseEventHandler<HTMLButtonElement>;
    onClickSendEmail?: React.MouseEventHandler<HTMLButtonElement>;
    onClickPencil?: React.MouseEventHandler<HTMLButtonElement>;
    onClickTrash?: React.MouseEventHandler<HTMLButtonElement>;
    onClickPrint?: React.MouseEventHandler<HTMLButtonElement>;
    onGenerateQRCode?: React.MouseEventHandler<HTMLButtonElement>;
    detailDocument: any,
    refeshInfoDocument: any,
    types?: ("download" | "share" | "copy" | "email" | "edit" | "trash" | "print")[];
}

export const GroupActionsPageDetail: FC<HTMLAttributes<HTMLDivElement> & ButtonProps> = (props) => {
    const { onClickDownload, onClickShare, onClickCopy, onClickSendEmail, onClickPencil, onClickTrash, onClickPrint, onGenerateQRCode, types, ...rest } = props;
    const [activeCopyTextTooltip, setActiveCopyTextTooltip] = useState(false);
    const copyLink = () => {
        const copyText = window.location.href;
        navigator.clipboard.writeText(copyText);
        setActiveCopyTextTooltip(true);
    }

    const mouseLeaveCopyTextButton = () => {
        setActiveCopyTextTooltip(false);
    }

    const dispatch = useDispatch();
    const [recordSelected, setSelectRecord] = useState<any>({});
    const { updateDocumentChildAsync } = useMutationDocumentChild();
    const { onFetchDetailDocumentAsync }   = useQueryDetailDocument();
    const { toggleModal, updateModal } = useContext(ModalContext);
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
                    props.refeshInfoDocument(record._id);
                    // refetchListDocument();
                    // refetchListDocumentChild();
                    // docChildPayload.refetchListDocumentChild();
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

    return (
        <div {...rest}>
            {(!types || types?.includes('copy')) && <button
                // className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60"
                className={"flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60 justify-center hover:bg-cbs-form-input-bg relative"}
                onClick={copyLink}
                onMouseOut={() => mouseLeaveCopyTextButton()}
                >
                <img className="w-[24px] h-[24px]" alt="icon" src={CopyIcon} />
                <div className={"absolute top-full bg-primary-gray p-2 rounded w-[170px] text-left text-white transition-all " + (activeCopyTextTooltip ? "visible opacity-100" : "invisible opacity-0")}>Đã sao chép đường liên kết</div>
            </button>}

            {(!types || types?.includes('edit')) && <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60" onClick={handleOnClickUpdate(props.detailDocument)}>
                <img className="w-[24px] h-[24px]" alt="icon" src={PencilIcon} />
            </button>}

            <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2" onClick={onGenerateQRCode}>
                <img className="w-[24px] h-[24px]" alt="icon" src={QRCodeIcon} />
            </button>
        </div>
    )
}