// LĨNH VỰC HOẠT ĐỘNG CỦA CÔNG TY
export const FIELD_APP = [
    { value: 1, text: 'Công nghệ' },
    { value: 2, text: 'Xây dựng' },
    { value: 3, text: 'Thương mại' },
    { value: 4, text: 'Giáo dục' },
    { value: 5, text: 'Y tế' },
]

// CÁC PHÂN LOẠI KHÁC
export const DOCTYPE_TYPES = [
    { value: 1, text: 'Văn bản-Lĩnh vực hồ sơ' },
    { value: 2, text: 'Văn bản-Tính chất hồ sơ' },
    { value: 3, text: 'Lĩnh vực kinh doanh' },
    { value: 4, text: 'Khách hàng-Phân loại' },
    { value: 5, text: 'Công việc-Phân loại khác' },
    { value: 6, text: 'Nhân sự-Trình độ' },
    { value: 7, text: 'Nhân sự-Chuyên ngành' },
    { value: 8, text: 'Nhân sự-Loại HDLD' },
    { value: 9, text: 'Nhân sự-Tình trạng làm việc' },
    { value: 10, text: 'Nhân sự-Thâm niên' },
    { value: 11, text: 'CRM-Phân loại giai đoạn' },
    { value: 12, text: 'CRM-Hồ sơ chi tiết của giai đoạn' },
    { value: 13, text: 'Nhân sự-Chức vụ' },
    { value: 14, text: 'Nhân sự-Loại chứng chỉ' },
    { value: 15, text: 'Nhân sự-Nội dung chứng chỉ' },
    { value: 16, text: 'Hợp đồng-Phân loại công nợ' },
    { value: 17, text: 'Hợp đồng-Nguyên nhân phát sinh' },
    { value: 18, text: 'Chung-Nguyên nhân thất bại' },
    { value: 19, text: 'Chung-Các lỗi hay gặp' },
    { value: 20, text: 'Công việc-Đánh giá chất lượng' },
]

// QUY MÔ CÔNG TY
export const SCALES_COMPANY = [
    { value: 1, text: '1-10' },
    { value: 2, text: '10-50' },
    { value: 3, text: '50-100' },
    { value: 4, text: '> 100' },
]

// NHÓM CHỨC NĂNG ỨNG DỤNG MẶC ĐỊNH (PHỤC VỤ CẤU HÌNH BAN ĐẦU)
export const APP_ROLES = [
    { value: 11, text: 'Nhóm quản trị ứng dụng', permission: {read: 1, create: 1, update: 1, deleteIn: 1} },
    { value: 12, text: 'Nhóm ban lãnh đạo', permission: {read: 1, create: 1, update: 1, deleteIn: 0} },
    { value: 13, text: 'Nhóm nhân viên công ty', permission: {read: 1, create: 1, update: 1, deleteIn: 0} },
    { value: 14, text: 'Nhóm khách mời của công ty', permission: {read: 1, create: 0, update: 0, deleteIn: 0} },
]

// NHÓM CHỨC NĂNG ỨNG DỤNG MẶC ĐỊNH (PHỤC VỤ CẤU HÌNH BAN ĐẦU)
export const PROJECT_ROLES = [
    { value: 21, text: 'Nhóm quản trị Dự án/Phòng ban/Hợp đồng', permission: {read: 1, create: 1, update: 1, deleteIn: 1} },
    { value: 22, text: 'Nhóm ban lãnh đạo', permission: {read: 1, create: 1, update: 1, deleteIn: 0} },
    { value: 23, text: 'Nhóm thành viên Dự án/Phòng ban/Hợp đồng', permission: {read: 1, create: 1, update: 1, deleteIn: 0} },
    { value: 24, text: 'Nhóm khách mời của Dự án/Phòng ban/Hợp đồng', permission: {read: 1, create: 0, update: 0, deleteIn: 0} }
]

// CÁC BÊN THAM GIA TRONG DỰ ÁN
export const PROJECT_PARTIES = [
    { value: 0, text: 'Trợ lý viên', key: '' },
    { value: 1, text: 'Chủ đầu tư', key: '' },
    { value: 2, text: 'Tư vấn QLDA', key: '' },
    { value: 3, text: 'Tư vấn giám sát', key: '' },
    { value: 4, text: 'Tư vấn thiết kế', key: '' },
    { value: 5, text: 'Nhà thầu thi công', key: '' },
]

