import React, {FC, useRef, useState} from "react";
import HamMenu from "assets/images/icons8-menu-96.svg";
import BookmarkIcon from "assets/images/icons8-bookmark-96.svg";
import AddFolderIcon from "assets/images/icons8-add-folder-96.svg";
import {useOnClickOutside} from "../../../../../services/hooks/useOnclickOutside";

const HamLeftMenu:FC = () => {
    const [showOption, setShowOption] = useState(false);
    const el = useRef<HTMLDivElement>(null);
    useOnClickOutside(el, () => setShowOption(false))

    return (
        <div ref={el} className={"relative"}>
            <button onClick={() => setShowOption(oldValue => !oldValue)} className={"w-[40px] h-[40px] hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 rounded-full flex items-center justify-center"}>
                <img src={HamMenu} alt={"ham"}/>
            </button>
            {
                showOption&&
                <div className={"absolute top-50px left-0 rounded-md shadow-lg bg-white min-w-[272px] text-gray-500"}>
                    <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img src={BookmarkIcon} alt={"bookmark"}/><div className={"flex-1 text-left ml-4"}>Saved Messages</div>
                    </button>
                    <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img src={AddFolderIcon} alt={"add folder"}/><div className={"flex-1 text-left ml-4"}>Folders</div>
                    </button>
                </div>
            }
        </div>
    )
}

export default HamLeftMenu
