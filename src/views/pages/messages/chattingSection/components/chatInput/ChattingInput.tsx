import React, {FC} from "react";
import IconButton from "./IconButton";
import IconAttach from "./IconAttach";
import InputForMessage from "./Input";
import IconSendMessage from "assets/images/icons8-email-send-96.svg";
const ChattingInput:FC = () => {
    return (
        <div className={"min-w-full max-w-[645px] px-[20px] flex items-end justify-center absolute bottom-21px inset-x-0 z-5"}>
            <div className={"flex-1 rounded-md bg-white flex items-end"}>
                <IconButton/>
                <InputForMessage/>
                <IconAttach/>
            </div>
            <button className={"w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center ml-[10px]"}>
                <img src={IconSendMessage} alt={"send message"}/>
            </button>
        </div>
    )
}

export default ChattingInput;
