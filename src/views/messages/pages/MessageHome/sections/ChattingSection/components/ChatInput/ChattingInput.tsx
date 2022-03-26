import React, {createContext, FC, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {InputForMessage} from "./Input";
import IconSendMessage from "assets/images/icons8-email-send-96.svg";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {v4 as uuidv4} from "uuid";
import {appendFakeMessageToConversation, updateFileProgressOnMessage} from "redux/reducer/messages/ListMessage";
import {useDispatch, useSelector} from "react-redux";
import {useUpload} from "services/hooks/useUpload";
import {convertToRaw, EditorState} from "draft-js";
import {modifyUploadedFilesV2} from "services/hooks/useUploadFile/upload.utils";
import {ReplyChat} from "./ReplyChat";
import {removeReplyMessage} from "redux/reducer/messages/ListMessage";
import {RootState} from "redux/reducer";
import {SelectedActionGroup} from "./SelectedActionGroup";
import {openPopupSendFiles} from "redux/reducer/messages/PopupSendImageAndFile"
import {dismissSearchMode} from "redux/reducer/messages/SearchMessage";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";

export const ChattingInputContext = createContext<{
    editorState: any;
    onChangeCallback: (editorState: any) => void;
}>({
    editorState: EditorState.createEmpty(),
    onChangeCallback: (editorState: any) => undefined,
});

type Props = {
    chat: ItemListConversation;
    context: any
}
export const ChattingInput:FC<Props> = ({chat, context}) => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const {socketRef, setShowSearch} = useContext(context);
    const dispatch = useDispatch();
    const { addFileToUpload } = useUpload({
        appID: "5dfe4c1b51dc622100bb9d8f",
		companyID: chat.company,
        conversationID: chat._id
    });

    const [doneUpload, setDoneUpload] = useState<{[key: string] : number}>({});
    const [willSendFileMessage, setWillSendFileMessage] = useState(null);
    const [realValue, setRealValue] = useState("");

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
        () => ({ editorState, onChangeCallback}),
        [editorState, onChangeCallback]
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
                parent: replyData,
                noAnimation: true
            }
        }));
        setTimeout(() => {
            scrollToBottom();
        }, 100)
        message['parentID'] = replyData?replyData._id:"";
        dispatch(removeReplyMessage({conversationId: chat._id}));
        dispatch(dismissSearchMode({conversationId: chat._id}));
        setShowSearch&&setShowSearch(false);
        socket.emit('CHATTING_CSS_SEND_MESSAGE', message);
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
                            // fakeUrl: window.URL.createObjectURL(file.file),
                            // url: window.URL.createObjectURL(file.file),
                            // name: file.file.name,
                            // size: file.file.size,
                            // _id: uuidv4(),
                            // type: file.file.type,
                            // isDraft: true,
                        },
                        fakeUrl: window.URL.createObjectURL(file.file),
                        url: window.URL.createObjectURL(file.file),
                        name: file.file.name,
                        size: file.file.size,
                        _id: uuidv4(),
                        type: file.file.type,
                        isDraft: true,
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
        const uploadMap : {[key:string]: number} = {};
        const replyDataBk = replyData;
        message.files.forEach((file:any) => {
            uploadMap[file._id] = file.progress
        })
        setDoneUpload(uploadMap);
        dispatch(removeReplyMessage({conversationId: chat._id}));
        dispatch(dismissSearchMode({conversationId: chat._id}));
        dispatch(appendFakeMessageToConversation({
            conversationId: chat._id,
            messageId: message.tmpid,
            messageData: {
                ...message,
                _id: message.tmpid,
                parent: replyDataBk,
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
				fileType: 1,
                progress: percentCompleted => {
                    // console.log(`${percentCompleted}% ${file.file.file.name}`);
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
                useCompress
            })
            sendFiles.push({"_id":_id,"name":file.file.name})
        }

        sendMessage = {
            ...sendMessage,
            // _id: sendMessage.tmpid,
            files: sendFiles,
        }
        sendMessage['parentID'] = replyDataBk?replyDataBk._id:"";
        setWillSendFileMessage(sendMessage);
        setShowSearch&&setShowSearch(false);
    }

    useEffect(() => {
        const isDone = Object.values(doneUpload).length>0&&Object.values(doneUpload).every(progress => progress === 100);
        // console.log("done upload: ", isDone)
        if (isDone&&willSendFileMessage) {
            // console.log(willSendFileMessage)
            setTimeout(() => {
                socket.emit('CHATTING_CSS_SEND_MESSAGE', willSendFileMessage);
                setDoneUpload({});
                setWillSendFileMessage(null);
            }, 200)
        }
    }, [willSendFileMessage, doneUpload])

    const scrollToBottom = () => {
        const conversationMessagesList = document.getElementById("conversation-messages-MessageList");
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
    },[chat._id])

    const {hasPermission} = UseMessageHelper();
    if (!hasPermission(chat, profileId, "configSendMessage")) return null;
    return (
        <ChattingInputContext.Provider value={value}>
            <div className={"w-full px-[20px] flex justify-center bg-transparent py-[10px] chatting-input-container"}>
                <div className={"w-full max-w-[585px] flex items-end justify-center relative"}>
                    <SelectedActionGroup/>
                    <div className={"flex-1 message-input max-w-[525px] rounded-md bg-white flex items-end relative flex-col"}>
                        {/*<IconButton/>*/}
                        <ReplyChat replyData={replyData} currentChat={chat._id}/>
                        <InputForMessage
                            onPasteFiles={(files) => handleSetFiles(files)}
                            onPressEnter={() => handleSendMessage()}
                            handleUploadFiles={((files) => handleSetFiles(files))}
                            context={context}
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
