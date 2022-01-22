import React, {FC, useCallback, useContext} from "react";
import SampleImage from "assets/images/icons8-image-256.svg";
import Close from "assets/icons/Close";
import MainChatOptions from "./MainChatOptions";
import SearchIcon from "assets/images/icons8-search-120.png";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import AvatarGroupChat from "../../list/components/AvatarGroupChat";
import {MessageContext} from "../../home/index_v2";
import {LazyLoadImage} from "react-lazy-load-image-component";

type Props = {
    chat: any
}

const MainChatHeading:FC<Props> = ({chat}) => {
    const {setShowMenu, showMenu} = useContext(MessageContext)
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const getNameConversation = useCallback(() => {
        if (chat.members && chat.members.length == 2) {
            const userInConversation = chat?.members.find((item: any) => item._id != profileId);
            return userInConversation.fullname.trim();
        }

        return chat?.name;
    }, [chat, profileId]);

    const getAvatarMembers = useCallback(() => {
        if (chat.isPrivate) {
            const members = chat.members.filter((item: any) => item._id != profileId);
            return [`${process.env.REACT_APP_URL_S3_USER}/${members[0].image}`];
        }
        const avatars: any = [];
        if (chat.members && chat.members.length) {
            chat.members.slice(0, 4).forEach((member: any) => {
                avatars.push(`${process.env.REACT_APP_URL_S3_USER}/${member.image}`);
            });
        }
        return avatars;
    }, [chat, profileId]);

    const getPresentGroupName = (name: string) => {
        return name.split(' ').slice(0, 2).map((text: string) => {
            return text.charAt(0)
        });
    }

    return (
        <div className={"sticky top-0 bg-white h-[56px] flex px-4 py-1 z-50"}>
            <div className={"avatar-chat flex items-center justify-center"}>
                {
                    chat.avatar?
                        <LazyLoadImage effect="blur" className={"w-[40px] h-[40px] rounded-full overflow-hidden"} src={chat?.avatar?.url} alt={getNameConversation()}/>:
                        (
                            getAvatarMembers().length === 0 ?
                                <div className={"w-[40px] h-[40px] rounded-full flex items-center justify-center text-white font-bold text-xl min-w-[56px] min-h-[56px]"} style={{background: "#8DD4D6"}}>
                                    {getPresentGroupName(getNameConversation())}
                                </div> :
                                <AvatarGroupChat
                                    avatars={getAvatarMembers()}
                                    imageClass={"w-[40px] h-[40px]"}
                                    classesMap={{
                                        "group_1": {
                                            imgWidth: "w-full h-full",
                                            groupPosition: [""]
                                        },
                                        "group_2": {
                                            imgWidth: "w-[26px] h-[26px] absolute",
                                            groupPosition: [
                                                "bottom-0 left-0 z-2",
                                                "top-0 right-0 z-1",
                                            ]
                                        },
                                        "group_3": {
                                            imgWidth: "w-[22px] h-[22px] absolute",
                                            groupPosition: [
                                                "bottom-0 left-9px z-3",
                                                "top-0 left-0 z-2",
                                                "top-0 right-0 z-1",
                                            ]
                                        },
                                        "group_4": {
                                            imgWidth: "w-[20px] h-[20px] absolute",
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
            </div>
            <div className={"chat-basic-infor flex flex-col justify-center ml-[10px] flex-1"}>
                <div className={""}>{getNameConversation()}</div>
                <div className={"text-xs text-gray-300"}>{chat.members.length} thành viên</div>
            </div>
            <div className={"items-center flex"}>
                <div className={"indicator-pinned flex flex-col h-full"}>
                    <div className={"bg-primary w-[2px] flex-1 mb-[2px]"}></div>
                    <div className={"bg-primary w-[2px] flex-1 mb-[2px]"}></div>
                    <div className={"bg-primary w-[2px] flex-1 mb-[2px]"}></div>
                </div>
                <div className={"flex-1 flex ml-[5px]"}>
                    <LazyLoadImage effect="blur" src={SampleImage} alt={"sample"} className={"w-[36px] h-[36px]"}/>
                    <div className={"flex-1 max-w-[185px] ml-[5px]"}>
                        <div className={"text-primary"}>Pinned Message</div>
                        <div className={"truncate"}>Báo cáo ảnh tuần 12 của CPM olala ABC</div>
                    </div>
                    <button className={"flex items-center justify-center ml-[20px]"}>
                        <Close/>
                    </button>
                </div>
            </div>
            <div className={"action-section flex items-center justify-end ml-[20px]"}>
                <MainChatOptions/>
                <button className={"w-[40px] h-[40px] hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 rounded-full flex items-center justify-center"}>
                    <LazyLoadImage effect="blur" src={SearchIcon} alt={"search icon"}/>
                </button>
                <button onClick={() => setShowMenu(!showMenu)} className={"w-[40px] h-[40px] hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 rounded-full flex items-center justify-center"}>
                    <DotsVerticalIcon/>
                </button>
            </div>
        </div>
    )
}

export default MainChatHeading;
