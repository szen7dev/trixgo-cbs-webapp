import React, {FC, useContext, useState} from "react";
import IconButton from "./IconButton";
import IconAttach from "./IconAttach";
import InputForMessage from "./Input";
import IconSendMessage from "assets/images/icons8-email-send-96.svg";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {MessageContext} from "../../../home/index_v2";
import {map as _map} from "lodash";

type Props = {
    chat: ItemListConversation;
}
const ChattingInput:FC<Props> = ({chat}) => {
    const currentUser = localStorage.getItem("currentUser")??"";
    const profileId = JSON.parse(currentUser)?._id;
    const {currentChat} = useContext(MessageContext);
    const [inputText, setInputText] = useState("");
    const [realValue, setRealValue] = useState("");
    const [showMention, setShowMention] = useState({
        show: false,
        mentionValue: ""
    });

    const handleInput = (value: string) => {
        setRealValue(value);
        setInputText(value);
        if (value.match(/[@][a-zA-Z]?/g)) {
            const matchValue = value.match(/[@][a-zA-Z]+/g);
            setShowMention({show: true, mentionValue: matchValue?matchValue[0].replaceAll("@",""):""})
        } else {
            setShowMention({show: false, mentionValue: ""});
        }
    }

    const setMention = (member: any) => {
        const newRealValue = `@[${member.fullname}](${member._id}) `;
        setRealValue(realValue.replaceAll(/[@][a-zA-Z]?/g, newRealValue));
        const newInputText = `<a class="text-primary" href=${member._id}>@${member.fullname}</a> `;
        setInputText(inputText.replaceAll(/[@][a-zA-Z]?/g, newInputText));
        setShowMention({show: false, mentionValue: ""})
    }

    return (
        <div className={"w-full px-[20px] flex justify-center bg-transparent py-[10px]"}>
            <div className={"w-full max-w-[645px] flex items-end justify-center relative"}>
                {
                    showMention.show&&
                    <div
                        className={"absolute bg-white bottom-60px left-0 rounded-lg min-w-[421px] max-w-[421px] max-h-[242px]"}>
                        {
                            _map(chat.members.filter(mem => mem.fullname.includes(showMention.mentionValue)), member => (
                                <div
                                    onClick={() => setMention(member)}
                                    key={member._id} className={"hover:bg-gray-300 py-[10px] px-[15px] flex items-center"}>
                                    <img src={`${process.env.REACT_APP_URL_S3_USER}/${member.image}`} alt={"----"}
                                         className={"w-[30px] h-[30px] rounded-full overflow-hidden object-cover"}/>
                                    <div className={"flex-1 ml-1"}>
                                        {member.fullname}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
                <div className={"flex-1 rounded-md bg-white flex items-end"}>
                    <IconButton/>
                    <InputForMessage onChange={(target) => handleInput(target.innerText)} html={inputText}/>
                    <IconAttach/>
                </div>
                <button className={"w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center ml-[10px]"}>
                    <img src={IconSendMessage} alt={"send message"}/>
                </button>
            </div>
        </div>
    )
}

export default ChattingInput;
