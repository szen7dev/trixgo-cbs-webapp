import { FC } from "react";

import cn from "classnames";

import { useModal } from "services/hooks/useModal";

export const ContractDashBoard: FC = () => {
  const { openModal } = useModal();

  return (
    <main className="relative h-full">
      <h2>Báo cáo quản trị</h2>
    </main>
  );
};
