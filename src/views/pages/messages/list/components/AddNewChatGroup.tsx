import React, {createContext, FC, useMemo, useState} from "react";
import iconPencilWhite from "assets/images/icons8-pencil-64.svg";
import arrowRightWhite from "assets/images/icon-arrow-right-white.svg";
import AddNewSection from "./AddNew";
import {LazyLoadImage} from "react-lazy-load-image-component";

export const AddNewChatGroupContext = createContext<{
    showAddNew: boolean;
    setShowAddNew: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    showAddNew: false,
    setShowAddNew: () => undefined,
});
const AddNewChatGroup:FC = () => {
    const [showAddNew, setShowAddNew] = useState(false);
    const value = useMemo(
        () => ({ showAddNew, setShowAddNew }),
        [showAddNew]
    );

    return (
        <AddNewChatGroupContext.Provider value={value}>
            <button onClick={() => setShowAddNew(true)} className={"w-[56px] h-[56px] rounded-full absolute bottom-20px right-20px z-5 bg-primary flex items-center justify-center z-15 group-hover:opacity-100 opacity-0 " + (showAddNew?'none':'block')}>
                <LazyLoadImage effect="blur" src={iconPencilWhite} alt={"Pencil icon"}/>
            </button>
            <button className={"w-[56px] h-[56px] rounded-full absolute bottom-20px right-20px z-5 bg-primary flex items-center justify-center z-15 " + (!showAddNew?'hidden':'block')}>
                <LazyLoadImage effect="blur" src={arrowRightWhite} alt={"right icon"}/>
            </button>
            {
                showAddNew&&
                <AddNewSection/>
            }
        </AddNewChatGroupContext.Provider>
    )
}

export default AddNewChatGroup