// For CONINCO only
export const CNC_PROJECT_ROLES = [
    { value: 21, text: 'Ban TGĐ', permission: {read: 1, create: 0, update: 0, deleteIn: 0} },
    { value: 22, text: 'Phòng Kinh doanh', permission: {read: 1, create: 1, update: 1, deleteIn: 1} },
    { value: 23, text: 'Phòng Quản lý kỹ thuật', permission: {read: 1, create: 1, update: 1, deleteIn: 0} },
    { value: 24, text: 'Phòng Tài chính đầu tư', permission: {read: 1, create: 1, update: 1, deleteIn: 0} },
    { value: 25, text: 'Trung tâm', permission: {read: 1, create: 1, update: 1, deleteIn: 0} },
]

// PHÂN LOẠI PHÒNG BAN/DỰ ÁN
export const DEPARTMENT_TYPES = [
    { value: 1, text: 'Phòng ban', key: 'department' },
    { value: 2, text: 'Dự án', key: 'project' }
]

// TRẠNG THÁI PHÒNG BAN/DỰ ÁN
export const DEPARTMENT_STATUS = [
    { value: 1, text: 'Đang triển khai', class: 'tajic-status-btn-in-progress', backgroud: '00aaff', key: 'in_progress' },
    { value: 2, text: 'Bàn giao', class: 'tajic-status-btn-open', backgroud: '4d4dff', key: 'hand_over' },
    { value: 3, text: 'Hoàn thành', class: 'tajic-status-btn-completed', backgroud: '5fba7d', key: 'completed' },
    { value: 4, text: 'Tạm dừng', class: 'tajic-status-btn-follow-up', backgroud: '5bc0de', key: 'follow_up' },
]

// LOẠI DỰ ÁN
export const PROJECT_TYPES = [
    { value: 1, text: 'Quan trọng quốc gia', key: 'in_progress' },
    { value: 2, text: 'Loại A', key: 'hand_over' },
    { value: 3, text: 'Loại B', key: 'completed' },
    { value: 4, text: 'Loại C', key: 'follow_up' },
]

// LOẠI CÔNG TRÌNH
export const BUILDING_TYPES = [
    { value: 1, text: 'Công trình dân dụng', key: 'in_progress' },
    { value: 2, text: 'Công trình công nghiệp', key: 'hand_over' },
    { value: 3, text: 'Công trình giao thông', key: 'completed' },
    { value: 4, text: 'Công trình nông nghiệp và phát triển nông thôn', key: 'follow_up' },
    { value: 5, text: 'Công trình hạ tầng kỹ thuật', key: 'follow_up' },
    { value: 6, text: 'Công trình quốc phòng, an ninh', key: 'follow_up' },
]

// CẤP CÔNG TRÌNH
export const BUILDING_GRADES = [
    { value: 1, text: 'Đặc biệt', key: 'in_progress' },
    { value: 2, text: 'Cấp 1', key: 'hand_over' },
    { value: 3, text: 'Cấp 2', key: 'completed' },
    { value: 4, text: 'Cấp 3', key: 'follow_up' },
    { value: 5, text: 'Cấp 4', key: 'follow_up' },
]

// NGUỒN VỐN DỰ ÁN
export const PROJECT_CAPITAL = [
    { value: 1, text: 'Tư nhân', key: 'completed' },
    { value: 2, text: 'Ngân sách nhà nước', key: 'in_progress' },
    { value: 3, text: 'Nhà nước ngoài ngân sách', key: 'hand_over' },
    { value: 4, text: 'Vốn khác', key: 'follow_up' },
]

// LOẠI DANH BẠ
export const CONTACT_TYPES = [
    { value: 1, text: 'Nhân viên' },
    { value: 2, text: 'Khách hàng' },
    { value: 3, text: 'Đối tác' },
    { value: 4, text: 'Thầu phụ' },
    { value: 5, text: 'Chuyên gia' },
    { value: 6, text: 'Khách mời' },
    { value: 7, text: 'Khác' },
]
// PHÂN LOẠI NHÂN SỰ
export const CONTACT_SUB_TYPES = [
    { value: 1, text: 'Nhân viên' },
    { value: 2, text: 'Cộng tác viên' },
    { value: 3, text: 'Chuyên gia' },
]

