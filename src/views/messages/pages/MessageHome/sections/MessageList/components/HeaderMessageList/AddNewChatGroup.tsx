import React, {createContext, FC, useCallback, useContext, useMemo, useState} from "react";
import iconPencilWhite from "assets/images/icons8-pencil-64.svg";
import arrowRightWhite from "assets/images/icon-arrow-right-white.svg";
import {AddNewSection} from "../AddNewSection";

import {CreateConversationPayload} from "typings/apis/messages/listConversation";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {MessageContext, populates} from "../../../../index";

export const AddNewChatGroupContext = createContext<{
    showAddNew: boolean;
    setShowAddNew: React.Dispatch<React.SetStateAction<boolean>>;
    paramsConversation: CreateConversationPayload;
    setParamsConversation: React.Dispatch<React.SetStateAction<CreateConversationPayload>>;
}>({
    showAddNew: false,
    setShowAddNew: () => undefined,
    paramsConversation: {
        name: "",
        description: "",
        isPrivate: true,
        membersID: []
    },
    setParamsConversation: () => undefined
});
export const AddNewChatGroup:FC = () => {
    const [showAddNew, setShowAddNew] = useState(false);
    const [paramsConversation, setParamsConversation] = useState<CreateConversationPayload>({
        name: "",
        description: "",
        isPrivate: true,
        membersID: []
    })
    const {setCurrentChat,socketRef} = useContext(MessageContext)
    const socket = socketRef.current;

    const {createConversation} = UseListConversation();
    const value = useMemo(
        () => ({ showAddNew, setShowAddNew, paramsConversation, setParamsConversation }),
        [showAddNew,paramsConversation]
    );

    const createNewConversation = async () => {
        createConversation(paramsConversation).then(data => {
            setShowAddNew(false);
            setParamsConversation({
                name: "",
                description: "",
                isPrivate: true,
                membersID: []
            });
            socket.emit('CHATTING_CSS_NEW_CONVERSATION',{conversationID: data._id})
            socket.emit('CHATTING_CSS_GET_INFO_CONVERSATION', {
                conversationID: data._id,
                populates
            });
            setCurrentChat(data._id);
            window.location.hash = `#${data._id}`
        });
    }

    const checkDisableCondition = useCallback(() => {
        if (paramsConversation.isPrivate) {
            return paramsConversation.membersID.length < 1
        } else {
            return paramsConversation.membersID.length <= 1 || paramsConversation.name.length <= 0
        }
    }, [paramsConversation])
    return (
        <AddNewChatGroupContext.Provider value={value}>
            <button onClick={() => setShowAddNew(true)} className={"w-[56px] h-[56px] rounded-full absolute bottom-20px right-20px z-5 bg-primary flex items-center justify-center z-15 group-hover:opacity-100 opacity-0 " + (showAddNew?'hidden':'block')}>
                <img  src={iconPencilWhite} alt={"Pencil icon"}/>
            </button>
            <button
                disabled={checkDisableCondition()}
                onClick={() => createNewConversation()}
                className={"w-[56px] h-[56px] rounded-full absolute bottom-20px right-20px z-5 bg-primary flex items-center justify-center z-15 disabled:bg-gray-300 " + (!showAddNew?'hidden':'block')}>
                <img  src={arrowRightWhite} alt={"right icon"}/>
            </button>
            {
                showAddNew&&
                <AddNewSection/>
            }
        </AddNewChatGroupContext.Provider>
    )
}