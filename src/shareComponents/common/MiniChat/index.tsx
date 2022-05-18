import React, {createContext, FC, useMemo, useState} from "react";
import {MiniChatbox,MiniChatGroup} from "./components";
import Editor from "@draft-js-plugins/editor";
import {useSocket} from "services/hooks/useSocket";

export const MiniChatContext = createContext<{
    socketRef: any;
    editorRef: any;
    setEditorRef: React.Dispatch<React.SetStateAction<any>>;
    isDragOver: boolean;
    setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    socketRef: null,
    editorRef: null,
    setEditorRef: () => undefined,
    isDragOver: false,
    setIsDragOver: () => undefined
});

export const ChatsOnRightSideBar:FC = () => {
    const [editorRef, setEditorRef] = useState<Editor>();
    const socketRef = useSocket();
    const [isDragOver, setIsDragOver] = useState(false);

    const value = useMemo(
        () => ({ socketRef, editorRef, setEditorRef, isDragOver, setIsDragOver}),
        [socketRef, editorRef, isDragOver]
    );

    return (
        <MiniChatContext.Provider value={value}>
            <MiniChatGroup/>
            <MiniChatbox />
        </MiniChatContext.Provider>
    )
}