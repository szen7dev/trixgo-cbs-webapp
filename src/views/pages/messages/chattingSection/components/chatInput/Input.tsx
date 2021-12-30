import React, {FC} from "react";

const InputForMessage:FC = () => {
    return (
        <div contentEditable={"true"} className={"flex-1 max-w-full min-h-[50px] max-h-26 focus:outline-none py-[15px] whitespace-pre-wrap transition duration-150"} placeholder={"Message"}/>
    )
}
export default InputForMessage
