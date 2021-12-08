import { FC } from "react";

import "../human.module.css";

import CloseIcon from "assets/images/icon-small-bold-close.svg";

type Props = {
  openModal: boolean;
  setOpenModal: (setOpenModal: boolean) => void;
};

const NewHumanModal: FC<Props> = (props) => {
  const { openModal, setOpenModal } = props;

  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <main>
      {openModal ? (
        <section
          className="fixed flex justify-center items-center inset-0 z-40"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="relative w-full h-5/6 bg-primary-light">
            <div className="h-12 flex items-center border-b border-gray-300 px-6">
              <p className="text-bold text-xl">Nhân sự mới</p>
              <img
                src={CloseIcon}
                alt="Close"
                className="absolute right-6 cursor-pointer"
                onClick={() => handleCloseModal()}
              />
            </div>

            {/* -------------- Line 1 --------------- */}

            <div className="px-6">
              <div className="flex justify-between items-center h-10 border-b border-gray-200">
                <div className="w-1/5 flex items-center">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Phân loại
                  </span>
                  <div className="relative">
                    <div>
                      <input
                        list="browsers"
                        name="browser"
                        id="browser"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                      />
                      <datalist id="browsers">
                        <option value="Edge"></option>
                        <option value="Firefox"></option>
                        <option value="Chrome"></option>
                        <option value="Opera"></option>
                        <option value="Safari"></option>
                      </datalist>
                    </div>
                    {/* <input
                      type="text"
                      className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                      onClick={() => handleOpenSelect()}
                      ref={ref}
                    /> */}
                    {/* {openSelect && (
                      <div>
                        <select>
                          <option value="a">a</option>
                          <option value="b">b</option>
                        </select>
                      </div>
                      <div className="absolute w-72 h-80 top-7 bg-primary-light border border-gray-200 shadow-md rounded-md">
                        <div className="flex items-center px-4 w-full border-b border-gray-200 h-16">
                          <input
                            ref={ref}
                            type="text"
                            className="w-32 h-6 outline-none"
                            placeholder="Nhập nội dung"
                          />
                        </div>
                        <div>
                          <div className="px-4 h-16 flex items-center hover:bg-accent-light">
                            Nhân viên
                          </div>
                          <div className="px-4 h-16 flex items-center">
                            Thực tập
                          </div>
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Phòng ban
                  </span>
                  <input
                    type="text"
                    className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                  />
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Chức vụ
                  </span>
                  <input
                    type="text"
                    className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                  />
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Giới tính
                  </span>
                  <input
                    type="text"
                    className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                  />
                </div>
              </div>

              {/* -------------- Line 2 --------------- */}

              <div className="flex justify-between  items-center h-10 border-b border-gray-200">
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Tình trạng làm việc
                  </span>
                  <input
                    type="text"
                    className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                  />
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Tình trạng nhân sự
                  </span>
                  <input
                    type="text"
                    className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                  />
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Tình trạng SBH
                  </span>
                  <input
                    type="text"
                    className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                  />
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Gia đình CS
                  </span>
                  <input
                    type="text"
                    className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                  />
                </div>
              </div>

              {/* -------------- Line 3 --------------- */}

              <div className="flex justify-between items-center h-10 border-b border-gray-200">
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Loại hợp đồng
                  </span>
                  <input
                    type="text"
                    className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                  />
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Số hợp đồng
                  </span>
                  <span className="text-[13px]">25/18/HDLD</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Thông tin gia đình
                  </span>
                  <span></span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Thông tin khác
                  </span>
                  <span className="text-[13px]"></span>
                </div>
              </div>

              {/* -------------- Line 4 --------------- */}

              <div className="flex justify-between items-center h-10 border-b border-gray-200">
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Họ và tên
                  </span>
                  <span className="text-[13px]">Trương Văn A</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Mã hiệu
                  </span>
                  <span className="text-[13px]">atruongv.pgi</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Điện thoại
                  </span>
                  <span className="text-[13px]">0088666222</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Email
                  </span>
                  <span className="text-[13px]">hoavan@gmail.com</span>
                </div>
              </div>

              {/* -------------- Line 5 --------------- */}

              <div className="flex justify-between items-center h-10 border-b border-gray-200">
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Ngày sinh
                  </span>
                  <span className="text-[13px]">18/11/2003</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Số định danh
                  </span>
                  <span className="text-[13px]">3322115566</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Ngày cấp
                  </span>
                  <span className="text-[13px]">15/3/2011</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Nơi cấp
                  </span>
                  <span className="text-[13px]">CA tỉnh Bắc Ninh</span>
                </div>
              </div>

              {/* -------------- Line 6 --------------- */}

              <div className="flex justify-between items-center h-10 border-b border-gray-200">
                <div className="w-1/5 flex items-center">
                  <span className="mr-4 text-[13px] text-primary-gray w-9">
                    Nơi ở
                  </span>
                  <span className="text-[13px] w-72">
                    Thôn My Xuyên, xã Mỹ Hương, huyện Lương Tài, tỉnh Bắc Ninh
                  </span>
                </div>
                <div className="w-1/5 flex items-center">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Thường trú
                  </span>
                  <span className="text-[13px] w-72">
                    Thôn My Xuyên, xã Mỹ Hương, huyện Lương Tài, tỉnh Bắc Ninh
                  </span>
                </div>
                <div className="w-1/5 flex items-center">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Nơi sinh
                  </span>
                  <span className="text-[13px] w-72">
                    Thôn My Xuyên, xã Mỹ Hương, huyện Lương Tài, tỉnh Bắc Ninh
                  </span>
                </div>
                <div className="w-1/5 flex items-center">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Nguyên quán
                  </span>
                  <span className="text-[13px] w-72">
                    Thôn My Xuyên, xã Mỹ Hương, huyện Lương Tài, tỉnh Bắc Ninh
                  </span>
                </div>
              </div>

              {/* -------------- Line 7 --------------- */}

              <div className="flex justify-between items-center h-10 border-b border-gray-200">
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    MST
                  </span>
                  <span className="text-[13px]">55223344</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Số bảo hiểm
                  </span>
                  <span className="text-[13px]">2266448</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Ngày nộp BH
                  </span>
                  <span className="text-[13px]">12/6/2021</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Hệ số lương
                  </span>
                  <span className="text-[13px]">1.5</span>
                </div>
              </div>

              {/* -------------- Line 8 --------------- */}

              <div className="flex justify-between items-center h-10 border-b border-gray-200">
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Phụ cấp
                  </span>
                  <span className="text-[13px]">1.250.000</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Mức đóng BH
                  </span>
                  <span className="text-[13px]">6.875.000</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Người ký nhận
                  </span>
                  <span className="text-[13px]">Giám đốc Lê Hoàng Tiến</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Người ký sa thải
                  </span>
                  <span className="text-[13px]">Tất Cuồng Phong</span>
                </div>
              </div>

              {/* -------------- Line 9 --------------- */}

              <div className="flex justify-between items-center h-10 border-b border-gray-200">
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Ngày bắt đầu làm việc
                  </span>
                  <span className="text-[13px]">15/12/2020</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Ngày chấm dứt
                  </span>
                  <span className="text-[13px]">15/12/2020</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Ngày bổ nhiệm
                  </span>
                  <span className="text-[13px]">12/6/2021</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Thay đổi lương
                  </span>
                  <span className="text-[13px]">12/6/2021</span>
                </div>
              </div>

              {/* -------------- Line 10 --------------- */}

              <div className="flex justify-between items-center h-10 border-b border-gray-200">
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Ngày ký hợp đồng
                  </span>
                  <span className="text-[13px]">15/12/2020</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Ngày hiệu lực HĐ
                  </span>
                  <span className="text-[13px]">15/12/2020</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Thời hạn HĐ
                  </span>
                  <span className="text-[13px]">12/6/2021</span>
                </div>
                <div className="w-1/5">
                  <span className="mr-4 text-[13px] text-primary-gray">
                    Ngày nộp sổ BH
                  </span>
                  <span className="text-[13px]">12/6/2021</span>
                </div>
              </div>
            </div>

            <div className="absolute flex justify-end items-center px-6 bottom-0 h-12 w-full border-t border-gray-300 text-primary-light">
              <button
                className="bg-primary h-8 w-24 rounded-sm hover:opacity-90"
                onClick={() => handleCloseModal()}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default NewHumanModal;
