import React, {FC} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";

type Props = {
    message: ItemMessage;
    isOpenMessageNPSVoteDetail: boolean
}
export const NPSScoreVoteDetail:FC<Props> = ({message, isOpenMessageNPSVoteDetail}) => {
    return <div className={"px-[22px]"}>
        <div>Điểm về sự hài lòng <b>“{message.nps.service.name}”</b></div>
    </div>
}