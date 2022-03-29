import React, {FC, Fragment, useCallback, useEffect, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import {map as _map} from "lodash";
import PDFIcon from "assets/images/CBS-PDF-Icon-48.svg";
import WordIcon from "assets/images/CBS-Word-Icon.svg";
import ExcelIcon from "assets/images/CBS-Excel-Icon.svg";
import SampleImage from "assets/images/icons8-image-256.svg";
import OtherIcon from "assets/images/CBS-Other-Icon.svg";
import {v4 as uuidv4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {closePopupSendFiles} from "redux/reducer/messages/PopupSendImageAndFile"

export const PopupSendImageAndFile: FC = () => {
    const {isShowPopupSendFiles, popSendFilesContent} = useSelector((state: RootState) => state.popUpSendFileAndImage.data);
    const dispatch = useDispatch();

    const focusElementRef = useRef<HTMLDivElement>(null);
    const imageClass = ["w-1/2","w-1/2","w-1/2","w-1/2","w-1/3"]
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const [content, setContent] = useState("");
    const [useCompress, setUseCompress] = useState(true);
    const inputDescription = useRef<HTMLInputElement>(null);
    useEffect(() => {
        isShowPopupSendFiles&&setTimeout(() => {
            if (inputDescription&&inputDescription.current) {
                inputDescription.current.focus()
            }
        }, 500)
    },[isShowPopupSendFiles])

    const haveLargeFile = useCallback(() => {
        if (isShowPopupSendFiles) {
            return popSendFilesContent.files.some(file => file.file.size > 50000000);
        }
        return false
    }, [isShowPopupSendFiles])

    const renderFileTypeImage = (file:any) => {
        const filename = file.name;
        const extension = filename.split(".").pop();
        switch (extension){
            case "pdf":
                return <img  className={"w-[48px] h-[48px]"} src={PDFIcon} alt={"icon pdf"}/>
            case "doc":
            case "docx":
                return <img  className={"w-[48px] h-[48px]"} src={WordIcon} alt={"icon word"}/>
            case "xlsx":
            case "xls":
                return <img  className={"w-[48px] h-[48px]"} src={ExcelIcon} alt={"icon excel"}/>
            case "jpg":
            case "jpeg":
            case "png":
                return <img  className={"w-[48px] h-[48px]"} src={SampleImage} alt={"icon images"}/>
            default:
                return <img  className={"w-[48px] h-[48px]"} src={OtherIcon} alt={"icon other"}/>
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
                return <div className={"flex items-center justify-center relative"}>
                    <img  alt={"----"} className={"max-h-[320px] rounded-lg overflow-hidden"} src={popSendFilesContent.files[0].file.url}/>
                    {
                        !useCompress&&
                        <div className={"bg-gray-300 bg-opacity-60 absolute top-2 right-2 px-2 py-1 rounded-md font-bold"}>
                            HD
                        </div>
                    }
                </div>
            }
            if (popSendFilesContent.files.length === 2) {
                return <div className={"flex flex-wrap"}>
                    {
                        _map(popSendFilesContent.files, (image,index) => (
                            <div className={"w-1/2 p-1 relative"} key={index}>
                                <img  alt={"----"} className={"w-full rounded-lg overflow-hidden"} src={image.file.url}/>
                                {
                                    !useCompress&&
                                    <div className={"bg-gray-300 bg-opacity-60 absolute top-2 right-2 px-2 py-1 rounded-md font-bold"}>
                                        HD
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            }
            if (popSendFilesContent.files.length === 3) {
                return <div className={"flex"}>
                    <div className={"p-1 relative"}>
                        <img  alt={"----"} className={"w-full rounded-lg overflow-hidden"} src={popSendFilesContent.files[0].file.url}/>
                        {
                            !useCompress&&
                            <div className={"bg-gray-300 bg-opacity-60 absolute top-2 right-2 px-2 py-1 rounded-md font-bold"}>
                                HD
                            </div>
                        }
                    </div>
                    <div className={"flex"}>
                        <div className={"p-1 relative"}>
                            <img  alt={"----"} className={"w-full rounded-lg overflow-hidden"} src={popSendFilesContent.files[1].file.url}/>
                            {
                                !useCompress&&
                                <div className={"bg-gray-300 bg-opacity-60 absolute top-2 right-2 px-2 py-1 rounded-md font-bold"}>
                                    HD
                                </div>
                            }
                        </div>
                        <div className={"p-1 relative"}>
                            <img  alt={"----"} className={"w-full rounded-lg overflow-hidden"} src={popSendFilesContent.files[2].file.url}/>
                            {
                                !useCompress&&
                                <div className={"bg-gray-300 bg-opacity-60 absolute top-2 right-2 px-2 py-1 rounded-md font-bold"}>
                                    HD
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            return <div className={"flex flex-wrap"}>
                {
                    _map(popSendFilesContent.files, (image,index) => (
                        <div className={(imageClass[index]??"w-1/3") + " p-1 relative"} key={index}>
                            <img  alt={"----"} className={"w-full rounded-lg overflow-hidden"} src={image.file.url}/>
                            {
                                !useCompress&&
                                <div className={"bg-gray-300 bg-opacity-60 absolute top-2 right-2 px-2 py-1 rounded-md font-bold"}>
                                    HD
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        } else {
            return _map(popSendFilesContent.files, file => (
                <div key={file._id} className={"message-file-content flex mb-1"}>
                    {renderFileTypeImage(file.file)}
                    <div className={"flex-1 flex flex-col justify-center ml-[7px]"}>
                        <a href={file.file.url} download className={"mb-[2px] hover:text-primary"}>{file.file.name}</a>
                        <div className={"text-primary"}>{formatBytes(file.file.size)}</div>
                    </div>
                </div>
            ))
        }
    }

    const handleConfirm = () => {
        const message: any = {
            tmpid: uuidv4(),
            conversationID: popSendFilesContent.conversationID,
            content: inputDescription?.current?.value,
            sender: {
                _id: profileId
            },
            type: (popSendFilesContent.sendType==="image")? ((!useCompress&&haveLargeFile()) ? 2 : 1) : 2,
            usersTag: [],
            createAt: new Date(),
            files: popSendFilesContent.files
        };
        dispatch(closePopupSendFiles());
        popSendFilesContent.handleSendFile({...message},useCompress);
        setContent("");
    }

    const handleSetUseCompress = (value: boolean) => {
        setUseCompress(value);
    }

    useEffect(() => {
        isShowPopupSendFiles&&document.addEventListener('keydown', keyboardHandle, false);

        return () => {
            document.removeEventListener('keydown', keyboardHandle);
        }
    }, [isShowPopupSendFiles]);

    const keyboardHandle = (event: KeyboardEvent) => {
        if (event.code === 'Enter'||event.code === 'NumpadEnter') {
            event.preventDefault();
            handleConfirm();
        }
        if (event.code === 'Escape') {
            event.preventDefault();
            dispatch(closePopupSendFiles());
        }
    }

    return (
        <Transition appear show={isShowPopupSendFiles} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => {
                    dispatch(closePopupSendFiles());
                }}
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
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
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
                                        onClick={() => {
                                            dispatch(closePopupSendFiles());
                                        }}
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
                                    popSendFilesContent.defaultSendType === "image" &&
                                    <div className={"flex mt-4"}>
                                        <input
                                            checked={useCompress}
                                            onChange={event => handleSetUseCompress(event.target.checked)}
                                            className="form-check-input" type="checkbox" value="" id="compress"/>
                                        <label className={"ml-2"} htmlFor="compress">Nén ảnh</label>
                                    </div>
                                }
                                {
                                    popSendFilesContent.defaultSendType === "image" &&
                                    haveLargeFile() &&
                                    !useCompress &&
                                    <small className={"text-negative"}>
                                        Bạn sắp gửi có ảnh có kích thước lớn hơn <b>50MB</b> dưới dạng <b>HD</b>. Việc này có thể làm trải nghiệm ứng dụng của bạn kém đi.
                                    </small>
                                }
                                <input
                                    ref={inputDescription}
                                    value={content}
                                    onChange={event => setContent(event.target.value)}
                                    className={"rounded-md h-[50px] border w-full border-gray-300 mt-4 px-[10px] focus:outline-none focus:border-primary"} placeholder={"Nội dung"}/>
                            </div>
                        </Transition.Child>
                    )}
                </div>
            </Dialog>
        </Transition>
    );
};
