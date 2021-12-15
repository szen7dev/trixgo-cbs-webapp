import React, {FC, useContext} from "react";
type Props = {
    collapsed: boolean;
}
const CollapseButton:FC<Props> = ({collapsed}) => {
    return (
        <button className={
            "rounded mb-1 block w-5 h-5 " +
            ((collapsed)?"bg-gray-600":"bg-white text-gray-600")
        }>
            {(collapsed)?"+":"-"}
        </button>
    )
}

export default CollapseButton;