// GIỚI TÍNH
export const GENDER_TYPES = [
    { value: 1, text: 'Nam', gender: 'Ông' },
    { value: 2, text: 'Nữ', gender: 'Bà' },
    { value: 3, text: 'Khác', gender: 'Khác' }
]

// NHÂN SỰ THỰC/ẢO-GỬI BẢO HIỂM
export const CONTACT_TA = [
    { value: 1, text: 'T' },
    { value: 2, text: 'A' },
]

// PHÂN LOẠI CHÍNH SÁCH
export const CONTACT_POLICY = [
    { value: 1, text: 'Không' },
    { value: 2, text: 'Bộ đội phục viên' },
    { value: 3, text: 'Con thương bệnh binh' },
    { value: 4, text: 'Gia đình chính sách' },
]

// TÌNH TRẠNG NỘP SỔ BẢO HIỂM
export const INSURANCE_STATUS = [
    { value: 1, text: 'Chưa nộp' },
    { value: 2, text: 'Đã nộp' },
    { value: 3, text: 'Thêm mới ' },
]

// TRẠNG THÁI HỒ SƠ CỦA NHÂN SỰ
export const CONTACT_DOCUMENT_STATUS = [
    { value: 1, text: 'Còn hiệu lực', color: 'green' },
    { value: 2, text: 'Hết hiệu lực', color: 'red' },
]

// PHÂN HẠNG CHỨNG CHỈ
export const CONTACT_DOCUMENT_GRADES = [
    { value: 1, text: 'Hạng 1' },
    { value: 2, text: 'Hạng 2' },
    { value: 3, text: 'Hạng 3' },
    { value: 4, text: 'Hạng 4' },
]

// TRẠNG THÁI TIẾP CẬN THỊ TRƯỜNG
export const CRM_STATUS = [
    { value: 1, text: 'Đang triển khai', class: 'tajic-status-btn-in-progress', backgroud: '00aaff', key: 'in_progress' },
    { value: 2, text: 'Dừng tiếp cận', class: 'tajic-status-btn-follow-up', backgroud: '5bc0de', key: 'follow_up' },
    { value: 3, text: 'Trúng thầu', class: 'tajic-status-btn-completed', backgroud: '5fba7d', key: 'completed' },
    { value: 4, text: 'Thành hợp đồng', class: 'tajic-status-btn-completed', backgroud: '5fba7d', key: 'completed' },
]

// YẾU TỐ NƯỚC NGOÀI
export const CRM_ABROAD = [
    { value: 0, text: 'Không', class: 'tajic-status-btn-in-progress', backgroud: '00aaff', key: 'in_progress' },
    { value: 1, text: 'Có', class: 'tajic-status-btn-completed', backgroud: '5fba7d', key: 'completed' },
]

// HÌNH THỨC THỰC HIỆN/HỢP TÁC
export const CRM_COOPERATIONTYPE = [
    { value: 1, text: 'Độc lập', class: 'tajic-status-btn-in-progress', backgroud: '00aaff', key: 'in_progress' },
    { value: 2, text: 'Liên danh', class: 'tajic-status-btn-completed', backgroud: '5fba7d', key: 'completed' },
]

// VAI TRÒ TRONG VIỆC CỘNG TÁC (ĐỨNG ĐẦU, PHỤ)
export const CRM_COOPERATIONROLE = [
    { value: 1, text: 'Đứng đầu liên danh', class: 'tajic-status-btn-in-progress', backgroud: '00aaff', key: 'in_progress' },
    { value: 2, text: 'Thành viên', class: 'tajic-status-btn-completed', backgroud: '5fba7d', key: 'completed' },
]

// HÌNH THỨC ĐẤU THẦU
export const CRM_BIDDINGTYPE = [
    { value: 1, text: 'Đấu thầu rộng rãi', key: 'in_progress' },
    { value: 2, text: 'Đấu thầu hạn chế', key: 'completed' },
    { value: 3, text: 'Chỉ định thầu', key: 'completed' },
    { value: 4, text: 'Chào hàng cạnh tranh', key: 'completed' },
    { value: 5, text: 'Mua sắm trực tiếp', key: 'completed' },
    { value: 6, text: 'Tự thực hiện', key: 'completed' },
    { value: 7, text: 'Lựa chọn nhà thầu, nhà đầu tư trong trường hợp đặc biệt', key: 'completed' },
    { value: 8, text: 'Tham gia thực hiện của cộng đồng', key: 'completed' },
]

