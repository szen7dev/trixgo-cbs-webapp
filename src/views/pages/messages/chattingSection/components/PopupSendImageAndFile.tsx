import React, {FC, Fragment, useRef, useState} from "react";
import { Dialog, Transition } from "@headlessui/react";
import {usePopupSendFiles} from "services/hooks/usePopupSendFiles";
import Close from "assets/icons/Close";
import {map as _map} from "lodash";
import PDFIcon from "assets/images/CBS-PDF-Icon-48.svg";
import WordIcon from "assets/images/CBS-Word-Icon.svg";
import ExcelIcon from "assets/images/CBS-Excel-Icon.svg";
import SampleImage from "assets/images/icons8-image-256.svg";
import OtherIcon from "assets/images/CBS-Other-Icon.svg";
import {v4 as uuidv4} from "uuid";

const PopupSendImageAndFile: FC = () => {
    const { isShowPopupSendFiles, closePopupSendFiles, popSendFilesContent } = usePopupSendFiles();
    const focusElementRef = useRef<HTMLDivElement>(null);
    const imageClass = ["w-1/2","w-1/2","w-1/2","w-1/2","w-1/3"]
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const [content, setContent] = useState("");
    const [useCompress, setUseCompress] = useState(true);

    const renderFileTypeImage = (file:any) => {
        const filename = file.name;
        const extension = filename.split(".").pop();
        switch (extension){
            case "pdf":
                return <img className={"w-[48px] h-[48px]"} src={PDFIcon} alt={"icon pdf"}/>
            case "doc":
            case "docx":
                return <img className={"w-[48px] h-[48px]"} src={WordIcon} alt={"icon word"}/>
            case "xlsx":
            case "xls":
                return <img className={"w-[48px] h-[48px]"} src={ExcelIcon} alt={"icon excel"}/>
            case "jpg":
            case "jpeg":
            case "png":
                return <img className={"w-[48px] h-[48px]"} src={SampleImage} alt={"icon images"}/>
            default:
                return <img className={"w-[48px] h-[48px]"} src={OtherIcon} alt={"icon other"}/>
        }
    }

    const formatBytes = (bytes: number, decimals = 3) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const renderPreviewFile = () => {
        if (popSendFilesContent.sendType==="image") {
            if (popSendFilesContent.files.length === 1) {
                return <div className={"flex items-center justify-center"}>
                    <img alt={"----"} className={"max-h-[320px] rounded-lg overflow-hidden"} src={popSendFilesContent.files[0].file.file.url}/>
                </div>
            }
            if (popSendFilesContent.files.length === 2) {
                return <div className={"flex flex-wrap"}>
                    {
                        _map(popSendFilesContent.files, (image,index) => (
                            <div className={"w-1/2 p-1"} key={index}>
                                <img alt={"----"} className={"w-full rounded-lg overflow-hidden"} src={image.file.file.url}/>
                            </div>
                        ))
                    }
                </div>
            }
            if (popSendFilesContent.files.length === 3) {
                return <div className={"flex"}>
                    <div className={"p-1"}>
                        <img alt={"----"} className={"w-full rounded-lg overflow-hidden"} src={popSendFilesContent.files[0].file.file.url}/>
                    </div>
                    <div className={"flex"}>
                        <div className={"p-1"}>
                            <img alt={"----"} className={"w-full rounded-lg overflow-hidden"} src={popSendFilesContent.files[1].file.file.url}/>
                        </div>
                        <div className={"p-1"}>
                            <img alt={"----"} className={"w-full rounded-lg overflow-hidden"} src={popSendFilesContent.files[2].file.file.url}/>
                        </div>
                    </div>
                </div>
            }
            return <div className={"flex flex-wrap"}>
                {
                    _map(popSendFilesContent.files, (image,index) => (
                        <div className={(imageClass[index]??"w-1/3") + " p-1"} key={index}>
                            <img alt={"----"} className={"w-full rounded-lg overflow-hidden"} src={image.file.file.url}/>
                        </div>
                    ))
                }
            </div>
        } else {
            return _map(popSendFilesContent.files, file => (
                <div key={file._id} className={"message-file-content flex mb-1"}>
                    {renderFileTypeImage(file.file.file)}
                    <div className={"flex-1 flex flex-col justify-center ml-[7px]"}>
                        <a href={file.file.file.url} download className={"mb-[2px] hover:text-primary"}>{file.file.file.name}</a>
                        <div className={"text-primary"}>{formatBytes(file.file.file.size)}</div>
                    </div>
                </div>
            ))
        }
    }

    const handleConfirm = () => {
        const message: any = {
            tmpid: uuidv4(),
            conversationID: popSendFilesContent.conversationID,
            content: "",
            sender: {
                _id: profileId
            },
            type: popSendFilesContent.sendType==="image"?1:2,
            usersTag: [],
            createAt: new Date(),
            files: popSendFilesContent.files
        };
        closePopupSendFiles();
        popSendFilesContent.handleSendFile(message,useCompress)
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
                                        Gửi {popSendFilesContent.files.length} {popSendFilesContent.sendType==="image"? "ảnh" : "tệp"}
                                    </div>
                                    <button
                                        onClick={() => handleConfirm()}
                                        className={"w-[95px] h-[32px] rounded-md bg-primary text-white"}
                                    >
                                        Gửi
                                    </button>
                                </div>
                                <div className={"max-h-[737px] mt-[15px] no-webkit-scrollbar overflow-auto"}>
                                    {renderPreviewFile()}
                                </div>
                                {
                                    popSendFilesContent.sendType === "image" &&
                                    <div className={"flex mt-4"}>
                                        <input
                                            checked={useCompress}
                                            onChange={event => setUseCompress(event.target.checked)}
                                            className="form-check-input" type="checkbox" value="" id="compress"/>
                                        <label className={"ml-2"} htmlFor="compress">Nén ảnh</label>
                                    </div>
                                }
                                <input
                                    value={content}
                                    onChange={event => setContent(event.target.value)}
                                    className={"rounded-md h-[50px] border w-full border-gray-300 mt-4 px-[10px]"} placeholder={"Nội dung"}/>
                            </div>
                        </Transition.Child>
                    )}
                </div>
            </Dialog>
        </Transition>
    );
};

export default PopupSendImageAndFile;
