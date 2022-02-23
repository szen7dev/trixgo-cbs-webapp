import React, {FC, useContext, useEffect, useState} from "react";
import {map as _map} from "lodash";
import {ListOnlineUserInMessage} from "./members";
import {ListMediaInMessage} from "./medias";
import {ListFileInMessage} from "./files";
import {MessageContext} from "../../../index";
import {ListLinksInMessage} from "./links";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {ListGeneralGroupByMember} from "./groups";

type Props = {
    chat: ItemListConversation
}
export const SettingMessageDetailTab:FC<Props> = ({chat}) => {
    const {currentChat} = useContext(MessageContext)
    const [activeTab, setActiveTab] = useState("members");
    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;

    useEffect(() => {
        setActiveTab("members");
    },[currentChat])
    const listTab = [
        {
            text: "Members",
            tabId: "members",
            isShow: !chat.isPrivate
        },
        {
            text: "Media",
            tabId: "media",
            isShow: true
        },
        {
            text: "Files",
            tabId: "files",
            isShow: true
        },
        {
            text: "Links",
            tabId: "links",
            isShow: true
        },
        {
            text: "Groups",
            tabId: "groups",
            isShow: chat.isPrivate
        },
    ]

    return (
        <>
            <div className={"flex max-w-full border-b border-gray-100 bg-white h-[55px] sticky top-55px z-5 min-h-[55px]"}>
                {_map(listTab.filter(tab => tab.isShow), (tab) => (
                    <div
                        className={"flex items-center px-4 hover:bg-gray-100 rounded-tl-md rounded-tr-md"}
                        key={tab.tabId}
                        onClick={() => setActiveTab(tab.tabId)}
                    >
                        <button
                            className={"whitespace-nowrap h-full text-center block p-2 " + (activeTab===tab.tabId?"border-b-2 border-primary text-primary":"text-primary-gray")}
                        >
                            {tab.text}
                        </button>
                    </div>
                ))}
            </div>
            {
                activeTab==="members" &&
                <ListOnlineUserInMessage chat={chat}/>
            }
            {
                activeTab==="media" &&
                <ListMediaInMessage/>
            }
            {
                activeTab==="files" &&
                <ListFileInMessage/>
            }
            {
                activeTab==="links"&&
                <ListLinksInMessage/>
            }
            {
                activeTab==="groups"&&
                <ListGeneralGroupByMember memberId={chat?.members.find((item: any) => item._id !== profileId)?._id}/>
            }
        </>
    )
}
