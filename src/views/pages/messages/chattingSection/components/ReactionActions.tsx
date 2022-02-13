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

    if (!message.reactions||message.reactions.length <=0) return null;
    return (
        <div ref={reactionWrapper} className={"absolute min-w-max emoji-group flex flex-col items-center z-10 bottom--16px right-55px "}>
            <div onClick={() => setShowReactionGroup(true)} className={"bg-white border border-gray-300 p-1 flex items-center justify-center rounded-full cursor-pointer"}>
                {
                    _map(arrayReaction(), reaction => (
                        <img key={listEmoji[reaction-1].id} src={listEmoji[reaction-1].icon} className={"w-[20px] h-[20px]"} alt={"-----"}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ReactionActions;