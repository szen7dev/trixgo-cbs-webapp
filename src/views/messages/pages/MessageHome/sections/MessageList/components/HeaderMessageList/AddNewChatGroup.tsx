import React, {createContext, FC, useMemo, useState} from "react";
import {AddNewSection} from "../AddNewSection";
import chatIcon from "assets/images/icons8-chat-48.svg";

export const AddNewChatGroupContext = createContext<{
    showAddNew: boolean;
    setShowAddNew: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    showAddNew: false,
    setShowAddNew: () => undefined,
});
export const AddNewChatGroup:FC = () => {
    const [showAddNew, setShowAddNew] = useState(false);
    const value = useMemo(
        () => ({ showAddNew, setShowAddNew}),
        [showAddNew]
    );

    return (
        <AddNewChatGroupContext.Provider value={value}>
            <button onClick={() => setShowAddNew(true)} className={"bg-cbs-blue-button rounded-md flex items-center justify-center text-xl text-primary-gray py-2 px-4"}>
                <img src={chatIcon} alt={"Chat"}/>
                <span>Tạo mới</span>
            </button>
            <AddNewSection/>
        </AddNewChatGroupContext.Provider>
    )
}