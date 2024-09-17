import { FC } from "react";
import { map as _map } from "lodash";
import { convertCurrency } from "utils/converter";
import { Loader } from "shareComponents/common/Loader";
import { DetailChildRow } from "../DetailChildRow";

import type { StoreChild, StoreParent } from "typings/store";

type Props = {
  storeParentInfo?: StoreParent;
  listStoreChild: StoreChild[];
  onUpdatedStoreChild: (values: any) => void;
  isFetchStoreChild: boolean;
  hasPermission: boolean;
  pageIndex: number;
};

export const DetailMainRow: FC<Props> = ({
  storeParentInfo,
  listStoreChild,
  onUpdatedStoreChild,
  isFetchStoreChild,
  hasPermission,
  pageIndex,
}) => {
  if (isFetchStoreChild) {
    return <Loader className="border-primary" />;
  }

  return (
    <>
      {_map(listStoreChild[pageIndex] ?? [], (childRow, index) => (
        <DetailChildRow
          key={childRow._id}
          isLastRow={false}
          collapsed={false}
          rowData={childRow}
          parent={storeParentInfo}
          index={+index}
          hasPermission={hasPermission}
          onUpdatedStoreChild={onUpdatedStoreChild}
        />
      ))}
    </>
  )
}