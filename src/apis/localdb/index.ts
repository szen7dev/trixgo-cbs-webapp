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
    { value: 11, text: 'Nhóm quản trị ứng dụng', permission: { read: 1, create: 1, update: 1, deleteIn: 1 } },
    { value: 12, text: 'Nhóm ban lãnh đạo', permission: { read: 1, create: 1, update: 1, deleteIn: 0 } },
    { value: 13, text: 'Nhóm nhân viên công ty', permission: { read: 1, create: 1, update: 1, deleteIn: 0 } },
    { value: 14, text: 'Nhóm khách mời của công ty', permission: { read: 1, create: 0, update: 0, deleteIn: 0 } },
]

// NHÓM CHỨC NĂNG ỨNG DỤNG MẶC ĐỊNH (PHỤC VỤ CẤU HÌNH BAN ĐẦU)
export const PROJECT_ROLES = [
    { value: 21, text: 'Nhóm quản trị Dự án/Phòng ban/Hợp đồng', permission: { read: 1, create: 1, update: 1, deleteIn: 1 } },
    { value: 22, text: 'Nhóm ban lãnh đạo', permission: { read: 1, create: 1, update: 1, deleteIn: 0 } },
    { value: 23, text: 'Nhóm thành viên Dự án/Phòng ban/Hợp đồng', permission: { read: 1, create: 1, update: 1, deleteIn: 0 } },
    { value: 24, text: 'Nhóm khách mời của Dự án/Phòng ban/Hợp đồng', permission: { read: 1, create: 0, update: 0, deleteIn: 0 } }
]

// CÁC BÊN THAM GIA TRONG DỰ ÁN
export const PROJECT_PARTIES = [
    { value: 0, text: 'Trợ lý viên', key: '' },
    { value: 1, text: 'Chủ đầu tư', key: '' },
    { value: 2, text: 'Tư vấn Quản lý dự án', key: '' },
    { value: 3, text: 'Tư vấn giám sát', key: '' },
    { value: 4, text: 'Tư vấn thiết kế', key: '' },
    { value: 5, text: 'Nhà thầu thi công', key: '' },
    { value: 6, text: 'Tư vấn thẩm tra', key: '' },
    { value: 7, text: 'Tư vấn khác', key: '' },
]

