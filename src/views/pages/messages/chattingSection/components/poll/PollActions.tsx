import React, {FC, Fragment, ReactNode, useCallback, useContext, useRef, useState} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {map as _map} from "lodash";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import MemberVote from "assets/images/icons-member-vote.svg";

import moment from "moment";
import {UseConversation} from "services/hooks/messages/useConversation";
import {MessageContext} from "../../../home/index_v2";

type Props = {
    message: ItemMessage;
    chat: ItemListConversation;
    isOpen: boolean;
    setCloseVote: () => void;
}
const PollAction:FC<Props> = ({message,chat, isOpen, setCloseVote}) => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profile = JSON.parse(currentUser);
    const profileId = profile?._id;
    const {updatePoll} = UseConversation();
    const focusElementRef = useRef<HTMLDivElement>(null);
    const {socketRef} = useContext(MessageContext);
    const socket = socketRef.current;

    const mapUserVote = () => {
        const votes : {[key: string]: {
                bizfullname: string
                fullname: string
                image: string
                _id: string
        }[]} = {};
        message.poll.options.forEach(option => {
            votes[option._id] = option.usersVote;
        })

        return votes;
    }

    const [userVote, setUserVote] = useState<{[key: string]: {
            bizfullname: string
            fullname: string
            image: string
            _id: string
        }[]}>(mapUserVote());

    const checkDidUserTakeAction = useCallback(() => {
        let didChange = false;
        const defaultUserVote : {[key: string]: string|undefined} = {};
        message.poll.options.forEach(option => {
            defaultUserVote[option._id] = option.usersVote.find(vote => vote._id === profileId)?._id;
        })

        const newVote : {[key:string] : string|undefined} = {}
        Object.keys(userVote).forEach(key => {
            newVote[key] = userVote[key].find(vote => vote._id === profileId)?._id;
        })

        //do compare
        message.poll.options.forEach(option => {
            if (defaultUserVote[option._id] !== newVote[option._id]) {
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
    }, [userVote, message])

    const usersVote = useCallback(() => {
        const userVote : string[] = [];
        message.poll.options.forEach(option => {
            option.usersVote.forEach(user => {
                if (!userVote.includes(user._id)) {
                    userVote.push(user._id)
                }
            })
        })

        return userVote.length;
    }, [message, userVote])

    const handleSelectOption = (value: boolean, option: any) => {
        const selected = {...userVote};

        if (value) {
            selected[option._id] = [...selected[option._id],{
                _id: profileId,
                bizfullname: profile.bizfullname,
                fullname: profile.fullname,
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

    const handleSendVote = () => {
        const votesChange : {
            newVotes: string[],
            votesCancel: string[]
        } = {
            newVotes: [],
            votesCancel: []
        };
        const voteChangeInformation = checkDidUserTakeAction();
        const defaultUserVote = voteChangeInformation.defaultUserVote;
        const newVote = voteChangeInformation.newVote;

        Object.keys(defaultUserVote).forEach(key => {
            if (defaultUserVote[key] === undefined && newVote[key] !== undefined) {
                votesChange.newVotes.push(key)
            }
            if (defaultUserVote[key] !== undefined && newVote[key] === undefined) {
                votesChange.votesCancel.push(key)
            }
        })

        updatePoll({
            conversationID: message.conversation,
            messageID: message._id,
            ...votesChange
        }).then(data => {
            socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessage);
            socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessageNotification);
            setCloseVote()
        })
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => setCloseVote()}
                initialFocus={focusElementRef}
            >
                <div ref={focusElementRef} className="min-h-screen flex items-center justify-center z-51">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                    &#8203;
                  </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className={"w-[400px] rounded-md shadow-lg bg-white p-[22px] z-51"}>
                            <div className={"flex w-full items-center mb-4"}>
                                <button
                                    className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                    onClick={() => setCloseVote()}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    Bình chọn
                                </div>
                                <button
                                    disabled={!checkDidUserTakeAction().didChange}
                                    onClick={() => handleSendVote()}
                                    className={"h-[36px] w-[105px] rounded-md bg-primary text-white disabled:bg-gray-300"}
                                >
                                    Xác nhận
                                </button>
                            </div>
                            <div className={"text-lg font-bold"}>
                                {message.poll.name}
                            </div>
                            <div className={"text-xs text-gray-400 border-b border-gray-200 pb-[14px]"}>
                                {message.sender.bizfullname} {moment(message.createAt).startOf('hour').fromNow()}
                            </div>
                            <div className={"text-xs text-primary flex items-center mt-[12px]"}>
                                <span className={"mr-3"}>{usersVote()} thành viên bình chọn</span> <img src={MemberVote} alt={"----"}/>
                            </div>
                            <div
                                className={"mt-[12px]"}
                            >
                                {
                                    _map(message.poll.options, option => (
                                        <div
                                            className={"rounded-md bg-gray-100 h-[40px] mb-[10px] relative overflow-hidden"}
                                            key={option._id}
                                        >
                                            <div className={"bg-accent absolute h-full transition-all"} style={{width: `${(userVote[option._id].length/chat.members.length)*100}%`}}>
                                            </div>
                                            <div className={"absolute h-full w-full flex items-center px-[17px]"}>
                                                <input
                                                    onChange={event => handleSelectOption(event.target.checked, option)}
                                                    defaultChecked={userVote[option._id].find(vote => vote._id === profileId) !== undefined}
                                                    type="checkbox" className="form-check-input transition duration-200 rounded-full cursor-pointer w-[24px] h-[24px] bg-white border-white checked:bg-primary" />
                                                <div className={"truncate flex-1 ml-2"}>
                                                    {option.title}
                                                </div>
                                                <div className={"flex items-center -space-x-1"}>
                                                    {
                                                        _map(Object.values(userVote[option._id]).slice(0, 3), user => (
                                                            <img key={user._id} alt={"------"} src={`${process.env.REACT_APP_URL_S3_USER}/${user.image}`} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                                                        ))
                                                    }
                                                    {
                                                        Object.values(userVote[option._id]).length - 3 > 0 &&
                                                        <div className={"w-[16px] h-[16px] text-xs rounded-full overflow-hidden bg-gray-300 text-gray-500 border border-white"}>
                                                            {Object.values(userVote[option._id]).length - 3}+
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default PollAction;
