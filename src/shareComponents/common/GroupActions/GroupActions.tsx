import React, { FC, HTMLAttributes } from "react";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import PrintIcon from "assets/images/icons8-print-96.svg";

type ButtonProps = {
    onClickDownload?: React.MouseEventHandler<HTMLButtonElement>;
    onClickShare?: React.MouseEventHandler<HTMLButtonElement>;
    onClickCopy?: React.MouseEventHandler<HTMLButtonElement>;
    onClickSendEmail?: React.MouseEventHandler<HTMLButtonElement>;
    onClickPencil?: React.MouseEventHandler<HTMLButtonElement>;
    onClickTrash?: React.MouseEventHandler<HTMLButtonElement>;
    onClickPrint?: React.MouseEventHandler<HTMLButtonElement>;

    types?: ("download" | "share" | "copy" | "email" | "edit" | "trash" | "print")[];
}

export const GroupActions: FC<HTMLAttributes<HTMLDivElement> & ButtonProps> = (props) => {
    const { onClickDownload, onClickShare, onClickCopy, onClickSendEmail, onClickPencil, onClickTrash, onClickPrint, types, ...rest } = props;
    return (
        <div {...rest}>
            {(!types || types?.includes('download')) && <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60" onClick={onClickDownload} disabled={!onClickDownload}>
                <img className="w-[24px] h-[24px]" alt="icon" src={DownloadIcon} />
            </button>}
            {(!types || types?.includes('share')) && <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60" onClick={onClickShare} disabled={!onClickShare}>
                <img className="w-[24px] h-[24px]" alt="icon" src={ShareIcon} />
            </button>}
            {(!types || types?.includes('copy')) && <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60" onClick={onClickCopy} disabled={!onClickCopy}>
                <img className="w-[24px] h-[24px]" alt="icon" src={CopyIcon} />
            </button>}
            {(!types || types?.includes('email')) && <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60" onClick={onClickSendEmail} disabled={!onClickSendEmail}>
                <img className="w-[24px] h-[24px]" alt="icon" src={SendEmailIcon} />
            </button>}
            {(!types || types?.includes('edit')) && <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60" onClick={onClickPencil} disabled={!onClickPencil}>
                <img className="w-[24px] h-[24px]" alt="icon" src={PencilIcon} />
            </button>}
            {(!types || types?.includes('trash')) && <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60" onClick={onClickTrash} disabled={!onClickTrash}>
                <img className="w-[24px] h-[24px]" alt="icon" src={TrashIcon} />
            </button>}
            {(!types || types?.includes('print')) && <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60" onClick={onClickPrint} disabled={!onClickPrint}>
                <img className="w-[24px] h-[24px]" alt="icon" src={PrintIcon} />
            </button>}
        </div>
    )
}