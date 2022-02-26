import React, {FC, useState} from "react";
import {map as _map} from "lodash";
import DoubleTickIcon from "assets/images/icons8-double-tick-96.svg";
import {ModalFullContainer} from "shareComponents/common";
import {ViewImage} from "./ViewImage";
import moment from "moment";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {ReactionList, ReactionActions} from "../../Reactions";
import {ContactReply, TextReply, FileReply, ImageReply} from "../ReplyContent";

type Props = {
    message: ItemMessage;
    className?: string;
    showSenderName?: boolean;
    isMyMessage?: boolean;
    context: any;
    isMini?: boolean
}
type ClassMatrix = {
    [key: string]: Array<any>;
}
export const ImagesContent:FC<Props> = ({message, className,showSenderName, isMyMessage, context, isMini}) => {
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
        return _map(message.files.slice(0,5), (image,index:number)=> {
            return <div
                onClick={() => {
                    if (image.file.file.isDraft) return;
                    setModalShowImage({show: true, index: index})
                }}
                key={image._id} className={"relative cursor-pointer " + classNameMap[index]["wrapper"]}>
                <img className={"w-full h-full object-cover " + classNameMap[index]["img"]}
                     src={image.file.file.fakeUrl ?? `${process.env.REACT_APP_URL_S3}${image.file.file.path}`}
                     alt={"image"}/>
                {
                    (index === 4 && message.files.length > 5) &&
                    <div
                        className={"absolute w-full h-full bg-black bg-opacity-40 bottom-0 right-0 flex items-center justify-center text-xl text-white"}>
                        {message.files.length - 5}+
                    </div>
                }
                {
                    message.fileProgress !== undefined && message.fileProgress[image._id] !== undefined && message.fileProgress[image._id] < 100 &&
                    <div
                        className={"absolute w-full flex items-center justify-center top-0 h-full bg-black bg-opacity-60"}>
                        <div
                            className={"rounded-md overflow-hidden bg-black border border-white bg-opacity-60 w-11/12 h-[10px] bottom-10px absolute"}>
                            <div style={{width: `${message.fileProgress[image._id]}%`}}
                                 className={"transition-all duration-150 h-full bg-white bg-opacity-70"}></div>
                        </div>
                    </div>
                }
            </div>
        })
    }

    const renderReply = () => {
        switch (message.parent.type) {
            case 0:
                return <TextReply message={message.parent}/>;
            case 2:
                return <FileReply message={message.parent}/>;
            case 1:
                return <ImageReply message={message.parent}/>;
            case 7:
                return <ContactReply message={message.parent}/>;
        }
    }

    return (
        <div className={"min-w-[70px] relative " + (className??"") + (isMini?" max-w-[250px]":" max-w-[366px]")}>
            <div className={"overflow-hidden rounded-lg"}>
                {
                    message.parent&&
                    renderReply()
                }
                <div className={"flex flex-wrap bg-white"}>
                    {renderImageDisplay()}
                </div>
                <div className={"absolute bottom-3px right-4px text-xs flex items-center "  + (isMyMessage?"text-primary":"text-gray-500")}>
                    <ReactionList message={message}/>
                    <div className={"date-message-image bg-gray-100 bg-opacity-80 px-[4px] rounded-full flex items-center ml-[5px]"}>
                        <span>{moment(message.createAt).format("HH:mm")}</span>
                        <img  className={"ml-1"} src={DoubleTickIcon} alt={"tick"}/>
                    </div>
                </div>
                <ModalFullContainer isModalOpen={modalShowImage.show} toggle={closeModalImage}>
                    <div className="flex overflow-hidden transition-all transform w-full h-full">
                        <ViewImage message={message} show={modalShowImage.show} toggle={closeModalImage} imageList={message.files.map(file => `${process.env.REACT_APP_URL_S3}${file.file.file.path}`)} index={modalShowImage.index} />
                    </div>
                </ModalFullContainer>
            </div>
            <ReactionActions context={context} message={message}/>
        </div>
    )
}
