import React, {FC, useContext, useEffect, useRef, useState} from "react";
import attachIcon from "assets/images/icons8-attach-96.svg";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import ImagesIcon from "assets/images/icons8-photo-gallery-96.svg";
import FileIcon from "assets/images/icons8-attach-96.png";
import FolderIcon from "assets/images/icons8-add-folder-96.svg"
import {usePopupSendFiles} from "services/hooks/usePopupSendFiles";
import {modifyUploadedFilesV2} from "../../../../media/context/upload.utils";
import {v4 as uuidv4} from "uuid";
import {MessageContext} from "../../../home/index_v2";
import {useUpload} from "services/hooks/useUpload";
import {
    appendFakeMessageToConversation,
    appendMessageToConversation,
    updateFileProgressOnMessage,
} from "redux/reducer/messages/ListMessage";
import {useDispatch} from "react-redux";

type Props = {
    currentChat: string;
    scrollToBottom: () => void
}

const IconAttach:FC<Props> = ({currentChat,scrollToBottom}) => {
    const [showOption, setShowOption] = useState(false);
    const [doneUpload, setDoneUpload] = useState<{_id: string; progress: number;}[]>([]);
    const [willSendFileMessage, setWillSendFileMessage] = useState(null);
    const el = useRef<HTMLDivElement>(null);
    useOnClickOutside(el, () => setShowOption(false))
    const {openPopupSendFiles} = usePopupSendFiles();
    const {socketRef} = useContext(MessageContext);
    const { addFileToUpload } = useUpload('CHATTING');
    const dispatch = useDispatch();

    const socket = socketRef.current;

    const handleSetFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;

        // Modify file to with key with each file;
        const [files, images] = modifyUploadedFilesV2({
            imgLastKey: null,
            fileLastKey: null,
        }, event.target.files);

        const fileSend: any[] = [];

        Object.keys(files).forEach(key => {
            fileSend.push(files[key])
        });
        Object.keys(images).forEach(key => {
            fileSend.push(images[key]);
        })

        setShowOption(false)
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
        const isDone = doneUpload.every(file => file.progress === 100);
        if (isDone&&willSendFileMessage) {
            socket.emit('CHATTING_CSS_SEND_MESSAGE', willSendFileMessage);
            socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', { conversationID: currentChat });
            setDoneUpload([]);
            setWillSendFileMessage(null);
        }
    }, [willSendFileMessage, doneUpload])

    return (
        <div ref={el} className={"relative"}>
        <button onClick={() => setShowOption(!showOption)} className={"flex items-center justify-center p-[13px]"}>
            <img src={attachIcon} alt={"icon attach"}/>
        </button>
            {
                showOption&&
                <div className={"absolute bottom-60px right-0 rounded-md shadow-lg bg-white min-w-[216px] text-gray-500"}>
                    <label className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img src={ImagesIcon} alt={"images"}/>
                        <div className={"flex-1 text-left ml-6"}>Hình ảnh</div>
                        <input type="file" name="files" id="files" className="hidden" accept="image/*" multiple onChange={event => handleSetFiles(event)} />
                    </label>
                    <label className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img src={FileIcon} alt={"add folder"} className={"rotate-45 transform"}/>
                        <div className={"flex-1 text-left ml-6"}>File</div>
                        <input type="file" name="files" id="files" className="hidden" accept="file/*" multiple onChange={event => handleSetFiles(event)} />
                    </label>
                    <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img className={"mr-2"} src={FolderIcon} alt={"exit"}/>
                        <div className={"flex-1 text-left ml-6"}>Bỏ phiếu</div>
                    </button>
                </div>
            }
        </div>
    )
}

export default IconAttach;
