import React, {FC} from "react";
import attachIcon from "assets/images/icons8-attach-96.svg";

const IconAttach:FC = () => {
    return (
        <button className={"flex items-center justify-center p-[13px]"}>
            <img src={attachIcon} alt={"icon attach"}/>
        </button>
    )
}

export default IconAttach;
