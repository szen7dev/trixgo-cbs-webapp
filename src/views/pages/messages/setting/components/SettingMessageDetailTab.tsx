import React, {FC, useContext, useEffect, useState} from "react";
import {map as _map} from "lodash";
import ListOnlineUserInMessage from "./ListOnlineUserInMessage";
import ListMediaInMessage from "./ListMediaInMessage";
import ListFileInMessage from "./ListFileInMessage";
import {MessageContext} from "../../home/index_v2";
import ListLinksInMessage from "./ListLinksInMessage";

const SettingMessageDetailTab:FC = () => {
    const {currentChat} = useContext(MessageContext)
    const [activeTab, setActiveTab] = useState("members");
    useEffect(() => {
        setActiveTab("members");
    },[currentChat])
    const listTab = [
        {
            text: "Members",
            tabId: "members"
        },
        {
            text: "Media",
            tabId: "media"
        },
        {
            text: "Files",
            tabId: "files"
        },
        {
            text: "Links",
            tabId: "links"
        },
        // {
        //     text: "Groups",
        //     tabId: "groups"
        // },
    ]

    return (
        <>
            <div className={"flex max-w-full border-b border-gray-100 bg-white h-[55px] sticky top-55px z-5 min-h-[55px]"}>
                {_map(listTab, (tab) => (
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
                <ListOnlineUserInMessage/>
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
        </>
    )
}

export default SettingMessageDetailTab;
