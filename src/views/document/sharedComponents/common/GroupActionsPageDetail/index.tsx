import React, { FC, HTMLAttributes } from "react";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import QRCodeIcon from "assets/images/document/qr-code.png";

type ButtonProps = {
    onClickDownload?: React.MouseEventHandler<HTMLButtonElement>;
    onClickShare?: React.MouseEventHandler<HTMLButtonElement>;
    onClickCopy?: React.MouseEventHandler<HTMLButtonElement>;
    onClickSendEmail?: React.MouseEventHandler<HTMLButtonElement>;
    onClickPencil?: React.MouseEventHandler<HTMLButtonElement>;
    onClickTrash?: React.MouseEventHandler<HTMLButtonElement>;
    onClickPrint?: React.MouseEventHandler<HTMLButtonElement>;
    onGenerateQRCode?: React.MouseEventHandler<HTMLButtonElement>;
    types?: ("download" | "share" | "copy" | "email" | "edit" | "trash" | "print")[];
}

export const GroupActionsPageDetail: FC<HTMLAttributes<HTMLDivElement> & ButtonProps> = (props) => {
    const { onClickDownload, onClickShare, onClickCopy, onClickSendEmail, onClickPencil, onClickTrash, onClickPrint, onGenerateQRCode, types, ...rest } = props;
    return (
        <div {...rest}>
            {(!types || types?.includes('copy')) && <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60" onClick={onClickCopy} disabled={!onClickCopy}>
                <img className="w-[24px] h-[24px]" alt="icon" src={CopyIcon} />
            </button>}

            {(!types || types?.includes('edit')) && <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60" onClick={onClickPencil}>
                <img className="w-[24px] h-[24px]" alt="icon" src={PencilIcon} />
            </button>}

            <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2" onClick={onGenerateQRCode}>
                <img className="w-[24px] h-[24px]" alt="icon" src={QRCodeIcon} />
            </button>
        </div>
    )
}