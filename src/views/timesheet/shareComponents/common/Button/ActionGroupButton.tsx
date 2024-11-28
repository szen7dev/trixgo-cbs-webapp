import React, { FC } from "react";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
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
              projectName={record?.project?.name}
              assigneeName={record?.assignee?.fullname}
              defaultValues={{
                assignee: record.assignee,
                name: record.name,
                note: record.note,
                project: record.project,
                type: record.type,
                official: record.official,
                convertFactor: record.convertFactor,
                date: record.date,
              }}
            />
          </div>
        );
      }
    },
    [onUpdateTimeSheet, openModal]
  );

  return (
    <div className={"flex items-center"}>
      <button
        className={"flex items-center mr-3"}
        onClick={handleClickUpdateTimeSheet(recordSelected)}
      >
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={PencilIcon} />
      </button>
    </div>
  );
};

export default ActionGroupButton;