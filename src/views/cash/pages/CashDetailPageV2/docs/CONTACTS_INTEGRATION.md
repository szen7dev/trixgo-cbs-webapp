# Contacts API Integration

## Overview

Integrated the contacts API to dynamically populate the customer dropdown in the
receipt detail page.

## Changes Made

### 1. Added Contact Interface (`shared/types.ts`)

```typescript
export interface Contact {
  _id: string;
  name: string;
  phone?: string;
}
```

### 2. Updated Main Component (`index.tsx`)

#### Added State for Customer Options

```typescript
const [customerOptions, setCustomerOptions] = useState<DropdownOption[]>(
  CUSTOMER_OPTIONS,
);
```

#### Fetch Contacts on Component Mount

```typescript
useEffect(() => {
  if (!accountId) return;

  (async () => {
    try {
      // Fetch account info
      const { data: { data: accountData } } = await API.get(
        `/api/item/accounts?accountID=${accountId}`,
      );

      if (accountData) {
        setAccountInfo(accountData);

        // Fetch contacts for customer dropdown
        if (accountData.company) {
          const { data: { data: contacts } } = await API.get(
            `/api/item/contacts?companyID=${accountData.company}`,
          );

          if (contacts && Array.isArray(contacts)) {
            const contactOptions: DropdownOption[] = contacts.map((
              contact: Contact,
            ) => ({
              id: contact._id,
              text: contact.phone
                ? `${contact.name} - ${contact.phone}`
                : contact.name,
            }));
            setCustomerOptions(contactOptions);
          }
        }
      }

      // Fetch records
      await fetchRecords();
    } catch (error) {
      console.error(error);
    }
  })();
}, [accountId]);
```

#### Pass Dynamic Options to EditableRow

```typescript
<EditableRow
  key={record._id}
  record={record}
  onSave={handleSaveEdit}
  customerOptions={customerOptions} // Dynamic from API
  feeItemOptions={FEE_ITEM_OPTIONS}
  facilityOptions={FACILITY_OPTIONS}
  typeOptions={TYPE_OPTIONS}
/>;
```

## API Integration Details

### Endpoint

```
GET /api/item/contacts?companyID={accountInfo.company}
```

### Response Format

```typescript
{
  data: Contact[]  // Array of contact objects
}
```

### Contact Object Structure

```typescript
{
  _id: string;
  name: string;
  phone?: string;
}
```

### Dropdown Option Mapping

Each contact is transformed into a dropdown option:

- **ID**: `contact._id`
- **Text**: `{contact.name} - {contact.phone}` (if phone exists) or just
  `{contact.name}`

## Behavior

1. **On Component Mount**:
   - Fetches account info using `accountId`
   - Extracts `company` from account info
   - Fetches contacts for that company
   - Transforms contacts into dropdown options
   - Updates `customerOptions` state

2. **Default Fallback**:
   - Starts with `CUSTOMER_OPTIONS` (mock data)
   - Replaces with real data once API responds

3. **Single Fetch**:
   - Contacts are fetched only once on mount
   - Cached in component state
   - Reused for all EditableRow instances

## Benefits

✅ **Dynamic Data**: Customer list populated from real API data\
✅ **Company-Specific**: Shows only contacts for the current account's company\
✅ **Performance**: Single API call, cached in state\
✅ **Fallback**: Uses mock data until API responds\
✅ **Type-Safe**: Full TypeScript support with Contact interface\
✅ **User-Friendly**: Displays name and phone in dropdown

## Example Dropdown Display

```
Nguyễn Văn A - 0988115999
Trần Thị B - 0912345678
Lê Văn C
```

(Phone number shown if available, otherwise just name)
