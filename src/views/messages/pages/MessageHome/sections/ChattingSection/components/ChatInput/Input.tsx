import React, {FC, useState, useCallback, useMemo, useContext, useRef, useEffect} from "react";
import {getDefaultKeyBinding, DraftHandleValue} from "draft-js"
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin from '@draft-js-plugins/mention';
import {defaultTheme as defaultThemeMentions} from "@draft-js-plugins/mention";
import "@draft-js-plugins/mention/lib/plugin.css";
import '@draft-js-plugins/focus/lib/plugin.css';
import {ChattingInputContext} from "./ChattingInput";
import createEmojiPlugin  from 'draft-js-emoji-plugin';
import {defaultTheme}  from '@draft-js-plugins/emoji';
import createFocusPlugin from '@draft-js-plugins/focus';
import {IconButton} from "./IconButton";
import {IconAttach} from "./IconAttach";
import {UseInformationMessage} from "services/hooks/messages/useInformationMessage";
// import editorStyles from './editorStyles.module.css';

defaultTheme.emojiSelectPopover = defaultTheme.emojiSelectPopover + " bottom-60px left-0 shadow-md rounded-md border-0";
defaultTheme.emojiSelectButton = defaultTheme.emojiSelectButton + " border-0 h-full";
defaultTheme.emojiSelectButtonPressed = defaultTheme.emojiSelectButtonPressed + " border-0 h-full";
defaultTheme.emojiSelectPopoverEntry = defaultTheme.emojiSelectPopoverEntry + " flex items-center justify-center";
defaultTheme.emojiSelectPopoverEntryFocused = defaultTheme.emojiSelectPopoverEntryFocused + " flex items-center justify-center";

defaultTheme.emojiSuggestions = defaultTheme.emojiSuggestions + " shadow-md rounded-md border-0";
defaultTheme.emojiSuggestionsEntry = defaultTheme.emojiSuggestionsEntry + " flex items-center";
defaultTheme.emojiSuggestionsEntryFocused = defaultTheme.emojiSuggestionsEntryFocused + " flex items-center";

defaultThemeMentions.mentionSuggestionsPopup = defaultThemeMentions.mentionSuggestionsPopup + " shadow-md border-0 rounded-md";
defaultThemeMentions.mention = defaultThemeMentions.mention + " bg-primary bg-opacity-25 text-black";
type Props = {
    onPressEnter?: () => void;
    onPasteFiles?: (files: FileList|Blob[]) => void;
    handleUploadFiles: (files: FileList|Blob[]) => void;
    context: any
}
export const InputForMessage:FC<Props> = ({onPressEnter, onPasteFiles, handleUploadFiles, context }) => {
    const {editorState, onChangeCallback} = useContext(ChattingInputContext);
    const [open, setOpen] = useState(false);
    const editor = useRef<Editor>(null);
    const {setEditorRef, currentChat} = useContext(context)

    const [searchMember, setSearchMember] = useState("");
    const params = {conversationID: currentChat, type: "member", populates: JSON.stringify({"path": "addedBy member", "select": "_id bizfullname image"}), keyword: searchMember};
    const {listMembersMessage} = UseInformationMessage(params, open&&searchMember.length>0, "members");
    const mentions = listMembersMessage.map(user => {
        return {
            _id: user?.member?._id,
            name: user?.member?.bizfullname,
            avatar: `${process.env.REACT_APP_URL_S3_USER}/${user?.member?.image}`
        }
    });

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
        if(editor&&editor.current) {
            setEditorRef(editor)
        }
    }, [editor])

    const onOpenChange = useCallback((_open: boolean) => {
        setOpen(_open);
    }, []);

    const onSearchChange = useCallback(({ value }: { value: string }) => {
        setSearchMember(value)
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
        <div className={"flex w-full"}>
            <EmojiSelect />
            <div className={"flex-1 flex input-wrapper"}>
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
                <IconAttach
                    handleUploadFiles={(files) => handleUploadFiles(files)}
                />
            </div>
        </div>
    )
}
