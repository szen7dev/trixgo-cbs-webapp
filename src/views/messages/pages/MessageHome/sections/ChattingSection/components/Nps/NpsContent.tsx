import React, {FC, useContext, useState} from "react";
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
export const NpsContent:FC<Props> = ({message, className,borderClass, isMyMessage, isMini, context}) => {
    const [showMoreScore, setshowMoreScore] = useState(false);
    const [value, setValue] = useState<string|number|null>(null);
    const {updateNPS} = UseConversation();
    const {socket} = useContext(context);

    const renderOptionForNPS = () => {
        if (message.nps.type === 1) {
            const scores = [];
            for (let i=10; i >=0; i--) {
                scores.push(i)
            }
            return <>
                {
                    _map(scores, score => (
                        <div key={score} className={"w-full flex items-center mb-[15px] " + ((score < 6 && !showMoreScore) ? "hidden" : "")}>
                            <input
                                onChange={event => setValue(event.target.value)}
                                value={score} type="radio" id={"option-" + score} name={"option"} className={"form-check-input mt-0 w-[24px] min-w-[24px] min-h-[24px] h-[24px]"}/>
                            <label htmlFor={"option-" + score} className={"text-left ml-3 truncate flex-1"}>{score} điểm</label>
                            <div className={"flex items-center -space-x-1"}>
                                <img alt={"------"} src={SampleImage} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                                <img alt={"------"} src={SampleImage} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                                <img alt={"------"} src={SampleImage} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                            </div>
                        </div>
                    ))
                }
                <button className={"text-primary mb-[15px]"} onClick={() => setshowMoreScore(!showMoreScore)}>
                    {!showMoreScore ? "Xem thêm tới thang điểm 0" : "Ẩn bớt"}
                </button>
            </>
        } else {
            return null;
        }
    }

    const handleUpdatePoll = () => {
        if (!value) return;
        const body : UpdateNPSPayload = {
            conversationID: message.conversation,
            messageID: message._id,
        };
        if (message.nps.type === 1) {
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
                    Những điểm bạn không hài lòng về ứng dụng <b>“Trixgo-Quản lý hợp đồng”</b>:
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