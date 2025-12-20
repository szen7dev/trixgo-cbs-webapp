import React, { useState, useEffect, useRef } from 'react';

interface DropdownItem {
  id: string | number;
  text: string;
  [key: string]: any;
}

interface DropdownSearchableProps {
  placeholder?: string;
  value?: DropdownItem;
  onChange?: (item: DropdownItem | null) => void;
  fetchData?: (searchTerm: string) => Promise<DropdownItem[]>;
  data?: DropdownItem[];
  className?: string;
  disabled?: boolean;
  onLoadMore?: () => void;
}

export const DropdownSearchable: React.FC<DropdownSearchableProps> = ({
  placeholder = 'Chọn...',
  value,
  onChange,
  fetchData,
  data = [],
  className = '',
  disabled = false,
  onLoadMore
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState<DropdownItem[]>(data);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setOptions(data);
    }
  }, [data]);

  useEffect(() => {
    const loadData = async () => {
      if (fetchData && searchTerm) {
        setLoading(true);
        try {
          const results = await fetchData(searchTerm);
          setOptions(results);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      } else if (!searchTerm && data) {
        setOptions(data);
      }
    };

    const timer = setTimeout(() => {
      loadData();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, fetchData, data]);

  const handleSelect = (item: DropdownItem) => {
    onChange?.(item);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

  const filteredOptions = options.filter(option =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer
          flex items-center justify-between
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400'}
          ${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : ''}
        `}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {value ? value.text : placeholder}
        </span>
        <div className="flex items-center gap-2">
          {value && !disabled && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-hidden">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div
            ref={scrollRef}
            className="overflow-y-auto max-h-[240px]"
            onScroll={(e) => {
              const target = e.currentTarget;
              const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
              if (bottom && onLoadMore) {
                onLoadMore();
              }
            }}
          >
            {loading ? (
              <div className="p-4 text-center text-gray-500">Đang tải...</div>
            ) : filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-gray-500">Không có dữ liệu</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={`
                    px-4 py-2 cursor-pointer transition-colors
                    ${value?.id === option.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}
                  `}
                >
                  {option.text}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
