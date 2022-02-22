import React, {FC} from "react";
import {map as _map} from "lodash"
type User = {
    _id: string|number;
    name: string;
    avatar: string;
}

type Props = {
    users: Array<User>
}

const AccessingUsers:FC<Props> = ({users}) => {
    const usersOnTop4 = users.slice(0, 4);
    const userLeft = users.length - 4;
    return (
        <div className={"flex items-center"}>
            {
                _map(usersOnTop4, (user) => (
                    <img key={user._id} src={user.avatar} alt="Thumbnail" className="w-8 h-8 rounded-full border-2 border-pink-600 mr-1" />
                ))
            }
            {
                userLeft>0?
                    <div
                        className={"rounded-full h-8 w-8 bg-gray-400 text-white text-lg text-center items-center justify-center flex font-thin"}>
                        <span>{userLeft}+</span>
                    </div>:
                    null
            }
        </div>
    )
}

export default AccessingUsers;
