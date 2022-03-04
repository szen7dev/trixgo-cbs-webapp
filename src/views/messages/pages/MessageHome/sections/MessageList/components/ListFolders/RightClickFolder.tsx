import React, {FC} from "react";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import RemoveRedIcon from "assets/images/icons8-remove-48.svg";
import {openCreateUpdateFolder} from "redux/reducer/messages/CreateUpdateFolder";
import {useDispatch} from "react-redux";
import {useRightClickMenu} from "services/hooks/useRightClickMenu";

type Props = {
    folder: any
}
export const RightClickFolder:FC<Props> = ({folder}) => {
    const dispatch = useDispatch();
    const {closeRightClick} = useRightClickMenu();
    return (
        <div className={"rounded-md shadow-lg bg-white w-[216px] text-gray-500"}>
            <button
                onClick={() => {
                    dispatch(openCreateUpdateFolder({folder}))
                    setTimeout(() => {
                        closeRightClick()
                    }, 500)
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full reply-right-click"}>
                <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={PencilIcon}/>
                <div className={"mr-2 ml-4"}>Cập nhật thư mục</div>
            </button>
            <button
                onClick={() => {
                    console.log('adasd')
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full reply-right-click"}>
                <img alt={"------"} className={"mr-2 w-[24px] h-[24px]"} src={RemoveRedIcon}/>
                <div className={"mr-2 ml-4 text-negative"}>Xoá thư mục</div>
            </button>
        </div>
    )
}