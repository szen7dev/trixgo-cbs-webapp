import React, {FC} from "react";
import AddFolderIcon from "assets/images/icons8-add-folder-96.svg";
import ChatIcon from "assets/images/icons8-chat-96.svg";
import UnPinnedIcon from "assets/images/icons8-unpin-96.svg";
import NotificationIcon from "assets/images/icons8-notification-96.svg";
import HideEyeIcon from "assets/images/icons8-hide-96.svg";
import ExitRedIcon from "assets/images/icons8-exit-48.svg";
import RemoveRedIcon from "assets/images/icons8-remove-48.svg";

const OptionListItemRightClick:FC = () => {
    return (
        <div className={"bg-white rounded-md shadow-lg text-gray-500 min-w-[216px]"}>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2"} src={AddFolderIcon}/>
                <span>Add to folder...</span>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2"} src={ChatIcon}/>
                <span>Mark as unread</span>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2"} src={UnPinnedIcon}/>
                <span>Unpin from top</span>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2"} src={NotificationIcon}/>
                <span>Mute</span>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2"} src={HideEyeIcon}/>
                <span>Hide</span>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2"} src={ExitRedIcon}/>
                <span className={"text-negative"}>Exit</span>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img className={"mr-2"} src={RemoveRedIcon}/>
                <span className={"text-negative"}>Delete</span>
            </button>
        </div>
    )
}

export default OptionListItemRightClick;
