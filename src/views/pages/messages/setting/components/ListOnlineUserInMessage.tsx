import React, {FC} from "react";
import {map as _map} from "lodash";
import OnlineUserInChatItem from "./OnlineUserInChatItem";

const ListOnlineUserInMessage:FC = () => {
    const listUserInMessage = [
        {
            _id: 1,
            userName: "Khanh TRX",
            status: "online"
        },
        {
            _id: 2,
            userName: "Thanh CTV",
            status: "last seen 9 minutes ago"
        },
        {
            _id: 3,
            userName: "Tuấn Minh",
            status: "last seen 2 hours ago"
        },
        {
            _id: 4,
            userName: "Doan ReactJS",
            status: "last seen 1 hours ago"
        },
        {
            _id: 5,
            userName: "Quang Đẹp trai",
            status: "last seen 1 hours ago"
        },
    ]

    return (
        <div className={"bg-white overflow-auto flex-1"}>
            {
                _map(listUserInMessage, (user,index) => (
                    <OnlineUserInChatItem key={user._id} user={user} index={index}/>
                ))
            }
        </div>
    )
}

export default ListOnlineUserInMessage;
