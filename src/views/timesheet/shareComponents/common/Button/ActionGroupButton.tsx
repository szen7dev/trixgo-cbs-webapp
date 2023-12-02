import React, { FC } from "react";
import DownloadIcon from "assets/images/icons8-download-64.svg";
import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import PrintIcon from "assets/images/icons8-print-96.svg";
import CreateOrEditDialog from "../DialogForm";

import { useModal } from "services/hooks/useModal";

import type { TimeSheetParent } from "typings/time-sheet";

interface ActionGroupButtonProps {
  recordSelected?: TimeSheetParent;
  onUpdateTimeSheet: (values: any) => void;
  onDeleteTimeSheet: (timeSheetID: string) => void;
}

const ActionGroupButton: FC<ActionGroupButtonProps> = (props) => {
  const { recordSelected, onUpdateTimeSheet, onDeleteTimeSheet } = props;

  const { openModal } = useModal();

  const handleClickUpdateTimeSheet = React.useCallback(
    (record?: TimeSheetParent) => () => {
      if (record?._id) {
        openModal(
          <div className="t-main-search text-left transition-all transform bg-primary-light shadow-xl rounded my-20 align-top inline-block">
            <CreateOrEditDialog
              title="Cập nhật"
              onSubmit={onUpdateTimeSheet}
              expertTimesheetID={record?._id}
              projectName={record.project.name}
              assigneeName={record.assignee.fullname}
              defaultValues={{
                assignee: record.assignee,
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
    [onUpdateTimeSheet, openModal]
  );

  const handleClickDeleteTimeSheet = React.useCallback(
    (timeSheetID?: string) => () => {
      if (timeSheetID) {
        onDeleteTimeSheet(timeSheetID);
      }
    },
    [onDeleteTimeSheet]
  );

  return (
    <div className={"flex items-center"}>
      {/* <button className={"flex items-center mr-3"}>
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
      </button> */}
      <button
        className={"flex items-center mr-3"}
        onClick={handleClickUpdateTimeSheet(recordSelected)}
      >
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={PencilIcon} />
      </button>
      {/* <button
        className={"flex items-center mr-3"}
        onClick={handleClickDeleteTimeSheet(recordSelected?._id)}
      >
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={TrashIcon} />
      </button>
      <button className={"flex items-center mr-3"}>
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={PrintIcon} />
      </button> */}
    </div>
  );
};

export default ActionGroupButton;