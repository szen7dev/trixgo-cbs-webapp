import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { DateTimePicker } from 'shareComponents/common/DateTimePicker';
import { EditableRow } from './components/EditableRow';
import './styles.css';
import API from 'apis/repository';
import { ReceiptRecord, AccountInfo, DropdownOption } from './shared/types';
import {
  TYPE_OPTIONS,
  STATUS_CODES,
  STATUS_OPTIONS
} from './shared';
import {
  getStatusLabel,
  getForwardLabel,
  getForwardColor,
  formatDate,
  formatDateTime,
  dateToISOString
} from './shared/utils';
import { fetchDropdownData } from './shared/api';
import { createLinkAndClick } from "utils";
import { toast } from "react-toastify";
import { useProductCustom } from 'services/hooks/useStoreProduct';

interface CashDetailPageProps {
  outin?: number
  type?: number
}

export const CashDetailPageV2: React.FC<CashDetailPageProps> = ({ outin }) => {
  const history = useHistory();
  const { accountId } = useParams<{ accountId: string }>();
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [records, setRecords] = useState<ReceiptRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customerOptions, setCustomerOptions] = useState<DropdownOption[]>([]);
  const [contactsNextCursor, setContactsNextCursor] = useState<string | null>(null);
  const [feeItemOptions, setFeeItemOptions] = useState<DropdownOption[]>([]);
  const [subTypesNextCursor, setSubTypesNextCursor] = useState<string | null>(null);
  const [facilityOptions, setFacilityOptions] = useState<DropdownOption[]>([]);
  const [fundasNextCursor, setFundasNextCursor] = useState<string | null>(null);

  // Loading states for dropdowns
  const [isSearchingContacts, setIsSearchingContacts] = useState(false);
  const [isSearchingSubTypes, setIsSearchingSubTypes] = useState(false);
  const [isSearchingFundas, setIsSearchingFundas] = useState(false);

  // Search keyword for records list
  const [searchKeyword, setSearchKeyword] = useState('');

  // Export state
  const [, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
  });

  const { exportByFilterAsync } = useProductCustom();

  const handleDownloadExcel = async () => {
    try {
      setStateExport({ isExporting: true });

      const { error, data } = await exportByFilterAsync({
        filterParams: {
          accountID: accountId,
          sortKey: JSON.stringify(['date__1', 'createAt__1']),
        }
      })

      if (error) {
        return toast.warn(data?.message);
      }

      data && createLinkAndClick(data, "_self");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setStateExport({ isExporting: false });
    }
  };

  // Pagination states
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize] = useState(5);

  // Cursor history for backward navigation
  const cursorHistoryRef = useRef<(string | null)[]>([]);

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
        outin,
        name: newRecord.name,
        date: dateToISOString(newRecord.date),
        ...[outin === 2 ? { type: 7 } : {}]
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
        quantity: 1,
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
      if (updatedFields.status !== undefined) {
        apiPayload.status = updatedFields.status;
      }
      if (updatedFields.forward !== undefined) {
        apiPayload.forward = updatedFields.forward;
      }

      console.log('API Payload:', apiPayload);
      console.log('updatedFields', updatedFields);

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

  const fetchRecords = async (keyword?: string, cursor?: string | null, direction: 'next' | 'prev' | 'initial' = 'initial') => {
    if (!accountId) return;

    try {
      setLoading(true);
      const populates = JSON.stringify({
        path: "userUpdate customer subtype funda",
        select: "_id fullname name phone"
      });

      let apiUrl = `/api/store/order_products?accountID=${accountId}&outin=${outin}&populates=${populates}&limit=${pageSize}`;

      // Add keyword to URL if provided
      if (keyword) {
        apiUrl += `&keyword=${encodeURIComponent(keyword)}`;
      }

      // Add cursor for pagination
      if (cursor) {
        apiUrl += `&lastestID=${cursor}`;
      }

      const { data: result } = await API.get(apiUrl);

      if (result?.data?.listRecords) {
        setRecords(result.data.listRecords);
        setTotalRecords(result.data.totalRecord || 0);

        // Update cursors based on response
        const newNextCursor = result.data.listRecords.length === pageSize
          ? result.data.listRecords[result.data.listRecords.length - 1]._id
          : null;
        setNextCursor(newNextCursor);

        // Update page number and cursor history
        if (direction === 'next') {
          setCurrentPage(prev => prev + 1);
          // Store the cursor used to fetch this page in the history
          cursorHistoryRef.current.push(cursor ?? null);
        } else if (direction === 'prev') {
          setCurrentPage(prev => Math.max(1, prev - 1));
          // Remove the last cursor from history when going back
          cursorHistoryRef.current.pop();
        } else {
          // Reset for initial load
          setCurrentPage(1);
          cursorHistoryRef.current = [];
        }
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (nextCursor) {
      fetchRecords(searchKeyword, nextCursor, 'next');
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      // Get the cursor for the previous page from history
      const prevPageCursor = cursorHistoryRef.current[cursorHistoryRef.current.length - 2] ?? null;
      fetchRecords(searchKeyword, prevPageCursor, 'prev');
    }
  };

  const loadMoreContacts = async () => {
    if (!contactsNextCursor || !accountInfo?.company) return;

    const result = await fetchDropdownData({
      type: 'contacts',
      companyId: accountInfo.company,
      lastestId: contactsNextCursor
    });

    setCustomerOptions(prev => [...prev, ...result.options]);
    setContactsNextCursor(result.nextCursor ?? null);
  };

  const loadMoreSubTypes = async () => {
    if (!subTypesNextCursor || !accountInfo?.company) return;

    const result = await fetchDropdownData({
      type: 'subtypes',
      companyId: accountInfo.company,
      lastestId: subTypesNextCursor
    });

    setFeeItemOptions(prev => [...prev, ...result.options]);
    setSubTypesNextCursor(result.nextCursor ?? null);
  };

  const loadMoreFundas = async () => {
    if (!fundasNextCursor || !accountInfo?.company) return;

    const result = await fetchDropdownData({
      type: 'fundas',
      companyId: accountInfo.company,
      lastestId: fundasNextCursor
    });

    setFacilityOptions(prev => [...prev, ...result.options]);
    setFundasNextCursor(result.nextCursor ?? null);
  };

  // Search handlers with keyword parameter - debounced with lodash
  const handleSearchContacts = useCallback(async (keyword: string) => {
    if (!accountInfo?.company) return;

    setIsSearchingContacts(true);
    try {
      const result = await fetchDropdownData({
        type: 'contacts',
        companyId: accountInfo.company,
        keyword
      });

      setCustomerOptions(result.options);
      setContactsNextCursor(result.nextCursor ?? null);
    } finally {
      setIsSearchingContacts(false);
    }
  }, [accountInfo?.company]);

  const handleSearchSubTypes = useCallback(async (keyword: string) => {
    if (!accountInfo?.company) return;

    setIsSearchingSubTypes(true);
    try {
      const result = await fetchDropdownData({
        type: 'subtypes',
        companyId: accountInfo.company,
        keyword
      });

      setFeeItemOptions(result.options);
      setSubTypesNextCursor(result.nextCursor ?? null);
    } finally {
      setIsSearchingSubTypes(false);
    }
  }, [accountInfo?.company]);

  const handleSearchFundas = useCallback(async (keyword: string) => {
    if (!accountInfo?.company) return;

    setIsSearchingFundas(true);
    try {
      const result = await fetchDropdownData({
        type: 'fundas',
        companyId: accountInfo.company,
        keyword
      });

      setFacilityOptions(result.options);
      setFundasNextCursor(result.nextCursor ?? null);
    } finally {
      setIsSearchingFundas(false);
    }
  }, [accountInfo?.company]);

  // Handler functions to ensure current record values exist in dropdown options
  const ensureCustomerOption = (option: DropdownOption) => {
    setCustomerOptions(prev => {
      // Check if option already exists
      const exists = prev.some(opt => opt.id === option.id);
      if (!exists) {
        // Add at the beginning so it's easily visible
        return [option, ...prev];
      }
      return prev;
    });
  };

  const ensureFeeItemOption = (option: DropdownOption) => {
    setFeeItemOptions(prev => {
      const exists = prev.some(opt => opt.id === option.id);
      if (!exists) {
        return [option, ...prev];
      }
      return prev;
    });
  };

  const ensureFacilityOption = (option: DropdownOption) => {
    setFacilityOptions(prev => {
      const exists = prev.some(opt => opt.id === option.id);
      if (!exists) {
        return [option, ...prev];
      }
      return prev;
    });
  };

  // Create debounced versions using useMemo to maintain stable references
  const searchContacts = useMemo(
    () => debounce(handleSearchContacts, 700),
    [handleSearchContacts]
  );

  const searchSubTypes = useMemo(
    () => debounce(handleSearchSubTypes, 700),
    [handleSearchSubTypes]
  );

  const searchFundas = useMemo(
    () => debounce(handleSearchFundas, 700),
    [handleSearchFundas]
  );

  // Debounced search for records list
  const debouncedSearchRecords = useMemo(
    () => debounce((keyword: string) => {
      fetchRecords(keyword);
    }, 700),
    [accountId]
  );

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

          // Fetch initial dropdown data using shared function
          if (accountData.company) {
            // Fetch contacts for customer dropdown
            const contactsResult = await fetchDropdownData({
              type: 'contacts',
              companyId: accountData.company
            });
            setCustomerOptions(contactsResult.options);
            setContactsNextCursor(contactsResult.nextCursor ?? null);

            // Fetch subtypes for fee item dropdown
            const subTypesResult = await fetchDropdownData({
              type: 'subtypes',
              companyId: accountData.company
            });
            setFeeItemOptions(subTypesResult.options);
            setSubTypesNextCursor(subTypesResult.nextCursor ?? null);

            // Fetch fundas for facility dropdown
            const fundasResult = await fetchDropdownData({
              type: 'fundas',
              companyId: accountData.company
            });
            setFacilityOptions(fundasResult.options);
            setFundasNextCursor(fundasResult.nextCursor ?? null);
          }
        }

        // Fetch records
        await fetchRecords();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accountId]);

  // Trigger search when keyword changes
  useEffect(() => {
    if (searchKeyword) {
      debouncedSearchRecords(searchKeyword);
    } else {
      // If search is cleared, fetch all records
      fetchRecords();
    }
  }, [searchKeyword]);

  // Cleanup debounced functions on unmount
  useEffect(() => {
    return () => {
      searchContacts.cancel();
      searchSubTypes.cancel();
      searchFundas.cancel();
      debouncedSearchRecords.cancel();
    };
  }, [searchContacts, searchSubTypes, searchFundas, debouncedSearchRecords]);

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
              <span className="pageTitle">
                {outin === 2 ? 'Quỹ thu' : outin === 1 ? 'Quỹ chi' : ''}
                {accountInfo && ` - ${accountInfo.name}-${accountInfo.description}`}
              </span>
            </div>
            <div className="paginationControl">
              <span className="paginationText">
                {records.length > 0
                  ? `${(currentPage - 1) * pageSize + 1} - ${(currentPage - 1) * pageSize + records.length} trong số ${totalRecords}`
                  : '0 trong số 0'
                }
              </span>
              <div className="paginationArrows">
                <div
                  className={`arrowBtn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={handlePrevPage}
                  style={{
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.5 : 1
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008" stroke={currentPage === 1 ? "#808080" : "#1A1A1A"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div
                  className={`arrowBtn ${!nextCursor ? 'disabled' : ''}`}
                  onClick={handleNextPage}
                  style={{
                    cursor: !nextCursor ? 'not-allowed' : 'pointer',
                    opacity: !nextCursor ? 0.5 : 1
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke={!nextCursor ? "#808080" : "#1A1A1A"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
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
              <input
                className="searchInput"
                placeholder="Tìm kiếm"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7H21" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 12H18" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 17H14" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="actionButtons">
              <button className="downloadBtn" onClick={handleDownloadExcel}>
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
                      statusOptions={STATUS_OPTIONS}
                      onLoadMoreCustomers={loadMoreContacts}
                      onLoadMoreFeeItems={loadMoreSubTypes}
                      onLoadMoreFacilities={loadMoreFundas}
                      onSearchCustomers={searchContacts}
                      onSearchFeeItems={searchSubTypes}
                      onSearchFacilities={searchFundas}
                      isSearchingCustomers={isSearchingContacts}
                      isSearchingFeeItems={isSearchingSubTypes}
                      isSearchingFacilities={isSearchingFundas}
                      onEnsureCustomerOption={ensureCustomerOption}
                      onEnsureFeeItemOption={ensureFeeItemOption}
                      onEnsureFacilityOption={ensureFacilityOption}
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
                        <p style={{ fontSize: '12px', color: '#808080', fontWeight: 'normal', fontStyle: 'italic', marginTop: '4px' }}><i>{record._id}</i></p>
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
                        <div style={{ background: getForwardColor(record.forward), padding: '6px 12px', borderRadius: '6px', minWidth: '80px', textAlign: 'center' }}>
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
