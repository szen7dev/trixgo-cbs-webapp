import { FORWARD_MAP, STATUS_MAP, TYPE_MAP } from "./constants";
import { ReceiptStatus } from "./types";

/**
 * Get status label from status code
 * 5 = Hoàn thành, 6 = Hủy, others = Khởi tạo
 */
export const getStatusLabel = (status: number): ReceiptStatus => {
  return STATUS_MAP[status] || "Khởi tạo";
};

/**
 * Get forward label from forward code
 * 0 = Bình thường, 1 = Đầu kỳ
 */
export const getForwardLabel = (forward: number): string => {
  return FORWARD_MAP[forward] || "Bình thường";
};

/**
 * Get type label from type code
 */
export const getTypeLabel = (type: number): string => {
  return TYPE_MAP[type] || "";
};

/**
 * Format date string to DD/MM/YYYY
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Format date string to HH:mm DD/MM/YYYY
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

/**
 * Convert Date object to ISO string for API
 */
export const dateToISOString = (date: Date): string => {
  return date.toISOString();
};

/**
 * Convert ISO string to Date object
 */
export const isoStringToDate = (dateString: string): Date => {
  return new Date(dateString);
};
