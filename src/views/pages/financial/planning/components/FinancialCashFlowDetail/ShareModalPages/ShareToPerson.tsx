import React, {FC, useContext} from "react";
import {useModal} from "../../../../../../../services/hooks/useModal";
import {ShareContext} from "../ShareModal";
import fakeThumbnail from "../../../../../../../assets/images/thumbnail1.jpg";
import DropdownSearchable, {Item} from "../../../../../../../components/common/DropdownSearch";
import Close from "../../../../../../../assets/icons/Close";
import IconBack from "assets/images/icons-back-white.svg";

const ShareToPerSon:FC = () => {
    const {closeModal} = useModal();
    const {shareUser, setShareUser} = useContext(ShareContext);
    const handleChange = (item: Item) => {
        setShareUser(oldValues => [...oldValues??[], item.id])
    }
    return (
        <div className="w-full max-h-full overflow-visible rounded shadow-lg py-3 px-4">
            <div className={"flex items-center mb-3"}>
                <div className={"flex-1 flex items-center"}>
                    <button className={"w-8 h-8 bg-primary flex items-center justify-center rounded-full"}>
                        <img src={IconBack} alt="Thumbnail" />
                    </button>
                </div>
                <button className={"w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"}>
                    <Close/>
                </button>
            </div>
            <div className={"mt-4 flex"}>
                <DropdownSearchable
                    initialValue={shareUser}
                    placeholder={"Thêm người"}
                    className={"w-full flex-1 border-b border-gray-200 mb-4 bg-gray-50 py-1 px-3"}
                    focusedClass={"border-b border-primary"}
                    maxWidthInput={"max-w-none"}
                    isMultiple={true}
                    showTriangle={false}
                    allowClearValueSingleInput={true}
                    renderSelectedItem={item => (
                        <div className={"flex items-center py-1 bg-white"}>
                            <img className={"w-4 h-4 rounded-full mr-2"} alt={"tag icon"} src={item.imageUrl}/>
                            <span>{item.text}</span>
                        </div>
                    )}
                    data={[
                        {
                            "_id": 1,
                            "content":"Trần Thanh Quang",
                            "imageUrl": fakeThumbnail
                        },
                        {
                            "_id": 2,
                            "content":"Trần Thanh Quang 2",
                            "imageUrl": fakeThumbnail
                        },
                        {
                            "_id": 3,
                            "content":"Trần Thanh Quang 3",
                            "imageUrl": fakeThumbnail
                        },
                        {
                            "_id": 4,
                            "content":"Trần Thanh Quang 4",
                            "imageUrl": fakeThumbnail
                        },
                    ]}
                    formatItem={{
                        id : "_id",
                        text : "content"
                    }}
                    inlineSearch={true}
                    onchangeValue={(item) => {
                        handleChange(item);
                    }}
                />
                <DropdownSearchable
                    initialValue={shareUser}
                    placeholder={"Thêm người"}
                    className={"ml-3 rounded-md border-b border-gray-200 mb-4 bg-gray-50 py-1 px-3"}
                    maxHeightInput={"max-h-[36px]"}
                    data={[
                        {
                            "_id": 1,
                            "content":"Người chỉnh sửa"
                        },
                        {
                            "_id": 2,
                            "content":"Người xem"
                        },
                        {
                            "_id": 3,
                            "content":"Xóa bỏ"
                        },
                    ]}
                    formatItem={{
                        id : "_id",
                        text : "content"
                    }}
                    disableSearch={true}
                    onchangeValue={(item) => {
                        console.log(item);
                    }}
                />
            </div>
            <div className={"flex justify-end items-center"}>
                <button
                    onClick={() => closeModal()}
                    className={"rounded h-[32px] w-[95px] font-semibold mr-3"}
                >
                    Hủy
                </button>
                <button className={"bg-primary rounded h-[32px] w-[95px] text-white font-semibold"}>
                    Xác nhận
                </button>
            </div>
        </div>
    )
}

export default ShareToPerSon
