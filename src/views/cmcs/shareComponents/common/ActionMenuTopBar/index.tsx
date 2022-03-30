import { FC, HTMLAttributes } from "react";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import PrintIcon from "assets/images/icons8-print-96.svg";
type Props = {
  deleteAction?: () => void;
  editAction?: () => void;
  updatePermission: boolean,
  deletePermission: boolean
}

export const ActionMenuTopBar: FC<Props & HTMLAttributes<HTMLDivElement>> = ({ deleteAction, editAction, updatePermission, deletePermission }) => {
  const handleDelete = () => {
    if (deleteAction) deleteAction()
  }
  const handleEdit = () => {
    if (editAction) editAction()
  }

  return (
    <div className={"flex items-center"}>
      <button className={"flex items-center mr-3"}>
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={DownloadIcon} />
      </button>
      <button className={"flex items-center mr-3"}>
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={ShareIcon} />
      </button>
      <button className={"flex items-center mr-3"}>
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={CopyIcon} />
      </button>
      <button className={"flex items-center mr-3"}>
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={SendEmailIcon} />
      </button>
      {updatePermission &&
        <button className={"flex items-center mr-3"} onClick={() => handleEdit()}>
          <img className={"w-[24px] h-[24px]"} alt={"icon"} src={PencilIcon} />
        </button>
      }
      {deletePermission &&
        <button className={"flex items-center mr-3"} onClick={() => handleDelete()}>
          <img className={"w-[24px] h-[24px]"} alt={"icon"} src={TrashIcon} />
        </button>
      }
      <button className={"flex items-center mr-3"}>
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={PrintIcon} />
      </button>
    </div>
  )
}
