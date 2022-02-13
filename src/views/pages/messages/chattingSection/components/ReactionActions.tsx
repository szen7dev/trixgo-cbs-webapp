import React, {FC, useContext} from "react";
import {map as _map} from "lodash";
import {listEmoji} from "./MainChatContent";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {MessageContext} from "../../home/index_v2";
type Props = {
    message: ItemMessage
}
export const ReactionActions:FC<Props> = ({message}) => {
    const {socketRef} = useContext(MessageContext);
    const socket = socketRef.current;

    return (
        <div className={"absolute emoji-action flex flex-col items-center z-10 w-fit shadow-lg rounded-full bg-white opacity-0 invisible"}>
            <div className={"flex flex-col h-0 opacity-0 invisible other-emojis"}>
                {
                    _map(listEmoji.filter(emoji => emoji.id !== 6), emoji => (
                        <button
                            onClick={() => {
                                socket.emit('CHATTING_CSS_REACTION_MESSAGE',{messageID: message._id, typeReaction: emoji.value});
                            }}
                            className={"emoji-item px-[5px] py-[2px]"}>
                            <img className={"w-[20px] h-[20px]"} src={emoji.icon} alt={"-----"}/>
                        </button>
                    ))
                }
            </div>
            <button
                onClick={() => {
                    socket.emit('CHATTING_CSS_REACTION_MESSAGE',{messageID: message._id, typeReaction: listEmoji[5].value});
                }}
                className={"emoji-item px-[5px] py-[2px]"}>
                <img className={"w-[20px] h-[20px]"} src={listEmoji[5].icon} alt={"-----"}/>
            </button>
        </div>
    )
}

export default ReactionActions;