# DateTimePicker Components

This folder contains reusable date picker components for the application.

## Components

### DateTimePicker

A single date picker component with optional time selection.

**Props:**

- `value?: Date | null` - The selected date value
- `onChange?: (date: Date | null) => void` - Callback when date changes
- `placeholder?: string` - Placeholder text (default: "Chọn ngày")
- `showTime?: boolean` - Whether to show time picker (default: false)
- `className?: string` - Additional CSS classes
- `disabled?: boolean` - Whether the picker is disabled

**Example:**

```tsx
import { DateTimePicker } from "shareComponents/common/DateTimePicker";

function MyComponent() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <DateTimePicker
      value={date}
      onChange={setDate}
      placeholder="Select a date"
      showTime={true}
    />
  );
}
```

### DateRangePicker

A date range picker component for selecting a start and end date. The picker
requires explicit confirmation via a "Confirm" button before applying the
selected date range.

**Props:**

- `value?: DateRange` - The selected date range
- `onChange?: (range: DateRange) => void` - Callback when range changes
  (triggered on confirm)
- `placeholder?: string` - Placeholder text (default: "Chọn khoảng ngày")
- `className?: string` - Additional CSS classes
- `disabled?: boolean` - Whether the picker is disabled

**Types:**

```tsx
interface DateRange {
  from: Date | null;
  to: Date | null;
}
```

**Example:**

```tsx
import {
  DateRange,
  DateRangePicker,
} from "shareComponents/common/DateTimePicker";

function MyComponent() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <DateRangePicker
      value={dateRange}
      onChange={setDateRange}
      placeholder="Select date range"
    />
  );
}
```

**Behavior:**

- Users can select a start date (from) and end date (to) by clicking on the
  calendar
- The picker will **not** auto-close when both dates are selected
- Users must click the "Xác nhận" (Confirm) button to apply the selection
- The confirm button is only enabled when both dates are selected
- The `onChange` callback is only triggered when the user confirms the selection

## Features

- **Vietnamese localization** - Month names and weekday labels in Vietnamese
- **Year/Month selection** - Dropdown selectors for easy navigation
- **Responsive design** - Works on all screen sizes
- **Keyboard support** - Enter key to confirm, Escape to close
- **Click outside to close** - Automatically closes when clicking outside
- **Clear button** - Easy way to clear the selection
- **Consistent styling** - Matches the application's design system

## Styling

The components use CSS modules and follow the application's design system:

- Primary color: `#0060E1`
- Border radius: `8px` for inputs, `12px` for popover
- Font family: `'Inter', sans-serif`
- Hover and focus states with smooth transitions

## Dependencies

- `react-day-picker` - The underlying date picker library
- `react` - React library

## Usage in Pages

### CashDetailPageV2

Uses `DateTimePicker` for single date selection in the receipt detail form.

### CashPageV2

Uses `DateRangePicker` for filtering cash data by date range.
