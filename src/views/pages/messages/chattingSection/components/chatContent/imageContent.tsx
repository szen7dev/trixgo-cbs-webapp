import React, {FC, useState} from "react";
import {map as _map} from "lodash";
import DoubleTickIcon from "assets/images/icons8-double-tick-96.svg";
import ModalFullContainer from "../../../../media/components/ModalFullContainer";
import ViewImage from "./ViewImage";
import TextReply from "./replyContent/textReply";
import FileReply from "./replyContent/fileReply";
import ImageReply from "./replyContent/imageReply";
import moment from "moment";
import {ItemMessage} from "typings/apis/messages/listMessage";

type Props = {
    message: ItemMessage;
    className?: string;
    showSenderName?: boolean;
    isMyMessage?: boolean;
}
type ClassMatrix = {
    [key: string]: Array<any>;
}
const ImagesContent:FC<Props> = ({message, className,showSenderName, isMyMessage}) => {
    const [modalShowImage, setModalShowImage] = useState<{ show: boolean, index: number }>({ show: false, index: 0 });
    const closeModalImage = () => setModalShowImage({ show: false, index: 0 });

    const classMapping: ClassMatrix ={
        "map_1": [
            {wrapper: "w-full", img: ""}
        ],
        "map_2": [
            {wrapper: "w-1/2", img: "pr-[3px]"},
            {wrapper: "w-1/2", img: ""}
        ],
        "map_3": [
            {wrapper: "w-1/2", img: "pr-[3px]"},
            {wrapper: "w-1/2", img: ""},
            {wrapper: "w-full", img: "pt-[3px]"}
        ],
        "map_4": [
            {wrapper: "w-1/2", img: "pr-[3px]"},
            {wrapper: "w-1/2", img: ""},
            {wrapper: "w-1/2", img: "pr-[3px] pt-[3px]"},
            {wrapper: "w-1/2", img: "pt-[3px]"},
        ],
        "map_more" : [
            {wrapper: "w-1/2", img: "pr-[3px]"},
            {wrapper: "w-1/2", img: ""},
            {wrapper: "w-4/12", img: "pr-[3px] pt-[3px]"},
            {wrapper: "w-4/12", img: "pr-[3px] pt-[3px]"},
            {wrapper: "w-4/12", img: "pt-[3px]"},
        ]
    }

    const renderImageDisplay = () => {
        const map = (message.files.length>=5)?"map_more":("map_"+message.files.length);
        const classNameMap = classMapping[map];
        return _map(message.files.slice(0,5), (image,index:number)=> (
            <div
                onClick={() => setModalShowImage({show: true, index: index})}
                key={image._id} className={"relative cursor-pointer " + classNameMap[index]["wrapper"]}>
                <img className={"w-full h-full object-cover " + classNameMap[index]["img"]} src={image.file.file.url} alt={"image"}/>
                {
                    (index === 4 &&message.files.length > 5) &&
                    <div className={"absolute w-full h-full bg-black bg-opacity-40 bottom-0 right-0 flex items-center justify-center text-xl text-white"}>
                        {message.files.length-5}+
                    </div>
                }
                {
                    image.progress!==null&&image.progress!==undefined&&image.progress<100&&
                    <div className={"absolute w-full flex items-center justify-center top-5px h-[5px]"}>
                        <div className={"rounded-full overflow-hidden bg-white bg-opacity-70 relative w-11/12 h-full"}>
                            <div style={{width: `${image.progress}%`}} className={"absolute transition duration-150 h-full bg-primary"}></div>
                        </div>
                    </div>
                }
            </div>
        ))
    }

    const renderReply = () => {
        switch (message.parent.type) {
            case 0:
                return <TextReply message={message.parent}/>;
            case 2:
                return <FileReply message={message.parent}/>;
            case 1:
                return <ImageReply message={message.parent}/>;
        }
    }

    return (
        <div className={"max-w-[366px] min-w-[70px] rounded-lg relative overflow-hidden " + (className??"")}>
            {
                message.parent&&
                renderReply()
            }
            <div className={"flex flex-wrap bg-white"}>
                {renderImageDisplay()}
            </div>
            <div className={"date-message absolute bg-gray-100 bg-opacity-80 bottom-3px right-4px text-xs flex items-center px-[4px] rounded-full "  + (isMyMessage?"text-primary":"text-gray-500")}>
                {moment(message.createAt).format("HH:mm")}<img  className={"ml-1"} src={DoubleTickIcon} alt={"tick"}/>
            </div>
            <ModalFullContainer isModalOpen={modalShowImage.show} toggle={closeModalImage}>
                <div className="flex overflow-hidden transition-all transform w-full h-full">
                    <ViewImage message={message} show={modalShowImage.show} toggle={closeModalImage} imageList={message.files.map(file => file.file.file.url)} index={modalShowImage.index} />
                </div>
            </ModalFullContainer>
        </div>
    )
}

export default ImagesContent
