import React, {FC, useContext, useEffect, useRef, useState} from "react";
import attachIcon from "assets/images/icons8-attach-96.svg";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import ImagesIcon from "assets/images/icons8-photo-gallery-96.svg";
import FileIcon from "assets/images/icons8-attach-96.png";
import FolderIcon from "assets/images/icons8-add-folder-96.svg"
import {LazyLoadImage} from "react-lazy-load-image-component";

type Props = {
    handleUploadFiles: (files: FileList|Blob[]) => void;
}

const IconAttach:FC<Props> = ({handleUploadFiles}) => {
    const [showOption, setShowOption] = useState(false);
    const el = useRef<HTMLDivElement>(null);
    useOnClickOutside(el, () => setShowOption(false))

    const handleSetFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        setShowOption(false)
        handleUploadFiles(event.target.files);
    }

    return (
        <div ref={el} className={"relative"}>
        <button onClick={() => setShowOption(!showOption)} className={"flex items-center justify-center p-[13px]"}>
            <LazyLoadImage effect="blur" src={attachIcon} alt={"icon attach"}/>
        </button>
            {
                showOption&&
                <div className={"absolute bottom-60px right-0 rounded-md shadow-lg bg-white min-w-[216px] text-gray-500"}>
                    <label className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <LazyLoadImage effect="blur" src={ImagesIcon} alt={"images"}/>
                        <div className={"flex-1 text-left ml-6"}>Hình ảnh</div>
                        <input type="file" name="files" id="files" className="hidden" accept="image/*" multiple onChange={event => handleSetFiles(event)} />
                    </label>
                    <label className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <LazyLoadImage effect="blur" src={FileIcon} alt={"add folder"} className={"rotate-45 transform"}/>
                        <div className={"flex-1 text-left ml-6"}>File</div>
                        <input type="file" name="files" id="files" className="hidden" accept="file/*" multiple onChange={event => handleSetFiles(event)} />
                    </label>
                    <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <LazyLoadImage effect="blur" className={"mr-2"} src={FolderIcon} alt={"exit"}/>
                        <div className={"flex-1 text-left ml-6"}>Bỏ phiếu</div>
                    </button>
                </div>
            }
        </div>
    )
}

export default IconAttach;
