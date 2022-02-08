type Department = {
  /** Công ty */
  company: string;
  /** Phần tử cha */
  parent: string;
  /**
   * PHÂN QUYỀN TRUY CẬP
   */
  admins: [string];
  members: [string];
  /**
    Phân loại
    1-Phòng ban
    2-Dự án
   */
  type: number;
  /**
   * Giai đoạn dự án
   * 1-Đang phát triển
   * 2-Lập kế hoạch
   * 3-Thiết kế
   * 4-Đấu thầu
   * 5-Xây dựng
   * 6-Khác
   */
  stage: number;
  /**
   * Ontime
   * 1-Ontime
   * 2-Offtime
   */
  ontime: number;
  /**
   * Onbudget
   * 1-Onbudget
   * 2-Offbudget
   */
  onbudget: number;
  /**
   * Trạng thái triển khai
   * 1-Đang triển khai
   * 2-Bàn giao
   * 3-Hoàn thành
   * 4-Tạm dừng
   */
  status: number;
  /**
   * Nhóm dự án
   * 1-Quan trọng quốc gia
   * 2-Nhóm A
   * 3-Nhóm B
   * 4-Nhóm C
   */
  projectType: number;
  /**
   * Nguồn vốn
   * 1-Ngân sách
   * 2-Tư nhân
   * 3-...
   * 4-...
   */
  projectCapital: number;
  /**
   * Loại công trình
   * 1-Dân dụng
   * 2-...
   * 3-...
   * 4-...
   */
  buildingType: number;
  /**
   * Cấp công trình
   */
  buildingGrade: number;
  /**
   * THÔNG TIN CĂN BẢN
   */
  /** Tên */
  name: string;
  /** Mô tả */
  description: string;
  /** Ký hiệu */
  sign: string;
  /** Chủ đầu tư */
  owner: string;
  /** Địa chỉ theo google map */
  location: string;
  /** Địa chỉ dự án/phòng ban */
  address: string;
  /** Khu vực dự án/phòng ban */
  area: string;
  /** Kế hoạch bắt đầu */
  startTime: Date;
  /** Kế hoạch kết thúc */
  expiredTime: Date;
  /** Thực tế bắt đầu */
  actualStartTime: Date;
  /** Thực tế kết thúc */
  actualFinishTime: Date;
  /** Trưởng dự án/phòng ban */
  pm: string;
  /** Phụ trách chấm công/Trợ lý của PM */
  assistant: string;
  /** Tổng mức đầu tư */
  budget: number;
  /** Ghi chú */
  note: string;
  /** Chức vụ của thành viên trong Dự án/phòng ban (BỎ) */
  position: [
    {
      user: string;
      name: string;
    }
  ];
  /** Hình ảnh đại diện */
  image: string;
  /** Hình ảnh đại diện (2021) */
  files: string;
  /**
   * THÔNG TIN NGƯỜI TẠO/CẬP NHẬT
   */
  userCreate: string;
  userUpdate: string;

  /**
   * COLLECTION CÔNG VIỆC VÀ THÔNG TIN
   */
  //______Tổng số cột mốc
  milestones: number;
  //______Số mốc đã hoàn thành
  completedMilestones: number;

  //______Tổng số công việc
  tasks: number;
  //______Tổng số công việc
  completedTasks: number;
  //______Hình ảnh gần đây nhất của dự án
  images: [string];
  //______Bình luận cuối cùng
  lastComment: string;

  /**
   * COLLECTION CHỈ SỐ TÀI CHÍNH
   */
  //______Doanh thu
  revenue: number;

  //______Dự báo doanh thu tới khi kết thúc
  forecastRevenue: number;
  //______Doanh thu thực tế
  realRevenue: number;

  //______Dự báo ngân sách
  forecastBudget: number;

  //______Ngân sách thực tế
  realBudget: number;

  //______Lợi nhuận NPV
  npv: number;

  //______Dự báo Lợi nhuận NPV
  forecastNpv: number;

  //______Thực tế lợi nhuận
  realNpv: number;

  //______Lợi nhuận IRR
  irr: number;

  //______Dự báo lợi nhuận IRR
  forecastIrr: number;

  //______Thực tế IRR
  realIrr: number;

  /**
   * COLLECTION DÒNG TIỀN CHI
   */
  //______Số lượng gói thầu
  numberOfPackage: number;
  //______Giá trị gói thầu đã hoàn thành
  numberOfCompletedPackage: number;

  //______Số lượng hợp đồng mua vào
  numberOfContractIn: number;

  //______Giá trị ký hợp đồng trước VAT
  contractValue: number;

  //______Giá trị phát sinh trước VAT
  contractPlusValue: number;

  //______VAT hợp đồng
  contractVatValue: number;

  //______Tạm ứng theo hợp đồng
  contractAdvancePayment: number;

  //______Sản lượng trước VAT
  contractProduce: number;

  //______Nghiệm thu phát sinh trước VAT
  contractPlusAcceptance: number;

  //______VAT
  contractVatAcceptance: number;

  //______Giá trị giữ lại
  contractRetainedValue: number;

  //______Thu hồi tạm ứng
  contractAdvancePaymentDeduction: number;

  //______Khấu trừ khác
  contractOtherDeduction: number;

  //______Đề nghị tạm ứng/thanh toán
  contractRecommendedPayment: number;

  //______Đã giải ngân
  contractAmountPaid: number;

  //______Còn lại chưa giải ngân
  contractRemainingPayment: number;

  //______Dư ứng
  contractAdvancePaymentOverage: number;

  /**
   * COLLECTION DÒNG TIỀN THU
   */
  //______Bắt đầu mở bán
  openTime: {
    type: Date;
  };

  //______Kết thúc mở bán
  closedTime: {
    type: Date;
  };

  //______Số đại lý tham gia bán hàng
  numberOfAgent: number;

  //______Số lượng booking
  numberOfBooking: number;

  //______Giá trị booking
  totalBookingValue: number;

  //______Số lượng đặt cọc
  numberOfDeposit: number;

  //______Giá trị đặt cọc
  totalDepositValue: number;

  //______Số hợp đồng bán ra
  numberOfContract: number;

  //______Giá trị hợp đồng bán ra
  totalContractValue: number;

  //______Công nợ phải thu
  receivable: number;

  /**
   * COLLECTION PHÁT TRIỂN THỊ TRƯỜNG
   */

  //______Ước tính giá trị
  estimate: number;

  //______Ngày liên hệ gần nhất
  lastDateContact: {
    type: Date;
  };

  //______Đầu mối kết nối
  transactionContacts: {
    type: Schema.Types.ObjectId;
    ref: "contract";
  };

  //______Khả năng thành công
  likelihoodOfSuccess: {
    type: Date;
  };

  //______Tiến trình cuối cùng
  lastChange: {
    type: Schema.Types.ObjectId;
    ref: "comment";
  };

  /**
   * THÔNG TIN KHÁC
   */
  //______Số danh bạ
  numberOfContact: number;

  //______Số biên bản họp
  numberOfMoms: number;

  //______Số lượng hồ sơ văn bản
  numberOfDocs: number;

  //______Số lượng hồ sơ văn bản đã hoàn thành
  numberFinishOfDocs: number;

  //______Số bản vẽ
  numberOfDrawings: number;

  //______Số báo cáo
  numberOfReports: number;

  //______Số hồ sơ thanh toán
  numberOfIpcs: number;

  //______Số RFI
  numberOfRfis: number;

  //______Số Submitals
  numberOfSubmitals: number;

  //______Số Punch list
  numberOfPunchLists: number;

  //______Số hình ảnh
  numberOfPhotos: number;

  //______Số hồ sơ chất lượng
  numberOfInspections: number;

  //______Last log cuối cùng của dự án
  lastLog: string;
};

// Response form
type DepartmentResponse<T> = {
  error: boolean;
  data: T;
  status?: number;
};

// Analysis
type DataBlock1 = Array<{
  _id: {
    ontime: number;
    onbudget: number;
  };
  amount: number;
}>;

type DataBlock2 = Array<{
  _id: null | any;
  budget: number;
  forecastBudget: number;
  contractValueContractPlusValueContractVatValue: number;
  contractAmountPaid: number;
}>;

type DataBlock3 = Array<{
  _id: {
    stage: number;
  };
  amount: number;
}>;
type DepartmentsAnalysisData = {
  dataBlock1: DataBlock1;
  dataBlock2: DataBlock2;
  dataBlock3: DataBlock3;
};

// List departments
type DepartmentRecord = {
  _id: string;
  name: string;
  description: string;
  company: string;
  createAt: string;
  sign: null | any;
  expiredTime: string;
  startTime: string;
};

type DepartmentListData = {
  listRecords: DepartmentRecord[];
  limit: number;
  totalRecord: number;
  totalPage: number;
  nextCursor: string | null;
};
