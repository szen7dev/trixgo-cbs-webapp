import React, {FC} from "react";
import ForwardIcon from "assets/images/icons8-reply-arrow-100.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import PinIcon from "assets/images/icons8-pin-96.svg";
import DownloadIcon from "assets/images/icons8-download-thin-96.svg";
import ShareIcon from "assets/images/icons8-share-100.svg";
import IconSelected from "assets/images/icons-web-select.svg";
import SampleAvatar from "assets/images/sample_avt.svg";
import GroupIcon from "assets/images/icons8-group-90.svg";
import RemoveRedIcon from "../../../../../assets/images/icons8-remove-48.svg";

const RightClickMessage:FC = () => {
    return (
        <div className={"rounded-md shadow-lg bg-white w-[216px] text-gray-500"}>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2 w-[24px] h-[24px]"} src={ForwardIcon}/>
                <div className={"mr-2 ml-4"}>Reply</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2 w-[24px] h-[24px]"} src={CopyIcon}/>
                <div className={"mr-2 ml-4"}>Copy Text</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2 w-[24px] h-[24px]"} src={PinIcon}/>
                <div className={"mr-2 ml-4"}>Pin</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2 w-[24px] h-[24px]"} src={DownloadIcon}/>
                <div className={"mr-2 ml-4"}>Download</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2 w-[24px] h-[24px]"} src={ShareIcon}/>
                <div className={"mr-2 ml-4"}>Forward</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2 w-[24px] h-[24px]"} src={IconSelected}/>
                <div className={"mr-2 ml-4"}>Select</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2 w-[24px] h-[24px]"} src={GroupIcon}/>
                <div className={"mr-4 ml-4"}>5 Seen</div>
                <div className={"flex"}>
                    <img src={SampleAvatar} className={"w-[16px] h-[16px] rounded-full overflow-hidden"}/>
                    <img src={SampleAvatar} className={"w-[16px] h-[16px] rounded-full overflow-hidden"}/>
                    <img src={SampleAvatar} className={"w-[16px] h-[16px] rounded-full overflow-hidden"}/>
                </div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2 w-[24px] h-[24px]"} src={RemoveRedIcon} alt={"exit"}/>
                <div className={"flex-1 text-left ml-4 text-negative"}>Delete</div>
            </button>
        </div>
    )
}

export default RightClickMessage;
