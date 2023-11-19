import React, { FC } from "react";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import PrintIcon from "assets/images/icons8-print-96.svg";
import CreateOrEditDialog from "../DialogForm";

import { useModal } from "services/hooks/useModal";

import type { SalaryParent } from "typings/salary";

interface ActionGroupButtonProps {
  recordSelected?: SalaryParent;
  onUpdateSalary: (values: any) => void;
  onDeleteSalary: (SalaryID: string) => void;
}

const ActionGroupButton2: FC<ActionGroupButtonProps> = (props) => {
  const { recordSelected, onUpdateSalary, onDeleteSalary } = props;

  const { openModal } = useModal();

  const handleClickUpdateSalary = React.useCallback(
    (record?: SalaryParent) => () => {
      if (record?._id) {
        openModal(
          <div className="t-main-search text-left transition-all transform bg-primary-light shadow-xl rounded my-20 align-top inline-block">
            <CreateOrEditDialog
              title="Cập nhật"
              onSubmit={onUpdateSalary}
              expertSalaryID={record?._id}
              projectName={record.project?.name}
              assigneeName={record.human?.fullname}
              defaultValues={{
                assignee: record.human,
                name: record.name,
                note: record.note,
                project: record.project,
                type: record.type,
              }}
            />
          </div>
        );
      }
    },
    [onUpdateSalary, openModal]
  );

  const handleClickDeleteSalary = React.useCallback(
    (SalaryID?: string) => () => {
      if (SalaryID) {
        onDeleteSalary(SalaryID);
      }
    },
    [onDeleteSalary]
  );

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
      <button
        className={"flex items-center mr-3"}
        onClick={handleClickUpdateSalary(recordSelected)}
      >
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={PencilIcon} />
      </button>
      <button
        className={"flex items-center mr-3"}
        onClick={handleClickDeleteSalary(recordSelected?._id)}
      >
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={TrashIcon} />
      </button>
      <button className={"flex items-center mr-3"}>
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={PrintIcon} />
      </button>
    </div>
  );
};

export default ActionGroupButton2;