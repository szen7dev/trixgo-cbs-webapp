import { FC } from "react";
import { Menu } from '@headlessui/react';

import DotsVerticalIcon from "assets/icons/DotsVertical";

type Props = {
    view?: string | React.ReactNode;
    classNameItem?: string;
    children: React.ReactNode
}

export const DropdownOption: FC<Props> = ({ view: View, classNameItem, children }) => {
    return (
        <Menu as="div" className="relative inline-block  z-50">
            <Menu.Button className={"w-[40px] h-[40px] hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 rounded-full flex items-center justify-center"}>
                {View ? View : <DotsVerticalIcon/>}
            </Menu.Button>
            <Menu.Items className={"absolute top-55px right-3 rounded-md shadow-lg bg-white min-w-[250px] text-gray-500 cursor-pointer z-50 " + classNameItem}>
               {children}
            </Menu.Items>
        </Menu>
    )
}