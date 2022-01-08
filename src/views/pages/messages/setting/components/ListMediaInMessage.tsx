import React, {FC} from "react";
import {map as _map} from "lodash";
import DropdownSearchable from "../../../../../components/common/DropdownSearch";
import PDFIcon from 'assets/images/CBS-PDF-Icon-48.svg';
import WordIcon from 'assets/images/CBS-Word-Icon.svg';
import ExcelIcon from 'assets/images/CBS-Excel-Icon.svg';
import OtherIcon from 'assets/images/CBS-Other-Icon.svg';
import ItemMediaInMessage from "./ItemMediaInMessage";
import SampleImage from 'assets/images/photo1640398643.png';
const ListMediaInMessage:FC = () => {
    const listUserInMessage = [
        {
            _id: 1,
            imageUrl: SampleImage,
        },
        {
            _id: 2,
            imageUrl: SampleImage,
        },
        {
            _id: 3,
            imageUrl: SampleImage,
        },
        {
            _id: 4,
            imageUrl: SampleImage,
        },
        {
            _id: 5,
            imageUrl: SampleImage,
        },
        {
            _id: 6,
            imageUrl: SampleImage,
        },
        {
            _id: 7,
            imageUrl: SampleImage,
        },
        {
            _id: 8,
            imageUrl: SampleImage,
        },
        {
            _id: 9,
            imageUrl: SampleImage,
        },
        {
            _id: 10,
            imageUrl: SampleImage,
        },
        {
            _id: 11,
            imageUrl: SampleImage,
        },
        {
            _id: 12,
            imageUrl: SampleImage,
        },
        {
            _id: 13,
            imageUrl: SampleImage,
        },
        {
            _id: 14,
            imageUrl: SampleImage,
        },
        {
            _id: 15,
            imageUrl: SampleImage,
        },
        {
            _id: 16,
            imageUrl: SampleImage,
        },
        {
            _id: 17,
            imageUrl: SampleImage,
        },
        {
            _id: 18,
            imageUrl: SampleImage,
        },
    ]

    return (
        <div className={"bg-white flex-1"}>
            <div className={"sticky bg-white top-90px w-full z-10 flex items-center p-[10px]"}>
                <DropdownSearchable
                    placeholder={"Loại"}
                    className={"bg-gray-100 rounded-full flex-1 mr-2"}
                    data={[
                        {
                            id: 1,
                            imageUrl: PDFIcon,
                            text: "PDF"
                        },
                        {
                            id: 2,
                            imageUrl: WordIcon,
                            text: "Word"
                        },
                        {
                            id: 3,
                            imageUrl: ExcelIcon,
                            text: "Excel"
                        },
                        {
                            id: 4,
                            imageUrl: OtherIcon,
                            text: "Other"
                        }
                    ]}
                    renderItem={(item) => (
                        <div className={"flex align-items-center text-left"}>
                            <img alt={"Avt"} src={item.imageUrl} className={"w-9 h-9 object-cover mr-3"}/>
                            <span className={"flex-1 ml-1 mr-1"}>{item.text}</span>
                        </div>
                    )}
                    searchInputClassName={"border rounded-full h-[28px] p-0 border-gray-300 mx-[10px]"}
                />
                <DropdownSearchable
                    placeholder={"Người gửi"}
                    className={"bg-gray-100 rounded-full flex-1 mr-2"}
                    searchInputClassName={"border rounded-full h-[28px] p-0 border-gray-300 mx-[10px]"}
                />
            </div>
            <div className={"h-full flex flex-wrap"}>
                {
                    _map(listUserInMessage, (media,index) => (
                        <ItemMediaInMessage key={index} media={media}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ListMediaInMessage;
