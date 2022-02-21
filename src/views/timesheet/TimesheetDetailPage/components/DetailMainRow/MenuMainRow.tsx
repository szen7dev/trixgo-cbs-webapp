import React, { FC } from "react";
import AddCircle from "assets/images/icons8-add-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";

const MenuMainRow: FC = () => {
  return (
    <div className={"bg-white rounded-md shadow-lg"}>
      <button
        className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}
      >
        <img className={"mr-2"} src={AddCircle} />
        <span>Thêm hàng dữ liệu cha</span>
      </button>
      <button
        className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}
      >
        <img className={"mr-2"} src={TrashIcon} />
        <span>Xóa dữ liệu con</span>
      </button>
    </div>
  );
};

export default MenuMainRow;
