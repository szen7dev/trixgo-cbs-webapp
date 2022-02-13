import React, {FC, useCallback, useContext, useRef, useState} from "react";
import {map as _map} from "lodash";
import {listEmoji} from "./MainChatContent";
import likeIcon from "assets/images/icons8-facebook-like-48.svg";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import {MessageContext} from "../../home/index_v2";
type Props = {
    message: ItemMessage
}
export const ReactionActions:FC<Props> = ({message}) => {
    const {socketRef} = useContext(MessageContext);
    const socket = socketRef.current;

    const [showReactionGroup, setShowReactionGroup] = useState(false);
    const reactionWrapper = useRef<HTMLDivElement>(null)
    useOnClickOutside(reactionWrapper, () => setShowReactionGroup(false))
    const arrayReaction = useCallback(() => {
        if (!message.reactions) return [];
        const uniqueChars : number[] = [];
        message.reactions.forEach((c) => {
            if (!uniqueChars.includes(c.type)) {
                uniqueChars.push(c.type);
            }
        });
        return uniqueChars;

    }, [message])
    return (
        <div ref={reactionWrapper} className={"absolute min-w-max emoji-group flex flex-col items-center z-10 bottom--16px right-55px " + ((message.reactions&&message.reactions.length>0) ? "" : "opacity-0 invisible")}>
            {showReactionGroup&&
                <div
                    className={"reactions-group flex items-center mb-[5px] absolute min-w-max bg-white rounded-full border border-gray-300 p-2"}>
                    {
                        _map(listEmoji, emoji => (
                            <button
                                onClick={() => {
                                    socket.emit('CHATTING_CSS_REACTION_MESSAGE',{messageID: message._id, typeReaction: emoji.value});
                                    setShowReactionGroup(false);
                                }}
                                key={emoji.id} className={"mr-[5px]"}>
                                <img src={emoji.icon} className={"w-[24px] h-[24px]"} alt={"-----"}/>
                            </button>
                        ))
                    }
                </div>
            }
            <div onClick={() => setShowReactionGroup(true)} className={"bg-white border border-gray-300 p-1 flex items-center justify-center rounded-full cursor-pointer"}>
                {
                    (!message.reactions||message.reactions.length <=0) ?
                    <img className={"w-[24px] h-[24px]"} src={likeIcon} alt={"-----"}/> :
                    _map(arrayReaction(), reaction => (
                        <img src={listEmoji[reaction-1].icon} className={"w-[20px] h-[20px]"} alt={"-----"}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ReactionActions;