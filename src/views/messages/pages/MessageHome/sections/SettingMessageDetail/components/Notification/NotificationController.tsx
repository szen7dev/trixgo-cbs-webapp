import React, {FC, useCallback, useEffect, useState} from "react"
import BellIcon from "assets/images/icons8-bell-100.svg";
import {NotificationMutePopup} from "./NotificationMutePopup";

type Props = {
    chat: any
}
export const NotificationController:FC<Props> = ({chat}) => {
    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;

    const checkedValue = useCallback(() => {
        return !(chat.usersMute??[]).includes(profileId)
    }, [chat.usersMute])

    const [userMute, setUserMute] = useState(checkedValue());
    const [showPopupMute, setShowPopupMute] = useState(false);

    const handleSetUserMute = (checked: boolean) => {
        setUserMute(checked);
        // if (!checked) {
        //     setShowPopupMute(true);
        // } else {
        //     setShowPopupMute(false);
        // }
    }

    const handleCloseConfirmBox = () => {
        setUserMute(checkedValue())
    }

    return (
        <div className={"flex justify-between items-center p-[17px] bg-white"}>
            <img  src={BellIcon} alt={"...."}/>
            <div className={"flex-1 text-left ml-4"}>Notifications</div>
            <input
                onChange={event => handleSetUserMute(event.target.checked)}
                // checked={userMute}
                defaultChecked={checkedValue()}
                className="form-switch form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
            <NotificationMutePopup isShow={showPopupMute} handleClose={() => setShowPopupMute(false)} afterClose={() => handleCloseConfirmBox()}/>
        </div>
    )
}