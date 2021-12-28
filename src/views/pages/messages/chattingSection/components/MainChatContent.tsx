import React, {FC} from "react";
import NotificationCenter from "./NotificationCenter";
import OthersMessage from "./OthersMessage";
import MyMessage from "./MyMessage";
import SampleAvatar from "assets/images/sample_avt.svg";
import ArrowDown from "assets/images/icon-arrow-down.svg";
import {map as _map} from "lodash";
import ChattingInput from "./chatInput/ChattingInput";

const MainChatContent:FC = () => {
    const messages = [
        {
            _id: 1,
            type: "noti",
            content: {
                text: 'Thursday'
            }
        },
        {
            _id: 2,
            type: "noti",
            content: {
                text: 'Hiepnh created the group "TRX.PGI-Quản trị nội bộ"'
            }
        },
        {
            _id: 3,
            type: "other",
            content: {
                avt: SampleAvatar,
                userName: "Thu PGI",
                themeColor: "#FCC7A7",
                text: 'Ok. Đã nắm được thông tin rồi nhé. <a href="#" class="text-primary">Tú</a> ơi cíu anh.',
                date: "07:04",
                replyTo: {
                    userName: "Toan TRX",
                    themeColor: "#0060E1",
                    text: "Ok, vậy trước mắt đẩy giúp cháu Plus, AND, TAI nhé. Đặc biệt 2 nhà tôi là có Bún đậu mắm tôm"
                }
            }
        },
        {
            _id: 4,
            type: "my",
            content: {
                avt: SampleAvatar,
                userName: "Thu PGI",
                themeColor: "#FCC7A7",
                text: 'Ok. Đã nắm được thông tin rồi nhé. <a href="#" class="text-primary">Tú</a> ơi cíu anh.',
                date: "07:04",
                replyTo: {
                    userName: "Toan TRX",
                    themeColor: "#0060E1",
                    text: "Ok, vậy trước mắt đẩy giúp cháu Plus, AND, TAI nhé. Đặc biệt 2 nhà tôi là có Bún đậu mắm tôm"
                }
            }
        },
        {
            _id: 5,
            type: "my",
            content: {
                avt: SampleAvatar,
                userName: "Thu PGI",
                themeColor: "#FCC7A7",
                date: "07:04",
                files: [
                    {
                        _id: 123,
                        fileName: 'ThongBaoTamNgungThiCongCT.pdf',
                        fileUrl: '#',
                        fileSize: '440.8 KB',
                        fileType: 'pdf'
                    }
                ]
            }
        }
    ]

    const renderMessage = (message: any) => {
        switch (message.type) {
            case "noti":
                return <NotificationCenter key={message._id} content={message.content.text}/>
            case "other":
                return <OthersMessage key={message._id} message={message.content}/>
            case "my":
                return <MyMessage key={message._id} message={message.content}/>
        }
    }
    return (
        <div className={"full-height-app bg-chat-app items-center flex flex-col relative"}>
            <div className={"min-w-full max-w-[645px] pt-[20px] px-[20px]"}>
                {
                    _map(messages, message => renderMessage(message))
                }
            </div>
            <button className={"animate-bounce w-[48px] h-[48px] rounded-full absolute bottom-100px bg-white flex items-center justify-center right-40px z-10"}>
                <img src={ArrowDown} alt={"arrow down"}/>
                <span className={"absolute -top-1 -right-1 w-[24px] h-[24px] bg-positive rounded-full flex items-center justify-center text-white"}>3</span>
            </button>

            <ChattingInput/>
        </div>
    )
}

export default MainChatContent;
