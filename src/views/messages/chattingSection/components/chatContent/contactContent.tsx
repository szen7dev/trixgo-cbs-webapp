import React, {FC} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {map as _map} from "lodash"
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
import ReactionList from "../reactions/ReactionList";
import ReactionActions from "../reactions/ReactionActions";
type Props = {
    message: ItemMessage;
    className?: string;
    borderClass?: string;
    context: any;
    isMini?: boolean
}
const ContactContent:FC<Props> = ({message, className, borderClass, context, isMini}) => {
    const {handleStartPrivateChat} = UseMessageHelper()
    return <>
        {
            _map(message.usersAssigned, user => (
                <div key={user._id} className={"relative " + (isMini?" max-w-[250px]":" max-w-[351px]")}>
                    <div className={"rounded-md overflow-hidden bg-white relative " + (className??"")}>
                        <div className={"flex items-center p-[11px] border-b " + (borderClass??"border-gray-100")}>
                            <img src={`${process.env.REACT_APP_URL_S3_USER}/${user.image}`} alt={"----"} className={"w-[50px] h-[50px] min-w-[50px] rounded-full overflow-hidden"}/>
                            <div className={"ml-4"}>
                                <div>{user.bizfullname}</div>
                                <div className={"text-xs h-[16px]"}>{user?.phone}</div>
                            </div>
                        </div>
                        <div className={"flex items-center justify-center py-[10px]"}>
                            <button
                                onClick={() => handleStartPrivateChat(user._id, isMini)}
                                className={"text-primary"}>
                                Nhắn tin
                            </button>
                        </div>
                    </div>
                    <div className={"absolute right-2 z-10"} style={{bottom: -5}}>
                        <ReactionList message={message}/>
                    </div>
                    <ReactionActions context={context} message={message}/>
                </div>
            ))
        }
    </>
}

export default ContactContent;