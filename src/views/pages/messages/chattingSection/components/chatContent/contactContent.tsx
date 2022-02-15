import React, {FC} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {map as _map} from "lodash"
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
type Props = {
    message: ItemMessage;
}
const ContactContent:FC<Props> = ({message}) => {
    const {handleStartPrivateChat} = UseMessageHelper()
    return <>
        {
            _map(message.usersAssigned, user => (
                <div key={user._id} className={"max-w-[351px] rounded-md overflow-hidden bg-white"}>
                    <div className={"flex items-center p-[11px] border-b border-gray-100"}>
                        <img src={`${process.env.REACT_APP_URL_S3_USER}/${user.image}`} alt={"----"} className={"w-[50px] h-[50px] min-w-[50px] rounded-full overflow-hidden"}/>
                        <div className={"ml-4"}>
                            <div>{user.bizfullname}</div>
                            <div className={"text-xs"}>{user.email}</div>
                        </div>
                    </div>
                    <div className={"flex items-center justify-center py-[10px]"}>
                        <button
                            onClick={() => handleStartPrivateChat(user._id)}
                            className={"text-primary"}>
                            Nhắn tin
                        </button>
                    </div>
                </div>
            ))
        }
    </>
}

export default ContactContent;