export const CONTRACT_TYPES = [
    { value: 1, text: 'Hợp đồng trọn gói', key: 'in_progress' },
    { value: 2, text: 'Hợp đồng theo đơn giá cố định', key: 'completed' },
    { value: 3, text: 'Hợp đồng theo đơn giá điều chỉnh', key: 'completed' },
    { value: 4, text: 'Hợp đồng theo thời gian', key: 'completed' },
    { value: 5, text: 'Hợp đồng theo giá kết hợp', key: 'completed' },
]

// HỢP ĐỒNG MUA VÀO BÁN RA
export const CONTRACT_OUTIN = [
    { value: 1, text: 'Hợp đồng bán ra' },
    { value: 2, text: 'Hợp đồng mua vào' },
]

// TRẠNG THÁI HỢP ĐỒNG BÁN RA
export const CONTRACT_COME_IN_STATUS = [
    { value: 1, text: 'Đang triển khai' },
    { value: 2, text: 'Đang bàn giao' },
    { value: 3, text: 'Hoàn thành' },
    { value: 4, text: 'Tạm dừng' },
]

// HỢP ĐỒNG THỰC/ẢO-GỬI DẤU
export const CONTRACT_TA = [
    { value: 1, text: 'T' },
    { value: 2, text: 'A' },
]

// PHÂN LOẠI THEO DÕI KHÁC
export const CONTRACT_SUB_TYPES = [
    { value: 1, text: 'Thông thường' },
    { value: 2, text: 'Đặc biệt' },
]

// PHÂN LOẠI CÔNG NỢ
export const CONTRACT_DEBT_TYPES = [
    { value: 1, text: 'Nợ khó đòi' },
    { value: 2, text: 'Nợ chờ quyết toán/bảo hành' },
    { value: 3, text: 'Nợ dự kiến tiền về' },
    { value: 4, text: 'Nợ khác' },
]

// LOẠI HÀNG HÓA, NGUYÊN VẬT LIỆU
export const GOODS_TYPES = [
    { value: 1, text: 'Nguyên liệu, vật liệu' },
    { value: 2, text: 'Thành phẩm' },
    { value: 3, text: 'Hàng hóa' },
    { value: 4, text: 'Hàng gửi đi bán' },
    { value: 5, text: 'Vật tư' },
    { value: 6, text: 'Nhân công' },
    { value: 7, text: 'Thiết bị'  },
    { value: 8, text: 'Giao khoán' },
    { value: 9, text: 'Khác' },
]

// LOẠI HÀNG HÓA, NGUYÊN VẬT LIỆU
export const PRODUCT_TYPES = [
    { value: 1, text: 'Vật tư' },
    { value: 2, text: 'Nhân công, máy' },
    { value: 3, text: 'Thiết bị'  },
]

// LOẠI CÔNG VIỆC PHÁT SINH
export const PLUS_TYPES = [
    { value: 0, text: 'Không phát sinh' },
    { value: 1, text: 'Phát sinh được chấp thuận' },
    { value: 2, text: 'Phát sinh không được chấp thuận' },
]

// HƯỚNG HỒ SƠ VĂN BẢN
export const DIRECTION_TYPES = [
    { value: 1, text: 'Đến', key: 'in' },
    { value: 2, text: 'Đi', key: 'out' },
    { value: 3, text: 'Nội bộ', key: 'internal' }
]

// PHÂN LOẠI HỒ SƠ VĂN BẢN
export const DOCUMENT_TYPES = [
    { value: 1, text: 'Chung', key: 'key' },
    { value: 2, text: 'Hợp đồng', key: 'key' },
    { value: 3, text: 'Bản vẽ', key: 'key' },
]

// TRẠNG THÁI TRIỂN KHAI CÔNG VIỆC
export const PCM_STATUS_TASK = [
    { value: 1, text: 'Khởi tạo/sắp triển khai', class: 'tajic-status-btn-open', backgroud: 'ff0000', key: 'open' },
    { value: 2, text: 'Đang triển khai', class: 'tajic-status-btn-in-progress', backgroud: '00aaff', key: 'in_progress' },
    { value: 3, text: 'Hoàn thành', class: 'tajic-status-btn-completed', backgroud: '5fba7d', key: 'completed' },
    { value: 4, text: 'Treo lại', class: 'tajic-status-btn-deferred', backgroud: '8f1aac', key: 'deferred' },
    { value: 5, text: 'Chờ người khác giải quyết', class: 'tajic-status-btn-waiting', backgroud: '4d4dff', key: 'waiting_on_someone_else' },
    { value: 6, text: 'Tiếp tục theo dõi', class: 'tajic-status-btn-follow-up', backgroud: '5bc0de', key: 'follow_up' },
]

