import React, { ChangeEvent, FC, useState, useEffect } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import debounce from "lodash/debounce";

/**
 * Components
 */
import { SearchInput, GroupActions, ModalContainer, ModalConfirm, DropdownSearchableV2 } from "shareComponents/common";
// import ModalCreateBiddingPlan from "./components/ModalCreateBiddingPlan";
// import ModalUpdateBiddingPlan from "./components/ModalUpdateBiddingPlan";
import ModalCreateBiddingPlan from "../../../bidding/pages/BiddingPlanPage/components/ModalCreateBiddingPlan";
import ModalUpdateBiddingPlan from "../../../bidding/pages/BiddingPlanPage/components/ModalUpdateBiddingPlan";
import VerifyIcon from "assets/images/icons8-verified-check-circle-for-approved-valid-content-96.svg";
// import TriangleDown from "assets/icons/TriangleDown";
// import ThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
// import FinancialCashFlowFilterButton from "./components/CashFlowButtonFilter";
// import CashFlowActionGroup from "./components/CashFlowActionGroup";

/**
 * Utils
 */
import {
  BIDDING_PLAN_TYPE, BIDDING_PLAN_STATUS, BIDDING_PLAN_FORM,
  BIDDING_PLAN_CONTRACT_TYPE
} from "apis/localdb";
import { TOAST_DEFAULT_OPTIONS } from "utils/constants";

/**
 * Hooks
 */
import { useModal } from "services/hooks/useModal";
import useCheckedList from "services/hooks/ppt/useCheckedList";
import { convertCurrency } from "utils/converter";
import { useProject } from 'services/hooks/items/useProject';
import { useBiddingPlan } from "services/hooks/bidding/useBiddingPlan";
import { useDocumentPackage } from "services/hooks/document/useDocumentPackage";

import backIcon from "../../../../assets/images/Frame 3707.svg";
import PaginateV2 from "shareComponents/common/PaginateV2";
import BiddingStepper from "./Stepper";
import BiddingTable from "./Table/BiddingTable";
import BiddingJobList from "./List/BiddingJobList";
import BiddingDetailList from "./List/BiddingDetailList";
import BiddingInfro from "./Table/BiddingInfro";

const ProjectBiddingDetailPage: FC = () => {
  // Phân trang
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const [pageIndex, setPageIndex] = React.useState(0);

  const location = useLocation();
  const { id: projectID } = useParams<{ id: string }>();
  const { info: projectInfo } = useProject({
    params: {
      departmentID: projectID
    },
    isFetchInfo: true
  })

  return (
    <div className={"flex flex-col relative h-full p-4"}>
      <div className="flex justify-between">
        <div className="flex items-center	">
          <a href="/pm/project/:id/bidding"><img src={backIcon} alt="Back" /></a>
          <div className="pl-3.5 text-lg	text-primary-gray">Cung cấp, thi công lắp đặt cửa nhôm kính, vách nhôm kính</div>
        </div>
        <div>
          <button className="px-5 py-2 text-primary-light bg-cbs-green rounded font-bold ">
            Tạo mới
          </button>
        </div>
      </div>
      <div className="mt-9">
        <BiddingTable />
      </div>
      <div className="py-8">
        <div className="text-cbs-subtext pb-5 text-lg ml-3">
          Tiến trình triển khai (4/9 - 45%)
        </div>
        <BiddingStepper />
      </div>
      <div>
        <BiddingInfro />
      </div>
      <div>
        <BiddingJobList />
      </div>
      <div>
        <BiddingDetailList />
      </div>
    </div>
  );
};
export default ProjectBiddingDetailPage;
