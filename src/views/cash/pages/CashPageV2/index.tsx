import React, { FC, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './CashPageV2.module.css';
import API from 'apis/repository';
import { formatCurrency } from 'utils/converter';
import ArrowDownIcon from 'assets/icons/ArrowDownIcon';
import ChevronLeftIcon from 'assets/icons/ChevronLeftIcon';
import ChevronRightIcon from 'assets/icons/ChevronRightIcon';
import BackIcon from 'assets/icons/BackIconV2';

// Type definitions
interface CashDataItem {
  name?: string;
  description?: string;
  totalIn1: number;
  totalIn2: number;
  totalO1: number;
  totalO2: number;
  _id: {
    company?: {
      _id: string;
      name: string;
    };
  } | string;
}

interface TableRow {
  id: number;
  account: string;
  opening: number;
  income: number;
  expense: number;
  closing: number;
  companyId?: string;
  accountId?: string;
}

export const CashPageV2: FC = () => {
  const { companyId } = useParams<{ companyId?: string }>();
  const history = useHistory();
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totals, setTotals] = useState({
    opening: 0,
    income: 0,
    expense: 0,
    closing: 0
  });

  const fetchCashData = async () => {
    try {
      setLoading(true);

      // Build API URL based on whether we have a companyId
      const apiUrl = companyId
        ? `/api/store/order_products/get-amount-by-property?option=1&companyID=${companyId}`
        : `/api/store/order_products/get-amount-by-property`;

      const { data: { data, error } } = await API.get(apiUrl);

      if (error || !data) {
        console.error('Error fetching data:', error);
        setLoading(false);
        return;
      }

      // Transform API data to table rows
      const transformedData: TableRow[] = data.map((item: CashDataItem, index: number) => {
        const opening = item.totalO2 - item.totalO1;
        const income = item.totalIn2;
        const expense = item.totalIn1;
        const closing = item.totalO2 + item.totalIn2 - item.totalO1 - item.totalIn1;

        // Determine account display based on view type
        let accountDisplay = 'N/A';
        let itemCompanyId: string | undefined;
        let itemAccountId: string | undefined;

        if (companyId) {
          // Detail view: show {name}-{description}
          const name = item.name || '';
          const description = item.description || '';
          accountDisplay = name && description ? `${name}-${description}` : name || description || 'N/A';
          itemAccountId = typeof item._id === 'string' ? item._id : undefined;
        } else {
          // Summary view: show company name
          if (typeof item._id !== 'string') {
            accountDisplay = item._id?.company?.name || 'N/A';
            itemCompanyId = item._id?.company?._id;
          }
        }

        return {
          id: index + 1,
          account: accountDisplay,
          opening,
          income,
          expense,
          closing,
          companyId: itemCompanyId,
          accountId: itemAccountId
        };
      });

      // Calculate totals
      const calculatedTotals = transformedData.reduce(
        (acc, row) => ({
          opening: acc.opening + row.opening,
          income: acc.income + row.income,
          expense: acc.expense + row.expense,
          closing: acc.closing + row.closing
        }),
        { opening: 0, income: 0, expense: 0, closing: 0 }
      );

      setTableData(transformedData);
      setTotals(calculatedTotals);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cash data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCashData();
  }, [companyId]);

  const handleAccountClick = (row: TableRow) => {
    if (companyId && row.accountId) {
      // Navigate to account detail view
      history.push(`/cash/receipt-detail-v2/${row.accountId}`);
    } else if (row.companyId && !companyId) {
      // Navigate to company summary view
      history.push(`/cash/new-receipt/${row.companyId}`);
    }
  };

  const handleBackClick = () => {
    history.push('/cash/new-receipt');
  };

  return (
    <div className={styles.container}>
      {/* Top Header */}
      <div className={styles.topBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {companyId && (
            <button
              onClick={handleBackClick}
              className={styles.backBtn}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#1A1A1A',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              <BackIcon />
              <span>Quay lại</span>
            </button>
          )}
          <div className={styles.title}>Phiếu thu</div>
        </div>
        <div className={styles.pagination}>
          <span>1 - {tableData.length} trong số {tableData.length}</span>
          <div className={styles.chevronBtn}><ChevronLeftIcon /></div>
          <div className={styles.chevronBtn}><ChevronRightIcon /></div>
        </div>
      </div>

      {/* Filter & Action Bar */}
      <div className={styles.filterBar}>
        <div className={styles.dateFilterWrapper}>
          <div className={styles.dateGroup}>
            <span className={styles.dateLabel}>Từ ngày</span>
            <div className={styles.dateValue}>01/01/2025</div>
          </div>
          <div className={styles.dateGroup}>
            <span className={styles.dateLabel}>Đến ngày</span>
            <div className={styles.dateValue}>14/12/2025</div>
          </div>
        </div>
        <button className={styles.downloadBtn}>
          <span>Tải xuống</span>
          <ArrowDownIcon />
        </button>
      </div>

      {/* Content Table */}
      <div className={styles.tableContainer}>
        {/* Table Header */}
        <div className={styles.tableHeader}>
          <div className={`${styles.headerCell} ${styles.colIndex}`}>TT</div>
          <div className={`${styles.headerCell} ${styles.colAccount}`}>Tài khoản</div>
          <div className={`${styles.headerCell} ${styles.colMoney}`}>Tồn quỹ đầu kỳ</div>
          <div className={`${styles.headerCell} ${styles.colMoney}`}>Thu</div>
          <div className={`${styles.headerCell} ${styles.colMoney}`}>Chi</div>
          <div className={`${styles.headerCell} ${styles.colMoney}`}>Tồn quỹ cuối kỳ</div>
        </div>

        {/* Table Body */}
        {loading ? (
          <div className={styles.tableRow}>
            <div className={styles.cellText} style={{ textAlign: 'center', width: '100%' }}>
              Đang tải dữ liệu...
            </div>
          </div>
        ) : tableData.length === 0 ? (
          <div className={styles.tableRow}>
            <div className={styles.cellText} style={{ textAlign: 'center', width: '100%' }}>
              Không có dữ liệu
            </div>
          </div>
        ) : (
          tableData.map((item) => (
            <div key={item.id} className={styles.tableRow}>
              <div className={`${styles.cellText} ${styles.colIndex}`}>{item.id}</div>
              <div
                className={`${styles.cellText} ${styles.colAccount} ${styles.cellAccount}`}
                onClick={() => handleAccountClick(item)}
                style={{ cursor: (item.companyId || (companyId && item.accountId)) ? 'pointer' : 'default' }}
              >
                {item.account}
              </div>
              <div className={`${styles.cellText} ${styles.colMoney}`}>{formatCurrency(item.opening)}</div>
              <div className={`${styles.cellText} ${styles.colMoney}`}>{formatCurrency(item.income)}</div>
              <div className={`${styles.cellText} ${styles.colMoney}`}>{formatCurrency(item.expense)}</div>
              <div className={`${styles.cellText} ${styles.colMoney}`}>{formatCurrency(item.closing)}</div>
            </div>
          ))
        )}

        {/* Footer / Summary Row */}
        {!loading && tableData.length > 0 && (
          <div className={styles.footerRow}>
            <div className={`${styles.footerText} ${styles.colIndex}`}></div>
            <div className={`${styles.footerText} ${styles.colAccount}`}></div>
            <div className={`${styles.footerText} ${styles.colMoney}`}>{formatCurrency(totals.opening)}</div>
            <div className={`${styles.footerText} ${styles.colMoney}`}>{formatCurrency(totals.income)}</div>
            <div className={`${styles.footerText} ${styles.colMoney}`}>{formatCurrency(totals.expense)}</div>
            <div className={`${styles.footerText} ${styles.colMoney}`}>{formatCurrency(totals.closing)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CashPageV2;