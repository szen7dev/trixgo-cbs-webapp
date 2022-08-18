import React, {FC} from "react";
import iconStar from "assets/images/icon-star.svg";
import InlineBadgeSelect from "./InlineBadgeSelect";

export const TaskDetailTitle:FC = () => {
    return (
        <div className={"task-detail-title"}>
                    <span className={"text-xl "}>
                        Hồ sơ thanh toán đợt 05 gói thầu Tư vấn thiết kế của đơn vị Công ty Cổ phần tư vấn thiết kế 112 - Dự án Xây dựng cụm trường tiểu học và trung học cơ sở Tây Hồ Tây
                    </span>
            <span className={"inline-block ml-2"}>
                        <button>
                            <img src={iconStar} alt={"bookmark"} className={"w-[18px] h-[18px]"}/>
                        </button>
                    </span>
            <InlineBadgeSelect
                wrapperClassName={"-translate-y-1"}
                className={"text-xs bg-cbs-inline-badge-blue rounded-full text-white px-2 py-1 mx-1"}
                defaultValue={1}
                options={[
                    {
                        id: 1,
                        text: "Khởi tạo"
                    },
                    {
                        id: 2,
                        text: "Đang triển khai"
                    },
                    {
                        id: 3,
                        text: "Hoàn thành"
                    },
                ]}
                placeholder={"Trạng thái"}
                onValueChange={value => console.log(value)}
            />
            <InlineBadgeSelect
                wrapperClassName={"-translate-y-1"}
                className={"text-xs bg-negative rounded-full text-white px-2 py-1 mx-1"}
                defaultValue={1}
                options={[
                    {
                        id: 1,
                        text: "Khởi tạo"
                    },
                    {
                        id: 2,
                        text: "Đang triển khai"
                    },
                    {
                        id: 3,
                        text: "Hoàn thành"
                    },
                ]}
                placeholder={"Ưu tiên"}
                onValueChange={value => console.log(value)}
            />
            <InlineBadgeSelect
                wrapperClassName={"-translate-y-1"}
                className={"text-xs bg-cbs-form-input-bg rounded-full text-primary-gray px-2 py-1 mx-1"}
                defaultValue={1}
                options={[
                    {
                        id: 1,
                        text: "Khởi tạo"
                    },
                    {
                        id: 2,
                        text: "Đang triển khai"
                    },
                    {
                        id: 3,
                        text: "Hoàn thành"
                    },
                ]}
                placeholder={"Rủi ro"}
                onValueChange={value => console.log(value)}
            />
        </div>
    )
}