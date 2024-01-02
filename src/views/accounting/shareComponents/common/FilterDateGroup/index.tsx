import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from 'views/accounting/styles/styles.module.css';
import cn from "classnames";

type Props = {
  fromDate: any
  endDate: any
  onChangeDate: (date: Date | null, input: 0 | 1) => void // 0: fromDate , 1: endDate
}

export const FilterDateGroup: FC<Props> = ({ fromDate, endDate, onChangeDate }) => {
  return (
    <div className="mx-3 flex">
      <div className="relative z-9">
        <span className={cn(
          "text-sm mb-2",
          styles.bgWhiteLight, styles.labelDateSearch
        )} >Từ ngày</span>
        <DatePicker
          className="w-28"
          selected={fromDate}
          onChange={(date: Date | null) => onChangeDate(date, 0)}
          dateFormat="dd/MM/yyyy"
          popperClassName={cn(styles.datepickerPopper)}
          customInput={
            <input
              type="text"
              placeholder="Từ ngày"
              className="h-[32px] px-2 border border-primary-border rounded"
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
          className="w-28"
          selected={endDate}
          onChange={(date: Date | null) => onChangeDate(date, 1)}
          dateFormat="dd/MM/yyyy"
          popperClassName={cn(styles.datepickerPopper)}
          customInput={
            <input
              type="text"
              placeholder="Đến ngày"
              className="h-[32px] px-2 border border-primary-border rounded"
            />
          }
        />
      </div>
    </div>
  )
}