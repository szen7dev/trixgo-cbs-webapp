import React, { useState, useEffect, useRef } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './DateTimePicker.css';

interface DateTimePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  showTime?: boolean;
  className?: string;
  disabled?: boolean;
}

const MONTHS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

const WEEKDAYS_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  placeholder = 'Chọn ngày',
  showTime = false,
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [hours, setHours] = useState(value ? value.getHours() : 0);
  const [minutes, setMinutes] = useState(value ? value.getMinutes() : 0);
  const [month, setMonth] = useState<Date>(value || new Date());
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setMonth(value);
      if (showTime) {
        setHours(value.getHours());
        setMinutes(value.getMinutes());
      }
    }
  }, [value, showTime]);

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
    const newDate = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      showTime ? hours : 0,
      showTime ? minutes : 0
    );
    setSelectedDate(newDate);

    if (!showTime) {
      onChange?.(newDate);
      setIsOpen(false);
    }
  };

  const handleTimeConfirm = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      onChange?.(newDate);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(null);
    onChange?.(null);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const monthStr = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    if (showTime) {
      const hrs = String(date.getHours()).padStart(2, '0');
      const mins = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${monthStr}/${year} ${hrs}:${mins}`;
    }
    return `${day}/${monthStr}/${year}`;
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

  return (
    <div ref={wrapperRef} className={`date-time-picker-wrapper ${className}`}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`date-time-picker-input ${disabled ? 'disabled' : ''} ${isOpen ? 'focused' : ''}`}
      >
        <span className={selectedDate ? 'has-value' : 'placeholder'}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        <div className="date-time-picker-icons">
          {selectedDate && !disabled && (
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
        <div className="date-time-picker-popover">
          <DayPicker
            month={month}
            onMonthChange={setMonth}
            selectedDays={selectedDate || undefined}
            onDayClick={handleDayClick}
            months={MONTHS}
            weekdaysShort={WEEKDAYS_SHORT}
            firstDayOfWeek={0}
            showOutsideDays
            captionElement={YearMonthCaption}
            modifiers={{
              selected: selectedDate || undefined
            }}
          />

          {showTime && (
            <div className="time-picker-section">
              <div className="time-picker-inputs">
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={String(hours).padStart(2, '0')}
                  onChange={(e) => setHours(Math.min(23, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="time-input"
                />
                <span className="time-separator">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={String(minutes).padStart(2, '0')}
                  onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="time-input"
                />
              </div>
              <button
                onClick={handleTimeConfirm}
                className="time-confirm-button"
                type="button"
              >
                Xác nhận
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
