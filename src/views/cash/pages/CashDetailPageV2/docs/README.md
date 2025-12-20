# Cash Detail Page V2 - Feature Documentation

## Overview

This is an enhanced version of the Cash Detail Page with advanced features for
managing receipt records.

## Features

### 1. Dropdown Searchable Component

**Location:** `components/DropdownSearchable.tsx`

**Features:**

- Real-time search filtering
- API data fetching support via `fetchData` prop
- Static data support via `data` prop
- Clear value functionality
- Click-outside-to-close behavior
- Loading states
- Empty state handling

**Usage Example:**

```tsx
<DropdownSearchable
  data={CUSTOMER_OPTIONS}
  onChange={(item) => handleChange("customerCode", item?.text || "")}
  placeholder="Chọn khách hàng"
  fetchData={async (searchTerm) => {
    // Fetch from API
    const response = await fetch(`/api/customers?search=${searchTerm}`);
    return response.json();
  }}
/>;
```

### 2. Date Time Picker Component

**Location:** `components/DateTimePicker.tsx`

**Features:**

- Calendar view with month/year navigation
- Optional time selection (hours and minutes)
- Vietnamese day names and month names
- Clear value functionality
- Click-outside-to-close behavior
- Keyboard navigation support

**Usage Example:**

```tsx
<DateTimePicker
  value={selectedDate}
  onChange={(date) => handleDateChange(date)}
  showTime={true} // Optional: enable time selection
  placeholder="Chọn ngày"
/>;
```

### 3. Currency Input Component

**Location:** `components/CurrencyInput.tsx`

**Features:**

- Auto-formatting as you type (e.g., 1000000 → 1,000,000)
- Automatic comma insertion for thousands
- Number-only input validation
- Select-all on focus for easy editing
- Preserves numeric value internally

**Usage Example:**

```tsx
<CurrencyInput
  value={amount}
  onChange={(value) => handleAmountChange(value)}
  placeholder="0"
/>;
```

### 4. Record Management

#### Creating New Records

- Click **"+ Tạo mới"** button to add a new row at the top
- **Simplified Input**: Only **2 fields** are shown when creating:
  - **Date** (DateTimePicker)
  - **Content** (Text input spanning across remaining columns)
- **Required fields:** Date and Content only
- Auto-save on focus out (clicking outside the row)
- Press **Enter** to save
- New records start with status "Khởi tạo"
- All other fields (Customer, Amount, Fee Item, Note, Facility, Type) are
  initialized as empty and can be filled later via inline editing

#### Inline Editing

- **Double-click** any existing record to enter edit mode
- Row highlights with light blue background
- **All fields become editable** (all 10 columns)
- Auto-save on focus out
- Changes are preserved in the table

## Component Structure

```
CashDetailPageV2/
├── index.tsx              # Main component
├── styles.css             # Component styles
├── components/
│   ├── index.ts           # Component exports
│   ├── DropdownSearchable.tsx
│   ├── DateTimePicker.tsx
│   ├── CurrencyInput.tsx
│   └── EditableRow.tsx    # Separated editable row component
└── README.md             # This file
```

### EditableRow Component

The `EditableRow` component has been separated into its own file for better code
organization and reusability. It accepts the following props:

- `record`: The receipt record to edit
- `onSave`: Callback function when saving changes
- `customerOptions`: Array of customer dropdown options
- `feeItemOptions`: Array of fee item dropdown options
- `facilityOptions`: Array of facility dropdown options
- `typeOptions`: Array of type dropdown options

## API Integration

To integrate with real APIs, modify the component to pass `fetchData` functions:

```tsx
// Example: Fetch customers from API
const fetchCustomers = async (searchTerm: string) => {
  const response = await fetch(
    `/api/customers?search=${searchTerm}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const data = await response.json();
  return data.map((customer) => ({
    id: customer._id,
    text: `${customer.name} - ${customer.phone}`,
  }));
};

// Use in component
<DropdownSearchable
  fetchData={fetchCustomers}
  onChange={handleCustomerChange}
/>;
```

## Styling

The component uses a combination of:

- Custom CSS classes (defined in `styles.css`)
- Inline styles for specific elements
- Tailwind-like utility classes

Key style classes:

- `.editingRow` - Highlights rows being edited
- `.inputField` - Standard input styling
- `.selectField` - Dropdown styling
- `.statusBadge` - Status indicator styling

## Performance Considerations

- **Debounced Search:** The DropdownSearchable component debounces search input
  (300ms)
- **Controlled Components:** All inputs are controlled for predictable state
  management
- **Auto-save:** Uses blur events to trigger saves, preventing unnecessary API
  calls

## Future Enhancements

Potential improvements:

1. Add validation messages for required fields
2. Implement undo/redo functionality
3. Add bulk actions (delete, export)
4. Implement real-time collaboration
5. Add keyboard shortcuts for common actions
6. Implement row-level permissions
