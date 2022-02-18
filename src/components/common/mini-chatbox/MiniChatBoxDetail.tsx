import React, {FC} from "react";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import thumbnail from "assets/images/thumbnail2.png";
import iconChevronDown from "assets/images/icon-chevron-down.png";
import iconClose from "assets/images/icons8-close-30.png";

const MiniChatBoxDetail:FC = () => {
    const {isChatboxVisible, conversationId} = useSelector((state: RootState) => state.miniChat.data)

    if (!isChatboxVisible) return null
    return (
        <div className="t-mini-chat bg-primary-light border border-primary-border">
            <div className="t-mini-chat-header p-2 flex items-center bg-primary text-primary-light">
                <img src={thumbnail} alt="Thumbnail" className="rounded-full w-8 h-8 mr-2 object-cover" />
                <button className="text-[14px] flex items-center">
                    <span className="truncate">Nguyen Thu Ha-PGI</span>
                    <img src={iconChevronDown} alt="Dropdown" className="w-4 h-4 object-contain ml-2 filter-white" />
                </button>
                <button className="ml-auto" onClick={() => console.log('asdasdasdas')}>
                    <img src={iconClose} alt="Close" className="w-4 h-4 object-contain filter-white" />
                </button>
            </div>
            <div className="t-mini-chat-content" style={{ height: "400px" }}></div>
        </div>
    )
}

export default MiniChatBoxDetail;