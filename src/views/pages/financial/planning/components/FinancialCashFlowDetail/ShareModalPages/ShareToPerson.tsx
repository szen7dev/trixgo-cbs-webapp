import React, {FC} from "react";

const ShareToPerSon:FC = () => {
    return (
        <div className="w-full max-h-full overflow-auto rounded shadow-lg py-3 px-4">
            <div className={"flex justify-end items-center"}>
                <button className={"rounded h-[32px] w-[95px] font-semibold mr-3"}>
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
