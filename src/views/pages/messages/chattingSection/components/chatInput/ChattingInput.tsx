import React, {createContext, FC, useCallback, useContext, useEffect, useMemo, useState} from "react";
import IconButton from "./IconButton";
import IconAttach from "./IconAttach";
import InputForMessage from "./Input";
import IconSendMessage from "assets/images/icons8-email-send-96.svg";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {MessageContext} from "../../../home/index_v2";
import {map as _map} from "lodash";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {v4 as uuidv4} from "uuid";
import {appendMessageToConversation, updateNewMessageToConversation, appendFakeMessageToConversation} from "redux/reducer/messages/ListMessage";
import {useDispatch} from "react-redux";
import {useUpload} from "services/hooks/useUpload";
import {usePopupSendFiles} from "services/hooks/usePopupSendFiles";
import {convertToRaw, EditorState, ContentState} from "draft-js";
import {
    MentionData,
} from '@draft-js-plugins/mention';
import {modifyUploadedFilesV2} from "services/hooks/ppt/useUploadFile/upload.utils";
import {LazyLoadImage} from "react-lazy-load-image-component";

export const ChattingInputContext = createContext<{
    editorState: any;
    onChangeCallback: (editorState: any) => void;
    suggestions: MentionData[];
    setSuggestions: React.Dispatch<React.SetStateAction<MentionData[]>>;
}>({
    editorState: EditorState.createEmpty(),
    onChangeCallback: (editorState: any) => undefined,
    suggestions: [],
    setSuggestions: () => undefined
});

