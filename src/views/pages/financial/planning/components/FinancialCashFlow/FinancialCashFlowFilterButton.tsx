import React, {FC, useState} from "react";
import SortingIcon from "assets/images/icons8-sorting-100.svg";
import InputClearable from "./InputClearable";
import DropdownSearchable from "../../../../../../components/common/DropdownSearch";
import TagIcon from "assets/images/icons8-price-tag-96.svg";

const FinancialCashFlowFilterButton:FC = () => {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className={"relative"}>
            <button onClick={() => setShowFilter(!showFilter)} className={"bg-gray-50 flex items-center justify-center ml-3 px-3 h-[30px] rounded hover:bg-blue-100"}>
                <img src={SortingIcon} alt={"icon sorting icon"}/>
                <span className={"ml-2 text-gray-500"}>Filter</span>
            </button>
            {showFilter&&
            <div
                className={"absolute transition duration-150 top-full left-3 bg-white py-2 px-4 shadow-md z-20 rounded-md max-w-[900px] min-w-[600px]"}>
                <InputClearable
                    placeholder={"Nội dung tìm kiếm tại đây"}
                    className={"w-full shadow-lg rounded-md h-[45px]"}
                    onChange={(val) => console.log(val)}
                />
                <div className={"flex items-center mt-4"}>
                    <p className={"text-gray-500 mr-4"}>Phân loại 1</p>
                    <DropdownSearchable
                        className={"w-full flex-1"}
                        focusedClass={"border-b border-primary"}
                        maxWidthInput={"max-w-none"}
                        isMultiple={true}
                        allowClearValueSingleInput={true}
                        renderSelectedItem={item => (
                            <div className={"flex items-center"}>
                                <img alt={"tag icon"} src={TagIcon}/>
                                <span>{item.text}</span>
                            </div>
                        )}
                        data={[
                            {
                                "_id": 1,
                                "content":"Trần Thanh Quang"
                            },
                        ]}
                        formatItem={{
                            id : "_id",
                            text : "content"
                        }}
                    />
                </div>
            </div>}
        </div>
    )
}

export default FinancialCashFlowFilterButton;
