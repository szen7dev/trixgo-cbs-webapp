import React, {FC} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {NpsContentScore} from "./NpsContentTypeScore";
import {NpsContentTypePleasant} from "./NpsContentTypePleasant";

type Props = {
    message: ItemMessage;
    className?: string;
    borderClass?: string;
    isMyMessage?: boolean;
    isMini?: boolean;
    context?: any;
}
export const NpsContent:FC<Props> = (props) => {

    if (props.message.nps.type === 1) {
        return <NpsContentScore {...props}/>
    } else {
        return <NpsContentTypePleasant {...props}/>
    }
}