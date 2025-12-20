# Status and Forward Field Updates

## Changes Made

### 1. Updated Status Codes

Changed from the old status mapping to the new one:

**Old Status Codes:**

- 1: Khởi tạo
- 5: Hoàn thành
- 9: Hủy

**New Status Codes:**

- 5: Hoàn thành (Completed)
- 6: Hủy (Cancelled)
- Any other value: Khởi tạo (Initiated) - default

### 2. Added Forward Field Mapping

Introduced a new field `forward` to replace the `type` field for the last
column:

**Forward Field Values:**

- 0: Bình thường (Normal)
- 1: Đầu kỳ (Beginning of period)

### 3. Updated Constants (`shared/constants.ts`)

```typescript
// Status mapping
export const STATUS_MAP: Record<number, ReceiptStatus> = {
  5: "Hoàn thành",
  6: "Hủy",
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
```

### 4. Updated Utils (`shared/utils.ts`)

Added new utility function:

```typescript
/**
 * Get forward label from forward code
 * 0 = Bình thường, 1 = Đầu kỳ
 */
export const getForwardLabel = (forward: number): string => {
  return FORWARD_MAP[forward] || "Bình thường";
};
```

Updated status label function:

```typescript
/**
 * Get status label from status code
 * 5 = Hoàn thành, 6 = Hủy, others = Khởi tạo
 */
export const getStatusLabel = (status: number): ReceiptStatus => {
  return STATUS_MAP[status] || "Khởi tạo";
};
```

### 5. Updated Main Component (`index.tsx`)

**Status Badge Rendering:**

```tsx
<span
  className={`statusBadge ${
    record.status === STATUS_CODES.COMPLETED
      ? "statusSuccess"
      : record.status === STATUS_CODES.CANCELLED
      ? "statusCancel"
      : "statusPending"
  }`}
>
  {getStatusLabel(record.status)}
</span>;
```

**Forward Field Rendering:**

```tsx
<div
  style={{
    background: "#FFF8E6",
    padding: "6px 12px",
    borderRadius: "6px",
    minWidth: "80px",
    textAlign: "center",
  }}
>
  {getForwardLabel(record.forward)}
</div>;
```

## API Response Mapping

The component now correctly maps the API response fields:

- `status`: 5 (Hoàn thành), 6 (Hủy), or other (Khởi tạo)
- `forward`: 0 (Bình thường) or 1 (Đầu kỳ)

## Benefits

1. **Accurate Status Display**: Now correctly shows status based on values 5 and
   6
2. **Forward Field Support**: Properly displays the forward field from API
3. **Default Handling**: Any status not 5 or 6 defaults to "Khởi tạo"
4. **Maintainable**: All mappings centralized in constants
5. **Type Safe**: Uses named constants instead of magic numbers
