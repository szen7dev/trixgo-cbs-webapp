import React, {FC, useContext, useEffect, useState} from "react";
import {map as _map} from "lodash";
import {ListOnlineUserInMessage} from "./Members";
import {ListMediaInMessage} from "./Medias";
import {ListFileInMessage} from "./Files";
import {ListLinksInMessage} from "./Links";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {ListGeneralGroupByMember} from "./Groups";
import {MessageContext} from "../../../../../shareComponents/layouts/MessagesLayoutV2";

type Props = {
    chat: ItemListConversation
}
export const SettingMessageDetailTab:FC<Props> = ({chat}) => {
    const {currentChat} = useContext(MessageContext)
    const [activeTab, setActiveTab] = useState("members");
    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;

    useEffect(() => {
        setActiveTab(chat?.isPrivate?"media":"members");
    },[currentChat])
    const listTab = [
        {
            text: "Members",
            tabId: "members",
            isShow: !chat?.isPrivate
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
            isShow: chat?.isPrivate&&chat?.members.find((item: any) => item._id !== profileId)?._id
        },
    ]

    return (
        <>
            <div className={"flex max-w-full justify-around border-b border-gray-100 bg-white h-[55px] sticky top-55px z-5 min-h-[55px]"}>
                {_map(listTab.filter(tab => tab.isShow), (tab) => (
                    <div
                        className={"flex items-center rounded-tl-md rounded-tr-md"}
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
                <ListOnlineUserInMessage isActive={activeTab==="members"} chat={chat}/>
            }
            {
                activeTab==="media" &&
                <ListMediaInMessage isActive={activeTab==="media"}/>
            }
            {
                activeTab==="files" &&
                <ListFileInMessage isActive={activeTab==="files"}/>
            }
            {
                activeTab==="links"&&
                <ListLinksInMessage isActive={activeTab==="links"}/>
            }
            {
                activeTab==="groups"&&
                <ListGeneralGroupByMember isActive={activeTab==="groups"} memberId={chat?.members.find((item: any) => item._id !== profileId)?._id}/>
            }
        </>
    )
}
