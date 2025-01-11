import { FC, ReactNode, useRef, useState } from "react";
import ThreeDotsHorizontal from "assets/images/three-dots-horizontal.svg";
import Copy from "assets/images/icons8-copy-96.png";
// import Printer from "assets/images/icons8-print-96.png";
// import Pen from "assets/images/icons8-pencil.svg";

type Props = {
  data?: any;
  handleAction?: (data: any, action: number) => void; // 1. In, 2. Copy 3. Cập nhật 4. Xóa
  icon?: ReactNode;
}

export const ActionFnbListPage: FC<Props> = ({ data, handleAction, icon }) => {
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null)

  return (
    <div className={"relative"} ref={wrapperRef}>
      <button className={"flex justify-center items-center"} onClick={() => setShowOptions(!showOptions)}>
        {icon ?? <img alt={"Icon"} src={ThreeDotsHorizontal} />}
      </button>
      {showOptions ? <div className={"absolute acc-action-row border rounded-md overflow-hidden bg-white z-100"}>
        <button onClick={() => { setShowOptions(false); handleAction && handleAction(data, 1) }} className={"flex w-full p-3 hover:bg-gray-100"}>
          <div className={"w-2/12 ml-3"}>
            <img alt={"Icon"} src={Copy} />
          </div>
          <div className={"w-10/12 text-left"}>Copy</div>
        </button>
        {/* <button onClick={() => { setShowOptions(false); handleAction && handleAction(data, 3) }} className={"flex w-full p-3 hover:bg-gray-100"}>
          <div className={"w-2/12 ml-3"}>
            <img alt={"Icon"} src={Pen} />
          </div>
          <div className={"w-10/12 text-left"}>Cập nhật</div>
        </button> */}
        {/* <button className={"flex w-full p-3 hover:bg-gray-100"}>
          <div className={"w-2/12 ml-3"}>
            <img alt={"Icon"} src={Printer} />
          </div>
          <div className={"w-10/12 text-left"}>In ấn</div>
        </button> */}
      </div> : null}
    </div>
  )
}