import { ReceiptStatus } from "./types";

// Status mapping
export const STATUS_MAP: Record<number, ReceiptStatus> = {
  1: "Khởi tạo",
  2: "Chờ Ship lấy hàng/Mang hàng tới Ship",
  3: "Đang vận chuyển/giao hàng",
  4: "Giao không thành công",
  5: "Hoàn thành",
  6: "Hủy bỏ",
  7: "Trả hàng/Hoàn tiền",
};

// Type mapping
export const TYPE_MAP: Record<number, string> = {
  1: "Đầu kỳ",
  0: "Cuối kỳ",
};

// Status codes
export const STATUS_CODES = {
  INIT: 1,
  WAITING_PICKUP: 2,
  SHIPPING: 3,
  DELIVERY_FAILED: 4,
  COMPLETED: 5,
  CANCELLED: 6,
  RETURNED: 7,
} as const;

// Status options for dropdown
export const STATUS_OPTIONS = [
  { id: "1", text: "Khởi tạo" },
  { id: "2", text: "Chờ Ship lấy hàng/Mang hàng tới Ship" },
  { id: "3", text: "Đang vận chuyển/giao hàng" },
  { id: "4", text: "Giao không thành công" },
  { id: "5", text: "Hoàn thành" },
  { id: "6", text: "Hủy bỏ" },
  { id: "7", text: "Trả hàng/Hoàn tiền" },
];

// Forward mapping
export const FORWARD_MAP: Record<number, string> = {
  0: "Bình thường",
  1: "Đầu kỳ",
};

export const FORWARD_COLORS: Record<number, string> = {
  0: "#F0F7FF",
  1: "#FFF8E6",
};

// Type codes
export const TYPE_CODES = {
  BEGINNING: 1,
  DURING: 2,
  ENDING: 3,
} as const;

export const TYPE_OPTIONS = [
  { id: "1", text: "Đầu kỳ" },
  { id: "0", text: "Cuối kỳ" },
];
