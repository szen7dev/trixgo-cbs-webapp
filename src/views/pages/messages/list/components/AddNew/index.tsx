import React, {FC, useContext} from "react";
import IconBackGray from "assets/images/icon-back-gray.svg";
import {AddNewChatGroupContext} from "../AddNewChatGroup";

const AddNewSection:FC = () => {
    const {setShowAddNew} = useContext(AddNewChatGroupContext);
    return (
        <div className={"absolute top-0 w-full h-full bg-white z-10"}>
            <div className={"sticky top-0 bg-white w-full flex h-[56px] px-[28px] items-center"}>
                <button onClick={() => setShowAddNew(false)} className={"flex items-center justify-center"}>
                    <img src={IconBackGray} alt={"----"}/>
                </button>
                <div className={"text-lg ml-5"}>
                    Nhóm mới
                </div>
            </div>
        </div>
    )
}

export default AddNewSection;