import React, {createContext, FC, useCallback, useContext, useEffect, useMemo, useState} from "react";
import InputForMessage from "./Input";
import IconSendMessage from "assets/images/icons8-email-send-96.svg";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {v4 as uuidv4} from "uuid";
import {appendFakeMessageToConversation, updateFileProgressOnMessage} from "redux/reducer/messages/ListMessage";
import {useDispatch, useSelector} from "react-redux";
import {useUpload} from "services/hooks/useUpload";
import {convertToRaw, EditorState} from "draft-js";
import {
    MentionData
} from '@draft-js-plugins/mention';
import {modifyUploadedFilesV2} from "services/hooks/ppt/useUploadFile/upload.utils";
import ReplyChat from "./replyChat";
import {removeReplyMessage} from "redux/reducer/messages/ListMessage";
import {RootState} from "redux/reducer";
import SelectedActionGroup from "./SelectedActionGroup";
import {openPopupSendFiles} from "redux/reducer/messages/PopupSendImageAndFile"

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
    context: any
}
const ChattingInput:FC<Props> = ({chat, context}) => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const {socketRef} = useContext(context);
    const dispatch = useDispatch();
    const { addFileToUpload } = useUpload('CHATTING');

    const [doneUpload, setDoneUpload] = useState<{[key: string] : number}>({});
    const [willSendFileMessage, setWillSendFileMessage] = useState(null);
    const [realValue, setRealValue] = useState("");

    const suggestionsData = useCallback(() => {
        return chat.members.map(member=> {
            return {
                name: member.bizfullname||member.bizfullname,
                _id: member._id,
                avatar: `${process.env.REACT_APP_URL_S3_USER}/${member.image}`
            }
        });
    },[chat])

    const [suggestions, setSuggestions] = useState<MentionData[]>(suggestionsData());

    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    );
    const replyData =  useSelector((state: RootState) => state.listMessage.data.replyMessage[chat._id]);

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
        sendSocketMessage(chat._id,sendValue, usersTag, 0);
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
        dispatch(appendFakeMessageToConversation({
            conversationId: conversationID,
            messageId: message.tmpid,
            messageData: {
                ...message,
                _id: message.tmpid,
                parent: replyData
            }
        }));
        setTimeout(() => {
            scrollToBottom();
        }, 100)
        message['parentID'] = replyData?replyData._id:"";
        dispatch(removeReplyMessage({conversationId: chat._id}));
        socket.emit('CHATTING_CSS_SEND_MESSAGE', message);
        socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', { conversationID: chat._id, select: JSON.stringify({ sender:"bizfullname" }) });
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
        const data = {
            files: fileSend.map(file => {
                return {
                    file: {
                        file: {
                            fakeUrl: window.URL.createObjectURL(file.file),
                            url: window.URL.createObjectURL(file.file),
                            name: file.file.name,
                            size: file.file.size,
                            _id: uuidv4(),
                            type: file.file.type,
                            isDraft: true,
                        }
                    },
                    progress: 0,
                    _id: uuidv4(),
                    realFile: file.file,
                }
            }),
            sendType: Object.keys(files).length>0?"file":"image",
            defaultSendType: Object.keys(files).length>0?"file":"image",
            conversationID: chat._id,
            handleSendFile: (message: any, useCompress: boolean) => handleUploadFile(message, useCompress)
        }
        dispatch(openPopupSendFiles(data))
    }

    const handleUploadFile = async (message: any, useCompress = true) => {
        const uploadMap : {[key:string]: number} = {}
        message.files.forEach((file:any) => {
            uploadMap[file._id] = file.progress
        })
        setDoneUpload(uploadMap);
        dispatch(appendFakeMessageToConversation({
            conversationId: chat._id,
            messageId: message.tmpid,
            messageData: {
                ...message,
                _id: message.tmpid,
                parent: replyData,
                fileProgress: uploadMap
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
                    dispatch(updateFileProgressOnMessage({
                        conversationId: chat._id,
                        messageId: message.tmpid,
                        fileId: file._id,
                        progress: percentCompleted
                    }));
                    setDoneUpload(oldValue => {
                        return {
                            ...oldValue,
                            [file._id]: percentCompleted
                        }
                    })
                },
                compressConfig: {
                    useCompress: useCompress,
                    quality: 0.8
                }
            })
            sendFiles.push(_id)
        }

        sendMessage = {
            ...sendMessage,
            // _id: sendMessage.tmpid,
            files: sendFiles,
        }
        sendMessage['parentID'] = replyData?replyData._id:"";
        setWillSendFileMessage(sendMessage);
        dispatch(removeReplyMessage({conversationId: chat._id}));
    }

    useEffect(() => {
        const isDone = Object.values(doneUpload).length>0&&Object.values(doneUpload).every(progress => progress === 100);
        console.log("done upload: ", isDone)
        if (isDone&&willSendFileMessage) {
            // console.log(willSendFileMessage)
            setTimeout(() => {
                socket.emit('CHATTING_CSS_SEND_MESSAGE', willSendFileMessage);
                socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', { conversationID: chat._id, select: JSON.stringify({ sender:"bizfullname" }) });
                setDoneUpload({});
                setWillSendFileMessage(null);
            }, 200)
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

    useEffect(() => {
        const dropZone = document.getElementById("chatting-section");
        if (dropZone) {
            dropZone.addEventListener('dragover', function(e) {
                e.stopPropagation();
                e.preventDefault();
            });

            // Get file data on drop
            dropZone.addEventListener('drop', function(e) {
                e.stopPropagation();
                e.preventDefault();
                if (e.dataTransfer&&chat._id) {
                    handleSetFiles(e.dataTransfer.files);
                }
            });
        }
    },[])

    return (
        <ChattingInputContext.Provider value={value}>
            <div className={"w-full px-[20px] flex justify-center bg-transparent py-[10px] chatting-input-container"}>
                <div className={"w-full max-w-[585px] flex items-end justify-center relative"}>
                    <SelectedActionGroup/>
                    <div className={"flex-1 message-input max-w-[525px] rounded-md bg-white flex items-end relative flex-col"}>
                        {/*<IconButton/>*/}
                        <ReplyChat replyData={replyData}/>
                        <InputForMessage
                            onPasteFiles={(files) => handleSetFiles(files)}
                            onPressEnter={() => handleSendMessage()}
                            mentions={suggestionsData()}
                            handleUploadFiles={((files) => handleSetFiles(files))}
                        />
                    </div>
                    <button
                        onClick={() => handleSendMessage()}
                        className={"send-chat-button w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center ml-[10px]"}>
                        <img  src={IconSendMessage} alt={"send message"}/>
                    </button>
                </div>
            </div>
        </ChattingInputContext.Provider>
    )
}

export default ChattingInput;
