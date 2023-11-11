import { FC } from "react";
import { map as _map } from "lodash";
import { convertCurrency } from 'utils/converter';
import { Loader } from "shareComponents/common/Loader";
import { DetailChildRow } from "../DetailChildRow";

import type { SalaryChild, SalaryParent } from "typings/salary";

type Props = {
  salaryParentInfo?: SalaryParent;
  listSalaryChild: SalaryChild[];
  onUpdatedSalaryChild: (values: any) => void;
  isFetchSalaryChild: boolean;
  hasPermission: boolean;
};

export const DetailMainRow: FC<Props> = ({
  salaryParentInfo,
  listSalaryChild,
  onUpdatedSalaryChild,
  isFetchSalaryChild,
  hasPermission
}) => {
  if (isFetchSalaryChild) {
    return <Loader className="border-primary" />;
  }

  return (
    <>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-3"
        }
      >
        {"A"}
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-2/12"
        }
      >
        {salaryParentInfo?.name}
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      ></div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">{salaryParentInfo?.hours}</div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {convertCurrency(salaryParentInfo?.unitprice)}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {`${salaryParentInfo?.salary}`.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      ></div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      ></div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-4/12"
        }
      ></div>
      {_map(listSalaryChild, (childRow, index) => (
        <DetailChildRow
          key={childRow._id}
          isLastRow={false}
          collapsed={false}
          rowData={childRow}
          parent={salaryParentInfo}
          index={index}
          hasPermission={hasPermission}
          onUpdatedSalaryChild={onUpdatedSalaryChild}
        />
      ))}
    </>
  );
};