// TRẠNG THÁI CHECKLIST
export const PCM_STATUS_CHECKLIST = [
    { value: 0, text: 'Khởi tạo', class: 'tajic-status-btn-open', backgroud: 'ff0000', key: 'open' },
    { value: 1, text: 'Hoàn thành', class: 'tajic-status-btn-completed', backgroud: '5fba7d', key: 'completed' },
    { value: 2, text: 'Đang triển khai', class: 'tajic-status-btn-in-progress', backgroud: '00aaff', key: 'in_progress' },
    { value: 3, text: 'Treo lại', class: 'tajic-status-btn-deferred', backgroud: '8f1aac', key: 'deferred' },
]

// MỨC ĐỘ QUAN TRỌNG
export const PCM_PRIORITY_TASK = [
    { value: 1, text: 'Thấp', class: 'bg-grey', backgroud: '808080', key: 'low' },
    { value: 2, text: 'Trung bình', class: 'bg-blue', backgroud: '5bc0de', key: 'normal' },
    { value: 3, text: 'Cao', class: 'bg-red', backgroud: 'ff0000', key: 'high' },
    { value: 4, text: 'Siêu quan trọng', class: 'bg-red', backgroud: 'ff0000', key: 'supperhigh' }
]

// MỨC ĐỘ CẤP BÁCH
export const ARR_URGENT = [
    { value: 1, text: 'Không cấp bách'},
    { value: 2, text: 'Trung bình' },
    { value: 3, text: 'Cấp bách' },
]

// MỨC ĐỘ PHỨC TẠP
export const ARR_DIFFICULT = [
    { value: 1, text: 'Không phức tạp' },
    { value: 2, text: 'Phức tạp trung bình'},
    { value: 3, text: 'Phức tạp cao'},
]

// PHÂN LOẠI TIẾN ĐỘ
export const PCM_SCHEDULE_TYPES = [
    { value: 1, text: 'Tiến độ thông thường', key: 'normal' },
    { value: 2, text: 'Tiến độ theo mốc', key: 'normal' },
    { value: 3, text: 'Tiến độ gói/nhóm', key: 'normal' },
]

// PHÂN LOẠI THỜI HẠN
export const PCM_DEADLINE_TYPES = [
    { value: 1, text: 'Chậm', key: 'normal' },
    { value: 2, text: 'Đúng hạn', key: 'normal' },
    { value: 3, text: 'Sớm', key: 'normal' },
]

// PHÂN LOẠI CÔNG VIỆC/TRÌNH DUYỆT
export const PCM_PROPOSAL_TASK = [
    { value: 0, text: 'Việc thông thường', sign: 'Tasks', key: 'task' },
    { value: 1, text: 'Yêu cầu thông tin', sign: 'RFis', key: 'rfi' },
    { value: 2, text: 'Yêu cầu phê duyệt', sign: 'RFa', key: 'rfa' },
    { value: 3, text: 'Thanh toán', sign: 'CRFa', key: 'crfa' },
    { value: 4, text: 'Lựa chọn nhà thầu', sign: 'BRFa', key: 'brfa' },
    { value: 5, text: 'Nghiệm thu chất lượng', sign: 'QRFa', key: 'inspection' },
    { value: 6, text: 'Yêu cầu sửa chữa', sign: 'Punch', key: 'punch' },
    { value: 7, text: 'Yêu cầu thay đổi', sign: 'RFc', key: 'rfc' },
    { value: 8, text: 'Yêu cầu thực hiện', sign: 'RFe', key: 'rfe' },
    { value: 9, text: 'Báo cáo', sign: 'Report', key: 'report' },
    { value: 10, text: 'Tiến độ', sign: 'Schedule', key: 'schedule' },
    { value: 11, text: 'Họp', sign: 'MOM', key: 'mom' },
]

