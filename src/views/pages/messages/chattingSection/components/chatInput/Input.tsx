import React, {FC, useEffect, useRef, useState, useCallback, useMemo, useContext, ReactElement} from "react";
import {v4 as uuidv4} from "uuid";
import {getDefaultKeyBinding, DraftHandleValue} from "draft-js"
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
    defaultSuggestionsFilter,
    MentionData,
} from '@draft-js-plugins/mention';

import "@draft-js-plugins/mention/lib/plugin.css";
import {ChattingInputContext} from "./ChattingInput";

type Props = {
    onPressEnter?: () => void;
    onPasteFiles?: (files: FileList|Blob[]) => void;
    mentions: MentionData[]
}
const InputForMessage:FC<Props> = ({onPressEnter, onPasteFiles, mentions}) => {
    const {editorState, onChangeCallback, suggestions, setSuggestions} = useContext(ChattingInputContext);
    const [open, setOpen] = useState(true);

    const { MentionSuggestions, plugins } = useMemo(() => {
        const mentionPlugin = createMentionPlugin();
        // eslint-disable-next-line no-shadow
        const { MentionSuggestions } = mentionPlugin;
        // eslint-disable-next-line no-shadow
        const plugins = [mentionPlugin];
        return { plugins, MentionSuggestions };
    }, []);

    const inputRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (inputRef.current) {
    //         inputRef.current.addEventListener('keydown', (event) => {
    //             if (event.shiftKey && event.keyCode === 13) {
    //                 setKeyCode(-99);
    //                 event.preventDefault();
    //             }
    //             else if (event.keyCode===13) {
    //                 setKeyCode(event.keyCode)
    //                 event.preventDefault();
    //             }
    //             else {
    //                 setKeyCode(0)
    //             }
    //         });
    //
    //         inputRef.current.addEventListener("paste", (evt) => {
    //             const dT = evt.clipboardData;
    //             const file = dT?.files[ 0 ];
    //             if (file) {
    //                 setAddFile(file)
    //                 evt.stopPropagation();
    //                 evt.preventDefault();
    //             } else {
    //                 setAddFile(undefined)
    //             }
    //         });
    //     }
    // },[])
    //
    // useEffect(() => {
    //     if (keyCode === 13) {
    //         onPressEnter&&onPressEnter()
    //     }
    //     if (keyCode === -99 && inputRef.current) {
    //         const linebreak = document.createElement("br");
    //         inputRef.current.appendChild(linebreak);
    //     }
    // },[keyCode,inputRef]);
    //
    // useEffect(() => {
    //     if (addFile) {
    //         onPasteImage&&onPasteImage(addFile);
    //         setAddFile(undefined);
    //     }
    // },[addFile?.size])

    // return (
    //     <div
    //         ref={inputRef}
    //         contentEditable={"true"}
    //         className={"flex-1 max-w-full min-h-[50px] max-h-26 focus:outline-none py-[15px] whitespace-pre-wrap transition duration-150"}
    //         placeholder={"Message"}
    //         onInput={() => onChange(inputRef?.current)}
    //     />
    // )
    const onOpenChange = useCallback((_open: boolean) => {
        setOpen(_open);
    }, []);

    const onSearchChange = useCallback(({ value }: { value: string }) => {
        setSuggestions(defaultSuggestionsFilter(value, mentions));
    }, []);

    const myKeyBindingFn = (e: any): string | null => {
        if (e.shiftKey && e.keyCode === 13) {
            return getDefaultKeyBinding(e);
        }
        if (e.keyCode === 13) {
            return 'submit';
        }
        return getDefaultKeyBinding(e);
    }

    const handleKeyCommand = (command: string): DraftHandleValue => {
        if (command === 'submit') {
            onPressEnter&&onPressEnter();
        }
        return 'not-handled';
    }

    const handlePastedFiles = (files: Blob[]) : DraftHandleValue => {
        onPasteFiles&&onPasteFiles(files);
        return 'not-handled';
    }

    return (
        <>
            <Editor
                editorState={editorState}
                onChange={onChangeCallback}
                plugins={plugins}
                keyBindingFn={myKeyBindingFn}
                handleKeyCommand={handleKeyCommand}
                handlePastedFiles={handlePastedFiles}
            />
            <MentionSuggestions
                open={open}
                onOpenChange={onOpenChange}
                onSearchChange={onSearchChange}
                suggestions={suggestions}
                // entryComponent={Entry}
            />
        </>
    )
}
export default InputForMessage
