# API Integration Summary for CashDetailPageV2

## Overview

Successfully integrated API endpoints for fetching and creating receipt records
in the CashDetailPageV2 component.

## Changes Made

### 1. Updated ReceiptRecord Interface

Changed from mock data structure to match API response schema:

```typescript
interface ReceiptRecord {
  _id: string;              // Changed from 'id'
  name: string;             // Changed from 'content'
  date: string;             // Changed from Date to string
  amount: number;
  forward: number;          // New field
  type: number;             // Changed from string to number
  status: number;           // Changed from string literal to number
  account: string;          // New field
  modifyAt: string;         // New field
  userUpdate?: {...};       // New nested object
  customer?: {...};         // Changed from 'customerCode' string
  subtype?: {...};          // Changed from 'feeItem' string
  funda?: {...};            // Changed from 'facility' string
}
```

### 2. API Integration

#### Fetch Records

- **Endpoint**:
  `GET /api/store/order_products?accountID={accountId}&outin=2&populates={populates}`
- **Purpose**: Retrieve list of receipt records for display in table
- **Implementation**: `fetchRecords()` function called on component mount and
  after creating new records

#### Create New Record

- **Endpoint**: `POST /api/store/order_products`
- **Request Body**:
  ```json
  {
    "accountID": "string",
    "outin": 2,
    "name": "string",
    "date": "ISO date string"
  }
  ```
- **Implementation**: `handleSaveNew()` async function

#### Fetch Account Info

- **Endpoint**: `GET /api/item/accounts?accountID={accountId}`
- **Purpose**: Get account details for page title
- **Display Format**: `{name}-{description}`

### 3. Component Updates

#### Main Component (index.tsx)

- Added `loading` state for better UX
- Updated `newRecord` state to use `{ date: Date; name: string }`
- Implemented `fetchRecords()` for data fetching
- Updated `handleSaveNew()` to POST to API
- Updated `handleSaveEdit()` to use `_id` instead of `id`
- Added status mapping helper functions
- Added date formatting utilities (`formatDate`, `formatDateTime`)
- Updated table rendering to use API response fields
- Added loading and empty states

#### EditableRow Component

- Updated to match new ReceiptRecord interface
- Changed field mappings to work with nested objects
- Updated date handling to convert between Date and string
- Fixed dropdown value matching to use correct IDs

### 4. Status Mapping

```typescript
const STATUS_MAP: Record<number, string> = {
  1: "Khởi tạo",
  5: "Hoàn thành",
  9: "Hủy",
};
```

### 5. Type Mapping

- Type 1: 'Đầu kỳ'
- Type 2: 'Trong kỳ'
- Type 3: 'Cuối kỳ'

## User Flow

### Creating a New Record

1. User clicks "Tạo mới" button
2. New row appears with date picker and content input
3. User enters name and selects date
4. On blur or Enter key, record is saved via POST API
5. Records list is refreshed automatically

### Viewing Records

1. Component fetches account info and records on mount
2. Table displays records with proper formatting
3. User update info and timestamps are shown
4. Customer, subtype, and facility info displayed from nested objects

### Editing Records

1. User double-clicks a row
2. Row becomes editable with all fields
3. On blur, changes are saved (API call commented out, ready to implement)

## Next Steps

- Implement PUT/PATCH endpoint for updating records
- Add error handling and user feedback (toasts/notifications)
- Implement pagination if needed
- Add search/filter functionality
