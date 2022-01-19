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
        const mentionPlugin = createMentionPlugin({
            mentionPrefix: '@',
        });
        // eslint-disable-next-line no-shadow
        const { MentionSuggestions } = mentionPlugin;
        // eslint-disable-next-line no-shadow
        const plugins = [mentionPlugin];
        return { plugins, MentionSuggestions };
    }, []);

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
