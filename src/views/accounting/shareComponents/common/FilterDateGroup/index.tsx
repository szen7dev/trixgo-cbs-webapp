import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cn from "classnames";
import styles from 'views/accounting/styles/styles.module.css';

type Props = {
  fromDate: any
  setFromDate: (date: Date | null) => void
  endDate: any
  setEndDate: (date: Date | null) => void
}

export const FilterDateGroup: FC<Props> = ({ fromDate, setFromDate, endDate, setEndDate }) => {
  return (
    <div className="mx-3 flex">
      <div className="relative">
        <span className={cn(
          "text-sm mb-2",
          styles.bgWhiteLight, styles.labelDateSearch
        )} >Từ ngày</span>
        <DatePicker
          selected={fromDate}
          onChange={(date: Date | null) => setFromDate(date)}
          dateFormat="dd/MM/yyyy"
          customInput={
            <input
              type="text"
              placeholder="Từ ngày"
              className="h-[38px] px-2 border border-primary-border rounded"
            />
          }
        />
      </div>

      <div className="relative ml-3">
        <span className={cn(
          "text-sm mb-2",
          styles.bgWhiteLight, styles.labelDateSearch
        )} >Đến ngày</span>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          dateFormat="dd/MM/yyyy"
          customInput={
            <input
              type="text"
              placeholder="Đến ngày"
              className="h-[38px] px-2 border border-primary-border rounded"
            />
          }
        />
      </div>
    </div>
  )
}