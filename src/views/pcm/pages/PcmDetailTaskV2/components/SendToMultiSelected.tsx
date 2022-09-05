import React, {FC, UIEvent, useState} from "react";
import trigangleDown from "assets/images/triangle-down.svg";
import {DropdownSearchable, Item} from "shareComponents/common";
import {useUsersProject} from "services/hooks/users/useUserSystem";
import taskUserAvt from "assets/images/task-user.svg";

type Props = {
    projectId: string;
    selectedUser: Item[];
    setSelectedUser: (users: any) => void;
}

export const SendToMultiSelected:FC<Props> = ({ projectId, selectedUser, setSelectedUser }) => {
    const [showDroprown, setShowDropdown] = useState(false);

    const [keywordAssignee, setKeywordAssignee] = useState('');
    const { data: listUsersProject, fetchNextPage } = useUsersProject({
        projectID: projectId,
        keyword: keywordAssignee
    }, true);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        const isBottom = scrollHeight - scrollTop === clientHeight;
        isBottom && fetchNextPage();
    }

    const handleSearchAssignee = (keyword: string) => {
        setKeywordAssignee(keyword);
    };

    return (
        <>
            <button
                onClick={() => setShowDropdown(!showDroprown)}
                className={"flex items-center text-primary-gray w-full"}>
                <img className={"transition-all " + (showDroprown? "" : "-rotate-90")} src={trigangleDown} alt={"----"}/>
                <span className={"ml-2"}>Tới:</span>
                <span>{selectedUser.slice(0,2).map(user => user.label).join(", ")}</span>
                {
                    (selectedUser.length - 2 > 0) &&
                    <span className={"bg-cbs-form-input-bg px-2 py-1 ml-2 rounded"}>
                        {selectedUser.length - 2} người nhận khác
                    </span>
                }
            </button>
            {
                showDroprown &&
                <DropdownSearchable
                    initialValue={selectedUser}
                    maxWidthInput={"max-w-full"}
                    placeholder={"Nguời liên quan"}
                    className={"w-full mt-1"}
                    isMultiple={true}
                    showTriangle={false}
                    renderSelectedItem={(item) =>  (
                        <div className={"flex items-center"}>
                            <img
                                src={item.image}
                                alt="Member"
                                className="w-[32px] h-[32px] rounded-full overflow-hidden mr-2"
                            />
                            <span>{item.text}</span>
                        </div>
                    )}
                    data={listUsersProject.map((item) => ({
                        label: item.bizfullname,
                        value: item._id,
                        image: item.image ? `${process.env.REACT_APP_URL_S3_USER}/${item.image}` : taskUserAvt,
                    }))}
                    formatItem={{
                        id: "value",
                        text: "label",
                        imageUrl: "image"
                    }}
                    inlineSearch={true}
                    onScroll={handleScroll}
                    onSearchInputChange={handleSearchAssignee}
                    onchangeValue={item => {
                        setSelectedUser([...selectedUser,item])
                    }}
                    onClearData={() => setSelectedUser([])}
                    onMultipleRemoveValue={id => setSelectedUser(selectedUser.filter(user => user.id !== id))}
                />
            }
        </>
    )
}