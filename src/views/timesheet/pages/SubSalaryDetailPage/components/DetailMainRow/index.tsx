import { FC, memo, useContext, useState } from "react";
import { map as _map, debounce } from "lodash";
import { convertCurrency } from "utils/converter";
import { Loader } from "shareComponents/common/Loader";
import { DetailChildRow } from "../DetailChildRow";

import type { SalaryChild, SalaryParent } from "typings/salary";
import { useUserSystem } from "services/hooks/users/useUserSystem";
import { DeleteSalaryContext } from "../../contexts/DeleteSalary";

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
  const deleteSalaryContext = useContext(DeleteSalaryContext)

  const [searchAssigneeStr, setSearchAssigneeStr] = useState('');
  const { data: listUsersSystem } = useUserSystem({ keyword: searchAssigneeStr }, true);

  const onSearchUser = debounce((value) => {
    setSearchAssigneeStr(value)
  }, 500)

  const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!deleteSalaryContext) return;

    const { setSalaryIds } = deleteSalaryContext;
    const { checked } = event.target;

    const salaries = _map(listSalaryChild[pageIndex] ?? [], (childRow, index) => childRow._id);
    const salaryIds = checked ? salaries : [];

    setSalaryIds(salaryIds);
  }

  if (isFetchSalaryChild) {
    return <Loader className="border-primary" />;
  }

  return (
    <>
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