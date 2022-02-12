import React, {FC, useContext, useEffect, useState} from "react";
import IconBackGray from "assets/images/icon-back-gray.svg";
import {AddNewChatGroupContext} from "../AddNewChatGroup";

import {useUser} from "services/hooks/useUser";
import {map as _map} from "lodash";
import Close from "assets/icons/Close";

const AddNewSection:FC = () => {
    const {setShowAddNew, setParamsConversation, paramsConversation} = useContext(AddNewChatGroupContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageParam, setPageParam] = useState('');
    const [selectedFriends, setSelectedFriends] = useState<{[key: string]: any}>({});

    const params = {limit: 10, select: 'fullname email phone image', populates: '{"path": "company", "select": "name"}', lastestID: pageParam, keyword: searchTerm}
    const { listFriends, nextCursor } = useUser(params, pageParam);

    useEffect(() => {
        if (Object.values(selectedFriends).length > 1) {
            setParamsConversation(oldValue => {
                return {
                    ...oldValue,
                    isPrivate: false,
                    name: ''
                }
            })
        } else {
            setParamsConversation(oldValue => {
                return {
                    ...oldValue,
                    isPrivate: true
                }
            })
        }
    },[selectedFriends])

    const handleAddFriendToConversation = (value: boolean, friend: any) => {
        const selected = {...selectedFriends};
        if (value) {
            selected[friend._id] = friend;
        } else {
            delete selected[friend._id];
        }
        setSearchTerm("");
        setSelectedFriends(selected);
        setParamsConversation(oldValue => {
            return {
                ...oldValue,
                membersID: Object.keys(selected)
            }
        })
    }

    const removeSelectedFriend = (_id: string) => {
        const selected = {...selectedFriends};
        delete selected[_id];
        setSelectedFriends(selected);
        setParamsConversation(oldValue => {
            return {
                ...oldValue,
                membersID: Object.keys(selected)
            }
        })
    }

    return (
        <div className={"absolute top-0 w-full h-full bg-white z-5 overflow-auto no-webkit-scrollbar"}>
            <div className={"sticky top-0 bg-white w-full flex h-[56px] px-[28px] items-center z-15"}>
                <button onClick={() => setShowAddNew(false)} className={"flex items-center justify-center"}>
                    <img  src={IconBackGray} alt={"----"}/>
                </button>
                <div className={"text-lg ml-5"}>
                    Nhóm mới
                </div>
            </div>
            <div className={"w-full px-[20px] mt-[30px] group relative z-5 " + (paramsConversation.isPrivate?"hidden":"block")}>
                <label className={"absolute -top-2 left-8 bg-white group-focus:text-primary group-hover:text-primary text-gray-300 z-15"}>Group Name</label>
                <input
                    className={"add-group-name relative w-full focus:outline-none group-hover:border-primary group-focus:border-primary border border-gray-300 h-[50px] rounded-lg px-[16px]"}
                    value={paramsConversation.name}
                    onChange={e => setParamsConversation(oldValue => {
                        return {
                            ...oldValue,
                            name: e.target.value
                        }
                    })}
                />
            </div>
            <div className={"w-full mt-[20px]"}>
                <div
                    className={"border-t border-b border-gray-200 py-[15px] px-[20px] w-full flex flex-wrap"}
                >
                    {
                        _map(Object.values(selectedFriends), friend => (
                            <div key={friend._id} className={"flex items-center bg-gray-100 rounded-full px-3 py-1 mr-2 mb-1"}>
                                <img className={"w-[30px] h-[30px] rounded-full overflow-hidden"} alt={friend.bizfullname} src={`${process.env.REACT_APP_URL_S3_USER}/${friend.image}`}/>
                                <div className={"flex-1 mx-2"}>{friend.bizfullname}</div>
                                <Close onClick={() => removeSelectedFriend(friend._id)}/>
                            </div>
                        ))
                    }
                    <input
                        type={"text"}
                        className={"focus:outline-none"}
                        placeholder={"Thêm người"}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {
                _map(listFriends, friend => (
                    <div key={friend._id} className={"flex items-center py-3 hover:bg-gray-100"}>
                        <input
                            onChange={event => handleAddFriendToConversation(event.target.checked, friend)}
                            className="form-check-input mx-4"
                            type="checkbox"
                            id={`friend-${friend._id}`}
                            defaultChecked={Object.values(selectedFriends).includes(friend._id)}
                        />
                        <label className={"flex-1 flex items-center"} htmlFor={`friend-${friend._id}`}>
                            <img className={"w-[44px] h-[44px] rounded-full overflow-hidden"} alt={friend.bizfullname} src={`${process.env.REACT_APP_URL_S3_USER}/${friend.image}`}/>
                            <div className={"ml-4"}>{friend.bizfullname}</div>
                        </label>
                    </div>
                ))
            }
            {
                nextCursor&&
                <div className={"flex items-center justify-center mb-5"}>
                    <button
                        onClick={() => setPageParam(nextCursor)}
                        className={"text-primary text-center"}
                    >
                        Xem thêm
                    </button>
                </div>
            }
        </div>
    )
}

export default AddNewSection;
