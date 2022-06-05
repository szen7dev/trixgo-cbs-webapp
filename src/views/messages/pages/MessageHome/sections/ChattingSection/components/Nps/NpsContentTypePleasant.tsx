import React, {FC, useCallback, useContext, useEffect, useState} from "react";
import {ItemMessage, UpdateNPSPayload} from "typings/apis/messages/listMessage";
import {map as _map} from "lodash";
import SampleImage from "assets/images/icons8-image-256.svg";
import moment from "moment";
import {UseConversation} from "services/hooks/messages/useConversation";

type Props = {
    message: ItemMessage;
    className?: string;
    borderClass?: string;
    isMyMessage?: boolean;
    isMini?: boolean;
    context?: any;
}
export const NpsContentTypePleasant:FC<Props> = ({message, className,borderClass, isMyMessage, isMini, context}) => {
    const [showMoreScore, setshowMoreScore] = useState(false);
    const [value, setValue] = useState<string|number|null|string[]>(null);
    const {updateNPS} = UseConversation();
    const {socket} = useContext(context);
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profile = JSON.parse(currentUser);
    const profileId = profile?._id;

    const checkDidUserTakeAction = useCallback(() => {
        if (message.nps.type === 1) {
            const defaultUserVote : {[key: string]: number} = {};
            message.nps.usersVote.forEach((user) => {
                defaultUserVote[user.user._id] = user.score;
            })

            return {
                defaultUserVote
            }
        } else {
            const defaultUserVote : {[key: string]: string[]} = {};
            return {
                defaultUserVote
            }
        }
    }, [message])

    useEffect(() => {
        if (checkDidUserTakeAction().defaultUserVote[profileId] !== undefined) {
            setValue(checkDidUserTakeAction().defaultUserVote[profileId])
        }
    }, [checkDidUserTakeAction])

    const renderOptionForNPS = () => {
        return _map(message.nps.service.childs, child => (
            <div key={child._id} className={"w-full flex items-center mb-[15px]"}>
                <input
                    defaultChecked={value === child._id}
                    onChange={event => setValue(event.target.value)}
                    value={child._id} type="radio" id={"option-" + child._id} name={"option"} className={"form-check-input mt-0 w-[24px] min-w-[24px] min-h-[24px] h-[24px]"}/>
                <label htmlFor={"option-" + child} className={"text-left ml-3 truncate flex-1"}>{child.name}</label>
                <div className={"flex items-center -space-x-1"}>
                    <img alt={"------"} src={SampleImage} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                    <img alt={"------"} src={SampleImage} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                    <img alt={"------"} src={SampleImage} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                </div>
            </div>
        ));
    }

    const handleUpdatePoll = () => {
        if (!value) return;
        const body : UpdateNPSPayload = {
            conversationID: message.conversation,
            messageID: message._id,
        };
        if (message.nps.type === 1 && (typeof value === "string" || typeof value === "number")) {
            body['score'] = typeof value === "string" ? parseInt(value) : value
        }
        updateNPS(body).then(data => {
            socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessage);
            socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessageNotification);
        });
    }

    return (
        <div className={"min-w-[70px] rounded-lg p-[7px] relative " + (className??"") + (isMini?" max-w-[250px]":" max-w-[366px]")}>
            {
                message.nps.type === 1 ?
                <div className={"mb-3"}>
                    Nếu cho điểm về sự hài lòng <b>“{message.nps.service.name}”</b> thì bạn sẵn sàng cho mấy điểm:
                </div> :
                <div className={"mb-3"}>
                    Những điểm bạn không hài lòng về ứng dụng <b>“{message.nps.service.name}”</b>:
                </div>
            }
            <div className={"border-b " + (borderClass??"border-gray-100")}>
                {renderOptionForNPS()}
            </div>
            <div className={"flex items-center justify-center relative"}>
                {
                    message.nps.status &&
                    <button disabled={!value} className={"text-primary my-[10px] disabled:text-gray-400"} onClick={() => handleUpdatePoll()}>
                        Xác nhận
                    </button>
                }
                <div className={"absolute bottom-0 text-xs " + (isMyMessage?"text-primary right-1":"text-gray-500 left-1")}>
                    {moment(message.createAt).format("HH:mm")}
                </div>
            </div>
        </div>
    )
}