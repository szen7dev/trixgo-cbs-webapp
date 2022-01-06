import React, {FC, useContext} from "react";
import IconBackGray from "assets/images/icon-back-gray.svg";
import {AddNewChatGroupContext} from "../AddNewChatGroup";
import DropdownSearchable from "../../../../../../components/common/DropdownSearch";

const AddNewSection:FC = () => {
    const {setShowAddNew} = useContext(AddNewChatGroupContext);
    const backGround = [
        "#84BBE4",
        "#8DD4D6",
        "#FCC4A2",
        "#A6DA95",
        "#0060E1",
        "#4781CF",
        "#F089B7",
    ]
    const getPresentGroupName = (textName: string|number|undefined) => {
        if (!textName) return '';
        return textName.toString().split(' ').slice(0, 2).map((text: string) => {
            return text.charAt(0)
        });
    }

    const getColor = () => {
        return backGround[Math.floor(Math.random() * 7)%7]
    }

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
            <div className={"w-full px-[20px] mt-[30px] group relative"}>
                <label className={"absolute -top-2 left-8 bg-white group-focus:text-primary group-hover:text-primary text-gray-300 z-15"}>Group Name</label>
                <input className={"add-group-name relative w-full focus:outline-none group-hover:border-primary group-focus:border-primary border border-gray-300 h-[50px] rounded-lg px-[16px]"}/>
            </div>
            <div className={"w-full mt-[20px]"}>
                <DropdownSearchable
                    className={"border-t border-b border-gray-200 py-[15px] px-[20px]"}
                    maxWidthInput={"w-full"}
                    allowClearValueSingleInput={true}
                    inlineSearch={true}
                    showTriangle={false}
                    renderSelectedItem={item => (
                        <div className={"flex items-center"}>
                            <div className={"w-[20px] h-[20px] rounded-full text-white text-center leading-[20px] mr-[5px]"} style={{background: getColor()}}>
                                {getPresentGroupName(item.text)}
                            </div>
                            <span>{item.text}</span>
                        </div>
                    )}
                    data={[
                        {
                            "_id": 1,
                            "content":"Trần Thanh Quang"
                        },
                        {
                            "_id": 2,
                            "content":"Trần Thanh Quang 2"
                        },
                        {
                            "_id": 3,
                            "content":"Trần Thanh Quang 3"
                        },
                        {
                            "_id": 4,
                            "content":"Trần Thanh Quang 4"
                        },
                    ]}
                    formatItem={{
                        id : "_id",
                        text : "content"
                    }}
                    isMultiple={true}
                />
            </div>
        </div>
    )
}

export default AddNewSection;
