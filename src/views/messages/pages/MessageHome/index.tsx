import React, {FC, useContext} from "react";
import {SettingMessageDetail} from "./sections/SettingMessageDetail";
import '@draft-js-plugins/emoji/lib/plugin.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {
    ChattingSection,
} from "./sections/ChattingSection";
import {SearchMessage} from "./sections/SearchMessage";
import {MessageContext} from "../../shareComponents/layouts/MessagesLayoutV2";

export const MessagesHome:FC = () => {
    const {showMenu,showSearch} = useContext(MessageContext);
    return (
        <div className={"main-message flex content-avoid-header overflow-hidden relative " + (showMenu?" show-menu":"") + (showSearch?" show-SearchMessage":"")}>
            <ChattingSection/>
            <SettingMessageDetail/>
            <SearchMessage/>
        </div>
    )
}
