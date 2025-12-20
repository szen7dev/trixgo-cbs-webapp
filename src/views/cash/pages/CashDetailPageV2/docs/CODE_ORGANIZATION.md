# Code Organization - CashDetailPageV2

## File Structure

```
CashDetailPageV2/
├── index.tsx                 # Main component
├── types.ts                  # TypeScript interfaces and types
├── constants.ts              # Constants and mock data
├── utils.ts                  # Helper functions
├── shared.ts                 # Barrel export file
├── styles.css                # Component styles
├── API_INTEGRATION.md        # API integration documentation
└── components/
    ├── DateTimePicker.tsx
    ├── EditableRow.tsx
    ├── DropdownSearchable.tsx
    └── CurrencyInput.tsx
```

## Module Breakdown

### `types.ts`

Contains all TypeScript interfaces and type definitions:

- `ReceiptRecord` - Main receipt data structure matching API response
- `DropdownOption` - Generic dropdown option structure
- `AccountInfo` - Account information structure
- `ReceiptStatus` - Status type literal

### `constants.ts`

Contains all constant values and mappings:

- `STATUS_MAP` - Maps status codes to labels
- `TYPE_MAP` - Maps type codes to labels
- `STATUS_CODES` - Named constants for status values
- `TYPE_CODES` - Named constants for type values
- `CUSTOMER_OPTIONS` - Mock customer dropdown data
- `FEE_ITEM_OPTIONS` - Mock fee item dropdown data
- `FACILITY_OPTIONS` - Mock facility dropdown data
- `TYPE_OPTIONS` - Mock type dropdown data

### `utils.ts`

Contains all utility/helper functions:

- `getStatusLabel(status: number)` - Get status label from code
- `getTypeLabel(type: number)` - Get type label from code
- `formatDate(dateString: string)` - Format date to DD/MM/YYYY
- `formatDateTime(dateString: string)` - Format date to HH:mm DD/MM/YYYY
- `dateToISOString(date: Date)` - Convert Date to ISO string
- `isoStringToDate(dateString: string)` - Convert ISO string to Date

### `shared.ts`

Barrel export file that re-exports everything from types, constants, and utils
for cleaner imports.

## Usage Examples

### Importing from separate files:

```typescript
import { AccountInfo, ReceiptRecord } from "./types";
import { CUSTOMER_OPTIONS, STATUS_CODES } from "./constants";
import { formatDate, getStatusLabel } from "./utils";
```

### Importing from barrel file (recommended):

```typescript
import {
  AccountInfo,
  CUSTOMER_OPTIONS,
  formatDate,
  getStatusLabel,
  ReceiptRecord,
  STATUS_CODES,
} from "./shared";
```

## Benefits

1. **Reusability**: Types and utilities can be imported by other components
2. **Maintainability**: Changes to constants or types are centralized
3. **Testability**: Utils can be tested independently
4. **Readability**: Main component is cleaner and more focused
5. **Type Safety**: Shared types ensure consistency across components

## Migration Notes

- All components now import from shared files instead of defining inline
- `EditableRow` component uses shared types and utils
- Main component imports are organized by category (types, constants, utils)
- No breaking changes to functionality, only code organization improvements
