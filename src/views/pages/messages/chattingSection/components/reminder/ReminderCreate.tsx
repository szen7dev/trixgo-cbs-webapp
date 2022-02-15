import React, {FC, FormEvent, Fragment, useContext, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {dismissCreateReminder} from "redux/reducer/messages/CreateReminder";
import {map as _map} from "lodash"
import {MessageContext} from "../../../home/index_v2";
import {v4 as uuidv4} from "uuid";
import {appendFakeMessageToConversation} from "redux/reducer/messages/ListMessage";
import DateIcon from "assets/images/icons8-time-span-144.svg";
import RepeatIcon from "assets/images/icons8-update-left-rotation-48.svg";
import DatePicker from "react-datepicker";
import moment from "moment";
import DropdownSearchable from "components/common/DropdownSearch";

const ReminderCreate:FC = () => {
    const dispatch = useDispatch();
    const {isOpenCreateReminder, conversationId} = useSelector((state: RootState) => state.createReminder.data);
    const focusElementRef = useRef<HTMLDivElement>(null);
    const {socketRef} = useContext(MessageContext);
    const socket = socketRef.current;
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profile = JSON.parse(currentUser);
    const profileId = profile?._id;

    const [name, setName] = useState("");
    const [notifyFor, setNotifyFor] = useState("all");
    const [repeat, setRepeat] = useState<string|number|undefined>("once");
    const [selectedDate, setSelectedDate] = useState<{id: number; title?: string; date: Date}>({
        id: 0,
        date: new Date()
    });
    const repeatTimeMap = [
        {
            id: 1,
            title: "15 phút nữa",
            date: moment(new Date()).add(15, "minutes")
        },
        {
            id: 2,
            title: "30 phút nữa",
            date: moment(new Date()).add(30, "minutes")
        },
        {
            id: 3,
            title: "1 tiếng nữa",
            date: moment(new Date()).add(1, "hours")
        },
        {
            id: 4,
            title: "09:00 ngày mai",
            date: moment(new Date()).add(1, 'days').hour(9).minute(0)
        },
        {
            id: 5,
            title: "14:00 ngày mai",
            date: moment(new Date()).add(1, 'days').hour(14).minute(0)
        },
        {
            id: 6,
            title: "20:00 ngày mai",
            date: moment(new Date()).add(1, 'days').hour(20).minute(0)
        },
    ]

    const handleCreateReminder = () => {
        const message: any = {
            tmpid: uuidv4(),
            conversationID: conversationId,
            content: name,
            sender: {
                _id: profileId
            },
            type: 4,
            remindTime: moment(selectedDate.date).format("YYYY-MM-DD HH:mm"),
            repeat: repeat,
            notifyFor: notifyFor
        };
        dispatch(appendFakeMessageToConversation({
            conversationId: conversationId,
            messageId: message.tmpid,
            messageData: {
                ...message,
                _id: message.tmpid,
                createAt: new Date(),
                consversation: conversationId,
                sender: {
                    _id: profileId,
                    bizfullname: profile.bizfullname,
                    fullname: profile.fullname,
                    image: profile.image
                },
                reminder: {
                    accepts: [],
                    content: name,
                    createdAt: new Date(),
                    notifyFor: notifyFor,
                    rejects: [],
                    remindTime: moment(selectedDate.date).format("YYYY-MM-DD HH:mm"),
                    repeat: repeat,
                    _id: uuidv4()
                }
            }
        }));
        socket.emit('CHATTING_CSS_SEND_MESSAGE', message);
        setName("");
        setNotifyFor("all");
        setRepeat("once");
        setSelectedDate({
            id: 0,
            date: new Date()
        })
        dispatch(dismissCreateReminder({}));
    }

    return (
        <Transition appear show={isOpenCreateReminder} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => dispatch(dismissCreateReminder({}))}
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
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className={"w-[400px] rounded-md shadow-lg bg-white p-[22px] z-51"}>
                            <div className={"flex w-full items-center mb-4"}>
                                <button
                                    className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                    onClick={() => dispatch(dismissCreateReminder({}))}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    Tin nhắn lời nhắc
                                </div>
                                <button
                                    onClick={() => handleCreateReminder()}
                                    className={"h-[36px] w-[105px] rounded-md bg-primary text-white disabled:bg-gray-300"}
                                >
                                    Xác nhận
                                </button>
                            </div>
                            <textarea
                                onChange={event => setName(event.target.value)}
                                placeholder={"Nội dung lời nhắc"} className={"border-b border-gray-300 focus:border-primary py-[17px] text-lg focus:outline-none w-full"} rows={1}>
                            </textarea>
                            <div className={"text-xs text-gray-400 mt-5"}>Thông báo tới</div>
                            <div className={"flex items-center mt-2"}>
                                <div className={"w-1/2 flex items-center"}>
                                    <input
                                        checked={notifyFor === "onlyme"}
                                        onChange={event => setNotifyFor(event.target.value)} value={"onlyme"} type="radio" id="notifyFor-1" name={"notifyFor"} className={"form-check-input mt-0 w-[24px] h-[24px]"}/>
                                    <label htmlFor="notifyFor-1" className={"text-left ml-3"}>Chỉ mình tôi</label>
                                </div>
                                <div className={"w-1/2 flex items-center"}>
                                    <input
                                        checked={notifyFor === "all"}
                                        onChange={event => setNotifyFor(event.target.value)} value={"all"} type="radio" id="notifyFor-2" name={"notifyFor"} className={"form-check-input mt-0 w-[24px] h-[24px]"}/>
                                    <label htmlFor="notifyFor-2" className={"text-left ml-3"}>Tất cả thành viên</label>
                                </div>
                            </div>
                            <div className={"mt-4"}>
                                <DatePicker
                                    name="remindTime"
                                    selected={selectedDate.date}
                                    onChange={(date : Date) =>
                                        setSelectedDate({
                                            id: 0,
                                            date
                                        })
                                    }
                                    showTimeSelect
                                    customInput={
                                        <div className={"relative w-full flex items-center"}>
                                            <div className={"h-full flex align-items-center"}>
                                                <img src={DateIcon} alt={"calendar icon"} />
                                            </div>
                                            <input
                                                readOnly={true}
                                                value={moment(selectedDate.date).format("DD MMMM YYYY HH:mm")}
                                                type="text"
                                                name="remindTime"
                                                className="p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    }
                                />
                            </div>
                            <div className={"flex flex-wrap mt-1"}>
                                {
                                    _map(repeatTimeMap, repeatTime => (
                                        <button
                                            onClick={() => setSelectedDate({
                                                ...repeatTime,
                                                date: repeatTime.date.toDate()
                                            })}
                                            key={repeatTime.date.format("DD-MMMM-YYYY HH:mm")}
                                            className={"rounded-full px-[15px] py-[10px] mb-2 mr-2 " + (repeatTime.id === selectedDate.id ? "bg-accent bg-opacity-50 text-primary":"bg-gray-100 text-black")}
                                        >
                                            {repeatTime.title}
                                        </button>
                                    ))
                                }
                            </div>
                            <div
                                className={"border-b border-t border-gray-300 py-[10px] flex items-center mt-4"}
                            >
                                <img src={RepeatIcon} className={"w-[24px] h-24px"} alt={"-----"}/>
                                <DropdownSearchable
                                    showTriangle={false}
                                    disableSearch={true}
                                    data={[
                                        {
                                            id: "once",
                                            text: "Không lặp lại"
                                        },
                                        {
                                            id: "daily",
                                            text: "Lặp lại hàng ngày"
                                        },
                                        {
                                            id: "weekly",
                                            text: "Lặp lại hàng tuần"
                                        },
                                        {
                                            id: "monthly",
                                            text: "Lặp lại hàng tháng"
                                        },
                                        {
                                            id: "yearly",
                                            text: "Lặp lại hàng năm"
                                        }
                                    ]}
                                    initialValue={"once"}
                                    onchangeValue={({id})  => {
                                        setRepeat(id)
                                    }}
                                />
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ReminderCreate;
