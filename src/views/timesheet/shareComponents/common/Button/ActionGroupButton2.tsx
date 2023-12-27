import React, { FC } from "react";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import CreateOrEditDialog from "../DialogSalaryForm";

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
                convertFactor: record.convertFactor,
              }}
            />
          </div>
        );
      }
    },
    [onUpdateSalary, openModal]
  );

  return (
    <div className={"flex items-center"}>
      <button
        className={"flex items-center mr-3"}
        onClick={handleClickUpdateSalary(recordSelected)}
      >
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={PencilIcon} />
      </button>
    </div>
  );
};

export default ActionGroupButton2;