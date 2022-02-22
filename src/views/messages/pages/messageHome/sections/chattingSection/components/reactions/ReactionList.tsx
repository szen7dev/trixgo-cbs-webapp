import React, {FC, useCallback, useRef, useState} from "react";
import {map as _map} from "lodash";
import {listEmoji} from "../mainChatContent/MainChatContent";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import {ReactionDetails} from "./ReactionDetails";
type Props = {
    message: ItemMessage
}
export const ReactionList:FC<Props> = ({message}) => {
    const [showReactionGroup, setShowReactionGroup] = useState(false);
    const reactionWrapper = useRef<HTMLDivElement>(null)
    useOnClickOutside(reactionWrapper, () => setShowReactionGroup(false))
    const arrayReaction = useCallback(() => {
        if (!message.reactions) return [];
        const uniqueChars : {[key: string]: { icon: string; number: number } } = {};
        listEmoji.forEach(emoji => {
            uniqueChars[`emoji_${emoji.id}`] = {
                icon: emoji.icon,
                number: 0
            };
        })
        message.reactions.forEach((c) => {
            uniqueChars[`emoji_${c.type}`].number ++;
        });
        return uniqueChars;

    }, [message])

    if (!message.reactions||message.reactions.length <=0) return null;
    return (
        <div ref={reactionWrapper} className={"emoji-group flex flex-col items-center "}>
            <div onClick={() => setShowReactionGroup(true)} className={"flex items-center justify-center cursor-pointer"}>
                {
                    _map(Object.values(arrayReaction()).filter(reaction => reaction.number > 0), (reaction, index) => (
                        <div key={index} className={"flex h-[22px] items-center justify-center bg-white border border-gray-300 p-1 rounded-full"}>
                            <img src={reaction.icon} className={"w-[12px] h-[12px] min-w-[12px] min-h-[12px]"} alt={"-----"}/>
                            {reaction.number>1&&<span className={"text-xs"}>{reaction.number}</span>}
                        </div>
                    ))
                }
            </div>
            <ReactionDetails message={message} isOpen={showReactionGroup} setCloseVote={() => setShowReactionGroup(false)}/>
        </div>
    )
}