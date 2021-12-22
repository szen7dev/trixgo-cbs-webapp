import { FC } from "react";

import CaretDownIcon from "assets/images/icon-caret-down.png";
import DownloadIcon from "assets/images/icons8-download-48_2.png";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import PrintIcon from "assets/images/icons8-print-32.png";
import HumanAvatar from "assets/images/human-avatar.svg";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const ClassifyDrawer: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={
        "fixed flex overflow-hidden inset-0 transform ease-in-out" +
        (isOpen
          ? " transition-opacity opacity-100 duration-200 translate-x-0"
          : "transition-all delay-50 opacity-0 translate-x-full")
      }
      style={{ zIndex: 60 }}
    >
      <div className="w-full h-full" onClick={() => setIsOpen(false)} />
      <div
        className={
          "w-[680px] bg-white h-full shadow-xl delay-50 duration-300 ease-in-out transition-all transform" +
          (isOpen ? " translate-x-0 " : " translate-x-full")
        }
      >
        <div className="p-5">
          <p className="text-2x-large">Thông tin trao đổi</p>
          <div className="px-3">
            {/* Header */}
            <div className="flex mt-4 mb-3 justify-between">
              <div className="flex items-center">
                <input type="checkbox" />
                <button>
                  <img
                    className="w-6 opacity-50"
                    src={CaretDownIcon}
                    alt="Dropdown"
                  />
                </button>
                <span className="text-primary-gray mx-3">|</span>
                <button>
                  <img
                    className="w-6 mx-1 opacity-70"
                    src={DownloadIcon}
                    alt="DownloadIcon"
                  />
                </button>
                <button>
                  <img
                    className="w-6 mx-1 opacity-80"
                    src={SendEmailIcon}
                    alt="SendEmailIcon"
                  />
                </button>
                <button>
                  <img
                    className="w-6 mx-1 opacity-70"
                    src={PrintIcon}
                    alt="PrintIcon"
                  />
                </button>
              </div>

              <div className="flex space-x-5">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500" />
                  <span className="ml-1 text-primary-gray font-normal">
                    Quá hạn
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500" />
                  <span className="ml-1 text-primary-gray font-normal">
                    Tuần tới
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500" />
                  <span className="ml-1 text-primary-gray font-normal">
                    {" "}
                    {">7 ngày"}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="my-4">
              <div className="flex">
                <input type="checkbox" />
                <div className="pl-2">
                  <span>
                    CHG.THT.Hồ sơ thanh toán đợt 05 gói thầu Tư vấn thiết kế 112
                    - Dự án Xây dựng cụm trường tiểu học và trung học cơ sở Tây
                    Hồ Tây
                  </span>
                  <div className="flex justify-between items-center my-2">
                    <div className="flex items-center">
                      <img
                        src={HumanAvatar}
                        className="w-6 rounded-full"
                        alt="Avatar"
                      />
                      <span className="text-primary-gray ml-2">
                        Hà Tiến Dũng-CHG
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-red-100 rounded-xl px-2 py-1">
                        <span className="text-[13px] text-red-500">
                          Quá hạn
                        </span>
                      </div>
                      <span className="text-[13px] ml-2">18/12/21</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-gray-200" />
            </div>

            <div className="my-4">
              <div className="flex">
                <input type="checkbox" />
                <div className="pl-2">
                  <span>
                    CHG.THT.Hồ sơ thanh toán đợt 05 gói thầu Tư vấn thiết kế 112
                    - Dự án Xây dựng cụm trường tiểu học và trung học cơ sở Tây
                    Hồ Tây
                  </span>
                  <div className="flex justify-between items-center my-1">
                    <div className="flex items-center">
                      <img
                        src={HumanAvatar}
                        className="w-6 rounded-full"
                        alt="Avatar"
                      />
                      <span className="text-primary-gray ml-2">
                        Hà Tiến Dũng-CHG
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-red-100 rounded-xl px-2 py-1">
                        <span className="text-[13px] text-red-500">
                          Quá hạn
                        </span>
                      </div>
                      <span className="text-[13px] ml-2">18/12/21</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-gray-200" />
            </div>

            <div className="my-4">
              <div className="flex">
                <input type="checkbox" />
                <div className="pl-2">
                  <span>
                    CHG.THT.Hồ sơ thanh toán đợt 05 gói thầu Tư vấn thiết kế 112
                    - Dự án Xây dựng cụm trường tiểu học và trung học cơ sở Tây
                    Hồ Tây
                  </span>
                  <div className="flex justify-between items-center my-1">
                    <div className="flex items-center">
                      <img
                        src={HumanAvatar}
                        className="w-6 rounded-full"
                        alt="Avatar"
                      />
                      <span className="text-primary-gray ml-2">
                        Hà Tiến Dũng-CHG
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-red-100 rounded-xl px-2 py-1">
                        <span className="text-[13px] text-red-500">
                          Quá hạn
                        </span>
                      </div>
                      <span className="text-[13px] ml-2">18/12/21</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-gray-200" />
            </div>

            <div className="my-4">
              <div className="flex">
                <input type="checkbox" />
                <div className="pl-2">
                  <span>
                    CHG.THT.Hồ sơ thanh toán đợt 05 gói thầu Tư vấn thiết kế 112
                    - Dự án Xây dựng cụm trường tiểu học và trung học cơ sở Tây
                    Hồ Tây
                  </span>
                  <div className="flex justify-between items-center my-1">
                    <div className="flex items-center">
                      <img
                        src={HumanAvatar}
                        className="w-6 rounded-full"
                        alt="Avatar"
                      />
                      <span className="text-primary-gray ml-2">
                        Hà Tiến Dũng-CHG
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-red-100 rounded-xl px-2 py-1">
                        <span className="text-[13px] text-red-500">
                          Quá hạn
                        </span>
                      </div>
                      <span className="text-[13px] ml-2">18/12/21</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-gray-200" />
            </div>

            <div className="my-4">
              <div className="flex">
                <input type="checkbox" />
                <div className="pl-2">
                  <span>
                    CHG.THT.Hồ sơ thanh toán đợt 05 gói thầu Tư vấn thiết kế 112
                    - Dự án Xây dựng cụm trường tiểu học và trung học cơ sở Tây
                    Hồ Tây
                  </span>
                  <div className="flex justify-between items-center my-1">
                    <div className="flex items-center">
                      <img
                        src={HumanAvatar}
                        className="w-6 rounded-full"
                        alt="Avatar"
                      />
                      <span className="text-primary-gray ml-2">
                        Hà Tiến Dũng-CHG
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-red-100 rounded-xl px-2 py-1">
                        <span className="text-[13px] text-red-500">
                          Quá hạn
                        </span>
                      </div>
                      <span className="text-[13px] ml-2">18/12/21</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-gray-200" />
            </div>

            <div className="my-4">
              <div className="flex">
                <input type="checkbox" />
                <div className="pl-2">
                  <span>
                    CHG.THT.Hồ sơ thanh toán đợt 05 gói thầu Tư vấn thiết kế 112
                    - Dự án Xây dựng cụm trường tiểu học và trung học cơ sở Tây
                    Hồ Tây
                  </span>
                  <div className="flex justify-between items-center my-1">
                    <div className="flex items-center">
                      <img
                        src={HumanAvatar}
                        className="w-6 rounded-full"
                        alt="Avatar"
                      />
                      <span className="text-primary-gray ml-2">
                        Hà Tiến Dũng-CHG
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-red-100 rounded-xl px-2 py-1">
                        <span className="text-[13px] text-red-500">
                          Quá hạn
                        </span>
                      </div>
                      <span className="text-[13px] ml-2">18/12/21</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassifyDrawer;
