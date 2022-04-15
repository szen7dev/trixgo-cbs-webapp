import { FC } from "react";

type Props = {
    onUpdate?: () => void;
    onAdd?: () => void;
    onDelete?: () => void;
}

export const MenuChildRow : FC<Props> = ({ onUpdate, onAdd, onDelete }) => {
    return (
        <div className={"bg-white rounded-md shadow-lg"}>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"} onClick={onUpdate}>
                <img className={"mr-2"} src={`/images/common/icons8-pencil-96 1.png`}/>
                <span>Cập nhật dữ liệu</span>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"} onClick={onAdd}>
                <img className={"mr-2"} src={`/images/common/svg/icons8-add-96.svg`}/>
                <span>Thêm hàng dữ liệu con</span>
            </button>
            {/* <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"} onClick={onDelete}>
                <img className={"mr-2"} src={`/images/common/svg/icons8-remove-96.svg`}/>
                <span>Xóa dữ liệu</span>
            </button> */}
        </div>
    )
}