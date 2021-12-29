import React, {FC} from "react";
import {map as _map} from "lodash";
import DoubleTickIcon from "assets/images/icons8-double-tick-96.svg";

type Props = {
    message:any,
    className?: string
}
type ClassMatrix = {
    [key: string]: Array<any>;
}
const ImagesContent:FC<Props> = ({message, className}) => {
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
        const map = (message.content.length>=5)?"map_more":("map_"+message.content.length);
        const classNameMap = classMapping[map];
        return _map(message.content.slice(0,5), (image,index:number)=> (
            <div key={image._id} className={"relative " + classNameMap[index]["wrapper"]}>
                <img className={"w-full h-full " + classNameMap[index]["img"]} src={image.fileUrl} alt={"image"}/>
                {
                    (index === 4 &&message.content.length > 5) &&
                    <div className={"absolute w-full h-full bg-black bg-opacity-40 bottom-0 right-0 flex items-center justify-center text-xl text-white"}>
                        {message.content.length-5}+
                    </div>
                }
            </div>
        ))
    }
    return (
        <div className={"max-w-[466px] rounded-lg relative " + (className??"")}>
            {
                message.replyTo&&
                <div className={"reply-content border-l-2 border-primary pl-[7px]"}>
                    <div className={"reply-user-name"} style={{color: message.replyTo.themeColor}}>
                        {message.replyTo.userName}
                    </div>
                    <div className={"truncate text-gray-400"}>
                        {message.replyTo.content}
                    </div>
                </div>
            }
            <div className={"flex flex-wrap bg-white"}>
                {renderImageDisplay()}
            </div>
            <div className={"date-message absolute bg-gray-100 bg-opacity-80 bottom-3px right-4px text-gray-500 text-xs flex items-center px-[4px] rounded-full"}>
                {message.date}<img className={"ml-1"} src={DoubleTickIcon} alt={"tick"}/>
            </div>
        </div>
    )
}

export default ImagesContent
