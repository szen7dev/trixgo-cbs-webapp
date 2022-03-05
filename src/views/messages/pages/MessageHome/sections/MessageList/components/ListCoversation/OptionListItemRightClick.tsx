import React, {FC} from "react";
import AddFolderIcon from "assets/images/icons8-add-folder-96.svg";
import ChatIcon from "assets/images/icons8-chat-96.svg";
import UnPinnedIcon from "assets/images/icons8-unpin-96.svg";
import NotificationIcon from "assets/images/icons8-notification-96.svg";
import HideEyeIcon from "assets/images/icons8-hide-96.svg";
import ExitRedIcon from "assets/images/icons8-exit-48.svg";
import RemoveRedIcon from "assets/images/icons8-remove-48.svg";
import {useDispatch} from "react-redux";
import {openAddConversationToFolder} from "redux/reducer/messages/AddConversationToFolder";
import {useRightClickMenu} from "services/hooks/useRightClickMenu";

type Props = {
    chat: any
}
export const OptionListItemRightClick:FC<Props> = ({chat}) => {
    const dispatch = useDispatch();
    const {closeRightClick} = useRightClickMenu();

    return (
        <div className={"bg-white rounded-md shadow-lg text-gray-500 min-w-[216px]"}>
            <button
                onClick={() => {
                    dispatch(openAddConversationToFolder({conversation: chat}))
                    setTimeout(() => {
                        closeRightClick()
                    }, 100)
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full add-to-folder"}>
                <img alt={"======"} className={"mr-2 w-[24px] h-[24px]"} src={AddFolderIcon}/>
                <div className={"mr-2 ml-4"}>Add to folder...</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={ChatIcon}/>
                <div className={"mr-2 ml-4"}>Mark as unread</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={UnPinnedIcon}/>
                <div className={"mr-2 ml-4"}>Unpin from top</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={NotificationIcon}/>
                <div className={"mr-2 ml-4"}>Mute</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={HideEyeIcon}/>
                <div className={"mr-2 ml-4"}>Hide</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={ExitRedIcon}/>
                <div className={"text-negative mr-2 ml-4"}>Exit</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={RemoveRedIcon}/>
                <div className={"text-negative mr-2 ml-4"}>Delete</div>
            </button>
        </div>
    )
}
