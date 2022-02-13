import React, {FC, useState} from "react";
import {map as _map} from "lodash";
import {listEmoji} from "./MainChatContent";
import likeIcon from "assets/images/icons8-facebook-like-48.svg";

export const ReactionActions:FC = () => {
    const [showReactionGroup, setShowReactionGroup] = useState(false);

    return (
        <div className={"absolute min-w-max emoji-group min-w-[100px] flex flex-col items-center z-10 bottom--16px right-55px opacity-0 invisible"}>
            {showReactionGroup&&
                <div
                    className={"reactions-group flex items-center mb-[5px] absolute min-w-max bg-white rounded-full border border-gray-300 p-2"}>
                    {
                        _map(listEmoji, emoji => (
                            <button key={emoji.id} className={"mr-[5px]"}>
                                <img src={emoji.icon} className={"w-[24px] h-[24px]"} alt={"-----"}/>
                            </button>
                        ))
                    }
                </div>
            }
            <div onClick={() => setShowReactionGroup(true)} className={"bg-white border border-gray-300 w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer"}>
                <img className={"w-[24px] h-[24px]"} src={likeIcon} alt={"-----"}/>
            </div>
        </div>
    )
}

export default ReactionActions;