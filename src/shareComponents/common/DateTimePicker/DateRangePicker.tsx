import React, { useState, useEffect, useRef } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './DateRangePicker.css';

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const MONTHS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

const WEEKDAYS_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  placeholder = 'Chọn khoảng ngày',
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<DateRange>(value || { from: null, to: null });
  const [month, setMonth] = useState<Date>(value?.from || new Date());
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setRange(value);
      if (value.from) {
        setMonth(value.from);
      }
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDayClick = (day: Date) => {
    const newRange = DateUtils.addDayToRange(day, range);
    const updatedRange: DateRange = {
      from: newRange.from || null,
      to: newRange.to || null
    };
    setRange(updatedRange);
    // Don't auto-close - user must click confirm button
  };

  const handleConfirm = () => {
    if (range.from && range.to) {
      onChange?.(range);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const emptyRange = { from: null, to: null };
    setRange(emptyRange);
    onChange?.(emptyRange);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const monthStr = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${monthStr}/${year}`;
  };

  const formatRange = () => {
    if (!range.from && !range.to) return '';
    if (range.from && !range.to) return formatDate(range.from);
    if (range.from && range.to) {
      return `${formatDate(range.from)} - ${formatDate(range.to)}`;
    }
    return '';
  };

  const handleYearMonthChange = (newMonth: Date) => {
    setMonth(newMonth);
  };

  const currentYearNow = new Date().getFullYear();
  const years: number[] = [];
  for (let i = currentYearNow - 25; i <= currentYearNow + 5; i += 1) {
    years.push(i);
  }

  const YearMonthCaption = ({ date }: { date: Date }) => {
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newMonth = new Date(date.getFullYear(), parseInt(e.target.value, 10));
      handleYearMonthChange(newMonth);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newMonth = new Date(parseInt(e.target.value, 10), date.getMonth());
      handleYearMonthChange(newMonth);
    };

    return (
      <div className="DayPicker-Caption">
        <div className="caption-selects">
          <select value={date.getMonth()} onChange={handleMonthChange}>
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>
                {m}
              </option>
            ))}
          </select>
          <select value={date.getFullYear()} onChange={handleYearChange}>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const modifiers = range.from && range.to ? { start: range.from, end: range.to } : {};

  return (
    <div ref={wrapperRef} className={`date-range-picker-wrapper ${className}`}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`date-range-picker-input ${disabled ? 'disabled' : ''} ${isOpen ? 'focused' : ''}`}
      >
        <span className={formatRange() ? 'has-value' : 'placeholder'}>
          {formatRange() || placeholder}
        </span>
        <div className="date-range-picker-icons">
          {(range.from || range.to) && !disabled && (
            <button
              onClick={handleClear}
              className="clear-button"
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="calendar-icon">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M3 10H21M8 2V6M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="date-range-picker-popover">
          <DayPicker
            className="Range"
            numberOfMonths={1}
            month={month}
            onMonthChange={setMonth}
            selectedDays={range.from && range.to ? [range.from, { from: range.from, to: range.to }] : range.from ? [range.from] : undefined}
            onDayClick={handleDayClick}
            months={MONTHS}
            weekdaysShort={WEEKDAYS_SHORT}
            firstDayOfWeek={0}
            showOutsideDays
            captionElement={YearMonthCaption}
            modifiers={modifiers}
          />

          {/* Confirm Button Section */}
          <div className="range-confirm-section">
            <button
              onClick={handleConfirm}
              className="range-confirm-button"
              type="button"
              disabled={!range.from || !range.to}
            >
              Xác nhận
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
