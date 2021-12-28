import React, {FC} from "react";
import IconLaugh from "assets/images/icons8-laugh-64.svg";
const IconButton:FC = () => {

    return <button className={"flex items-center justify-center p-[13px]"}>
        <img src={IconLaugh} alt={"icon list"}/>
    </button>
}

export default IconButton;
