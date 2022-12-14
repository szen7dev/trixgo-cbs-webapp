import React, { FC, HTMLAttributes, useState } from "react";
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
    const [activeCopyTextTooltip, setActiveCopyTextTooltip] = useState(false);
    const copyLink = () => {
        const copyText = window.location.href;
        navigator.clipboard.writeText(copyText);
        setActiveCopyTextTooltip(true);
    }

    const mouseLeaveCopyTextButton = () => {
        setActiveCopyTextTooltip(false);
    }
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

            {(!types || types?.includes('edit')) && <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 disabled:bg-transparent disabled:opacity-60" onClick={onClickPencil}>
                <img className="w-[24px] h-[24px]" alt="icon" src={PencilIcon} />
            </button>}

            <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2" onClick={onGenerateQRCode}>
                <img className="w-[24px] h-[24px]" alt="icon" src={QRCodeIcon} />
            </button>
        </div>
    )
}