import React, {FC} from "react";
import IconLaugh from "assets/images/icons8-laugh-64.svg";
const IconButton:FC = () => {

    return <div className={"flex items-center justify-center p-[13px] h-full"}>
        <img src={IconLaugh} alt={"icon list"}/>
    </div>
}

export default IconButton;
