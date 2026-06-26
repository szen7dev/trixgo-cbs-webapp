import React, { FC } from "react";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import CreateOrEditDialog from "../DialogForm";

import { useModal } from "services/hooks/useModal";

import type { StoreParent } from "typings/lot";

interface ActionGroupButtonProps {
  recordSelected?: StoreParent;
  onUpdateStore: (values: any) => void;
}

const ActionGroupButton: FC<ActionGroupButtonProps> = (props) => {
  const { recordSelected, onUpdateStore } = props;

  const { openModal } = useModal();

  const handleClickUpdateStore = React.useCallback(
    (record?: StoreParent) => () => {
      if (record?._id) {
        openModal(
          <div className="t-main-search text-left transition-all transform bg-primary-light shadow-xl rounded my-20 align-top inline-block">
            <CreateOrEditDialog
              title="Cập nhật"
              onSubmit={onUpdateStore}
              orderID={record?._id}
              outin={record?.outin}
              type={record?.type}
              fundaName={record?.funda?.name}
              projectName={record?.project?.name}
              assigneeName={record?.assignee?.fullname}
              warehouseName={record?.warehouse?.name}
              contractName={record?.contract?.name}
              customerName={record?.customer?.name}
              defaultValues={{
                funda: record.funda,
                channel: record.channel,
                project: record.project,
                package: record.package,
                toPackage: record.toPackage,
                warehouse: record.warehouse,
                contract: record.contract,
                customer: record.customer,
                assignee: record.assignee,
                 referrer: record.referrer,
                salesLeader: record.salesLeader,
                sales: record.sales,
                seller: record.seller,
                affiliate: record.affiliate,
                customerCare: record.customerCare,
                lot: record.lot,
                link: record.link,
                name: record.name,
                recipientAddress: record.recipientAddress,
                note: record.note,
                sign: record.sign,
                outin: record.outin,
                type: record.type,
                convertFactor: record.convertFactor,
                status: record.status,
                forward: record.forward,
                date: record.date,
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