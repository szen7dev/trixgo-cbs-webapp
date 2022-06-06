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
    const {socketRef} = useContext(context);
    const socket = socketRef.current;

    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profile = JSON.parse(currentUser);
    const profileId = profile?._id;

    const mapUserVote = () => {
        const votes : {[key:string]: {
                _id: string,
                bizfullname: string,
                image: string
            }[]} = {}
        message.nps?.service?.childs.forEach(child => {
            votes[child._id] = message.nps.usersVote.filter(vote => vote.reason._id === child._id).map(vote => vote.user)
        })

        return votes;
    };

    const [userVote, setUserVote] = useState<{[key: string]: {
            bizfullname: string
            image: string
            _id: string
        }[]}>(mapUserVote());
    const {updateNPS} = UseConversation();

    const checkDidUserTakeAction = useCallback(() => {
        let didChange = false;
        const defaultUserVote : {[key: string]: string|undefined} = {};
        message?.nps?.service?.childs.forEach(child => {
            defaultUserVote[child._id] = message.nps.usersVote.find(vote => vote.reason._id === child._id && vote.user._id === profileId)?.user._id;
        })

        const newVote : {[key:string] : string|undefined} = {}
        Object.keys(userVote).forEach(key => {
            newVote[key] = userVote[key].find(vote => vote._id === profileId)?._id;
        })

        //do compare
        message?.nps?.service?.childs.forEach(child => {
            if (defaultUserVote[child._id] !== newVote[child._id]) {
                didChange = true;
            }
        })

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

    const handleSelectOption = (value: boolean, option: any) => {
        const selected = {...userVote};

        if (value) {
            selected[option._id] = [...selected[option._id],{
                _id: profileId,
                bizfullname: profile.bizfullname,
                image: profile.image
            }];
        } else {
            const index = selected[option._id].map(vote => vote._id).indexOf(profileId);
            const votes = [...selected[option._id]]
            if (index > -1) {
                votes.splice(index, 1);
                selected[option._id] = votes;
            }
        }
        setUserVote(selected);
    }

    const renderOptionForNPS = () => {
        return _map(message.nps.service.childs, child => (
            <div key={child._id} className={"w-full flex items-center mb-[15px]"}>
                <input
                    defaultChecked={userVote[child._id].find(vote => vote._id === profileId) !== undefined}
                    onChange={event => handleSelectOption(event.target.checked, child)}
                    value={child._id} type="checkbox" id={"option-" + child._id} name={"option"} className={"form-check-input transition duration-200 rounded-full cursor-pointer mt-0 w-[24px] min-w-[24px] min-h-[24px] h-[24px]"}/>
                <label htmlFor={"option-" + child._id} className={"text-left ml-3 truncate flex-1"}>{child.name}</label>
                <div className={"flex items-center -space-x-1"}>
                    {
                        _map(Object.values(userVote[child._id]).slice(0, 3), user => (
                            <img key={user._id} alt={"------"} src={`${process.env.REACT_APP_URL_S3_USER}/${user.image}`} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                        ))
                    }
                </div>
            </div>
        ));
    }

    const handleUpdatePoll = () => {
        const votesChange : {
            reasons: string[],
            reasonsCancel: string[]
        } = {
            reasons: [],
            reasonsCancel: []
        };
        const reasonChangeInformation = checkDidUserTakeAction();
        const defaultUserVote = reasonChangeInformation.defaultUserVote;
        const newVote = reasonChangeInformation.newVote;

        Object.keys(defaultUserVote).forEach(key => {
            if (defaultUserVote[key] === undefined && newVote[key] !== undefined) {
                votesChange.reasons.push(key)
            }
            if (defaultUserVote[key] !== undefined && newVote[key] === undefined) {
                votesChange.reasonsCancel.push(key)
            }
        })

        const body : UpdateNPSPayload = {
            conversationID: message.conversation,
            messageID: message._id,
            ...votesChange
        };
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