import React, {FC, ReactNode, useEffect, useRef} from "react";

import { useRightClickMenu } from "services/hooks/useRightClickMenu";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";

type Props = {
    contextMenu: ReactNode;
    customRenderTag?: string;
    [x:string]: any;
}

const RightClickMenuWrapper: FC <Props>= ({children, contextMenu, customRenderTag,...props}) => {
    const { closeRightClick, openRightClick} = useRightClickMenu();
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(wrapperRef, () => closeRightClick());

    useEffect(() => {
        wrapperRef.current&&wrapperRef.current.addEventListener("contextmenu", handleContextMenu);

        return () => {
            wrapperRef.current&&wrapperRef.current.removeEventListener("contextmenu", handleContextMenu);
        };
    },[wrapperRef]);

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
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

export default RightClickMenuWrapper;