type Props = {
    chat: ItemListConversation;
}
const ChattingInput:FC<Props> = ({chat}) => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const {currentChat, socketRef} = useContext(MessageContext);
    const dispatch = useDispatch();
    const { addFileToUpload } = useUpload('CHATTING');
    const {openPopupSendFiles} = usePopupSendFiles();

    const [doneUpload, setDoneUpload] = useState<{_id: string; progress: number;}[]>([]);
    const [willSendFileMessage, setWillSendFileMessage] = useState(null);
    const [realValue, setRealValue] = useState("");
    const [suggestions, setSuggestions] = useState<MentionData[]>(chat.members.map(member=> {
        return {
            name: member.fullname,
            _id: member._id,
            avatar: `${process.env.REACT_APP_URL_S3_USER}/${member.image}`
        }
    }))

    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    const onChangeCallback = useCallback((editorState) => {
        setEditorState(editorState);
        // console.log(convertToRaw(editorState.getCurrentContent()).blocks)
        setRealValue(convertToRaw(editorState.getCurrentContent()).blocks.map((block:any) => {
            if (block.text==='') return '\n';
            return block.text;
        }).join(''))
    }, [editorState]);

    const value = useMemo(
        () => ({ editorState, onChangeCallback, suggestions, setSuggestions }),
        [editorState, onChangeCallback, suggestions, setSuggestions]
    );

    const socket = socketRef.current;

    const handleSendMessage = () => {
        let sendValue = removeTags(realValue).trim().replace(/^\s+|\s+$/g, '');
        const contentState = editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        const mentionedUsers = [];
        for (const key in raw.entityMap) {
            const ent = raw.entityMap[key];
            if (ent.type === "mention") {
                mentionedUsers.push(ent.data.mention);
            }
        }
        const usersTag :string[] = [];
        mentionedUsers.forEach(mention => {
            sendValue = sendValue.replace(`@${mention.name}`, `@[${mention.name}](${mention._id})`)
            usersTag.push(mention._id);
        })
        if (sendValue.length<=0) return;
        sendSocketMessage(currentChat,sendValue, usersTag, 0);
        setRealValue("");
        setEditorState(EditorState.createEmpty())
    }

    const sendSocketMessage = (conversationID: string, content: string, usersTag: string[], type: number) => {
        const message: any = {
            tmpid: uuidv4(),
            conversationID: conversationID,
            content: content,
            sender: {
                _id: profileId
            },
            type: type,
            usersTag: usersTag,
            createAt: new Date(),
        };
        // dispatch(appendMessageToConversation({
        dispatch(appendFakeMessageToConversation({
            conversationId: conversationID,
            messageId: message.tmpid,
            messageData: {
                ...message,
                _id: message.tmpid
            }
        }));
        setTimeout(() => {
            scrollToBottom();
        }, 100)
        socket.emit('CHATTING_CSS_SEND_MESSAGE', message);
        socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', { conversationID: currentChat });
    }

    const handleSetFiles = (filesUpload: FileList|Blob[]) => {

        // Modify file to with key with each file;
        const [files, images] = modifyUploadedFilesV2({
            imgLastKey: null,
            fileLastKey: null,
        }, filesUpload);

        const fileSend: any[] = [];

        Object.keys(files).forEach(key => {
            fileSend.push(files[key])
        });
        Object.keys(images).forEach(key => {
            fileSend.push(images[key]);
        })

        openPopupSendFiles({
            files: fileSend.map(file => {
                return {
                    file: {
                        file: {
                            url: window.URL.createObjectURL(file.file),
                            name: file.file.name,
                            size: file.file.size,
                            _id: uuidv4(),
                            type: file.file.type
                        }
                    },
                    progress: file.progress,
                    _id: uuidv4(),
                    realFile: file.file,
                }
            }),
            sendType: Object.keys(files).length>0?"file":"image",
            defaultSendType: Object.keys(files).length>0?"file":"image",
            conversationID: currentChat,
            handleSendFile: (message, useCompress) => handleUploadFile(message, useCompress)
        })
    }

    const handleUploadFile = async (message: any, useCompress = true) => {
        setDoneUpload(message.files.map((file:any) => {
            return {
                _id: file._id,
                progress: file.progress
            }
        }))
        // dispatch(appendMessageToConversation({
        dispatch(appendFakeMessageToConversation({
            conversationId: currentChat,
            messageId: message.tmpid,
            messageData: {
                ...message,
                _id: message.tmpid
            }
        }));
        setTimeout(() => {
            scrollToBottom();
        }, 100)

        let sendMessage : any = {...message};
        const sendFiles = [];
        for (const file of sendMessage.files) {
            const {_id} = await addFileToUpload({
                files: file.realFile,
                progress: percentCompleted => {
                    console.log(`${percentCompleted}% ${file.file.file.name}`);
                    setDoneUpload((oldValue: any) => oldValue.map((oldFile: any) => {
                        if (oldFile._id === file._id) {
                            return {
                                ...oldFile,
                                progress: percentCompleted
                            }
                        }
                        return {
                            ...oldFile
                        }
                    }))
                },
                compressConfig: {
                    useCompress: useCompress,
                    quality: 0.8
                }
            })
            console.log("fileId",_id)
            sendFiles.push(_id)
        }

        sendMessage = {
            ...sendMessage,
            // _id: sendMessage.tmpid,
            files: sendFiles
        }
        setWillSendFileMessage(sendMessage);
    }

    useEffect(() => {
        const isDone = doneUpload.length>0&&doneUpload.every(file => file.progress === 100);
        console.log("upload",isDone)
        if (isDone&&willSendFileMessage) {
            // console.log(willSendFileMessage)
            socket.emit('CHATTING_CSS_SEND_MESSAGE', willSendFileMessage);
            socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', { conversationID: currentChat });
            setDoneUpload([]);
            setWillSendFileMessage(null);
        }
    }, [willSendFileMessage, doneUpload])

    const scrollToBottom = () => {
        const conversationMessagesList = document.getElementById("conversation-messages-list");
        if (conversationMessagesList) {
            conversationMessagesList.scrollTo({top: conversationMessagesList.scrollHeight, behavior: "smooth" });
        }
    }

    const removeTags = (html:string) => {
        html = html.replace(/<br>/g, "\n");
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        html = tmp.textContent || tmp.innerText;
        return html;
    }

    return (
        <ChattingInputContext.Provider value={value}>
            <div className={"w-full px-[20px] flex justify-center bg-transparent py-[10px]"}>
                <div className={"w-full max-w-[645px] flex items-end justify-center relative"}>
                    <div className={"flex-1 message-input rounded-md bg-white flex items-end relative"}>
                        {/*<IconButton/>*/}
                        <InputForMessage
                            onPasteFiles={(files) => handleSetFiles(files)}
                            onPressEnter={() => handleSendMessage()}
                            mentions={chat.members.map(member=> {
                                return {
                                    name: member.fullname,
                                    _id: member._id,
                                    avatar: `${process.env.REACT_APP_URL_S3_USER}/${member.image}`
                                }
                            })}
                        />
                        <IconAttach
                            handleUploadFiles={(files) => handleSetFiles(files)}
                        />
                    </div>
                    <button
                        onClick={() => handleSendMessage()}
                        className={"w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center ml-[10px]"}>
                        <LazyLoadImage effect="blur" src={IconSendMessage} alt={"send message"}/>
                    </button>
                </div>
            </div>
        </ChattingInputContext.Provider>
    )
}

export default ChattingInput;
