import React, { useState, useRef } from 'react';
import { DropdownSearchable } from './DropdownSearchable';
import { DateTimePicker } from './DateTimePicker';
import { CurrencyInput } from './CurrencyInput';
import { ReceiptRecord, DropdownOption } from '../shared/types';
import { getStatusLabel, isoStringToDate, dateToISOString } from '../shared/utils';
import { STATUS_CODES } from '../shared'

interface EditableRowProps {
  record: ReceiptRecord;
  onSave: (id: string, updatedFields: Partial<ReceiptRecord>) => void;
  customerOptions: Array<DropdownOption>;
  feeItemOptions: Array<DropdownOption>;
  facilityOptions: Array<DropdownOption>;
  typeOptions: Array<DropdownOption>;
  onLoadMoreCustomers?: () => void;
  onLoadMoreFeeItems?: () => void;
  onLoadMoreFacilities?: () => void;
}

export const EditableRow: React.FC<EditableRowProps> = ({
  record,
  onSave,
  customerOptions,
  feeItemOptions,
  facilityOptions,
  typeOptions,
  onLoadMoreCustomers,
  onLoadMoreFeeItems,
  onLoadMoreFacilities
}) => {
  const [editData, setEditData] = useState(record);
  const editRowRef = useRef<HTMLTableRowElement>(null);

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
        <input
          className="inputField"
          value={editData.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          autoFocus
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
        />
      </td>
      <td className="td">
        <input
          className="inputField"
          value={editData.note || ''}
          onChange={(e) => handleFieldChange('note', e.target.value)}
          placeholder="Nhập ghi chú"
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
        />
      </td>
      <td className="td">
        <span className={`statusBadge ${editData.status === STATUS_CODES.COMPLETED ? 'statusSuccess' :
          editData.status === STATUS_CODES.CANCELLED ? 'statusCancel' :
            'statusPending'
          }`}>
          {getStatusLabel(editData.status)}
        </span>
      </td>
      <td className="td">
        <DropdownSearchable
          data={typeOptions}
          value={typeOptions.find(opt => parseInt(String(opt.id)) === editData.type)}
          onChange={(item) => {
            if (item) {
              handleFieldChange('type', parseInt(String(item.id)));
            }
          }}
          placeholder="Chọn loại"
        />
      </td>
    </tr>
  );
};
