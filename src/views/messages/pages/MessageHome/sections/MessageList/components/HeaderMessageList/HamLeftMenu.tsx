import React, {FC, useRef, useState} from "react";
import BookmarkIcon from "assets/images/icons8-bookmark-96.svg";
import AddFolderIcon from "assets/images/icons8-add-folder-96.svg";
import SettingIcon from "assets/images/icons8-setting-100.svg";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import {useDispatch} from "react-redux";
import {openCreateUpdateFolder} from "redux/reducer/messages/CreateUpdateFolder";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
import {AddNewChatGroup} from "./AddNewChatGroup";

export const HamLeftMenu:FC = () => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const dispatch = useDispatch();
    const [showOption, setShowOption] = useState(false);
    const el = useRef<HTMLDivElement>(null);
    useOnClickOutside(el, () => setShowOption(false))
    const {handleStartPrivateChat} = UseMessageHelper();
    return (
        <div ref={el} className={"relative mr-[14px] flex items-center justify-between flex-1"}>
            <AddNewChatGroup/>
            <button onClick={() => setShowOption(oldValue => !oldValue)} className={"w-[40px] h-[40px] hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 rounded-full flex items-center justify-center"}>
                <img  src={SettingIcon} alt={"ham"}/>
            </button>
            {
                showOption&&
                <div className={"absolute top-50px left-0 rounded-md shadow-lg bg-white min-w-[272px] text-gray-500 z-10"}>
                    <button
                        onClick={() => {
                            handleStartPrivateChat(profileId);
                            setShowOption(false)
                        }}
                        className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img  src={BookmarkIcon} alt={"bookmark"}/><div className={"flex-1 text-left ml-4"}>Saved Messages</div>
                    </button>
                    <button
                        onClick={() => {
                            dispatch(openCreateUpdateFolder({}))
                            setShowOption(false)
                        }}
                        className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img  src={AddFolderIcon} alt={"add folder"}/><div className={"flex-1 text-left ml-4"}>Folders</div>
                    </button>
                </div>
            }
        </div>
    )
}
