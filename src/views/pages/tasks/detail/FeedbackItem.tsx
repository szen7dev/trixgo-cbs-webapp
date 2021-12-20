import { FC } from "react";

import HumanAvatar from "assets/images/human-avatar.svg";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import PDFIcon from "assets/images/icons8-pdf-48 1.png";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import IconDownload from "assets/images/icons8-download-48_3.svg";

type Props = {
  expanded?: boolean;
};

const FeedbackItem: FC<Props> = ({ expanded }) => {
  return (
    <>
      <div className="flex">
        <img src={HumanAvatar} alt="Avatar" className="w-[44px] h-[44px]" />
        <div className="w-full ml-5">
          <div className="flex justify-between">
            <div>
              <p className="text-[14px]">Vũ Thanh Bình-CPMI</p>
              {expanded && (
                <p className="text-[13px] text-primary-gray pb-5">
                  Giám đốc Tư vấn Quản lý dự án
                </p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[13px] text-primary-gray">
                15:30 22/12/2012 (1 day ago)
              </span>
              <input type="checkbox" />
              <button
                className={`${
                  expanded ? "h-10 bg-lighter-gray" : "pl-3"
                } text-[13px] w-10 flex justify-center items-center rounded-full`}
              >
                <DotsVerticalIcon />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className={`${expanded ? "" : "max-w-[632px] truncate"}`}>
            <span className="text-[13px]">
              Dear @Tô Duy Cảnh-CDC,
              <br /> Em thêm Mr.Phan Châu Tín-ARMO và Mr. Nguyễn Mạnh Hùng-ARMO
              vào mục người liên quan của đầu việc này để nắm thông tin nhé.
            </span>
          </div>

          {/* File */}
          {expanded && (
            <div className="flex w-full my-2">
              <div className="w-5/8 bg-gray-100 p-2 rounded-sm border-2 border-slate-400">
                <a href="/">
                  <div className="flex">
                    <div>
                      <img src={PDFIcon} className="w-8" alt="PDF" />
                    </div>
                    <div className="ml-3">
                      <div className="flex">
                        <span className="w-5/6">
                          2021.15.12-CBS.BLD.HiepNH-BaoCaoDanhGiaTacDongMoiTruong.pdf
                        </span>
                        <div className="w-1/6 flex justify-end">
                          <img
                            src={CopyIcon}
                            className="w-[24px] h-[24px]"
                            alt="Copy"
                          />
                        </div>
                      </div>

                      <div className="flex w-full mt-2">
                        <span className="w-4/5 text-[13px] text-primary-gray">
                          Nguyễn Phan Thanh Hương-CDC
                        </span>
                        <span className="text-end w-1/5 text-[13px] text-primary-gray">
                          15:30 12/5/21
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="w-2/8 px-3 pt-3">
                <textarea
                  className="h-full focus:outline-none"
                  placeholder="Nhập nội dung ghi chú cho file"
                />
              </div>
              <div className="w-1/8 flex flex-col items-center justify-between">
                <input type="checkbox" />
                <div className="rounded-full p-2 border-2">
                  <img src={IconDownload} alt="Avatar" className="w-6" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-0.5 mb-5 mt-1 bg-gray-200" />
    </>
  );
};

FeedbackItem.defaultProps = {
  expanded: true,
};
export default FeedbackItem;
