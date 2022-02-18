import React, {FC} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {map as _map} from "lodash";
import SampleImage from "assets/images/icons8-image-256.svg";

type Props = {
    message: ItemMessage;
    className?: string;
    borderClass?: string;
    isMyMessage?: boolean;
    isMini?: boolean;
}
const NpsContent:FC<Props> = ({message, className,borderClass, isMyMessage, isMini}) => {
    return (
        <div className={"min-w-[70px] rounded-lg p-[7px] relative " + (className??"") + (isMini?" max-w-[250px]":" max-w-[366px]")}>
            <div className={"mb-3"}>
                Nếu cho điểm về sự hài lòng <b>“Trixgo-Quản lý hợp đồng”</b> thì bạn sẵn sàng cho mấy điểm:
            </div>
            <div className={"border-b " + (borderClass??"border-gray-100")}>
                <div className={"w-full flex items-center mb-[15px]"}>
                    <input
                        // onChange={event => setOption(event.target.value)}
                        value={"abc"} type="radio" id="option-3" name={"option"} className={"form-check-input mt-0 w-[24px] min-w-[24px] min-h-[24px] h-[24px]"}/>
                    <label htmlFor="option-3" className={"text-left ml-3 truncate"}>Trixgo-Ứng dụng quản lý hợp đồng Trixgo-Ứng dụng quản lý hợp đồng</label>
                    <div className={"flex items-center -space-x-1"}>
                        <img alt={"------"} src={SampleImage} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                        <img alt={"------"} src={SampleImage} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                        <img alt={"------"} src={SampleImage} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                    </div>
                </div>

            </div>
            <div className={"flex items-center justify-center relative"}>
                <button className={"text-primary my-[15px]"}>
                    Xác nhận
                </button>
                <div className={"absolute bottom-0 text-xs " + (isMyMessage?"text-primary right-1":"text-gray-500 left-1")}>
                    17:00
                </div>
            </div>
        </div>
    )
}
export default NpsContent;