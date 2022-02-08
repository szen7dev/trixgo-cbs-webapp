import React, {FC, ReactNode, useEffect, useRef} from "react";

import { useRightClickMenu } from "services/hooks/useRightClickMenu";

type Props = {
    contextMenu: ReactNode;
    customRenderTag?: string;
    [x:string]: any;
}

const RightClickMenuWrapper: FC <Props>= ({children, contextMenu, customRenderTag,...props}) => {
    const { openRightClick} = useRightClickMenu();
    const wrapperRef = useRef<HTMLDivElement>(null);

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
