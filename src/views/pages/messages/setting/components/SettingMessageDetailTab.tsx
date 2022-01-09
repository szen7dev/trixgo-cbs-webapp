import React, {FC, useState} from "react";
import {map as _map} from "lodash";
import ListOnlineUserInMessage from "./ListOnlineUserInMessage";
import ListMediaInMessage from "./ListMediaInMessage";

const SettingMessageDetailTab:FC = () => {
    const [activeTab, setActiveTab] = useState("members");
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
        {
            text: "Groups",
            tabId: "groups"
        },
    ]

    return (
        <div className={"h-full bg-white relative flex flex-col mt-[10px]"}>
            <div className={"flex max-w-full border-b border-gray-100 no-webkit-scrollbar mt-3 bg-white h-[55px] sticky top-55px z-5 min-h-[55px]"}>
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
        </div>
    )
}

export default SettingMessageDetailTab;
