import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { DateTimePicker } from './components/DateTimePicker';
import { EditableRow } from './components/EditableRow';
import './styles.css';
import API from 'apis/repository';
import { ReceiptRecord, AccountInfo, Contact, DropdownOption, ContactsResponse, SubType, SubTypesResponse, Funda, FundasResponse } from './shared/types';
import {
  CUSTOMER_OPTIONS,
  FEE_ITEM_OPTIONS,
  FACILITY_OPTIONS,
  TYPE_OPTIONS,
  STATUS_CODES
} from './shared';
import {
  getStatusLabel,
  getForwardLabel,
  formatDate,
  formatDateTime,
  dateToISOString
} from './shared/utils';

export const CashDetailPageV2: React.FC = () => {
  const history = useHistory();
  const { accountId } = useParams<{ accountId: string }>();
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [records, setRecords] = useState<ReceiptRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customerOptions, setCustomerOptions] = useState<DropdownOption[]>(CUSTOMER_OPTIONS);
  const [contactsNextCursor, setContactsNextCursor] = useState<string | null>(null);
  const [feeItemOptions, setFeeItemOptions] = useState<DropdownOption[]>(FEE_ITEM_OPTIONS);
  const [subTypesNextCursor, setSubTypesNextCursor] = useState<string | null>(null);
  const [facilityOptions, setFacilityOptions] = useState<DropdownOption[]>(FACILITY_OPTIONS);
  const [fundasNextCursor, setFundasNextCursor] = useState<string | null>(null);

  // State for the new row being created - only date and content
  const [newRecord, setNewRecord] = useState<Partial<{ date: Date; name: string }>>({
    date: new Date(),
    name: ''
  });

  const createRowRef = useRef<HTMLTableRowElement>(null);

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingId(null);
    setNewRecord({
      date: new Date(),
      name: ''
    });
    setTimeout(() => {
      const firstInput = createRowRef.current?.querySelector('input');
      if (firstInput) firstInput.focus();
    }, 0);
  };

  const handleSaveNew = async () => {
    // Only require date and content for new records
    if (!newRecord.name || !newRecord.date || !accountId) {
      setIsCreating(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.post('/api/store/order_products', {
        accountID: accountId,
        outin: 2,
        name: newRecord.name,
        date: dateToISOString(newRecord.date)
      });

      if (data?.data) {
        // Refresh the records list
        await fetchRecords();
      }

      setNewRecord({
        date: new Date(),
        name: ''
      });
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating record:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (record: ReceiptRecord) => {
    setEditingId(record._id);
    setIsCreating(false);
  };

  const handleSaveEdit = async (id: string, updatedFields: Partial<ReceiptRecord>) => {
    try {
      setLoading(true);

      // Map the updated fields to API schema
      const apiPayload: any = {
        orderProductID: id,
        quantity: 1
      };

      // Only include fields that were actually updated
      if (updatedFields.name !== undefined) {
        apiPayload.name = updatedFields.name;
      }
      if (updatedFields.funda !== undefined) {
        apiPayload.fundaID = updatedFields.funda._id;
      }
      if (updatedFields.customer !== undefined) {
        apiPayload.customerID = updatedFields.customer._id;
      }
      if (updatedFields.subtype !== undefined) {
        apiPayload.subtypeID = updatedFields.subtype._id;
      }
      if (updatedFields.amount !== undefined) {
        apiPayload.unitPrice = updatedFields.amount;
      }
      if (updatedFields.note !== undefined) {
        apiPayload.note = updatedFields.note;
      }

      console.log('API Payload:', apiPayload);

      // Make PUT request to update the record
      const { data } = await API.put('/api/store/order_products', apiPayload);

      if (data?.error) {
        throw new Error(data.error);
      }

      // Update local state with the changes
      setRecords(records.map(record =>
        record._id === id ? { ...record, ...updatedFields } : record
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating record:', error);
      // Optionally show error message to user
      alert('Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // Handle focus out (blur) from the new row
  const handleBlur = (e: React.FocusEvent) => {
    if (createRowRef.current && createRowRef.current.contains(e.relatedTarget as Node)) {
      return;
    }
    handleSaveNew();
  };

  const handleNewRecordChange = (field: 'date' | 'name', value: any) => {
    setNewRecord(prev => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveNew();
    }
  };

  const fetchRecords = async () => {
    if (!accountId) return;

    try {
      setLoading(true);
      const populates = JSON.stringify({
        path: "userUpdate customer subtype funda",
        select: "_id fullname name phone"
      });

      const { data: result } = await API.get(
        `/api/store/order_products?accountID=${accountId}&outin=2&populates=${populates}`
      );

      if (result?.data?.listRecords) {
        setRecords(result.data.listRecords);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreContacts = async () => {
    if (!contactsNextCursor || !accountInfo?.company) return;

    try {
      const { data: { data: contactsData } } = await API.get(
        `/api/item/contacts?companyID=${accountInfo.company}&lastestID=${contactsNextCursor}`
      );

      if (contactsData?.listRecords && Array.isArray(contactsData.listRecords)) {
        const newContactOptions: DropdownOption[] = contactsData.listRecords.map((contact: Contact) => ({
          id: contact._id,
          text: contact.phone ? `${contact.name} - ${contact.phone}` : contact.name
        }));

        setCustomerOptions(prev => [...prev, ...newContactOptions]);
        setContactsNextCursor(contactsData.nextCursor);
      }
    } catch (error) {
      console.error('Error loading more contacts:', error);
    }
  };

  const loadMoreSubTypes = async () => {
    if (!subTypesNextCursor || !accountInfo?.company) return;

    try {
      const { data: { data: subTypesData } } = await API.get(
        `/api/item/doctypes?type=23&companyID=${accountInfo.company}&lastestID=${subTypesNextCursor}`
      );

      if (subTypesData?.listRecords && Array.isArray(subTypesData.listRecords)) {
        const newSubTypeOptions: DropdownOption[] = subTypesData.listRecords.map((subType: SubType) => ({
          id: subType._id,
          text: subType.name
        }));

        setFeeItemOptions(prev => [...prev, ...newSubTypeOptions]);
        setSubTypesNextCursor(subTypesData.nextCursor);
      }
    } catch (error) {
      console.error('Error loading more subtypes:', error);
    }
  };

  const loadMoreFundas = async () => {
    if (!fundasNextCursor || !accountInfo?.company) return;

    try {
      const { data: { data: fundasData } } = await API.get(
        `/api/item/fundas?companyID=${accountInfo.company}&lastestID=${fundasNextCursor}`
      );

      if (fundasData?.listRecords && Array.isArray(fundasData.listRecords)) {
        const newFundaOptions: DropdownOption[] = fundasData.listRecords.map((funda: Funda) => ({
          id: funda._id,
          text: funda.phone ? `${funda.name} - ${funda.phone}` : funda.name
        }));

        setFacilityOptions(prev => [...prev, ...newFundaOptions]);
        setFundasNextCursor(fundasData.nextCursor);
      }
    } catch (error) {
      console.error('Error loading more fundas:', error);
    }
  };

  useEffect(() => {
    if (!accountId) return;

    (async () => {
      try {
        // Fetch account info
        const { data: { data: accountData } } = await API.get(
          `/api/item/accounts?accountID=${accountId}`
        );

        if (accountData) {
          setAccountInfo(accountData);

          // Fetch contacts for customer dropdown
          if (accountData.company) {
            const { data: { data: contactsData } } = await API.get(
              `/api/item/contacts?companyID=${accountData.company}`
            );

            if (contactsData?.listRecords && Array.isArray(contactsData.listRecords)) {
              const contactOptions: DropdownOption[] = contactsData.listRecords.map((contact: Contact) => ({
                id: contact._id,
                text: contact.phone ? `${contact.name} - ${contact.phone}` : contact.name
              }));

              setCustomerOptions(contactOptions);
              setContactsNextCursor(contactsData.nextCursor);
            }

            // Fetch subtypes for fee item dropdown
            const { data: { data: subTypesData } } = await API.get(
              `/api/item/doctypes?type=23&companyID=${accountData.company}`
            );

            if (subTypesData?.listRecords && Array.isArray(subTypesData.listRecords)) {
              const subTypeOptions: DropdownOption[] = subTypesData.listRecords.map((subType: SubType) => ({
                id: subType._id,
                text: subType.name
              }));

              setFeeItemOptions(subTypeOptions);
              setSubTypesNextCursor(subTypesData.nextCursor);
            }

            // Fetch fundas for facility dropdown
            const { data: { data: fundasData } } = await API.get(
              `/api/item/fundas?companyID=${accountData.company}`
            );

            if (fundasData?.listRecords && Array.isArray(fundasData.listRecords)) {
              const fundaOptions: DropdownOption[] = fundasData.listRecords.map((funda: Funda) => ({
                id: funda._id,
                text: funda.phone ? `${funda.name} - ${funda.phone}` : funda.name
              }));

              setFacilityOptions(fundaOptions);
              setFundasNextCursor(fundasData.nextCursor);
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

  return (
    <div className="receiptDetailContainer">
      <div className="mainLayout">
        {/* Header Section */}
        <div className="headerSection">
          <div className="titleRow">
            <div className="leftTitle">
              <button className="backButton" onClick={() => history.goBack()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="pageTitle">{accountInfo ? `${accountInfo.name}-${accountInfo.description}` : ''}</span>
            </div>
            <div className="paginationControl">
              <span className="paginationText">1 - 50 trong số 100</span>
              <div className="paginationArrows">
                <div className="arrowBtn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008" stroke="#808080" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="arrowBtn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#1A1A1A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="controlsRow">
            <div className="searchWrapper">
              <svg className="searchIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 22L20 20" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input className="searchInput" placeholder="Tìm kiếm" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7H21" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 12H18" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 17H14" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="actionButtons">
              <button className="downloadBtn">
                <span className="downloadBtnText">Tải xuống</span>
              </button>
              <button className="createBtn" onClick={handleCreateNew}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 18V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Tạo mới</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th className="th" style={{ width: '150px' }}>Ngày</th>
                <th className="th" style={{ width: '250px' }}>Nội dung</th>
                <th className="th" style={{ width: '250px' }}>Mã khách</th>
                <th className="th" style={{ width: '150px' }}>Thành tiền</th>
                <th className="th" style={{ width: '200px' }}>Khoản mục</th>
                <th className="th" style={{ width: '200px' }}>Ghi chú</th>
                <th className="th" style={{ width: '200px' }}>Cơ sở</th>
                <th className="th" style={{ width: '120px' }}>Trạng thái</th>
                <th className="th" style={{ width: '150px' }}>Loại phiếu</th>
              </tr>
            </thead>
            <tbody>
              {isCreating && (
                <tr
                  ref={createRowRef}
                  className="tr editingRow"
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  tabIndex={-1}
                >
                  <td className="td">
                    <DateTimePicker
                      value={newRecord.date}
                      onChange={(date) => handleNewRecordChange('date', date)}
                      placeholder="Chọn ngày"
                    />
                  </td>
                  <td className="td" colSpan={8}>
                    <input
                      className="inputField"
                      placeholder="Nhập nội dung"
                      autoFocus
                      value={newRecord.name}
                      onChange={(e) => handleNewRecordChange('name', e.target.value)}
                    />
                  </td>
                </tr>
              )}

              {loading && records.length === 0 ? (
                <tr className="tr">
                  <td className="td" colSpan={9} style={{ textAlign: 'center' }}>
                    Đang tải...
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr className="tr">
                  <td className="td" colSpan={9} style={{ textAlign: 'center' }}>
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  editingId === record._id ? (
                    <EditableRow
                      key={record._id}
                      record={record}
                      onSave={handleSaveEdit}
                      customerOptions={customerOptions}
                      feeItemOptions={feeItemOptions}
                      facilityOptions={facilityOptions}
                      typeOptions={TYPE_OPTIONS}
                      onLoadMoreCustomers={loadMoreContacts}
                      onLoadMoreFeeItems={loadMoreSubTypes}
                      onLoadMoreFacilities={loadMoreFundas}
                    />
                  ) : (
                    <tr
                      key={record._id}
                      className="tr"
                      onDoubleClick={() => handleStartEdit(record)}
                      title="Double-click to edit"
                    >
                      <td className="td">{formatDate(record.date)}</td>
                      <td className="td" style={{ fontWeight: 600 }}>
                        {record.name}
                        {record.userUpdate && (
                          <div style={{ fontSize: '12px', color: '#808080', fontWeight: 'normal', fontStyle: 'italic', marginTop: '4px' }}>
                            {record.userUpdate.fullname} - {formatDateTime(record.modifyAt)}
                          </div>
                        )}
                      </td>
                      <td className="td">
                        {record.customer && (
                          <div style={{ background: '#F0F7FF', padding: '6px 12px', borderRadius: '6px', width: 'fit-content' }}>
                            {record.customer.name} - {record.customer.phone}
                          </div>
                        )}
                      </td>
                      <td className="td">{record.amount.toLocaleString()}</td>
                      <td className="td">
                        {record.subtype && (
                          <div style={{ background: '#F0F7FF', padding: '6px 12px', borderRadius: '6px', width: 'fit-content' }}>
                            {record.subtype.name}
                          </div>
                        )}
                      </td>
                      <td className="td">{record.note || '-'}</td>
                      <td className="td">
                        {record.funda && (
                          <div style={{ background: '#F0F7FF', padding: '6px 12px', borderRadius: '6px', width: 'fit-content' }}>
                            {record.funda.name}
                          </div>
                        )}
                      </td>
                      <td className="td">
                        <span className={`statusBadge ${record.status === STATUS_CODES.COMPLETED ? 'statusSuccess' :
                          record.status === STATUS_CODES.CANCELLED ? 'statusCancel' :
                            'statusPending'
                          }`}>
                          {getStatusLabel(record.status)}
                        </span>
                      </td>
                      <td className="td">
                        <div style={{ background: '#FFF8E6', padding: '6px 12px', borderRadius: '6px', minWidth: '80px', textAlign: 'center' }}>
                          {getForwardLabel(record.forward)}
                        </div>
                      </td>
                    </tr>
                  )
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
