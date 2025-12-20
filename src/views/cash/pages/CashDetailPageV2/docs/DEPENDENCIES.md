# Module Dependencies - CashDetailPageV2

## Dependency Graph

```
┌─────────────────────────────────────────────────────────────┐
│                         shared.ts                           │
│              (Barrel Export - Optional)                     │
│  Re-exports: types.ts, constants.ts, utils.ts              │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────┴────────┐   ┌────────┴────────┐   ┌───────┴────────┐
│   types.ts     │   │  constants.ts   │   │    utils.ts    │
│                │   │                 │   │                │
│ - ReceiptRecord│   │ - STATUS_MAP    │   │ - formatDate   │
│ - DropdownOpt  │◄──│ - TYPE_MAP      │   │ - formatTime   │
│ - AccountInfo  │   │ - STATUS_CODES  │   │ - getStatus    │
│ - ReceiptStatus│   │ - TYPE_CODES    │   │ - getType      │
│                │   │ - MOCK_OPTIONS  │   │ - dateConvert  │
└────────────────┘   └─────────────────┘   └────────────────┘
        ▲                     ▲                     ▲
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
┌───────┴────────┐                         ┌────────┴────────┐
│   index.tsx    │                         │ EditableRow.tsx │
│                │                         │                 │
│ Main Component │                         │ Edit Component  │
│ - State Mgmt   │                         │ - Inline Edit   │
│ - API Calls    │                         │ - Form Fields   │
│ - Table View   │─────────uses────────────│ - Validation    │
└────────────────┘                         └─────────────────┘
```

## Import Flow

### Before Refactoring:

```typescript
// index.tsx
interface ReceiptRecord { ... }  // Defined inline
const STATUS_MAP = { ... }       // Defined inline
const formatDate = () => { ... } // Defined inline

// EditableRow.tsx
interface ReceiptRecord { ... }  // DUPLICATED!
const formatDate = () => { ... } // DUPLICATED!
```

### After Refactoring:

```typescript
// types.ts
export interface ReceiptRecord { ... }

// constants.ts
export const STATUS_MAP = { ... }

// utils.ts
export const formatDate = () => { ... }

// index.tsx
import { ReceiptRecord } from './types';
import { STATUS_MAP } from './constants';
import { formatDate } from './utils';

// EditableRow.tsx
import { ReceiptRecord } from '../types';
import { formatDate } from '../utils';
```

## Component Relationships

```
CashDetailPageV2 (index.tsx)
│
├── Uses Types
│   ├── ReceiptRecord
│   ├── AccountInfo
│   └── DropdownOption
│
├── Uses Constants
│   ├── STATUS_CODES
│   ├── CUSTOMER_OPTIONS
│   ├── FEE_ITEM_OPTIONS
│   ├── FACILITY_OPTIONS
│   └── TYPE_OPTIONS
│
├── Uses Utils
│   ├── formatDate()
│   ├── formatDateTime()
│   ├── getStatusLabel()
│   ├── getTypeLabel()
│   └── dateToISOString()
│
└── Renders Components
    ├── DateTimePicker
    └── EditableRow
        │
        ├── Uses Types (same as parent)
        │   ├── ReceiptRecord
        │   └── DropdownOption
        │
        ├── Uses Constants
        │   └── STATUS_CODES
        │
        └── Uses Utils
            ├── getStatusLabel()
            ├── isoStringToDate()
            └── dateToISOString()
```

## Benefits of This Structure

1. **Single Source of Truth**: Types and constants defined once
2. **No Duplication**: Shared code is imported, not copied
3. **Easy Testing**: Utils can be unit tested independently
4. **Better IntelliSense**: IDEs can provide better autocomplete
5. **Easier Refactoring**: Change once, affects all consumers
6. **Clear Dependencies**: Easy to see what depends on what
