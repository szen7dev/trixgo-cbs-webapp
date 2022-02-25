import { FC } from "react";

import cn from "classnames";

import { useModal } from "services/hooks/useModal";

import Paginate from "components/common/Paginate";
import SearchInput from "components/common/SearchInput";
import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
import ActionGroupFinancial from "views/pages/financial/planning/components/FinancialCashFlow/ActionGroupFinancial";
import ContractIpcModal from "./ContractIpcModal";

import styles from "../../../styles.module.css";

import PolygonIcon from "assets/images/icon-polygon.svg";
import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";

export const ContractDashBoard: FC = () => {
  const { openModal } = useModal();

  return (
    <main className="relative h-full">
      <h2>Báo cáo quản trị</h2>
    </main>
  );
};
