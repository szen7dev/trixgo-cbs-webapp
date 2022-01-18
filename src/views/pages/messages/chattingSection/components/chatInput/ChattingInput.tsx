import React, {FC, useContext, useEffect, useState} from "react";
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

    const [realValue, setRealValue] = useState("");
    const [showMention, setShowMention] = useState<{show: boolean; mentionValue: string; tempValue?: string}>({
        show: false,
        mentionValue: "",
        tempValue: ""
    });

    const socket = socketRef.current;
    const {getListConversation} = UseListConversation();
    useEffect(() => {
        socket&&socket.on('CHATTING_SSC_RECEIVE_MESSAGE', onReceiveMessage);
    },[socket])

    const onReceiveMessage = (data: any) => {
        if (data.infoMessage?.conversation === currentChat) {
            if (data?.infoMessage?.error) {
                // Alert.alert(t('notification'), data.infoMessage.message);
                getListConversation({});
                return;
            }
            if (data.infoMessage?.sender?._id === profileId) {
                dispatch(updateNewMessageToConversation({
                    conversationId: currentChat,
                    newMessageId: data.infoMessage._id,
                    oldMessageId: data.tmpid,
                    messageData: data.infoMessage
                }));
            } else {
                dispatch(appendMessageToConversation({
                    conversationId: currentChat,
                    messageId: data.infoMessage._id,
                    messageData: data.infoMessage
                }))
                setTimeout(() => {
                    scrollToBottom();
                }, 100)
            }
            socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', { conversationID: currentChat });
        }
    };

    const handleInput = (value: string) => {
        value = value.replaceAll(/<a class="text-primary" href="([a-zA-Z0-9]+)">[@]([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+)<["/]a>/g, (replacement: string) => {
            const matchs = (/<a class="text-primary" href="([a-zA-Z0-9]+)">[@]([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+)<["/]a>/g).exec(replacement);
            if (matchs) {
                const userId = matchs[1];
                const fullName = matchs[2];
                return `@[${fullName}](${userId})`;
            } else {
                return replacement;
            }
        })
        if (value.match(/[@][a-zA-Z]+/g)) {
            const matchValue = value.match(/[@][a-zA-Z]+/g);
            setShowMention({
                show: true,
                mentionValue: matchValue?matchValue[0].replaceAll("@",""):"",
                tempValue: value
            })
        } else {
            setShowMention({show: false, mentionValue: ""});
            setRealValue(value);
        }
    }

    const setMention = (member: any) => {
        const newRealValue = `@[${member.fullname}](${member._id}) `;
        setRealValue((showMention.tempValue??"").replace(/[@][a-zA-Z]+/g, newRealValue));
        setShowMention({show: false, mentionValue: "", tempValue: (showMention.tempValue??"").replace(/[@][a-zA-Z]+/g, newRealValue)})
    }

    const handleSendMessage = () => {
        if (removeTags(realValue).trim().length<=0) return;
        const usersTag = realValue.match(/(?<=\()[^\][]*(?=\))/g)??[];
        sendSocketMessage(currentChat,removeTags(realValue),usersTag, 0);
        setRealValue("");
        setShowMention({show: false, mentionValue: "", tempValue: ""});
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

    const handlePasteFile = (file: File) => {
        openPopupSendFiles({
            files: [
                {
                    file: {
                        file: {
                            url: window.URL.createObjectURL(file),
                            name: file.name,
                            size: file.size,
                            _id: uuidv4(),
                            type: file.type
                        }
                    },
                    // progress: file.progress,
                    _id: uuidv4(),
                    realFile: file,
                }
            ],
            sendType: "image",
            defaultSendType: "image",
            conversationID: currentChat,
            handleSendFile: (message, useCompress) => handleUploadFilePaste(message, useCompress)
        })
    }

    const handleUploadFilePaste = async (message: any, useCompress = true) => {
        console.log(message)
        dispatch(appendMessageToConversation({
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
                    // const messageData = {
                    //     ...message,
                    //     _id: message.tmpid,
                    //     files: [...message.files].map(oldFile => {
                    //         if (oldFile._id === file._id) {
                    //             return {
                    //                 ...oldFile,
                    //                 progress: percentCompleted
                    //             }
                    //         }
                    //         return {
                    //             ...oldFile
                    //         }
                    //     })
                    // };
                    // dispatch(updateFileProgressOnMessage({
                    //     conversationId: currentChat,
                    //     messageId: message.tmpid,
                    //     messageData: messageData,
                    // }));
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
        socket.emit('CHATTING_CSS_SEND_MESSAGE', sendMessage);
        socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', { conversationID: currentChat });
    }

    return (
        <div className={"w-full px-[20px] flex justify-center bg-transparent py-[10px]"}>
            <div className={"w-full max-w-[645px] flex items-end justify-center relative"}>
                {
                    showMention.show&&
                    <div
                        className={"absolute bg-white bottom-60px left-0 rounded-lg min-w-[421px] max-w-[421px] max-h-[242px]"}>
                        {
                            _map(chat.members.filter(mem => mem.fullname.toLowerCase().includes(showMention.mentionValue.toLowerCase())), member => (
                                <div
                                    onClick={() => setMention(member)}
                                    key={member._id} className={"hover:bg-gray-300 py-[10px] px-[15px] flex items-center"}>
                                    <img src={`${process.env.REACT_APP_URL_S3_USER}/${member.image}`} alt={"----"}
                                         className={"w-[30px] h-[30px] rounded-full overflow-hidden object-cover"}/>
                                    <div className={"flex-1 ml-1"}>
                                        {member.fullname}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
                <div className={"flex-1 rounded-md bg-white flex items-end"}>
                    <IconButton/>
                    <InputForMessage onPasteImage={(file) => handlePasteFile(file)} onPressEnter={() => handleSendMessage()} onChange={(target) => handleInput(target.innerHTML)} html={realValue}/>
                    <IconAttach currentChat={currentChat} scrollToBottom={() => scrollToBottom()}/>
                </div>
                <button
                    onClick={() => handleSendMessage()}
                    className={"w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center ml-[10px]"}>
                    <img src={IconSendMessage} alt={"send message"}/>
                </button>
            </div>
        </div>
    )
}

export default ChattingInput;
