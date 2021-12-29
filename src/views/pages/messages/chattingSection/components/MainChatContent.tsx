import React, {FC} from "react";
import NotificationCenter from "./NotificationCenter";
import OthersMessage from "./OthersMessage";
import MyMessage from "./MyMessage";
import SampleAvatar from "assets/images/sample_avt.svg";
import {map as _map} from "lodash";
import SampleImage from 'assets/images/photo1640398643.png';

const MainChatContent:FC = () => {
    const messages = [
        {
            _id: 1,
            type: "noti",
            content: {
                content: 'Thursday'
            }
        },
        {
            _id: 2,
            type: "noti",
            content: {
                content: 'Hiepnh created the group "TRX.PGI-Quản trị nội bộ"'
            }
        },
        {
            _id: 3,
            type: "other",
            content: {
                avt: SampleAvatar,
                userName: "Thu PGI",
                themeColor: "#FCC7A7",
                content: 'Ok. Đã nắm được thông tin rồi nhé. <a href="#" class="text-primary">Tú</a> ơi cíu anh.',
                date: "07:04",
                type: "text",
                replyTo: {
                    userName: "Toan TRX",
                    themeColor: "#0060E1",
                    content: "Ok, vậy trước mắt đẩy giúp cháu Plus, AND, TAI nhé. Đặc biệt 2 nhà tôi là có Bún đậu mắm tôm"
                }
            }
        },
        {
            _id: 7,
            type: "my",
            content: {
                avt: SampleAvatar,
                userName: "Thu PGI",
                themeColor: "#FCC7A7",
                date: "07:04",
                type: "images",
                content: [
                    {
                        _id: 123,
                        fileName: 'ThongBaoTamNgungThiCongCT.pdf',
                        fileUrl: SampleImage,
                        fileSize: '440.8 KB',
                        fileType: 'pdf'
                    },
                    {
                        _id: 124,
                        fileName: 'ThongBaoTamNgungThiCongCT.pdf',
                        fileUrl: SampleImage,
                        fileSize: '440.8 KB',
                        fileType: 'pdf'
                    },
                    {
                        _id: 125,
                        fileName: 'ThongBaoTamNgungThiCongCT.pdf',
                        fileUrl: SampleImage,
                        fileSize: '440.8 KB',
                        fileType: 'pdf'
                    },
                    {
                        _id: 126,
                        fileName: 'ThongBaoTamNgungThiCongCT.pdf',
                        fileUrl: SampleImage,
                        fileSize: '440.8 KB',
                        fileType: 'pdf'
                    },
                    {
                        _id: 127,
                        fileName: 'ThongBaoTamNgungThiCongCT.pdf',
                        fileUrl: SampleImage,
                        fileSize: '440.8 KB',
                        fileType: 'pdf'
                    },
                    {
                        _id: 128,
                        fileName: 'ThongBaoTamNgungThiCongCT.pdf',
                        fileUrl: SampleImage,
                        fileSize: '440.8 KB',
                        fileType: 'pdf'
                    }
                ]
            }
        },
        {
            _id: 4,
            type: "my",
            content: {
                avt: SampleAvatar,
                userName: "Thu PGI",
                themeColor: "#FCC7A7",
                content: 'Ok. Đã nắm được thông tin rồi nhé. <a href="#" class="text-primary">Tú</a> ơi cíu anh.',
                date: "07:04",
                type: "text",
                replyTo: {
                    userName: "Toan TRX",
                    themeColor: "#0060E1",
                    content: "Ok, vậy trước mắt đẩy giúp cháu Plus, AND, TAI nhé. Đặc biệt 2 nhà tôi là có Bún đậu mắm tôm"
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
                type: "file",
                content: [
                    {
                        _id: 123,
                        fileName: 'ThongBaoTamNgungThiCongCT.pdf',
                        fileUrl: '#',
                        fileSize: '440.8 KB',
                        fileType: 'pdf'
                    }
                ]
            }
        },
        {
            _id: 6,
            type: "my",
            content: {
                avt: SampleAvatar,
                userName: "Thu PGI",
                themeColor: "#FCC7A7",
                date: "07:04",
                type: "file",
                content: [
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
                return <NotificationCenter key={message._id} content={message.content.content}/>
            case "other":
                return <OthersMessage key={message._id} message={message.content}/>
            case "my":
                return <MyMessage key={message._id} message={message.content}/>
        }
    }
    return (
        <div className={"full-height-app bg-chat-app items-center flex flex-col relative overflow-auto transition duration-150"}>
            <div className={"min-w-full max-w-[645px] pt-[20px] px-[20px] pb-[100px]"}>
                {
                    _map(messages, message => renderMessage(message))
                }
            </div>
        </div>
    )
}

export default MainChatContent;
