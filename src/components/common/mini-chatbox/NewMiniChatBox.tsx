import React, {FC} from "react";
import iconClose from "assets/images/icons8-close-30.png";
import thumbnail from "assets/images/thumbnail2.png";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";

const NewMiniChatBox:FC = () => {
    const {isNewChatboxVisible} = useSelector((state: RootState) => state.miniChat.data)

    if (!isNewChatboxVisible) return null;
    return (
        <div className="t-mini-chat-add-new text-[15px] ml-3 bg-primary-light border border-primary-border">
            <div className="t-mini-chat-add-new-header flex items-center p-3">
                <span className="font-bold text-dark">Tin nhắn mới</span>
                <button className="ml-auto" onClick={() => console.log('asdasa')}>
                    <img src={iconClose} alt="Close" className="w-5 h-5 object-contain" />
                </button>
            </div>
            <div className="t-mini-chat-add-new-find flex items-center px-3 pb-3 border-b border-primary-border text-primary-gray">
                <span>Tới:</span>
                <input className="border-0 flex-grow outline-none px-3 text-primary-gray" type="text" placeholder="Người nhận" />
            </div>
            <p className="font-bold text-primary-gray p-3 mb-2">Gần đây</p>
            <div className="t-mini-chat-add-new-list min-h-[250px]">
                <button className="t-mini-chat-add-new-list-item flex items-center text-[15px] mb-4 px-3" onClick={() => console.log('asdasd')}>
                    <img src={thumbnail} alt="Thumbnail" className="rounded-full w-9 h-9 mr-3 object-cover" />
                    <span>Nguyễn Văn A</span>
                </button>
                <button className="t-mini-chat-add-new-list-item flex items-center text-[15px] mb-4 px-3" onClick={() => console.log('asdasd')}>
                    <img src={thumbnail} alt="Thumbnail" className="rounded-full w-9 h-9 mr-3 object-cover" />
                    <span>Nguyễn Văn A</span>
                </button>
            </div>
        </div>
    )
}
export default NewMiniChatBox;