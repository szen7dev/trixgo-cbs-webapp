# Contacts API Pagination Integration

## Overview

Updated the contacts API integration to support paginated responses with
infinite scroll functionality.

## Changes Made

### 1. Updated Types (`shared/types.ts`)

Added `ContactsResponse` interface to match the new API response schema:

```typescript
export interface ContactsResponse {
  listRecords: Contact[];
  limit: number;
  totalRecord: number;
  totalPage: number;
  nextCursor: string | null;
}
```

### 2. Updated Main Component (`index.tsx`)

#### Added State for Pagination

```typescript
const [contactsNextCursor, setContactsNextCursor] = useState<string | null>(
  null,
);
```

#### Updated Initial Fetch

```typescript
// Fetch contacts for customer dropdown
if (accountData.company) {
  const { data: { data: contactsData } } = await API.get(
    `/api/item/contacts?companyID=${accountData.company}`,
  );

  if (contactsData?.listRecords && Array.isArray(contactsData.listRecords)) {
    const contactOptions: DropdownOption[] = contactsData.listRecords.map((
      contact: Contact,
    ) => ({
      id: contact._id,
      text: contact.phone ? `${contact.name} - ${contact.phone}` : contact.name,
    }));

    setCustomerOptions(contactOptions);
    setContactsNextCursor(contactsData.nextCursor); // Store cursor for pagination
  }
}
```

#### Added Load More Function

```typescript
const loadMoreContacts = async () => {
  if (!contactsNextCursor || !accountInfo?.company) return;

  try {
    const { data: { data: contactsData } } = await API.get(
      `/api/item/contacts?companyID=${accountInfo.company}&lastestID=${contactsNextCursor}`,
    );

    if (contactsData?.listRecords && Array.isArray(contactsData.listRecords)) {
      const newContactOptions: DropdownOption[] = contactsData.listRecords.map((
        contact: Contact,
      ) => ({
        id: contact._id,
        text: contact.phone
          ? `${contact.name} - ${contact.phone}`
          : contact.name,
      }));

      setCustomerOptions((prev) => [...prev, ...newContactOptions]); // Append new contacts
      setContactsNextCursor(contactsData.nextCursor); // Update cursor
    }
  } catch (error) {
    console.error("Error loading more contacts:", error);
  }
};
```

### 3. Updated DropdownSearchable Component

#### Added onLoadMore Prop

```typescript
interface DropdownSearchableProps {
  // ... existing props
  onLoadMore?: () => void;
}
```

#### Added Scroll Detection

```typescript
<div 
  ref={scrollRef}
  className="overflow-y-auto max-h-[240px]"
  onScroll={(e) => {
    const target = e.currentTarget;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom && onLoadMore) {
      onLoadMore();  // Trigger load more when scrolled to bottom
    }
  }}
>
```

### 4. Updated EditableRow Component

#### Added onLoadMoreCustomers Prop

```typescript
interface EditableRowProps {
  // ... existing props
  onLoadMoreCustomers?: () => void;
}
```

#### Passed to Customer Dropdown

```typescript
<DropdownSearchable
  data={customerOptions}
  value={customerOptions.find((opt) => opt.id === editData.customer?._id)}
  onChange={(item) => {
    if (item) {
      handleFieldChange("customer", {
        _id: item.id,
        name: item.text,
        phone: "",
      });
    }
  }}
  placeholder="Chọn khách hàng"
  onLoadMore={onLoadMoreCustomers} // Enable infinite scroll
/>;
```

## API Integration

### Initial Fetch

```
GET /api/item/contacts?companyID={companyId}
```

**Response:**

```json
{
  "data": {
    "listRecords": [
      {
        "_id": "contact1",
        "name": "Nguyễn Văn A",
        "phone": "0988115999"
      }
    ],
    "limit": 50,
    "totalRecord": 150,
    "totalPage": 3,
    "nextCursor": "cursor_token_here"
  }
}
```

### Load More (Pagination)

```
GET /api/item/contacts?companyID={companyId}&lastestID={nextCursor}
```

**Response:** Same structure with new `listRecords` and updated `nextCursor`

## User Experience

1. **Initial Load**: First 50 contacts loaded on component mount
2. **Scroll Detection**: When user scrolls to bottom of dropdown
3. **Auto Load**: If `nextCursor` is not null, automatically fetch next page
4. **Append Results**: New contacts appended to existing list
5. **Seamless**: No loading indicators, smooth infinite scroll
6. **Stop Condition**: When `nextCursor` is null, no more data to load

## Benefits

✅ **Performance**: Load only what's needed (50 items at a time)\
✅ **UX**: Infinite scroll - no pagination buttons\
✅ **Scalable**: Handles large contact lists efficiently\
✅ **Automatic**: Loads more when scrolling to bottom\
✅ **Smart**: Stops loading when no more data available\
✅ **Type-Safe**: Full TypeScript support

## Example Flow

```
User opens dropdown
    ↓
Shows first 50 contacts
    ↓
User scrolls down
    ↓
Reaches bottom of list
    ↓
Checks if nextCursor exists
    ↓
If yes: Fetch next 50 contacts
    ↓
Append to existing list
    ↓
Update nextCursor
    ↓
Repeat until nextCursor is null
```
