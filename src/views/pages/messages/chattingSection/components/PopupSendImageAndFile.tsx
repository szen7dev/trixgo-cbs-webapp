import {FC, Fragment, useRef, useState} from "react";
import { Dialog, Transition } from "@headlessui/react";
import {usePopupSendFiles} from "services/hooks/usePopupSendFiles";
import Close from "assets/icons/Close";

const PopupSendImageAndFile: FC = () => {
    const { isShowPopupSendFiles, closePopupSendFiles, popSendFilesContent } = usePopupSendFiles();
    const [fileType, setFileType] = useState("image");
    const focusElementRef = useRef<HTMLDivElement>(null);

    const handleConfirm = () => {
        console.log('asdasdasd')
    }
    return (
        <Transition appear show={isShowPopupSendFiles} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={closePopupSendFiles}
                initialFocus={focusElementRef}
            >
                <div ref={focusElementRef} className="min-h-screen flex items-center justify-center z-51">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-secondary-gray bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
            &#8203;
          </span>

                    {isShowPopupSendFiles && (
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className={"max-w-[521px] min-w-[420px] rounded-md shadow-lg bg-white p-[22px] z-51"}>
                                <div className={"flex w-full items-center"}>
                                    <button
                                        className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                        onClick={() => closePopupSendFiles()}
                                    >
                                        <Close/>
                                    </button>
                                    <div className={"flex-1 text-left text-lg font-bold"}>
                                        Gửi {popSendFilesContent.files.length}
                                    </div>
                                    <button
                                        onClick={() => handleConfirm()}
                                        className={"w-[95px] h-[32px] rounded-md bg-primary text-white"}
                                    >
                                        Gửi
                                    </button>
                                    <div className={"max-h-[737px] no-webkit-scrollbar"}>

                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    )}
                </div>
            </Dialog>
        </Transition>
    );
};

export default PopupSendImageAndFile;
