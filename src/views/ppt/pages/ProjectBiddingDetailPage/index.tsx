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

import categoryIcon from "../../../../assets/images/icons8-category-48.svg";
import contractIcon from "../../../../assets/images/icons8-contract-64-blue.svg";
import downloadIcon from "../../../../assets/images/icons8-download-64.svg";
import iconPencil from "../../../../assets/images/icons8-pencil-96 1.png";
import nextIcon from "../../../../assets/images/icons-arrow-next.svg";
import PaginateV2 from "shareComponents/common/PaginateV2";
import BiddingStepper from "./Stepper";

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
    <div className={"flex flex-col relative h-full"}>
      <div className="flex justify-between">
        <div>
          <a href="/pm/project/:id/bidding">back</a>
          <div>Cung cấp, thi công lắp đặt cửa nhôm kính, vách nhôm kính</div>
        </div>
        <div>
          <button>Tạo mới</button>
        </div>
      </div>
      <div>
        <div>Thông tin chung</div>
        <div className="flex">
          <div className="w-1/2">
            <div className="flex">
              <div className="w-1/3">Tên gói thầu</div>
              <div className="w-2/3">Tư vấn Quản lý dự án và Tư vấn giám sát</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Số hiệu</div>
              <div className="w-2/3">GT01</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Kế hoạch bắt đầu</div>
              <div className="w-2/3">15/2/2021</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Kế hoạch kết thúc</div>
              <div className="w-2/3">15/9/2021</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Ngày kết thúc thực tế</div>
              <div className="w-2/3">18/9/2021 (57 ngày)</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Ngân sách dự kiến</div>
              <div className="w-2/3">100.000.000.000</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Kế hoạch ký hợp đồng</div>
              <div className="w-2/3">18/9/2021</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Ghi chú</div>
              <div className="w-2/3">Đang chờ thương thảo hợp đồng</div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex">
              <div className="w-1/3">Thuộc dự án</div>
              <div className="w-2/3">Xây dựng trường Tiểu học và Trung học cơ sở Tây Hồ Tây</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Tình trạng</div>
              <div className="w-2/3">Đang triển khai</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Hình thức</div>
              <div className="w-2/3">Chào giá cạnh tranh</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Loại hợp đồng</div>
              <div className="w-2/3">Đơn giá cố định</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Tiến độ thực hiện hợp đồng</div>
              <div className="w-2/3">100 ngày</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Số nhà thầu tham gia</div>
              <div className="w-2/3">08</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Đơn vị trúng thầu</div>
              <div className="w-2/3">Công ty Cổ phần ABC</div>
            </div>
            <div className="flex">
              <div className="w-1/3">Giá trúng thầu</div>
              <div className="w-2/3">90.000.000.000</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <BiddingStepper/>
      </div>
    </div>
  );
};
export default ProjectBiddingDetailPage;