// LOẠI TÀI LIỆU TẠO DỰNG
export const DOCRE_TYPES = [
    { value: 1, text: 'Yêu cầu phê duyệt (RFA)', sign: 'rfa' },
    { value: 2, text: 'Yêu cầu thông tin (RFI)', sign: 'rfi' },
    { value: 3, text: 'Yêu cầu thay đổi (RFC)', sign: 'rfc' },
    { value: 4, text: 'Yêu cầu thực hiện (RFE)', sign: 'rfe' },
    { value: 5, text: 'Biên bản họp (MOM)', sign: 'mom' },
    { value: 6, text: 'Tài liệu soạn thảo (DOC)', sign: 'doc' },
    { value: 7, text: 'Bảng tính (SHEET)', sign: 'sheet' },
    { value: 8, text: 'Sự kiện (EVENT)', sign: 'event' },
    { value: 9, text: 'Sổ quỹ (CASHBOOK)', sign: 'cashbook' },
    { value: 10, text: 'Hồ sơ chất lượng (QAQC)', sign: 'qaqc' },
    { value: 11, text: 'Lịch tuần (WEEKLY PANNER)', sign: 'weekly' },
]

// LOẠI BẢNG TÍNH
export const DOCRE_SHEET_TYPES = [
    { value: 1, text: 'Thông thường' },
    { value: 2, text: 'Theo dõi vật tư bê tông' },
    { value: 3, text: 'Theo dõi vật tư khác' },
]

/**
 * TÀI CHÍNH DOANH NGHIỆP
 */
// PHÂN LOẠI KẾ HOẠCH TÀI CHÍNH
export const FINANCIAL_PLANNING_TYPES = [
    { value: 1, text: 'Kế hoạch Năm' },
    { value: 2, text: 'Kế hoạch Bán hàng' },
    { value: 3, text: 'Kế hoạch Nhập hàng' },
    { value: 4, text: 'Kế hoạch theo thực tế triển khai' },
]

// LOẠI PHIẾU KẾ TOÁN
export const VOUCHER_TYPES = [
    { value: 1, text: 'Phiếu kế toán', sign: 'PKT', slug: 'accbill' },
    { value: 2, text: 'Phiếu thu', sign: 'PT', slug: 'receipt' },
    { value: 3, text: 'Phiếu chi', sign: 'PC', slug: 'payment' },
    { value: 4, text: 'Phiếu nhập', sign: 'PN', slug: 'goods-import' },
    { value: 5, text: 'Phiếu xuất', sign: 'PX', slug: 'goods-export' },
    { value: 6, text: 'Hóa đơn dịch vụ', sign: 'HDDV', slug: 'invoices' },
    { value: 7, text: 'Giấy báo nợ', sign: 'GBN', slug: 'debit-note' },
    { value: 8, text: 'Giấy báo có', sign: 'GBC', slug: 'credit-note' },
]

// LOẠI BÁO CÁO QUẢN TRỊ
// ['3','4','5','7'].includes(infoAccount.name.charAt(0)) => isDebit = false
// Doanh thu bán hàng: 511 
// Doanh thu thuần: Doanh thu bán hàng - Các khoản giảm trừ doanh thu
// '621','622','623','627' => 154 => 632
export const ADREPORT_TYPES = [
    { value: 1, text: 'Quỹ', accounts: ['111','112'], isDebit: true },
    { value: 2, text: 'Doanh thu', accounts: ['511','515','521','711'], isDebit: false },
    { value: 3, text: 'Chi phí', accounts: ['621','622','623','627','631','632','635','641','642','811','821'], isDebit: true },
    { value: 4, text: 'Công nợ phải thu', accounts: ['128','131','136','138','141'], isDebit: true },
    { value: 5, text: 'Công nợ phải trả', accounts: ['331','334','336','338','341'], isDebit: false },
]

// PHÂN LOẠI NGUỒN KHÁCH HÀNG
export const ORDER_SOURCE = [
    { value: 1, text: 'Facebook',  class: 'tajic-status-btn-open' },
    { value: 2, text: 'Website',  class: 'tajic-status-btn-open' },
    { value: 3, text: 'Zalo',  class: 'tajic-status-btn-in-progress' },
    { value: 4, text: 'Khác',  class: 'tajic-status-btn-in-progress' },
]

