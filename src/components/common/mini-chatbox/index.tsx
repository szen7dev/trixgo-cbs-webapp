import { FC, useState } from "react";
import cn from "classnames";

import iconClose from "assets/images/icons8-close-30.png";
import iconChevronDown from "assets/images/icon-chevron-down.png";
import thumbnail from "assets/images/thumbnail2.png";
// import iconSend from "assets/images/icons8-email-send-48.png";

type Props = {
  closeMiniChatbox: () => void,
  closeNewChatbox: () => void,
  openMiniChatbox: () => void,
  isChatboxVisible: boolean,
  isNewChatboxVisible: boolean,
}

const MiniChatbox: FC<Props> = (props: Props) => {
  const handleOpenMiniChatbox = () => {
    props.closeNewChatbox();
    props.openMiniChatbox();
  }
  return (
    <div className="t-mini-chat-container fixed bottom-0 flex items-end flex-row-reverse transition-all duration-500 ease-out">
      {props.isNewChatboxVisible && (
        <div className="t-mini-chat-add-new text-[15px] ml-3 bg-primary-light border border-primary-border">
          <div className="t-mini-chat-add-new-header flex items-center p-3">
            <span className="font-bold text-dark">Tin nhắn mới</span>
            <button className="ml-auto" onClick={() => props.closeNewChatbox()}>
              <img src={iconClose} alt="Close" className="w-5 h-5 object-contain" />
            </button>
          </div>
          <div className="t-mini-chat-add-new-find flex items-center px-3 pb-3 border-b border-primary-border text-primary-gray">
            <span>Tới:</span>
            <input className="border-0 flex-grow outline-none px-3 text-primary-gray" type="text" placeholder="Người nhận" />
          </div>
          <p className="font-bold text-primary-gray p-3 mb-2">Gần đây</p>
          <div className="t-mini-chat-add-new-list min-h-[250px]">
            <button className="t-mini-chat-add-new-list-item flex items-center text-[15px] mb-4 px-3" onClick={handleOpenMiniChatbox}>
              <img src={thumbnail} alt="Thumbnail" className="rounded-full w-9 h-9 mr-3 object-cover" />
              <span>Nguyễn Văn A</span>
            </button>
            <button className="t-mini-chat-add-new-list-item flex items-center text-[15px] mb-4 px-3" onClick={handleOpenMiniChatbox}>
              <img src={thumbnail} alt="Thumbnail" className="rounded-full w-9 h-9 mr-3 object-cover" />
              <span>Nguyễn Văn A</span>
            </button>
          </div>
        </div>
      )}

      {props.isChatboxVisible && (
        <div className="t-mini-chat bg-primary-light border border-primary-border">
          <div className="t-mini-chat-header p-2 flex items-center bg-primary text-primary-light">
            <img src={thumbnail} alt="Thumbnail" className="rounded-full w-8 h-8 mr-2 object-cover" />
            <button className="text-[14px] flex items-center">
              <span className="truncate">Nguyen Thu Ha-PGI</span>
              <img src={iconChevronDown} alt="Dropdown" className="w-4 h-4 object-contain ml-2 filter-white" />
            </button>
            <button className="ml-auto" onClick={() => props.closeMiniChatbox()}>
              <img src={iconClose} alt="Close" className="w-4 h-4 object-contain filter-white" />
            </button>
          </div>
          <div className="t-mini-chat-content" style={{ height: "400px" }}></div>
        </div>
      )}
    </div>
  );
};

export default MiniChatbox;
