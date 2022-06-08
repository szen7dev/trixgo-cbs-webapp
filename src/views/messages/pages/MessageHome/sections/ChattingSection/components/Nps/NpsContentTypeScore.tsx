import React, {FC, useCallback, useContext, useEffect, useState} from "react";
import {ItemMessage, UpdateNPSPayload} from "typings/apis/messages/listMessage";
import {map as _map} from "lodash";
import SampleImage from "assets/images/icons8-image-256.svg";
import moment from "moment";
import {UseConversation} from "services/hooks/messages/useConversation";
import {number} from "yup";

type Props = {
    message: ItemMessage;
    className?: string;
    borderClass?: string;
    isMyMessage?: boolean;
    isMini?: boolean;
    context?: any;
}
export const NpsContentScore:FC<Props> = ({message, className,borderClass, isMyMessage, isMini, context}) => {
    const {socketRef} = useContext(context);
    const socket = socketRef.current;

    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profile = JSON.parse(currentUser);
    const profileId = profile?._id;

    const [showMoreScore, setShowMoreScore] = useState(false);
    const mapUserVote = () => {
        const votes : {[key:string]: {
            _id: string,
            bizfullname: string,
            image: string
        }[]} = {}
        for (let i=10; i >=0; i--) {
            votes[i] = message.nps.usersVote.filter(vote => vote.score === i).map(vote => vote.user)
        }

        return votes;
    };
    const defaultVote = message.nps.usersVote.find(vote => vote.user._id === profileId)

    const [userVote, setUserVote] = useState<{[key: string]: {
            bizfullname: string
            image: string
            _id: string
        }[]}>(mapUserVote());
    const [value, setValue] = useState<number|null>(defaultVote ? defaultVote.score : null)

    const {updateNPS} = UseConversation();

    const checkDidUserTakeAction = useCallback(() => {
        let didChange = false;
        const defaultUserVote : {[key: string]: string|undefined} = {};
        for (let i=10; i >=0; i--) {
            defaultUserVote[i] = message.nps.usersVote.find(vote => vote.score === i && vote.user._id === profileId)?.user._id;
        }

        const newVote : {[key:string] : string|undefined} = {}
        Object.keys(userVote).forEach(key => {
            newVote[key] = userVote[key].find(vote => vote._id === profileId)?._id;
        })

        //do compare
        for (let i=10; i >=0; i--) {
            if (defaultUserVote[i] !== newVote[i]) {
                didChange = true;
            }
        }

        //Kiểm tra xem chọn gì chưa
        if (Object.values(newVote).every(vote => vote === undefined)) {
            didChange = false;
        }

        return {
            didChange,
            defaultUserVote,
            newVote
        };
    }, [message, userVote])

    const handleSelectOption = (score: number) => {
        setValue(score);
        const oldValue = value;
        const selected = {...userVote};
        if (oldValue) {
            const index = selected[oldValue].map(vote => vote._id).indexOf(profileId);
            const votes = [...selected[oldValue]]
            if (index > -1) {
                votes.splice(index, 1);
                selected[oldValue] = votes;
            }
        }
        selected[score] = [...selected[score],{
            _id: profileId,
            bizfullname: profile.bizfullname,
            image: profile.image
        }];
        setUserVote(selected);
    }

    const renderOptionForNPS = () => {
        const scores = [];
        for (let i=10; i >=0; i--) {
            scores.push(i)
        }
        return <>
            {
                _map(scores, score => (
                    <div key={score} className={"w-full flex items-center mb-[15px] " + ((score < 6 && !showMoreScore) ? "hidden" : "")}>
                        <input
                            checked={value === score}
                            onChange={event => handleSelectOption(score)}
                            value={score} type="radio" id={"option-" + score + "-" + message._id} name={"option-"+message._id} className={"form-check-input mt-0 w-[24px] min-w-[24px] min-h-[24px] h-[24px]"}/>
                        <label htmlFor={"option-" + score + "-" + message._id} className={"text-left ml-3 truncate flex-1"}>{score} điểm</label>
                        <div className={"flex items-center -space-x-1"}>
                            {
                                Object.values(userVote[score]).slice(0, 3).map((user) => (
                                    <img key={user._id} alt={"------"} src={`${process.env.REACT_APP_URL_S3_USER}/${user.image}`} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            <button className={"text-primary mb-[15px]"} onClick={() => setShowMoreScore(!showMoreScore)}>
                {!showMoreScore ? "Xem thêm tới thang điểm 0" : "Ẩn bớt"}
            </button>
        </>
    }

    const handleUpdatePoll = () => {
        if (!value) return;
        const body : UpdateNPSPayload = {
            conversationID: message.conversation,
            messageID: message._id,
            score: value
        };
        // socket.emit('CHATTING_CSS_UPDATE_MESSAGE_NPS', body);
        updateNPS(body).then(data => {
            socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessage);
            socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessageNotification);
        });
    }

    return (
        <div className={"min-w-[70px] rounded-lg p-[7px] relative " + (className??"") + (isMini?" max-w-[250px]":" max-w-[366px]") + (isMyMessage ? "" : " border border-gray-200")}>
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
                    message.nps.status && !message.isFake &&
                    <button disabled={!checkDidUserTakeAction().didChange} className={"text-primary my-[10px] disabled:text-gray-400"} onClick={() => handleUpdatePoll()}>
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