import { ReceiptStatus } from "./types";

// Status mapping
export const STATUS_MAP: Record<number, ReceiptStatus> = {
  5: "Hoàn thành",
  6: "Hủy",
};

// Type mapping
export const TYPE_MAP: Record<number, string> = {
  1: "Đầu kỳ",
  2: "Trong kỳ",
  3: "Cuối kỳ",
};

// Status codes
export const STATUS_CODES = {
  COMPLETED: 5,
  CANCELLED: 6,
} as const;

// Forward mapping
export const FORWARD_MAP: Record<number, string> = {
  0: "Bình thường",
  1: "Đầu kỳ",
};

// Type codes
export const TYPE_CODES = {
  BEGINNING: 1,
  DURING: 2,
  ENDING: 3,
} as const;

// Mock dropdown data - TODO: Replace with API data
export const CUSTOMER_OPTIONS = [
  { id: "1", text: "Nguyễn Hoàng Anh - 0988115999" },
  { id: "2", text: "Trần Văn Nam - 0912345678" },
  { id: "3", text: "Lê Thị Mai - 0987654321" },
];

export const FEE_ITEM_OPTIONS = [
  { id: "1", text: "Khoản mục 1" },
  { id: "2", text: "Khoản mục 2" },
  { id: "3", text: "Khoản mục 3" },
];

export const FACILITY_OPTIONS = [
  { id: "1", text: "Cơ sở Lương Định Của" },
  { id: "2", text: "Cơ sở Trần Phú" },
  { id: "3", text: "Cơ sở Nguyễn Huệ" },
];

export const TYPE_OPTIONS = [
  { id: "1", text: "Đầu kỳ" },
  { id: "2", text: "Trong kỳ" },
  { id: "3", text: "Cuối kỳ" },
];
