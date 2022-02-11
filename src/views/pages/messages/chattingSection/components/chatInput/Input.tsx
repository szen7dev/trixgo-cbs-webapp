import React, {FC, useState, useCallback, useMemo, useContext, useRef, useEffect} from "react";
import {getDefaultKeyBinding, DraftHandleValue} from "draft-js"
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
    defaultSuggestionsFilter,
    MentionData,
} from '@draft-js-plugins/mention';

import "@draft-js-plugins/mention/lib/plugin.css";
import '@draft-js-plugins/focus/lib/plugin.css';
import {ChattingInputContext} from "./ChattingInput";
import createEmojiPlugin,{defaultTheme } from '@draft-js-plugins/emoji';
import createFocusPlugin from '@draft-js-plugins/focus';
import IconButton from "./IconButton";
import {ItemMessage} from "typings/apis/messages/listMessage";
// import editorStyles from './editorStyles.module.css';

defaultTheme.emojiSelectPopover = defaultTheme.emojiSelectPopover + " bottom-70px left-0";
defaultTheme.emojiSuggestionsEntry = defaultTheme.emojiSuggestionsEntry + " flex items-center";
defaultTheme.emojiSuggestionsEntryFocused = defaultTheme.emojiSuggestionsEntryFocused + " flex items-center";
defaultTheme.emojiSelectButton = defaultTheme.emojiSelectButton + " border-0 h-full";
defaultTheme.emojiSelectButtonPressed = defaultTheme.emojiSelectButtonPressed + " border-0 h-full";
defaultTheme.emojiSelectPopoverEntry = defaultTheme.emojiSelectPopoverEntry + " flex items-center justify-center";
defaultTheme.emojiSelectPopoverEntryFocused = defaultTheme.emojiSelectPopoverEntryFocused + " flex items-center justify-center";

type Props = {
    onPressEnter?: () => void;
    onPasteFiles?: (files: FileList|Blob[]) => void;
    mentions: MentionData[];
    replyData: ItemMessage;
}
const InputForMessage:FC<Props> = ({onPressEnter, onPasteFiles, mentions, replyData }) => {
    const {editorState, onChangeCallback, setSuggestions} = useContext(ChattingInputContext);
    const [open, setOpen] = useState(true);
    const editor = useRef<Editor>(null);

    const { MentionSuggestions, plugins , EmojiSuggestions, EmojiSelect } = useMemo(() => {
        const mentionPlugin = createMentionPlugin({
            mentionPrefix: '@',
        });
        // eslint-disable-next-line no-shadow
        const { MentionSuggestions } = mentionPlugin;
        // eslint-disable-next-line no-shadow

        const emojiPlugin = createEmojiPlugin({
            theme : defaultTheme,
            positionSuggestions: (settings) => {
                return {
                    left: 0,
                    top: '-30px', // change this value (40) for manage the distance between cursor and bottom edge of popover
                    display: 'block',
                    transform: 'scale(1) translateY(-100%)', // transition popover on the value of its height
                    transformOrigin: '1em 0% 0px',
                    transition: 'all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1)'
                };
            },
            selectButtonContent: <IconButton/>
        });
        const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
        const focusPlugin = createFocusPlugin();
        const plugins = [mentionPlugin, emojiPlugin, focusPlugin];
        return { plugins, MentionSuggestions, EmojiSuggestions, EmojiSelect };
    }, []);

    useEffect(() => {
        editor&&editor.current&&editor.current.focus()
    }, [replyData])

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
            <EmojiSelect />
            <Editor
                editorState={editorState}
                onChange={onChangeCallback}
                plugins={plugins}
                keyBindingFn={myKeyBindingFn}
                handleKeyCommand={handleKeyCommand}
                handlePastedFiles={handlePastedFiles}
                ref={editor}
            />
            <MentionSuggestions
                open={open}
                onOpenChange={onOpenChange}
                onSearchChange={onSearchChange}
                suggestions={mentions}
                // entryComponent={Entry}
            />
            <EmojiSuggestions />
        </>
    )
}
export default InputForMessage
