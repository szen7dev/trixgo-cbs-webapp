import React, {FC, useCallback, useContext, useEffect, useState} from "react"
import BellIcon from "assets/images/icons8-bell-100.svg";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {useDispatch, useSelector} from "react-redux";
import {updateUsersMuteToConversation} from "redux/reducer/messages/ListConversation";
import {MessageContext} from "../../../../index";
import {openNotificationMute, dismissNotificationMute} from "redux/reducer/messages/NotificationMute";
import {RootState} from "../../../../../../../../redux/reducer";

type Props = {
    chat: any
}
export const NotificationController:FC<Props> = ({chat}) => {
    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;
    const dispatch = useDispatch();
    const chatData = useSelector((state: RootState) => state.listConversation.data.listConversation[chat._id]);
    const {currentChat} = useContext(MessageContext);

    const checkedValue = useCallback(() => {
        return !(chatData.usersMute??[]).includes(profileId)
    }, [chatData.usersMute])

    const {updateMuteConversation} = UseListConversation()

    const [userMute, setUserMute] = useState(checkedValue());

    useEffect(() => {
        setUserMute(checkedValue())
    }, [currentChat, chatData.usersMute])

    const handleSetUserMute = (checked: boolean) => {
        setUserMute(checked)
        if (!checked) {
            dispatch(openNotificationMute({
                conversation: chat,
                handleClose: () => {
                    setUserMute(checkedValue())
                }
            }))
        } else {
            dispatch(dismissNotificationMute())
            handleTurnOffMute();
        }
    }

    const handleTurnOffMute = () => {
        const payload = {
            conversationID: chat._id,
            isMute: false,
        }
        updateMuteConversation(payload).then(data => {
            dispatch(updateUsersMuteToConversation({conversationId: data._id, usersMute: data.usersMute}))
            dispatch(dismissNotificationMute())
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
        </div>
    )
}