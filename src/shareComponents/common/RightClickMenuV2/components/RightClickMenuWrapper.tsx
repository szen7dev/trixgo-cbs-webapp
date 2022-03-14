import React, {FC, ReactNode, useEffect, useRef} from "react";
// import {openRightClick} from "redux/reducer/RightClickMenu";
// import {useDispatch} from "react-redux";
import {useRightClickMenu} from "services/hooks/useRightClickMenu";

type Props = {
    contextMenu: ReactNode;
    customRenderTag?: string;
    [x:string]: any;
}

export const RightClickMenuWrapper: FC <Props>= ({children, contextMenu, customRenderTag,...props}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { openRightClick} = useRightClickMenu();

    useEffect(() => {
        wrapperRef.current&&wrapperRef.current.addEventListener("contextmenu", handleContextMenu);

        return () => {
            wrapperRef.current&&wrapperRef.current.removeEventListener("contextmenu", handleContextMenu);
        };
    },[wrapperRef]);

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        if (props.disabled) return;
        openRightClick({
            content: contextMenu,
            x: e.x,
            y: e.y
        })
    };

    return React.createElement(
        customRenderTag??"div",
        {ref: wrapperRef, ...props},
        children
    );
};