// PHÂN LOẠI ĐƠN HÀNG
export const ORDER_NEW = [
    { value: 1, text: 'Đơn cũ',  class: 'tajic-status-btn-open' },
    { value: 2, text: 'Đơn mới',  class: 'tajic-status-btn-open' },
]

// CHÍNH SÁCH GIÁ BÁN
export const ORDER_POLICY = [
    { value: 1, text: 'Bán lẻ',  class: 'tajic-status-btn-open' },
    { value: 2, text: 'Bán buôn',  class: 'tajic-status-btn-open' },
]

// TRẠNG THÁI KHÁCH HÀNG
export const CONTACT_STATUS = [
    { value: 1, text: 'Chưa giao dịch', key: 'open' },
    { value: 2, text: 'Đang giao dịch', key: 'in_progress' },
    { value: 3, text: 'Ngừng giao dịch', key: 'completed' },
]

/**
 * CHUNG CHO CÁC ỨNG DỤNG
 */
// PHÂN LOẠI TƯƠNG TÁC
export const REACTION_TYPES = [
    { value: 1, text: 'Thả tim', image: '2764.png' },
    { value: 2, text: 'Cười sặc sụa', image: '1f606.png' },
    { value: 3, text: 'Ngạc nhiên', image: '1f62e.png' },
    { value: 4, text: 'Buồn thương', image: '1f622.png' },
    { value: 5, text: 'Giận dữ', image: '1f620.png' },
    { value: 6, text: 'Thích', image: '1f44d.png' },
    { value: 7, text: 'Không thích', image: '1f44e.png' },
]
/**
 * Phân loại
 * 0-Trợ lý viên
 * 1-Chủ đầu tư
 * 2-Tư vấn QLDA
 * 3-Tư vấn giám sát
 * 4-Tư vấn thiết kế
 * 5-Nhà thầu thi công 
 */
export const PCM_MEMBER_POSITION_TYPE = [
	{ value: 0, text: 'Trợ lý viên' },
	{ value: 1, text: 'Chủ đầu tư' },
	{ value: 2, text: 'Tư vấn QLDA' },
	{ value: 3, text: 'Tư vấn giám sát' },
	{ value: 4, text: 'Tư vấn thiết kế' },
	{ value: 5, text: 'Nhà thầu thi công' },
]

/**
 * 1. Hình ảnh
 * 2. Video
 * 3. Zip
 */
export const PCM_TYPE_FILE = [
    { value: 1, type: [ 'jpg','jpeg', 'png', 'gif', 'heic'] },
    { value: 2, type: ['mp3', 'mp4', 'wav'] },
    { value: 3, type: ['zip', 'rar', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx', 'dwg', 'mmap', 'mdb', 'rar', 'txt', 'mpp'] }
]

export const MESSAGE_TYPE_FILE = [
    { value: 1, type: [ 'jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'gif', 'GIF',  'image/jpeg', 'image/pjpeg', 'image/png', 'image/svg+xml'] },
    { value: 2, type: ['mp3', 'MP3', 'mp4', 'MP4', 'wav', 'WAV'] },
    { value: 3, type: ['zip', 'rar', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx', 'dwg', 'mmap', 'mdb', "application/x-zip", "application/zip", 'rar', 'txt', 'mpp'] }
]
export const TEMPLATE_TYPE = [
	{ value: 1, text: 'Chung' },
	{ value: 2, text: 'Biểu đồ cột' },
	{ value: 3, text: 'Biểu đồ tròn' },
	{ value: 4, text: 'Biểu đồ Histogram' },
]
/**
 * MIME Types image
 */
export const MIME_TYPES_IMAGE = [ 'image/jpeg', 'image/pjpeg', 'image/png', 'image/svg+xml' ];

export const MIME_TYPES_PCM   = [ 'mov', 'mp4' , 'MP4', 'wav', 'WAV', 'jpg', 'jpeg', 'png', 'gif', 'heic', 'zip', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx', 'dwg', 'mmap', 'mdb', 'rar', 'image/png', 'txt', 'mpp'];

export const MIME_TYPES_MESSAGE   = [ 'jpg', 'jpeg', 'png', 'gif', 'heic', 'zip', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx', 'dwg', 'mmap', 'mdb', 'rar', 'txt', 'mpp' ];

export const DATE_FORMAT = "DD/MM/YYYY";
export const LIMIT_DROPDOWN = 30;