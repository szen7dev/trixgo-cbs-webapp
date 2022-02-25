import React, {FC, useCallback} from "react";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import Close from "assets/icons/Close";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";

type Props = {
    conversation: ItemListConversation;
    removeSelectedConversation: (_id: string) => void;
}
export const SelectedShareConversationItem:FC<Props> = ({conversation, removeSelectedConversation}) => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const getPresentGroupName = (name: string) => {
        return name.split('').slice(0, 1).map((text: string) => {
            return text.charAt(0)
        });
    }

    const {getNameConversation} = UseMessageHelper();

    return (
        <div key={conversation._id} className={"flex items-center bg-gray-100 rounded-full p-1 pr-2 mr-2 mb-1"}>
            <div className={"rounded-full flex items-center justify-center text-white font-bold text-xs w-[30px] h-[30px]"} style={{background: "#8DD4D6"}}>
                {getPresentGroupName(getNameConversation(conversation, profileId))}
            </div>
            <div className={"flex-1 mx-2 text-xs"}>{getNameConversation(conversation, profileId)}</div>
            <button
                onClick={() => removeSelectedConversation(conversation._id)}
            >
                <Close/>
            </button>
        </div>
    )
}