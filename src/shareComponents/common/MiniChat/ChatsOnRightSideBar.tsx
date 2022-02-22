import React, {createContext, FC, useMemo, useState} from "react";
import {MiniChatbox,MiniChatGroup} from "./components";
import Editor from "@draft-js-plugins/editor";
import {useSocket} from "services/hooks/useSocket";

export const MiniChatContext = createContext<{
    socketRef: any;
    editorRef: any;
    setEditorRef: React.Dispatch<React.SetStateAction<any>>;
}>({
    socketRef: null,
    editorRef: null,
    setEditorRef: () => undefined,
});

export const ChatsOnRightSideBar:FC = () => {
    const [editorRef, setEditorRef] = useState<Editor>();
    const socketRef = useSocket();

    const value = useMemo(
        () => ({ socketRef, editorRef, setEditorRef}),
        [socketRef, editorRef]
    );

    return (
        <MiniChatContext.Provider value={value}>
            <MiniChatGroup/>
            <MiniChatbox />
        </MiniChatContext.Provider>
    )
}