import React, {FC, useEffect, useState} from "react";
import {GetNPSPleasantDetailData, GetNPSPleasantDetailItem, ItemMessage} from "typings/apis/messages/listMessage";
import {UseConversation} from "services/hooks/messages/useConversation";
import {map as _map} from "lodash";
import {Transition} from "@headlessui/react";

type Props = {
    message: ItemMessage;
    isOpenMessageNPSVoteDetail: boolean;
    setSeeingDetail: (show: boolean) => void;
    seeingDetail: boolean
}
export const NPSPleasantVoteDetail:FC<Props> = ({message, isOpenMessageNPSVoteDetail, setSeeingDetail, seeingDetail}) => {
    const [reasons, setReasons] = useState<GetNPSPleasantDetailData>([]);
    const [reasonDetail, setReasonDetail] = useState<{isShowing: boolean, reason: GetNPSPleasantDetailItem|null}>({
        isShowing: false,
        reason: null
    })

    const handleCheckDetail = (reason: GetNPSPleasantDetailItem) => {
        setSeeingDetail(true)
        setReasonDetail({isShowing: true, reason})
    }

    const {getReasonStatisticsNps} = UseConversation();
    useEffect(() => {
        getReasonStatisticsNps({
            conversationID: message.conversation,
            messageID: message._id
        }).then(data => {
            setReasons(data)
        })
    },[isOpenMessageNPSVoteDetail])

    useEffect(() => {
        if (!seeingDetail) {
            setReasonDetail({
                isShowing: false,
                reason: null
            })
        }
    },[seeingDetail])

    return <>
        <p className={"px-[22px] mb-5"}>Lý do không hài lòng <b>“{message.nps.service.name}”</b></p>
        {
            _map(reasons, (reason: GetNPSPleasantDetailItem) => (
                <div key={reason.reason._id} className={"border-b border-gray-200 flex py-4 px-[22px] cursor-pointer"}
                     onClick={() => handleCheckDetail(reason)}
                >
                    <div className={"flex-1"}>{reason.reason.name}</div>
                    <div>{reason.total}</div>
                </div>
            ))
        }
        <Transition
            className={"absolute top-0 w-full h-full max-h-[500px] min-h-[450px]  bg-white"}
            show={reasonDetail.isShowing}
            enter="transition ease-out duration-50"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-out duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <p className={"px-[22px] mb-5"}>Lý do không hài lòng <b>“{message.nps.service.name} - {reasonDetail.reason?.reason.name}”</b></p>
            <div className={"overflow-auto"}>
                {
                    _map(reasonDetail.reason?.users, user => (
                        <div key={user._id} className={"flex py-4 px-[22px] items-center"}>
                            <img alt={user.bizfullname} src={`${process.env.REACT_APP_URL_S3_USER}/${user.image}`} className={"w-[44px] h-[44px] rounded-full overflow-hidden object-cover"}/>
                            <div className={"flex-1 ml-3"}>{user.bizfullname}</div>
                        </div>
                    ))
                }
            </div>
        </Transition>
    </>
}