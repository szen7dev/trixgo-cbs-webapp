import React, {FC} from "react";
import {map as _map} from "lodash";

const ListMediaInMessage:FC = () => {
    const listUserInMessage = [
        {
            _id: 1,
            userName: "Khanh TRX",
            status: "online"
        },
    ]

    return (
        <div className={"bg-white overflow-auto flex-1"}>
            {
                _map(listUserInMessage, (user,index) => (
                    <div>asdsad</div>
                ))
            }
        </div>
    )
}

export default ListMediaInMessage;
