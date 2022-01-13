import React, {FC, useCallback, useContext} from "react";
import Close from "assets/icons/Close";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import BellIcon from "assets/images/icons8-bell-100.svg";
import AddUserToGroup from "assets/images/icons8-add-user-group-man-man-96.svg";
import SettingMessageDetailTab from "./components/SettingMessageDetailTab";
import {MessageContext} from "../home/index_v2";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducer";
import AvatarGroupChat from "../list/components/AvatarGroupChat";
const SettingMessageDetail:FC = () => {
    const {currentChat, setShowMenu, showMenu} = useContext(MessageContext);

    const chat = useSelector((state: RootState) => state.listConversation.data.listConversation[currentChat]);

    const currentUser = localStorage.getItem("currentUser")??"";
    const profileId = JSON.parse(currentUser)?._id;

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

    const getNameConversation = useCallback(() => {
        if (chat.members && chat.members.length == 2) {
            const userInConversation = chat?.members.find((item: any) => item._id != profileId);
            return userInConversation.fullname.trim();
        }

        return chat?.name;
    }, [chat, profileId]);

    const getPresentGroupName = (name: string) => {
        return name.split(' ').slice(0, 1).map((text: string) => {
            return text.charAt(0).toUpperCase()
        });
    }

    if (!chat) {
        return (
            <div className={"messages-right-bar border-l transition-all duration-500 group w-[480px] absolute right--480px"}>
            </div>
        )
    }
    return (
        <div className={"messages-right-bar border-l transition-all duration-500 group w-[480px] absolute " + (showMenu?"right-0":"right--480px")}>
            <div className={"h-full group bg-gray-100 overflow-auto"}>
                <div className={"h-[56px] bg-white flex justify-between p-[17px] sticky top-0 z-5"}>
                    <button onClick={() => setShowMenu(false)}>
                        <Close/>
                    </button>
                    <button>
                        <img src={PencilIcon} alt={'--'}/>
                    </button>
                </div>
                <div className={"w-full flex flex-col bg-white items-center py-[20px]"}>
                    {
                        chat.avatar?
                            <img className={"w-[40px] h-[40px] rounded-full overflow-hidden"} src={chat.avatar.file.url} alt={getNameConversation()}/>:
                            (
                                getAvatarMembers().length === 0 ?
                                    <div className={"w-[120px] h-[120px] rounded-full flex items-center justify-center text-white font-bold text-xl min-w-[56px] min-h-[56px]"} style={{background: "#8DD4D6"}}>
                                        {getPresentGroupName(getNameConversation())}
                                    </div> :
                                    <AvatarGroupChat
                                        avatars={getAvatarMembers()}
                                        imageClass={"w-[120px] h-[120px]"}
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
                    <div className={"flex flex-col px-[25px] pb-[15px] w-full items-center mt-[10px]"}>
                        <div className={"text-xl"}>
                            {getNameConversation()}
                        </div>
                        <div className={"text-gray-400"}>
                            {chat.members.length} thành viên
                        </div>
                    </div>
                </div>
                <div className={"flex justify-between items-center p-[17px] bg-white"}>
                    <img src={BellIcon} alt={"...."}/>
                    <div className={"flex-1 text-left ml-4"}>Notifications</div>
                    <input className="form-switch form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                </div>
                <SettingMessageDetailTab/>
            </div>
            <button className={"w-[56px] h-[56px] group-hover:opacity-100 opacity-0 rounded-full absolute bottom-20px right-20px z-5 bg-primary flex items-center justify-center "}>
                <img src={AddUserToGroup} alt={"Pencil icon"}/>
            </button>
        </div>
    )
}

export default SettingMessageDetail;
