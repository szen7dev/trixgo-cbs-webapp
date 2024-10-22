import React, { FC } from "react";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import CreateOrEditDialog from "../DialogForm";

import { useModal } from "services/hooks/useModal";

// import type { StoreParent } from "typings/store";

interface ActionGroupButtonProps {
  recordSelected?: any;
  onUpdateStore: (values: any) => void;
}

const ActionGroupButton: FC<ActionGroupButtonProps> = (props) => {
  const { recordSelected, onUpdateStore } = props;

  const { openModal } = useModal();

  const handleClickUpdateStore = React.useCallback(
    (record?: any) => () => {
      if (record?._id) {
        openModal(
          <div className="t-main-search text-left transition-all transform bg-primary-light shadow-xl rounded my-20 align-top inline-block">
            <CreateOrEditDialog
              title="Cập nhật"
              onSubmit={onUpdateStore}
              reportID={record?._id}
              defaultValues={{
                name: record.name,
                note: record.note,
                fromDate: record.fromDate,
                toDate: record.toDate,
              }}
            />
          </div>
        );
      }
    },
    [onUpdateStore, openModal]
  );

  return (
    <div className={"flex items-center"}>
      <button
        className={"flex items-center mr-3"}
        onClick={handleClickUpdateStore(recordSelected)}
      >
        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={PencilIcon} />
      </button>
    </div>
  );
};

export default ActionGroupButton;