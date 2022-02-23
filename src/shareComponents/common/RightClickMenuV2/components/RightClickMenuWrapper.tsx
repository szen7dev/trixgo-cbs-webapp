import React, {FC, ReactNode, useEffect, useRef} from "react";
import {openRightClick} from "redux/reducer/RightClickMenu";
import {useDispatch} from "react-redux";

type Props = {
    contextMenu: ReactNode;
    customRenderTag?: string;
    [x:string]: any;
}

export const RightClickMenuWrapper: FC <Props>= ({children, contextMenu, customRenderTag,...props}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        wrapperRef.current&&wrapperRef.current.addEventListener("contextmenu", handleContextMenu);

        return () => {
            wrapperRef.current&&wrapperRef.current.removeEventListener("contextmenu", handleContextMenu);
        };
    },[wrapperRef]);

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(openRightClick({
            content: contextMenu,
            x: e.x,
            y: e.y
        }))
    };

    return React.createElement(
        customRenderTag??"div",
        {ref: wrapperRef, ...props},
        children
    );
};
