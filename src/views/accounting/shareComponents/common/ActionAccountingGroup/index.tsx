import { FC, ReactNode, useRef, useState } from "react";
import ThreeDotsHorizontal from "assets/images/three-dots-horizontal.svg";
// import Printer from "assets/images/icons8-print-96.png";
import Copy from "assets/images/icons8-copy-96.png";
import Pen from "assets/images/icons8-pencil.svg";
import { useAuth } from "services/hooks/auth/useAuth";
import { useCheckPerAccessOneMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";

type Props = {
  data?: any;
  handleAction?: (data: any, action: number) => void; // 1. In, 2. Copy 3. Cập nhật 4. Xóa
  icon?: ReactNode;
}

export const ActionAccountingGroup: FC<Props> = ({ data, handleAction, icon }) => {
  const { user } = useAuth();
  const { hasPermission, permission } = useCheckPerAccessOneMenu({ appID: APP_ID.ACCOUNTING.id, menuID: APP_ID.ACCOUNTING.menuAccountingApp.accbill.id, companyID: user?.company._id, type: "1", });

  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null)

  return (
    <div className={"relative"} ref={wrapperRef}>
      <button className={"flex justify-center items-center"} onClick={() => setShowOptions(!showOptions)}>
        {icon ?? <img alt={"Icon"} src={ThreeDotsHorizontal} />}
      </button>
      {showOptions ? <div className={"absolute acc-action-row border rounded-md overflow-hidden bg-white z-100"}>
        {
          (hasPermission && permission && Number(permission?.create) >= 1) ? 
            <button onClick={() => { setShowOptions(false); handleAction && handleAction(data, 2) }} className={"flex w-full p-3 hover:bg-gray-100"}>
              <div className={"w-2/12 ml-3"}>
                <img alt={"Icon"} src={Copy} />
              </div>
              <div className={"w-10/12 text-left"}>Copy</div>
            </button>
            :
            <></>
        }
        {
          (hasPermission && permission && Number(permission?.update) >= 1) ? 
            <button onClick={() => { setShowOptions(false); handleAction && handleAction(data, 3) }} className={"flex w-full p-3 hover:bg-gray-100"}>
              <div className={"w-2/12 ml-3"}>
                <img alt={"Icon"} src={Pen} />
              </div>
              <div className={"w-10/12 text-left"}>Cập nhật</div>
            </button>
            :
            <></>
        }
      </div> : null}
    </div>
  )
}