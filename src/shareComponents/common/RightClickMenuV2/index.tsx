import React, {FC, Fragment, useEffect, useRef} from "react";

import { Dialog, Transition } from "@headlessui/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {closeRightClick} from "redux/reducer/RightClickMenu";

export const RightClickMenuV2: FC = () => {
    const {isRightClickMenuOpen, rightClickMenuContent} = useSelector((state: RootState) => state.rightClickMenu.data);
    const dispatch = useDispatch();

    useEffect(() => {
        const listener = (event: Event) => {
            const wrapper = document.getElementById('right-click-menu-container');
            if (wrapper && !wrapper.contains(event.target as Node)) {
                dispatch(closeRightClick());
            }
        };
        document.addEventListener("mousedown", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [isRightClickMenuOpen]);

    return (
        <Transition appear show={isRightClickMenuOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={() => {
                    dispatch(closeRightClick());
                }}
            >
                <div className="min-h-screen relative">
                    {/* This element is to trick the focus contents. */}
                    <button>&#8203;</button>

                    {isRightClickMenuOpen && (
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-150"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                           <div
                               id={'right-click-menu-container'}
                               className={"max-w-[216px] absolute"}
                               style={{
                                   top: `${rightClickMenuContent.y}px`,
                                   left: `${rightClickMenuContent.x}px`,
                               }}
                           >
                               {rightClickMenuContent.content}
                           </div>
                        </Transition.Child>
                    )}
                </div>
            </Dialog>
        </Transition>
    );
};
