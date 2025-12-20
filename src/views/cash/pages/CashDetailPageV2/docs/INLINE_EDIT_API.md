# Inline Edit API Integration

## Overview

Implemented PUT API integration for inline editing of receipt records with smart
field mapping.

## API Endpoint

```
PUT /api/store/order_products
```

## Request Body Schema

```typescript
{
  orderProductID: string;  // Required: _id of the record being updated
  name?: string;           // Optional: Content/name of the record
  fundaID?: string;        // Optional: Facility ID (from funda._id)
  customerID?: string;     // Optional: Customer ID (from customer._id)
  subtypeID?: string;      // Optional: Fee item ID (from subtype._id)
  unitPrice?: number;      // Optional: Amount (mapped from amount field)
  note?: string;           // Optional: Note (not yet in interface)
}
```

## Implementation Details

### Field Mapping

The component uses `ReceiptRecord` interface internally, but the API expects
different field names:

| Component Field     | API Field        | Mapping Logic          |
| ------------------- | ---------------- | ---------------------- |
| `_id`               | `orderProductID` | Direct value           |
| `name`              | `name`           | Direct value           |
| `funda` (object)    | `fundaID`        | Extract `funda._id`    |
| `customer` (object) | `customerID`     | Extract `customer._id` |
| `subtype` (object)  | `subtypeID`      | Extract `subtype._id`  |
| `amount`            | `unitPrice`      | Direct value           |

### Smart Field Detection

The implementation only sends fields that were actually edited:

```typescript
const apiPayload: any = {
  orderProductID: id, // Always required
};

// Only include fields that were actually updated
if (updatedFields.name !== undefined) {
  apiPayload.name = updatedFields.name;
}
if (updatedFields.funda !== undefined) {
  apiPayload.fundaID = updatedFields.funda._id;
}
// ... etc
```

### Benefits

✅ **Efficient**: Only sends changed fields, not entire record\
✅ **Safe**: Prevents overwriting unchanged data\
✅ **Flexible**: Easy to add new fields\
✅ **Type-Safe**: TypeScript ensures correct types

## User Flow

1. **User double-clicks a row** → Row enters edit mode
2. **User edits fields** → Changes tracked in component state
3. **User clicks outside or presses Enter** → `handleSaveEdit` triggered
4. **Field mapping** → Component fields mapped to API schema
5. **API call** → PUT request sent with only changed fields
6. **Success** → Local state updated, row exits edit mode
7. **Error** → Alert shown, row remains in edit mode

## Example API Calls

### Editing Only Name

```json
{
  "orderProductID": "66f8dcb67199330012f4b4bd",
  "name": "New Investment Cost"
}
```

### Editing Customer and Amount

```json
{
  "orderProductID": "66f8dcb67199330012f4b4bd",
  "customerID": "65b5de439067430012d9be70",
  "unitPrice": 200000000
}
```

### Editing All Fields

```json
{
  "orderProductID": "66f8dcb67199330012f4b4bd",
  "name": "Updated Name",
  "fundaID": "64c0fe7c5388f60012f5b9f0",
  "customerID": "65b5de439067430012d9be70",
  "subtypeID": "65a0b7e58c8c3f001355b945",
  "unitPrice": 150000000
}
```

## Error Handling

### API Error

```typescript
if (data?.error) {
  throw new Error(data.error);
}
```

### User Notification

```typescript
catch (error) {
  console.error('Error updating record:', error);
  alert('Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.');
}
```

### State Preservation

- On error, the row remains in edit mode
- User can retry or cancel
- No data loss

## Code Location

**File**: `src/views/cash/pages/CashDetailPageV2/index.tsx`

**Function**:
`handleSaveEdit(id: string, updatedFields: Partial<ReceiptRecord>)`

**Lines**: ~97-150

## Future Enhancements

### Add Note Field

Currently commented out, can be enabled by:

1. Add `note` to `ReceiptRecord` interface
2. Uncomment in `handleSaveEdit`:

```typescript
if (updatedFields.note !== undefined) {
  apiPayload.note = updatedFields.note;
}
```

### Add Date Field

If date editing is needed:

```typescript
if (updatedFields.date !== undefined) {
  apiPayload.date = updatedFields.date;
}
```

### Optimistic Updates

For better UX, update UI before API call:

```typescript
// Update UI immediately
setRecords(
  records.map((record) =>
    record._id === id ? { ...record, ...updatedFields } : record
  ),
);

// Then call API
await API.put("/api/store/order_products", apiPayload);

// Revert on error if needed
```

## Testing Checklist

- [ ] Edit single field (name)
- [ ] Edit multiple fields
- [ ] Edit dropdown fields (customer, funda, subtype)
- [ ] Edit amount field
- [ ] Test with network error
- [ ] Test with API error response
- [ ] Verify only changed fields sent
- [ ] Verify local state updates correctly
- [ ] Test cancel (click outside without changes)