// For CNC only
export const CNC_PROJECT_ROLES = [
    { value: 21, text: 'Ban TGĐ', permission: { read: 1, create: 0, update: 0, deleteIn: 0 } },
    { value: 22, text: 'Phòng Kinh doanh', permission: { read: 1, create: 1, update: 1, deleteIn: 1 } },
    { value: 23, text: 'Phòng Quản lý kỹ thuật', permission: { read: 1, create: 1, update: 1, deleteIn: 0 } },
    { value: 24, text: 'Phòng Tài chính đầu tư', permission: { read: 1, create: 1, update: 1, deleteIn: 0 } },
    { value: 25, text: 'Trung tâm', permission: { read: 1, create: 1, update: 1, deleteIn: 0 } },
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

// GIAI ĐOẠN CỦA DỰ ÁN
export const PROJECT_STAGE = [
    { value: 1, text: 'Đang phát triển', key: '' },
    { value: 2, text: 'Lập kế hoạch', key: '' },
    { value: 3, text: 'Thiết kế', key: '' },
    { value: 4, text: 'Đấu thầu', key: '' },
    { value: 5, text: 'Xây dựng', key: '' },
    { value: 6, text: 'Khác', key: '' },
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

// LOẠI DANH BẠ
export const CUSTOMER_TYPES = [
    { value: 1, text: 'Biết tên' },
    { value: 2, text: 'Vãng lai' },
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

// LOẠI GÓI THẦU
export const BIDDING_PLAN_TYPE = [
    { value: 1, text: 'Xây lắp', key: '' },
    { value: 2, text: 'Mua sắm thiết bị', key: '' },
    { value: 3, text: 'Tư vấn', key: '' },
    { value: 4, text: 'Khác', key: '' },
]

// TRẠNG THÁI THỰC HIÊN
export const BIDDING_PLAN_STATUS = [
    { value: 1, text: 'Chưa thực hiện', key: '' },
    { value: 2, text: 'Đang triển khai', key: '' },
    { value: 3, text: 'Đã hoàn thành', key: '' },
]

// Hình thức lựa chọn nhà thầu
export const BIDDING_PLAN_FORM = [
    { value: 1, text: 'Chào giá cạnh tranh', key: '' },
    { value: 2, text: 'Đấu thầu', key: '' },
    { value: 3, text: 'Chỉ định thầu', key: '' },
]

// LOẠI HỢP ĐỒNG
export const BIDDING_PLAN_CONTRACT_TYPE = [
    { value: 1, text: 'Đơn giá cố định', key: '' },
    { value: 2, text: 'Trọn gói', key: '' },
    { value: 3, text: 'Theo tháng', key: '' },
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
    { value: 1, text: 'Bán ra' },
    { value: 2, text: 'Mua vào' },
]

// TRẠNG THÁI HỢP ĐỒNG BÁN RA
export const CONTRACT_COME_IN_STATUS = [
    { value: 1, text: 'Đang triển khai' },
    { value: 2, text: 'Đang bàn giao' },
    { value: 3, text: 'Hoàn thành' },
    { value: 4, text: 'Tạm dừng' },
]

// HỢP ĐỒNG MUA VÀO BÁN RA PHÂN LOẠI CHÍNH THỨC
export const CONTRACT_DRAFT = [
    { value: 1, text: 'Chính thức' },
    { value: 2, text: 'Nháp' },
]

// HỢP ĐỒNG MUA VÀO BÁN RA KHÓA HỢP ĐỒNG
export const CONTRACT_LOCK = [
    { value: 1, text: 'Open' },
    { value: 2, text: 'Khóa' },
]

// CONTRACT ONTIME
export const CONTRACT_ONTIME = [
    { value: 1, text: 'Đúng tiến độ' },
    { value: 2, text: 'Chậm tiến độ' },
]

// CONTRACT ONBUDGET
export const CONTRACT_ONBUDGET = [
    { value: 1, text: 'Đúng ngân sách' },
    { value: 2, text: 'Vượt ngân sách' },
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

// PHÂN LOẠI IPC
export const CONTRACT_IPC_PLANS = [
    { value: 1, text: 'Kế hoạch' },
    { value: 2, text: 'Thực tế' },
]

export const CONTRACT_IPC_TYPES = [
    { value: 1, text: 'Tạm ứng' },
    { value: 2, text: 'Thanh toán' },
]

// PHÂN LOẠI CHI PHÍ
export const CONTRACT_EXPENSE_SUB_TYPES = [
    { value: 1, text: 'Chi phí trực tiếp' },
    { value: 2, text: 'Chi phí quản lý' },
]

// LOẠI HÀNG HÓA, NGUYÊN VẬT LIỆU
export const GOODS_TYPES = [
    { value: 1, text: 'Nguyên liệu, vật liệu' },
    { value: 2, text: 'Thành phẩm' },
    { value: 3, text: 'Hàng hóa' },
    { value: 4, text: 'Hàng gửi đi bán' },
    { value: 5, text: 'Vật tư' },
    { value: 6, text: 'Nhân công' },
    { value: 7, text: 'Thiết bị' },
    { value: 8, text: 'Giao khoán' },
    { value: 9, text: 'Khác' },
]

// LOẠI HÀNG HÓA, NGUYÊN VẬT LIỆU
export const PRODUCT_TYPES = [
    { value: 1, text: 'Vật tư' },
    { value: 2, text: 'Nhân công, máy' },
    { value: 3, text: 'Thiết bị' },
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

// TÍNH CHẤT HỒ SƠ VĂN BẢN
export const DOCUMENT_TYPES = [
    { value: 1, text: 'Chung', key: 'key' },
    { value: 2, text: 'Hợp đồng', key: 'key' },
    { value: 3, text: 'Quyết định', key: 'key' },
    { value: 4, text: 'Họp', key: 'key' },
    { value: 5, text: 'Báo cáo', key: 'key' },
    { value: 6, text: 'Báo giá, chào giá', key: 'key' },
    { value: 7, text: 'Công văn', key: 'key' },
    { value: 8, text: 'Thông báo', key: 'key' },
    { value: 9, text: 'Bản vẽ', key: 'key' },
    { value: 10, text: 'Yêu cầu, đề nghị', key: 'key' },
    { value: 11, text: 'Thanh toán', key: 'key' },
    { value: 12, text: 'Thư kỹ thuật', key: 'key' },
    { value: 13, text: 'Thuyết minh', key: 'key' },
    { value: 14, text: 'Dự toán', key: 'key' },
    { value: 15, text: 'Đề cương', key: 'key' },
    { value: 16, text: 'Tiến độ, kế hoạch', key: 'key' },
    { value: 17, text: 'Tờ trình', key: 'key' },
    { value: 18, text: 'Biên bản', key: 'key' },
    { value: 19, text: 'Hồ sơ năng lực', key: 'key' },
    { value: 20, text: 'Biểu mẫu', key: 'key' },
    { value: 21, text: 'Tiêu chuẩn, quy chuẩn', key: 'key' },
    { value: 22, text: 'Quy định', key: 'key' },
    { value: 23, text: 'Quy trình', key: 'key' },
    { value: 24, text: 'Chỉ dẫn', key: 'key' },
    { value: 25, text: 'Quy chế', key: 'key' },
    { value: 26, text: 'Hóa đơn', key: 'key' },
    { value: 27, text: 'Nhiệm vụ', key: 'key' },
    { value: 28, text: 'Sổ tay', key: 'key' },
    { value: 29, text: 'Checklist', key: 'key' },
    { value: 30, text: 'Thiết kế', key: 'key' },
    { value: 31, text: 'Vật liệu', key: 'key' },
    { value: 32, text: 'Dữ liệu', key: 'key' },
]

// Tính chất hồ sơ sắp xếp theo ABC phục vụ show ra thẻ chọn
export const DOCUMENT_TYPES_SORT = [
    { value: 1, text: 'Chung', key: 'key' },
    { value: 9, text: 'Bản vẽ', key: 'key' },
    { value: 5, text: 'Báo cáo', key: 'key' },
    { value: 6, text: 'Báo giá, chào giá', key: 'key' },
    { value: 18, text: 'Biên bản', key: 'key' },
    { value: 20, text: 'Biểu mẫu', key: 'key' },
    { value: 7, text: 'Công văn', key: 'key' },
    { value: 29, text: 'Checklist', key: 'key' },
    { value: 24, text: 'Chỉ dẫn', key: 'key' },
    { value: 32, text: 'Dữ liệu', key: 'key' },
    { value: 14, text: 'Dự toán', key: 'key' },
    { value: 15, text: 'Đề cương', key: 'key' },
    { value: 26, text: 'Hóa đơn', key: 'key' },
    { value: 4, text: 'Họp', key: 'key' },
    { value: 19, text: 'Hồ sơ năng lực', key: 'key' },
    { value: 2, text: 'Hợp đồng', key: 'key' },
    { value: 27, text: 'Nhiệm vụ', key: 'key' },
    { value: 25, text: 'Quy chế', key: 'key' },
    { value: 22, text: 'Quy định', key: 'key' },
    { value: 23, text: 'Quy trình', key: 'key' },
    { value: 3, text: 'Quyết định', key: 'key' },
    { value: 28, text: 'Sổ tay', key: 'key' },
    { value: 16, text: 'Tiến độ, kế hoạch', key: 'key' },
    { value: 21, text: 'Tiêu chuẩn, quy chuẩn', key: 'key' },
    { value: 17, text: 'Tờ trình', key: 'key' },
    { value: 11, text: 'Thanh toán', key: 'key' },
    { value: 30, text: 'Thiết kế', key: 'key' },
    { value: 8, text: 'Thông báo', key: 'key' },
    { value: 13, text: 'Thuyết minh', key: 'key' },
    { value: 12, text: 'Thư kỹ thuật', key: 'key' },
    { value: 31, text: 'Vật liệu', key: 'key' },
    { value: 10, text: 'Yêu cầu, đề nghị', key: 'key' },
]

// TRẠNG THÁI TRIỂN KHAI CÔNG VIỆC
export const PCM_STATUS_TASK = [
    { value: 1, text: 'Khởi tạo', class: 'bg-red-400', backgroud: 'ffb3b3', key: 'open' },
    { value: 2, text: 'Đang triển khai', class: 'bg-blue-400', backgroud: '00aaff', key: 'in_progress' },
    { value: 3, text: 'Hoàn thành', class: 'bg-green-400', backgroud: '5fba7d', key: 'completed' },
    { value: 4, text: 'Treo lại', class: 'bg-purple-400', backgroud: '8f1aac', key: 'deferred' },
    { value: 5, text: 'Chờ người khác giải quyết', class: 'bg-indigo-600', backgroud: '4d4dff', key: 'waiting_on_someone_else' },
    { value: 6, text: 'Tiếp tục theo dõi', class: 'bg-blue-300', backgroud: '5bc0de', key: 'follow_up' },
    // { value: 7, text: 'Khóa đóng', class: 'bg-yellow-300', backgroud: 'f6bb29', key: 'lock' },
]

// TRẠNG THÁI CHECKLIST
export const PCM_STATUS_CHECKLIST = [
    { value: 0, text: 'Khởi tạo', class: 'bg-red-400', backgroud: 'ffb3b3', key: 'open' },
    { value: 1, text: 'Hoàn thành', class: 'bg-green-400', backgroud: '5fba7d', key: 'completed' },
    { value: 2, text: 'Đang triển khai', class: 'bg-blue-400', backgroud: '00aaff', key: 'in_progress' },
    { value: 3, text: 'Treo lại', class: 'bg-purple-400', backgroud: '8f1aac', key: 'deferred' },
]

// MỨC ĐỘ QUAN TRỌNG
export const PCM_PRIORITY_TASK = [
    { value: 1, text: 'Thấp', class: 'bg-gray-400', backgroud: '808080', key: 'low' },
    { value: 2, text: 'Trung bình', class: 'bg-blue', backgroud: '5bc0de', key: 'normal' },
    { value: 3, text: 'Cao', class: 'bg-red', backgroud: 'ffb3b3', key: 'high' },
    { value: 4, text: 'Siêu quan trọng', class: 'bg-red', backgroud: 'ffb3b3', key: 'supperhigh' }
]

// MỨC ĐỘ CẤP BÁCH
export const ARR_URGENT = [
    { value: 1, text: 'Không cấp bách' },
    { value: 2, text: 'Trung bình' },
    { value: 3, text: 'Cấp bách' },
]

// MỨC ĐỘ PHỨC TẠP
export const ARR_DIFFICULT = [
    { value: 1, text: 'Không phức tạp' },
    { value: 2, text: 'Phức tạp trung bình' },
    { value: 3, text: 'Phức tạp cao' },
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

/**
 * Phân loại tính chất công việc
 * 0-Việc thông thường
 * 1-Yêu cầu thông tin
 * 2-Yêu cầu phê duyệt
 * 3-Thanh toán/Chi phí
 * 4-Đấu thầu
 * 5-Nghiệm thu chất lượng
 * 6-Yêu cầu sửa chữa
 * 7-Yêu cầu thay đổi
 * 8-Yêu cầu thực hiện
 * 9-Báo cáo
 * 10-Tiến độ
 * 11-Biên bản họp
 */
export const PCM_PROPOSAL_TASK = [
    { value: 0, text: 'Việc thông thường', sign: 'Tasks', key: 'task' },
    { value: 1, text: 'Đề nghị cấp thông tin', sign: 'RFis', key: 'rfi' },
    { value: 2, text: 'Đề nghị phê duyệt', sign: 'RFa', key: 'rfa' },
    { value: 3, text: 'Thanh toán', sign: 'CRFa', key: 'crfa' },
    { value: 4, text: 'Thầu và mua sắm', sign: 'BRFa', key: 'brfa' },
    { value: 5, text: 'Nghiệm thu', sign: 'QRFa', key: 'inspection' },
    { value: 6, text: 'Đề nghị sửa chữa', sign: 'Punch', key: 'punch' },
    { value: 7, text: 'Đề nghị thay đổi', sign: 'RFc', key: 'rfc' },
    { value: 8, text: 'Đề nghị thực hiện', sign: 'RFe', key: 'rfe' },
    { value: 9, text: 'Báo cáo', sign: 'Report', key: 'report' },
    { value: 10, text: 'Tiến độ, kế hoạch', sign: 'Schedule', key: 'schedule' },
    { value: 11, text: 'Họp', sign: 'MOM', key: 'mom' },
    { value: 12, text: 'Hóa đơn', sign: 'MOM', key: 'mom' },
]

export const PCM_SUBTYPE = [
    { value: 0, text: 'Việc thông thường', sign: 'Tasks', key: 'task' },
    { value: 1, text: 'Đề nghị cấp thông tin', sign: 'RFis', key: 'rfi' },
    { value: 2, text: 'Đề nghị phê duyệt', sign: 'RFa', key: 'rfa' },
    { value: 3, text: 'Thanh toán', sign: 'CRFa', key: 'crfa' },
    { value: 4, text: 'Thầu và mua sắm', sign: 'BRFa', key: 'brfa' },
    { value: 5, text: 'Nghiệm thu', sign: 'QRFa', key: 'inspection' },
    { value: 6, text: 'Đề nghị sửa chữa', sign: 'Punch', key: 'punch' },
    { value: 7, text: 'Đề nghị thay đổi', sign: 'RFc', key: 'rfc' },
    { value: 8, text: 'Đề nghị thực hiện', sign: 'RFe', key: 'rfe' },
    { value: 9, text: 'Báo cáo', sign: 'Report', key: 'report' },
    { value: 10, text: 'Tiến độ, kế hoạch', sign: 'Schedule', key: 'schedule' },
    { value: 11, text: 'Họp', sign: 'MOM', key: 'mom' },
]

// MỐC TIẾN ĐỘ
export const PCM_MILESTONE = [
    { value: 0, text: 'Việc thông thường', sign: 'Tasks', key: 'task' },
    { value: 1, text: 'Pháp lý', sign: '', key: '' },
    { value: 2, text: 'Thiết kế', sign: '', key: '' },
    { value: 3, text: 'Dự toán, ngân sách', sign: '', key: '' },
    { value: 4, text: 'Thầu và mua sắm', sign: '', key: '' },
    { value: 5, text: 'Thi công', sign: '', key: '' },
    { value: 6, text: 'Bàn giao', sign: '', key: '' },
    { value: 7, text: 'Quyết toán', sign: '', key: '' },
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

// PHÂN LOẠI CHẤM CÔNG
export const TIMESHEET_TYPES = [
    { value: 1, text: 'Quản lý' },
    { value: 2, text: 'Sản xuất' },
]

/**
 * FNB
 */
export const FNB_CUSTOMER = [
    { value: 1, text: 'Học sinh' },
    { value: 2, text: 'Sinh viên' },
    { value: 3, text: 'Phụ nữ' },
    { value: 4, text: 'Đàn ông' },
    { value: 5, text: 'Khác' },
]

export const FNB_CAMPAIGN = [
    { value: 1, text: 'Không bật' },
    { value: 2, text: 'Bật' },
]

export const FNB_INTERNAL = [
    { value: 1, text: 'Hệ thống' },
    { value: 2, text: 'Đối tác nhượng quyền' },
]

export const FNB_SEASONS = [
    { value: 1, text: 'Mùa xuân' },
    { value: 2, text: 'Mùa hạ' },
    { value: 3, text: 'Mùa thu' },
    { value: 4, text: 'Mùa đông' },
]

export const FNB_SHIFT = [
    { value: 1, text: 'Ca sáng' },
    { value: 2, text: 'Ca chiều' },
    { value: 3, text: 'Ca tối' },
]

export const FNB_CHANNEL = [
    { value: 1, text: 'Offline', sign: "of" },
    { value: 2, text: 'Grab', sign: "gf"  },
    { value: 3, text: 'Shopee', sign: "sp"  },
    { value: 4, text: 'Gojek', sign: "go"  },
    { value: 5, text: 'Baemin', sign: "bm"  },
    { value: 6, text: 'Loship', sign: "ls"  },
    { value: 7, text: 'Bee', sign: "be"  },
]

export const FNB_BOOK_PLAN = [
    { value: 1, text: 'Kế hoạch' },
    { value: 2, text: 'Thực tế' },
]

export const FNB_BOOK_OUTIN = [
    { value: 1, text: 'Doanh thu' },
    { value: 2, text: 'Chi phí' },
]

export const FNB_BOOK_TYPE = [
    { value: 1, text: 'Food App' },
    { value: 2, text: 'Nguyên liệu' },
    { value: 3, text: 'Thuê mặt bằng' },
    { value: 4, text: 'Nhân viên' },
    { value: 5, text: 'Quản lý' },
    { value: 6, text: 'Bảo trì' },
    { value: 7, text: 'Khác' },
]

export const FNB_BOOK_STORE = [
    { value: 1, text: 'Nhập kho' },
    { value: 2, text: 'Xuất kho' },
]

export const FNB_SERVICE = [
    { value: 1, text: 'Tại quán' },
    { value: 2, text: 'Mang đi' },
    { value: 3, text: 'Giao hàng' },
]

export const FNB_PAYMENT = [
    { value: 1, text: 'Tiền mặt' },
    { value: 2, text: 'Chuyển khoản' }
]

export const FNB_TOPPING = [
    { value: 1, text: 'Trân châu đen' },
    { value: 2, text: 'Trân châu trắng' },
]

export const FNB_SIZE = [
    { value: 1, text: 'M' },
    { value: 2, text: 'L' },
]

export const FNB_SUGAR = [
    { value: 1, text: '100' },
    { value: 2, text: '70' },
    { value: 3, text: '50' },
    { value: 4, text: '30' },
    { value: 5, text: '0' },
]

export const FNB_ICE = [
    { value: 1, text: '100' },
    { value: 2, text: '70' },
    { value: 3, text: '50' },
    { value: 4, text: '30' },
    { value: 5, text: '0' },
]

export const FNB_ORDER_STATUS = [
    { value: 1, text: 'Đang giao hàng/Phục vụ', backgroud: '4d4dff' },
    { value: 2, text: 'Hoàn tiền một phần', backgroud: '4d4dff' },
    { value: 3, text: 'Hoàn tiền toàn bộ', backgroud: '4d4dff' },
    { value: 4, text: 'Đã hủy', backgroud: '00aaff' },
    { value: 5, text: 'Hoàn thành', backgroud: '5fba7d' },
]

export const FNB_NORESIDENT_TYPES = [
    { value: 1, text: 'Đã biết khách', backgroud: '4d4dff' },
    { value: 2, text: 'Chưa biết khách', backgroud: 'FFB83A' },
]

/**
 * TÀI CHÍNH DOANH NGHIỆP
 */
// PHÂN LOẠI KẾ HOẠCH TÀI CHÍNH
export const FINANCIAL_PLANNING_TYPES = [
    { value: 1, text: 'Kế hoạch Năm' },
    { value: 2, text: 'Kế hoạch Bán hàng' },
    { value: 3, text: 'Kế hoạch Nhập hàng' },
    { value: 4, text: 'Kế hoạch theo vòng đời dự án' },
    { value: 5, text: 'Kế hoạch theo hợp đồng/hàng tháng' },
    { value: 6, text: 'Kế hoạch khác' },
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
    { value: 1, text: 'Quỹ', accounts: ['111', '112'], isDebit: true },
    { value: 2, text: 'Doanh thu', accounts: ['511', '515', '521', '711'], isDebit: false },
    { value: 3, text: 'Chi phí', accounts: ['621', '622', '623', '627', '631', '632', '635', '641', '642', '811', '821'], isDebit: true },
    { value: 4, text: 'Công nợ phải thu', accounts: ['128', '131', '136', '138', '141'], isDebit: true },
    { value: 5, text: 'Công nợ phải trả', accounts: ['331', '334', '336', '338', '341'], isDebit: false },
]

// PHÂN LOẠI NGUỒN KHÁCH HÀNG
export const ORDER_SOURCE = [
    { value: 1, text: 'Facebook', class: 'tajic-status-btn-open' },
    { value: 2, text: 'Website', class: 'tajic-status-btn-open' },
    { value: 3, text: 'Zalo', class: 'tajic-status-btn-in-progress' },
    { value: 4, text: 'Khác', class: 'tajic-status-btn-in-progress' },
]

// PHÂN LOẠI ĐƠN HÀNG
export const ORDER_NEW = [
    { value: 1, text: 'Đơn cũ', class: 'tajic-status-btn-open' },
    { value: 2, text: 'Đơn mới', class: 'tajic-status-btn-open' },
]

// CHÍNH SÁCH GIÁ BÁN
export const ORDER_POLICY = [
    { value: 1, text: 'Bán lẻ', class: 'tajic-status-btn-open' },
    { value: 2, text: 'Bán buôn', class: 'tajic-status-btn-open' },
]

// TRẠNG THÁI KHÁCH HÀNG
export const CONTACT_STATUS = [
    { value: 1, text: 'Chưa giao dịch', key: 'open' },
    { value: 2, text: 'Đang giao dịch', key: 'in_progress' },
    { value: 3, text: 'Ngừng giao dịch', key: 'completed' },
]

// TRẠNG THÁI SỔ QUỸ
export const CASHBOOK_STATUS = [
    { value: 1, text: 'Đang hoạt động', key: 'open' },
    { value: 2, text: 'Đã khóa chuyển sổ khác', key: 'in_progress' },
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
    { value: 2, text: 'Tư vấn Quản lý dự án' },
    { value: 3, text: 'Tư vấn giám sát' },
    { value: 4, text: 'Tư vấn thiết kế' },
    { value: 5, text: 'Nhà thầu thi công' },
    { value: 6, text: 'Tư vấn thẩm tra' },
    { value: 7, text: 'Tư vấn khác' },
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
 export const FINANCIAL_PLANNING_PROPERTY = [
    { value: 1, text: 'Sản lượng' },
    { value: 2, text: 'Doanh thu' },
    { value: 3, text: 'Dòng tiền' },
]

export const KEY_ERRORS = {
    PERMISSION_DENIED   : "permission_denied",
    INSERT_FAILED       : "insert_failed",
    UPDATE_FAILED       : "update_failed",
    DELETE_FAILED       : "delete_failed",
    GET_INFO_FAILED     : "get_info_failed",
    GET_LIST_FAILED     : "get_list_failed",
    PARAMS_INVALID      : "params_invalid",
    ITEM_EXISTED        : "item_existed",
}

/**
 * 1. Hình ảnh
 * 2. Video
 * 3. Zip
 */
export const PCM_TYPE_FILE = [
    { value: 1, type: ['jpg', 'jpeg', 'png', 'gif', 'heic'] },
    { value: 2, type: ['mp3', 'mp4', 'wav'] },
    { value: 3, type: ['zip', 'rar', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx', 'dwg', 'mmap', 'mdb', 'rar', 'txt', 'mpp'] }
]

export const MESSAGE_TYPE_FILE = [
    { value: 1, type: ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'gif', 'GIF', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/svg+xml'] },
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
export const MIME_TYPES_IMAGE = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/svg+xml'];

export const MIME_TYPES_PCM = ['mov', 'mp4', 'MP4', 'wav', 'WAV', 'jpg', 'jpeg', 'png', 'gif', 'heic', 'zip', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx', 'dwg', 'mmap', 'mdb', 'rar', 'image/png', 'txt', 'mpp'];

export const MIME_TYPES_MESSAGE = ['jpg', 'jpeg', 'png', 'gif', 'heic', 'zip', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx', 'dwg', 'mmap', 'mdb', 'rar', 'txt', 'mpp'];

export const DATE_FORMAT = "DD/MM/YYYY";
export const DATE_FORMAT_TIME = "DD/MM/YYYY HH:MM";
export const LIMIT_DROPDOWN = 20;

/**
 * App ID
 */

export const APP_ID = {
    PCM: {
        id: "5dfe4b9051dc622100bb9d89",
        menuPcmApp: {                                       // type = 1
            id: "623ef213e998e94feda0ccd8",
            projects: {
                id: "623ef363e998e94feda0ccde",
                name: "Dự án đang triển khai"
            },
            dashboard_portfolio: {
                id: "623efd30e998e94feda0cd1b",
                name: "Báo cáo đầu tư"
            },
            dashboard_task: {
                id: "623efd51e998e94feda0cd1c",
                name: "Báo cáo quản trị công việc",
            },
            dashboard_document: {
                id: "623efd64e998e94feda0cd1d",
                name: "Báo cáo quản trị hồ sơ",
            }
        },
        menuPcmProject: {                                    // type = 2
            id: "623f04cce998e94feda0cd32",
            dashboard: {
                id: "623f05f9e998e94feda0cd33",
                name: "Báo cáo quản trị"
            },
            subject: {
                id: "6272ec513cf2ab30141bff14",
                name: "Công việc"
            },
            folder: {
                id: "623f061de998e94feda0cd34",
                name: "Thư mục dữ liệu"
            },
            document: {
                id: "623f062fe998e94feda0cd35",
                name: "Hồ sơ văn bản",
            },
            budget: {
                id: "623f063be998e94feda0cd36",
                name: "Ngân sách và hợp đồng",
            },
            photo: {
                id: "623f0657e998e94feda0cd37",
                name: "Hình ảnh",
            },
            drawing: {
                id: "623f066ae998e94feda0cd38",
                name: "Bản vẽ",
            }
        }
    },
    PM: {
        id: "5eabfdc72171391e5f6a0468",
    },
    CMCS: {
        id: "6131d6f83f4b736dc93253b2",
        menuCmcsApp: {
            id: "623f22b1e998e94feda0cd8b",                   // type = 1
            dashboard: {
                id: "6334e682e3fbde2ef11b7925",
                name: "Báo cáo quản trị"
            },
            income: {
                id: "623f22d1e998e94feda0cd91",
                name: "Hợp đồng bán ra"
            },
            expense: {
                id: "623f22dee998e94feda0cd92",
                name: "Hợp đồng mua vào"
            },
            partner: {
                id: "6272eb0f3cf2ab30141bff10",
                name: "Hợp đồng đối tác"
            },
            guarantee: {
                id: "623f22eae998e94feda0cd93",
                name: "Theo dõi bảo lãnh"
            },
        },
        menuCmcsContract: {
            id: "623f22ffe998e94feda0cd94",                    // type = 3
            dashboard: {
                id: "623f2311e998e94feda0cd95",
                name: "Báo cáo quản trị"
            },
            produce: {
                id: "623f231de998e94feda0cd96",
                name: "Sản lượng"
            },
            ipc: {
                id: "623f2338e998e94feda0cd97",
                name: "Nghiệm thu hoàn thành"
            },
            payment: {
                id: "623f2344e998e94feda0cd98",
                name: "Tiền về"
            },
        }
    },
    FINANCIAL: {
        id: "5dfe4bc751dc622100bb9d8a",
        menuFinancialApp: {
            id: "623f2448e998e94feda0cda9",                   // type = 1
            payment: {
                id: "623f2465e998e94feda0cdaa",
                name: "Gói trả trước"
            },
            cashbook: {
                id: "623f2472e998e94feda0cdab",
                name: "Theo dõi sổ quỹ"
            },
            cashflow: {
                id: "623f247fe998e94feda0cdac",
                name: "Kế hoạch dòng tiền"
            },
        },
    },
    DOCUMENT: {
        id: "5e47867080019357cce04746",
        menuDocumentApp: {
            id: "623f23f1e998e94feda0cda4",
            dashboard: {
                id: "623f2404e998e94feda0cda6",
                name: "Báo cáo quản trị"
            }
        },
        menuDocumentProject: {}
    },
    HUMAN: {
        id: "61e049c9fdebf77b072d1b13",
    },
    BUDGET: {
        id: "5fe58c9b95db3c6e1534ec78",
    },
    ACCOUNTING: {
        id: "61e049aefdebf77b072d1b12",
        menuAccountingApp: {
            id: "623f1f49e998e94feda0cd74",
            dashboard: {
                id: "623f1f63e998e94feda0cd75",
                name: "Báo cáo quản trị"
            },
            accbill: {
                id: "623f1f80e998e94feda0cd76",
                name: "Phiếu kế toán"
            },
            receipt: {
                id: "623f1f8ce998e94feda0cd77",
                name: "Phiếu thu"
            },
            payment: {
                id: "623f1f9be998e94feda0cd78",
                name: "Phiếu chi"
            },
            goods_import: {
                id: "623f1fabe998e94feda0cd79",
                name: "Phiếu nhập"
            },
            goods_export: {
                id: "623f201de998e94feda0cd7a",
                name: "Phiếu xuất"
            },
            invoices: {
                id: "623f202ae998e94feda0cd7b",
                name: "Hóa đơn dịch vụ"
            },
            debit_note: {
                id: "623f2038e998e94feda0cd7c",
                name: "Giấy báo nợ"
            },
            credit_note: {
                id: "623f2046e998e94feda0cd7d",
                name: "Giấy báo có"
            },
            detail: {
                id: "623f2056e998e94feda0cd7e",
                name: "Chi tiết tài khoản"
            },
            tbook: {
                id: "623f2073e998e94feda0cd7f",
                name: "Sổ tổng hợp chữ T"
            },
            diary: {
                id: "623f2081e998e94feda0cd80",
                name: "Sổ nhật ký chung"
            },
            import_export: {
                id: "623f208fe998e94feda0cd81",
                name: "Nhập xuất tồn"
            },
            debt_tracking: {
                id: "623f209ce998e94feda0cd82",
                name: "Theo dõi công nợ"
            },
            vatin: {
                id: "623f20a8e998e94feda0cd83",
                name: "Bảng kê mua vào"
            },
            vatout: {
                id: "658ff4fc715d5800120b9da4",
                name: "Bảng kê bán ra"
            },
            financial_report: {
                id: "623f20b5e998e94feda0cd84",
                name: "Báo cáo tài chính"
            },
            support_tools: {
                id: "623f20c2e998e94feda0cd85",
                name: "Công cụ hỗ trợ"
            },
        },
    },
    FNB: {
        id: "61e04971fdebf77b072d1b0f",
        menuFnbApp: {
            id: "63af81debe33df0012ecaeca",
            payment: {
                id: "623f21bce998e94feda0cd89",
                name: "Payment"
            },
            dashboard: {
                id: "623f21cde998e94feda0cd8a",
                name: "Báo cáo quản trị"
            },
            revenueReport: {
                id: "63af822f87a6c20011972adf",
                name: "Báo cáo doanh thu"
            },
            riskReport: {
                id: "63af82484faba6001259551f",
                name: "Báo cáo lỗi hay gặp"
            },
            contacts: {
                id: "63af825ebe33df0012ecaed8",
                name: "Danh bạ khách hàng"
            },
            shift: {
                id: "63af826987a6c20011972ae0",
                name: "Ca làm việc"
            },
            store: {
                id: "63af82764faba60012595520",
                name: "Quản lý kho"
            },
            expense: {
                id: "63af8280be33df0012ecaed9",
                name: "Quản lý chi phí"
            },
            product: {
                id: "63af828e87a6c20011972ae1",
                name: "Thực đơn"
            },
            voucher: {
                id: "641b14185dbd2900125544fc",
                name: "Voucher"
            },
            reports: {
                id: "63ecc4e03e1aa800127fb48b",
                name: "Báo cáo khác"
            },
        }
    },
    OWNER: {
        id: "61e04989fdebf77b072d1b10",
    },
    TIMESHEET: {
        id: "61e049cffdebf77b072d1b14",
    },
}