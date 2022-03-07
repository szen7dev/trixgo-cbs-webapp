import React, {FC, useCallback, useContext, useEffect, useState} from "react"
import BellIcon from "assets/images/icons8-bell-100.svg";
import {NotificationMutePopup} from "./NotificationMutePopup";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {useDispatch} from "react-redux";
import {updateUsersMuteToConversation} from "redux/reducer/messages/ListConversation";
import {MessageContext} from "../../../../index";

type Props = {
    chat: any
}
export const NotificationController:FC<Props> = ({chat}) => {
    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;
    const dispatch = useDispatch();
    const {currentChat} = useContext(MessageContext);

    const checkedValue = useCallback(() => {
        return !(chat.usersMute??[]).includes(profileId)
    }, [chat.usersMute])
    const {updateMuteConversation} = UseListConversation()

    const [userMute, setUserMute] = useState(checkedValue());
    const [showPopupMute, setShowPopupMute] = useState(false);

    useEffect(() => {
        setUserMute(checkedValue())
    }, [currentChat])

    const handleSetUserMute = (checked: boolean) => {
        setUserMute(checked)
        if (!checked) {
            setShowPopupMute(true);
        } else {
            setShowPopupMute(false);
            handleConfirmMute(undefined, false);
        }
    }

    const handleConfirmMute = (date: string|undefined, mute: boolean) => {
        const payload = {
            conversationID: chat._id,
            isMute: mute,
            timeMute: date?date.toString():undefined,
        }
        updateMuteConversation(payload).then(data => {
            dispatch(updateUsersMuteToConversation({conversationId: data._id, usersMute: data.usersMute}))
            setShowPopupMute(false)
        })
    }

    return (
        <div className={"flex justify-between items-center p-[17px] bg-white"}>
            <img  src={BellIcon} alt={"...."}/>
            <div className={"flex-1 text-left ml-4"}>Notifications</div>
            <input
                onChange={event => handleSetUserMute(event.target.checked)}
                checked={userMute}
                // defaultChecked={checkedValue()}
                className="form-switch form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
            <NotificationMutePopup
                isShow={showPopupMute}
                handleClose={() => {
                    setShowPopupMute(false);
                    setUserMute(checkedValue())
                }}
                handleConfirmMute={(date) => handleConfirmMute(date, true)}/>
        </div>
    )
}