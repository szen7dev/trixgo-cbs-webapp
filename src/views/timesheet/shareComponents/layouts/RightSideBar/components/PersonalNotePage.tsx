import { FC, useState } from "react";

import DropdownSearchable from "shareComponents/common/DropdownSearch";

import SearchIcon from "assets/images/icons8-search-120-right.svg";

import styles from "../style.module.css";
import { EditNote } from "./index";

export const PersonalNotePage: FC = () => {
  const [openNote, setOpenNote] = useState<boolean>(false);

  const handleOpenNote = () => setOpenNote(!openNote);

  return (
    <main className={`h-full flex bg-primary-light ${styles.boxShadow}`}>
      <section className="w-80 h-full border border-primary-border">
        <header
          className="h-10 font-bold flex items-center px-2"
          style={{ fontSize: "2rem" }}
        >
          <p className="cursor-pointer">+</p>
        </header>

        <div className="px-2">
          <p className="font-bold text-lg mb-4">Quick Notes</p>

          <div className="relative">
            <DropdownSearchable
              placeholder="Tìm kiếm..."
              className="w-full pl-2 bg-cbs-table-header"
              classNameInput="h-[32px] bg-cbs-table-header"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={false}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Kết quả trả về 1",
                },
                {
                  _id: 2,
                  content: "Kết quả trả về 2",
                },
                {
                  _id: 3,
                  content: "Kết quả trả về 3",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
            <img
              src={SearchIcon}
              alt="Search"
              className="absolute right-4 bottom-2"
            />
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <div
              className={`px-4 pt-2 pb-4 cursor-pointer select-none ${styles.bgBoldYellow}`}
              onClick={handleOpenNote}
            >
              <p className={`text-right text-primary-gray ${styles.textTenPx}`}>
                8:00 AM
              </p>
              <p>
                Hồ sơ thanh toán tháng 8 năm 2021, tất cả cần chuyển sớm thông
                tin
              </p>
            </div>
            <div
              className={`px-4 pt-2 pb-4 cursor-pointer select-none ${styles.bgLightGreen}`}
            >
              <p className={`text-right text-primary-gray ${styles.textTenPx}`}>
                8:00 AM
              </p>
              <p>
                Hồ sơ thanh toán tháng 8 năm 2021, tất cả cần chuyển sớm thông
                tin
              </p>
            </div>
            <div
              className={`px-4 pt-2 pb-4 cursor-pointer select-none ${styles.bgLightPurple}`}
            >
              <p className={`text-right text-primary-gray ${styles.textTenPx}`}>
                8:00 AM
              </p>
              <p>
                Hồ sơ thanh toán tháng 8 năm 2021, tất cả cần chuyển sớm thông
                tin
              </p>
            </div>
          </div>
        </div>
      </section>

      {openNote && <EditNote open={openNote} />}
    </main>
  );
};