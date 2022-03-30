import React, { FC } from "react";
import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
export const CmcExpensePage: FC = () => {
  useCheckPerAccessScreen({
    appID: APP_ID.CMCS.id,
    menuID: APP_ID.CMCS.menuCmcsApp.expense.id,
    type: "1"
  });
  return (
    <main className="relative h-full">
      <h1>CmcExpensePage</h1>
    </main>
  )
};
