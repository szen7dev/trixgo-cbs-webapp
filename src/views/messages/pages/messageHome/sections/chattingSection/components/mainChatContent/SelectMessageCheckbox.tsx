import React, {FC, useContext} from "react";
import {removeSelectedMessage, setSelectedMessages} from "redux/reducer/messages/ListMessage";
import {useDispatch, useSelector} from "react-redux";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {MessageContext} from "../../../../MessageHome";
import {RootState} from "redux/reducer";

type Props = {
    message: ItemMessage;
}
export const SelectMessageCheckbox:FC<Props> = ({message}) => {
    const dispatch = useDispatch();
    const {currentChat} = useContext(MessageContext);
    const listSelectedMessage = useSelector((state: RootState) => state.listMessage.data.listSelectedMessage[currentChat]);
    const selectedState = useSelector((state: RootState) => state.listMessage.data.selectedState[currentChat]);

    const handleSelectedMessage = (checked: boolean) => {
        if (checked) {
            dispatch(setSelectedMessages({selectedMessages: [message], conversationId: message.conversation}))
        } else {
            dispatch(removeSelectedMessage({conversationId: message.conversation, messageId: message._id}))
        }
    };

    if ((!listSelectedMessage||Object.keys(listSelectedMessage).length <= 0)&&!selectedState) return null;
    return (
        <input checked={Object.keys(listSelectedMessage??{}).includes(message._id)} onChange={event => handleSelectedMessage(event.target.checked)} type="checkbox" className="form-check-input transition duration-200 rounded-full cursor-pointer min-w-[24px] min-h-[24px] w-[24px] h-[24px] bg-transparent border-white checked:bg-positive" />
    )
};