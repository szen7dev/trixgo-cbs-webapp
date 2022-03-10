import React, {FC, useContext} from "react";
import {map as _map} from "lodash";
import {listEmoji} from "../MainChatContent/MainChatContent";
import {ItemMessage} from "typings/apis/messages/listMessage";
type Props = {
    message: ItemMessage;
    context: any
}
export const ReactionActions:FC<Props> = ({message, context}) => {
    const {socketRef} = useContext(context);
    const socket = socketRef.current;

    if (message.isFake) return null;
    return (
        <div className={"absolute emoji-action flex flex-col items-center z-10 w-fit shadow-lg rounded-full bg-white opacity-0 invisible"}>
            <div className={"flex flex-col h-0 opacity-0 invisible other-emojis"}>
                {
                    _map(listEmoji.filter(emoji => emoji.id !== 1).reverse(), emoji => (
                        <button
                            key={emoji.id}
                            onClick={() => {
                                socket.emit('CHATTING_CSS_REACTION_MESSAGE',{messageID: message._id, typeReaction: emoji.value, select: JSON.stringify({reactions: {userCreate:"bizfullname"}})});
                            }}
                            className={"emoji-item px-[5px] py-[2px]"}>
                            <img className={"w-[20px] h-[20px]"} src={emoji.icon} alt={"-----"}/>
                        </button>
                    ))
                }
            </div>
            <button
                onClick={() => {
                    socket.emit('CHATTING_CSS_REACTION_MESSAGE',{messageID: message._id, typeReaction: listEmoji[0].value, select: JSON.stringify({reactions: {userCreate:"bizfullname"}})});
                }}
                className={"emoji-item px-[5px] py-[2px]"}>
                <img className={"w-[20px] h-[20px]"} src={listEmoji[0].icon} alt={"-----"}/>
            </button>
        </div>
    )
}