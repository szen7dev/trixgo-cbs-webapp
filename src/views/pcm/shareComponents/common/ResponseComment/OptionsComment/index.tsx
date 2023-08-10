import {FC, useRef, useState} from "react";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import iconUpload from "assets/images/icons8-upload-48.svg";
// import iconReply from "assets/images/icons8-reply-arrow-48.svg";
// import iconReplyAll from "assets/images/icons8-reply-all-arrow-96.svg";

type Props = {
    handleUploadAttachments: (files: FileList | null) => void
}
export const OptionsComment:FC<Props> = ({handleUploadAttachments}) => {
    const wrapperClass = useRef<HTMLDivElement>(null)
    const [showOption, setShowOption] = useState(false);

    useOnClickOutside(wrapperClass, () => setShowOption(false));
    return (
        <div ref={wrapperClass} className={"relative z-5 inline-block"}>
            <button onClick={() => setShowOption(!showOption)} className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
                <DotsVerticalIcon/>
            </button>
            {
                showOption &&
                <div className={"absolute right-0 z-20 bg-white w-[335px] shadow-lg rounded-md text-primary-gray"}>
                    {/* <button className="px-4 py-2 w-full text-left hover:bg-cbs-table-header flex items-center">
                        <img
                            src={iconReply}
                            alt="Icon reply"
                            className="h-[18px] w-[18px]"
                        />
                        <span className={"ml-2"}>Trả lời</span>
                    </button>
                    <button className="px-4 py-2 w-full text-left hover:bg-cbs-table-header flex items-center">
                        <img
                            src={iconReplyAll}
                            alt="Icon reply"
                            className="h-[18px] w-[18px]"
                        />
                        <span className={"ml-2"}>Trả lời tất cả</span>
                    </button> */}
                    <label className="px-4 py-2 w-full text-left hover:bg-cbs-table-header flex items-center">
                        <img
                            src={iconUpload}
                            alt="Icon attach"
                            className="h-[18px] w-[18px]"
                        />
                        <span className={"ml-2"}>Đính kèm file</span>
                        <input
                            type="file"
                            className="hidden"
                            accept="*"
                            multiple
                            onChange={e => handleUploadAttachments(e.target.files)}
                        />
                    </label>
                    {/* <button className="px-4 py-2 w-full text-left hover:bg-cbs-table-header flex items-center">
                        <div
                            className="h-[18px] w-[18px] min-h-[18px] min-w-[18px]"
                        />
                        <span className={"ml-2"}>Thông báo email</span>
                    </button> */}
                </div>
            }
        </div>
    )
}