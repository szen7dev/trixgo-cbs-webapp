import React, {FC} from "react";
import NotificationIcon from "assets/images/icons8-notification-96.svg";
import IconSelected from "assets/images/icons-web-select.svg";
import ExitRedIcon from "assets/images/icons8-exit-48.svg";
import RemoveRedIcon from "assets/images/icons8-remove-48.svg";
import {useDeleteConfirm} from "services/hooks/useDeleteConfirm";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import { Menu } from '@headlessui/react'

const MainChatOptions:FC = () => {
    const {openDeleteConfirm} = useDeleteConfirm();

    return (
        <Menu>
            <Menu.Button>
                <button className={"w-[40px] h-[40px] hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 rounded-full flex items-center justify-center"}>
                    <DotsVerticalIcon/>
                </button>
            </Menu.Button>
            <Menu.Items className={"absolute top-55px right-0 rounded-md shadow-lg bg-white min-w-[272px] text-gray-500"}>
                <Menu.Item>
                    <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img  src={NotificationIcon} alt={"bookmark"}/>
                        <div className={"flex-1 text-left ml-4"}>Mute</div>
                    </button>
                </Menu.Item>
                <Menu.Item>
                    <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img  src={IconSelected} alt={"add folder"}/>
                        <div className={"flex-1 text-left ml-4"}>Select messages</div>
                    </button>
                </Menu.Item>
                <Menu.Item>
                    <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img  className={"mr-2"} src={ExitRedIcon} alt={"exit"}/>
                        <div className={"flex-1 text-left ml-4 text-negative"}>Exit</div>
                    </button>
                </Menu.Item>
                <Menu.Item>
                    <button
                        onClick={() => openDeleteConfirm({
                            deleteAction: () => console.log('hiiii'),
                            // title: "Hello",
                            // message: "Oh shit"
                        })}
                        className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img  className={"mr-2"} src={RemoveRedIcon} alt={"exit"}/>
                        <div className={"flex-1 text-left ml-4 text-negative"}>Delete</div>
                    </button>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}

export default MainChatOptions
