import { FC, useState } from "react";
import cn from "classnames";

import iconSend from "assets/images/icons8-email-send-48.png";
import iconClose from "assets/images/icons8-close-30.png";
import iconChevronDown from "assets/images/icon-chevron-down.png";
import thumbnail from "assets/images/thumbnail2.png";

type Props = {
  closeMiniChatbox: () => void,
}

const MiniChatbox: FC<Props> = (props: Props) => {
  return (
    <div className="t-mini-chat-container fixed bottom-0">
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
    </div>
  );
};

export default MiniChatbox;
