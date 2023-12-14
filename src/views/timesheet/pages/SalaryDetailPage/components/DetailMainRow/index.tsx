import { FC, memo, useState } from "react";
import { map as _map, debounce } from "lodash";
import { convertCurrency } from "utils/converter";
import { Loader } from "shareComponents/common/Loader";
import { DetailChildRow } from "../DetailChildRow";

import type { SalaryChild, SalaryParent } from "typings/salary";
import { useUserSystem } from "services/hooks/users/useUserSystem";

type Props = {
  salaryParentInfo?: SalaryParent;
  listSalaryChild: SalaryChild[];
  onUpdatedSalaryChild: (values: any) => void;
  isFetchSalaryChild: boolean;
  hasPermission: boolean;
  pageIndex: number;
};

export const DetailMainRow: FC<Props> = memo(({
  salaryParentInfo,
  listSalaryChild,
  onUpdatedSalaryChild,
  isFetchSalaryChild,
  hasPermission,
  pageIndex,
}) => {
  const [searchAssigneeStr, setSearchAssigneeStr] = useState('');
  const { data: listUsersSystem } = useUserSystem({ keyword: searchAssigneeStr }, true);

  const onSearchUser = debounce((value) => {
    setSearchAssigneeStr(value)
  }, 500)

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
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        {salaryParentInfo?.name}
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {convertCurrency(salaryParentInfo?.salary)}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {convertCurrency(salaryParentInfo?.revenueBonus)}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {convertCurrency(salaryParentInfo?.reward)}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {convertCurrency(salaryParentInfo?.mealAllowance)}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {`${salaryParentInfo?.punishment}`.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {convertCurrency(salaryParentInfo?.insurance)}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {convertCurrency(salaryParentInfo?.pitax)}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {`${salaryParentInfo?.advance}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {`${salaryParentInfo?.remaining}`.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {`${salaryParentInfo?.paid}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-4/12"
        }
      ></div>
      {_map(listSalaryChild[pageIndex] ?? [], (childRow, index) => (
        <DetailChildRow
          key={childRow._id}
          isLastRow={false}
          collapsed={false}
          rowData={childRow}
          parent={salaryParentInfo}
          index={+index}
          hasPermission={hasPermission}
          listUserSearched={listUsersSystem}
          onUpdatedSalaryChild={onUpdatedSalaryChild}
          onSearchUser={onSearchUser}
        />
      ))}
    </>
  );
});

DetailMainRow.displayName = 'DetailMainRow'