import React, { useState, useRef, useEffect } from 'react';
import { DropdownSearchable } from './DropdownSearchable';
import { DateTimePicker } from 'shareComponents/common/DateTimePicker';
import { CurrencyInput } from './CurrencyInput';
import { ReceiptRecord, DropdownOption } from '../shared/types';
import { isoStringToDate, dateToISOString } from '../shared/utils';

interface EditableRowProps {
  record: ReceiptRecord;
  onSave: (id: string, updatedFields: Partial<ReceiptRecord>) => void;
  customerOptions: Array<DropdownOption>;
  feeItemOptions: Array<DropdownOption>;
  facilityOptions: Array<DropdownOption>;
  typeOptions: Array<DropdownOption>;
  statusOptions: Array<DropdownOption>;
  onLoadMoreCustomers?: () => void;
  onLoadMoreFeeItems?: () => void;
  onLoadMoreFacilities?: () => void;
  onSearchCustomers?: (keyword: string) => void;
  onSearchFeeItems?: (keyword: string) => void;
  onSearchFacilities?: (keyword: string) => void;
  isSearchingCustomers?: boolean;
  isSearchingFeeItems?: boolean;
  isSearchingFacilities?: boolean;
  onEnsureCustomerOption?: (option: DropdownOption) => void;
  onEnsureFeeItemOption?: (option: DropdownOption) => void;
  onEnsureFacilityOption?: (option: DropdownOption) => void;
}

export const EditableRow: React.FC<EditableRowProps> = ({
  record,
  onSave,
  customerOptions,
  feeItemOptions,
  facilityOptions,
  typeOptions,
  statusOptions,
  onLoadMoreCustomers,
  onLoadMoreFeeItems,
  onLoadMoreFacilities,
  onSearchCustomers,
  onSearchFeeItems,
  onSearchFacilities,
  isSearchingCustomers,
  isSearchingFeeItems,
  isSearchingFacilities,
  onEnsureCustomerOption,
  onEnsureFeeItemOption,
  onEnsureFacilityOption
}) => {
  const [editData, setEditData] = useState(record);
  const editRowRef = useRef<HTMLTableRowElement>(null);

  // Ensure current values exist in dropdown options when component mounts
  // Only run when the record changes (different record being edited), not when options arrays change
  useEffect(() => {
    console.log({ record, customerOptions, feeItemOptions, facilityOptions });

    // Check and add customer if exists and not in options
    if (record.customer && onEnsureCustomerOption) {
      const exists = customerOptions.some(opt => opt.id === record.customer?._id);
      if (!exists) {
        onEnsureCustomerOption({
          id: record.customer._id,
          text: `${record.customer.name}${record.customer.phone ? ' - ' + record.customer.phone : ''}`
        });
      }
    }

    // Check and add subtype if exists and not in options
    if (record.subtype && onEnsureFeeItemOption) {
      const exists = feeItemOptions.some(opt => opt.id === record.subtype?._id);
      if (!exists) {
        onEnsureFeeItemOption({
          id: record.subtype._id,
          text: record.subtype.name
        });
      }
    }

    // Check and add funda if exists and not in options
    if (record.funda && onEnsureFacilityOption) {
      const exists = facilityOptions.some(opt => opt.id === record.funda?._id);
      if (!exists) {
        onEnsureFacilityOption({
          id: record.funda._id,
          text: record.funda.name
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record._id]);

  const handleFieldChange = (field: keyof ReceiptRecord, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(record._id, editData);
  };

  const handleEditBlur = (e: React.FocusEvent) => {
    if (editRowRef.current && editRowRef.current.contains(e.relatedTarget as Node)) {
      return;
    }
    handleSave();
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      handleFieldChange('date', dateToISOString(date));
    }
  };

  return (
    <tr
      ref={editRowRef}
      className="tr editingRow"
      onBlur={handleEditBlur}
      tabIndex={-1}
    >
      <td className="td">
        <DateTimePicker
          value={isoStringToDate(editData.date)}
          onChange={handleDateChange}
          className="inputField"
        />
      </td>
      <td className="td">
        <textarea
          className="inputField"
          value={editData.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          autoFocus
          rows={2}
          style={{ resize: 'vertical', minHeight: '50px' }}
        />
      </td>
      <td className="td">
        <DropdownSearchable
          data={customerOptions}
          value={customerOptions.find(opt => opt.id === editData.customer?._id)}
          onChange={(item) => {
            if (item) {
              handleFieldChange('customer', { _id: item.id, name: item.text, phone: '' });
            }
          }}
          placeholder="Chọn khách hàng"
          onLoadMore={onLoadMoreCustomers}
          onSearch={onSearchCustomers}
          isSearching={isSearchingCustomers}
        />
      </td>
      <td className="td">
        <CurrencyInput
          value={editData.amount}
          onChange={(value) => handleFieldChange('amount', value)}
        />
      </td>
      <td className="td">
        <DropdownSearchable
          data={feeItemOptions}
          value={feeItemOptions.find(opt => opt.id === editData.subtype?._id)}
          onChange={(item) => {
            if (item) {
              handleFieldChange('subtype', { _id: item.id, name: item.text });
            }
          }}
          placeholder="Chọn khoản mục"
          onLoadMore={onLoadMoreFeeItems}
          onSearch={onSearchFeeItems}
          isSearching={isSearchingFeeItems}
        />
      </td>
      <td className="td">
        <textarea
          className="inputField"
          value={editData.note || ''}
          onChange={(e) => handleFieldChange('note', e.target.value)}
          placeholder="Nhập ghi chú"
          rows={2}
          style={{ resize: 'vertical', minHeight: '50px' }}
        />
      </td>
      <td className="td">
        <DropdownSearchable
          data={facilityOptions}
          value={facilityOptions.find(opt => opt.id === editData.funda?._id)}
          onChange={(item) => {
            if (item) {
              handleFieldChange('funda', { _id: item.id, name: item.text, phone: '' });
            }
          }}
          placeholder="Chọn cơ sở"
          onLoadMore={onLoadMoreFacilities}
          onSearch={onSearchFacilities}
          isSearching={isSearchingFacilities}
        />
      </td>
      <td className="td">
        <DropdownSearchable
          data={statusOptions}
          value={statusOptions.find(opt => parseInt(String(opt.id)) === editData.status)}
          onChange={(item) => {
            if (item) {
              handleFieldChange('status', parseInt(String(item.id)));
            }
          }}
          placeholder="Chọn trạng thái"
        />
      </td>
      <td className="td">
        <DropdownSearchable
          data={typeOptions}
          value={typeOptions.find(opt => parseInt(String(opt.id)) === editData.forward)}
          onChange={(item) => {
            if (item) {
              handleFieldChange('forward', parseInt(String(item.id)));
            }
          }}
          placeholder="Chọn loại"
        />
      </td>
    </tr>
  );
};
