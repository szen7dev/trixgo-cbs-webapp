import React, {FC, useContext, useState} from "react";
import {AvatarGroupChat} from "../../../MessageList";
import {ItemListConversation, UpdateConversationPayload} from "typings/apis/messages/listConversation";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
import ImagesIcon from "assets/images/icons8-photo-gallery-96.svg";
import Close from "assets/icons/Close";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import {MessageContext} from "../../../../index";
import {useUpload} from "services/hooks/useUpload";
import {modifyUploadedFilesV2} from "services/hooks/useUploadFile";
import {UseListConversation} from "services/hooks/messages/useListConversation";

type Props = {
    chat: ItemListConversation
}
export const BasicInformationConversation:FC<Props> = ({chat}) => {
    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;

    const { addFileToUpload } = useUpload({
        appID: "5dfe4c1b51dc622100bb9d8f",
        companyID: chat.company,
        conversationID: chat._id
    });
    const {getAvatarMembers, getNameConversation} = UseMessageHelper();
    const {updateConversation} = UseListConversation();
    const [chatName, setChatName] = useState(getNameConversation(chat, profileId));
    const [avatarId, setAvatarId] = useState("");

    const getPresentGroupName = (name: string) => {
        return name.split('').slice(0, 1).map((text: string) => {
            return text.charAt(0).toUpperCase()
        });
    }

    const [isEditting, setIsEditting] = useState(false);
    const {setShowMenu, socketRef} = useContext(MessageContext);
    const socket = socketRef.current;
    const {hasPermission} = UseMessageHelper();

    const handleChangeAvatar = async (event:  React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const filesUpload = event.target.files;

        const [files, images] = modifyUploadedFilesV2({
            imgLastKey: null,
            fileLastKey: null,
        }, filesUpload);

        for (const [key, { file }] of Object.entries(images)) {
            const { _id } = await addFileToUpload({
                files: file,
                fileType: 1,
                progress: (percentCompleted, _id) => {
                   if (percentCompleted === 100) {
                       updateConversationAction({
                           conversationID: chat._id,
                           avatar: _id
                       })
                   }
                },
                useCompress: true
            })
        }
    }

    const updateConversationAction = (payload: UpdateConversationPayload) => {
        updateConversation(payload).then(data => {
            socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessage.data);
            socket.emit('CHATTING_CSS_UPDATE_INFO_CONVERSATION', {conversationID: chat._id});
            setIsEditting(false)
        })
    }

    return (
        <>
            <div className={"h-[56px] bg-white flex justify-between p-[17px] sticky top-0 z-5"}>
                <button onClick={() => setShowMenu(false)}>
                    <Close/>
                </button>
                {
                    !chat.isPrivate&&
                    hasPermission(chat, profileId, "configEditInfo") &&
                    <button
                        onClick={() => {
                            setIsEditting(!isEditting)
                        }}
                    >
                        {
                            isEditting ?
                                <span className={"text-negative"}>Huỷ</span> :
                                <img src={PencilIcon} alt={'--'}/>
                        }
                    </button>
                }
            </div>
            <div className={"w-full flex flex-col bg-white items-center py-[20px]"}>
                <div className={"relative"}>
                    {
                        chat.avatar?
                            <img  className={"w-[120px] h-[120px] min-w-[120px] min-h-[120px] rounded-full overflow-hidden"} src={`${process.env.REACT_APP_URL_S3}${chat?.avatar?.path}`} alt={getNameConversation(chat, profileId)}/>:
                            (
                                getAvatarMembers(chat, profileId).length === 0 ?
                                    <div className={"w-[120px] h-[120px] rounded-full flex items-center justify-center text-white font-bold text-xl min-w-[56px] min-h-[56px]"} style={{background: "#8DD4D6"}}>
                                        {getPresentGroupName(getNameConversation(chat, profileId))}
                                    </div> :
                                    <AvatarGroupChat
                                        avatars={getAvatarMembers(chat, profileId)}
                                        imageClass={"w-[120px] h-[120px] min-w-[120px] min-h-[120px]"}
                                        classesMap={{
                                            "group_1": {
                                                imgWidth: "w-full h-full",
                                                groupPosition: [""]
                                            },
                                            "group_2": {
                                                imgWidth: "w-[80px] h-[80px] absolute",
                                                groupPosition: [
                                                    "bottom-0 left-0 z-2",
                                                    "top-0 right-0 z-1",
                                                ]
                                            },
                                            "group_3": {
                                                imgWidth: "w-[70px] h-[70px] absolute",
                                                groupPosition: [
                                                    "bottom-0 left-25px z-3",
                                                    "top-0 left-0 z-2",
                                                    "top-0 right-0 z-1",
                                                ]
                                            },
                                            "group_4": {
                                                imgWidth: "w-[70px] h-[70px] absolute",
                                                groupPosition: [
                                                    "bottom-0 left-0 z-4",
                                                    "top-0 left-0 z-3",
                                                    "top-0 right-0 z-2",
                                                    "bottom-0 right-0 z-1"
                                                ]
                                            }
                                        }}
                                    />
                            )
                    }
                    {
                        isEditting&&
                        <div className={"absolute bottom-0 right-0 z-20"}>
                            <label
                                className={"rounded-full bg-gray-100 hover:bg-gray-400 flex items-center p-1 attach-image"}
                                htmlFor={"avatar"}>
                                <img className={"w-[24px] h-[24px]"} src={ImagesIcon} alt={"images"}/>
                                <input type="file" name="avatar" id="avatar" className="hidden" accept="image/*" multiple
                                       onChange={event => handleChangeAvatar(event)}/>
                            </label>
                        </div>
                    }
                </div>
                <div className={"flex flex-col px-[25px] pb-[15px] w-full items-center mt-[10px]"}>
                    <div className={"text-xl flex items-center"}>
                        <div
                            contentEditable={isEditting}
                            suppressContentEditableWarning={true}
                            onInput={event => setChatName(event.currentTarget.innerText)}
                        >
                            {getNameConversation(chat, profileId)}
                        </div>
                        {
                            isEditting&&
                            <button
                                onClick={() => {
                                    if (chatName.trimEnd().trimStart().length <= 0) return;
                                    updateConversationAction({
                                        conversationID: chat._id,
                                        name: chatName.trimEnd().trimStart()
                                    })
                                }}
                                className={"bg-primary text-white text-xs px-2 py-1 rounded-md ml-3 disabled:bg-gray-100"} disabled={chatName.trimEnd().trimStart().length <= 0}>Lưu</button>
                        }
                    </div>
                    <div className={"text-gray-400"}>
                        {chat.members.length} thành viên
                    </div>
                </div>
            </div>
        </>
    )
}