import { FC, FormEvent, useState } from "react";

import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import CloseIcon from "assets/images/icon-small-bold-close.svg";

type Props = {
  openModal: boolean;
  setOpenModal: (setOpenModal: boolean) => void;
};

const NewHumanModal: FC<Props> = (props) => {
  // const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [issuedDate, setIssuedDate] = useState<Date | null>(null);
  const [insuranceDate, setInsuranceDate] = useState<Date | null>(null);
  const [workStartDate, setWorkStartDate] = useState<Date | null>(null);
  const [workEndDate, setWorkEndDate] = useState<Date | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [salaryChangeDate, setSalaryChangeDate] = useState<Date | null>(null);
  const [contactDate, setContactDate] = useState<Date | null>(null);
  const [activeContactDate, setActiveContactDate] = useState<Date | null>(null);
  const [contactRange, setContactRange] = useState<Date | null>(null);
  const [insuranceNoteDate, setInsuranceNoteDate] = useState<Date | null>(null);

  const { openModal, setOpenModal } = props;

  const initialValues = {
    type: "",
    department: "",
    role: "",
    gender: "",
    workStatus: "",
    humanStatus: "",
    sbhStatus: "",
    family: "",
    typeContact: "",
    contactNumber: "",
    familyInfo: "",
    otherInfo: "",
    fullName: "",
    humanCode: "",
    phoneNumber: "",
    email: "",
    birthDate: "",
    indentityCard: "",
    issuedDate: "",
    issuedBy: "",
    address: "",
    resident: "",
    birthPlace: "",
    fromPlace: "",
    taxCode: "",
    insuranceNumber: "",
    insuranceDate: "",
    salaryFactor: "",
    bonus: "",
    salaryInsurance: "",
    signer: "",
    fireSigner: "",
    workStartDate: "",
    workEndDate: "",
    appointmentDate: "",
    salaryChangeDate: "",
    contactDate: "",
    activeContactDate: "",
    contactRange: "",
    insuranceNoteDate: "",
  };

  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <main>
      {openModal ? (
        <section
          className="fixed flex justify-center items-center inset-0 z-50"
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

            <Formik
              initialValues={initialValues}
              onSubmit={(values) => console.log(values)}
            >
              {(formik) => {
                const { handleBlur, setFieldValue } = formik;

                return (
                  <Form className="px-6">
                    <div className="flex justify-between items-center h-10 border-b border-gray-200">
                      <div className="w-1/5 flex items-center">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Phân loại
                        </span>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          />
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
                        <Field
                          type="text"
                          name="contactNumber"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Thông tin gia đình
                        </span>
                        <Field
                          type="text"
                          name="familyInfo"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Thông tin khác
                        </span>
                        <Field
                          type="text"
                          name="otherInfo"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                    </div>

                    {/* -------------- Line 4 --------------- */}

                    <div className="flex justify-between items-center h-10 border-b border-gray-200">
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Họ và tên
                        </span>
                        <Field
                          type="text"
                          name="fullName"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Mã hiệu
                        </span>
                        <Field
                          type="text"
                          name="humanCode"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Điện thoại
                        </span>
                        <Field
                          type="text"
                          name="phoneNumber"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Email
                        </span>
                        <Field
                          type="text"
                          name="email"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                    </div>

                    {/* -------------- Line 5 --------------- */}

                    <div className="flex justify-between items-center h-10 border-b border-gray-200">
                      <div className="w-1/5 flex items-center">
                        <span className="w-3/12 mr-4 text-[13px] text-primary-gray">
                          Ngày sinh
                        </span>
                        <DatePicker
                          name="birthDate"
                          selected={null}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <Field
                              type="text"
                              name="birthDate"
                              className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                              onBlur={(e: FormEvent<HTMLInputElement>) => {
                                handleBlur(e);
                              }}
                            />
                          }
                          onChange={(date: Date | null) =>
                            setFieldValue("birthDate", date)
                          }
                        />
                      </div>
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Số định danh
                        </span>
                        <Field
                          type="text"
                          name="indentityCard"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5 flex items-center">
                        <span className="w-3/12 mr-4 text-[13px] text-primary-gray">
                          Ngày cấp
                        </span>
                        <DatePicker
                          selected={issuedDate}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <Field
                              type="text"
                              name="issuedDate"
                              className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                              onBlur={(e: FormEvent<HTMLInputElement>) => {
                                handleBlur(e);
                              }}
                            />
                          }
                          onChange={(date: Date | null) => setIssuedDate(date)}
                        />
                      </div>
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Nơi cấp
                        </span>
                        <Field
                          type="text"
                          name="issuedBy"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                    </div>

                    {/* -------------- Line 6 --------------- */}

                    <div className="flex justify-between items-center h-10 border-b border-gray-200">
                      <div className="w-1/5 flex items-center">
                        <span className="mr-4 text-[13px] text-primary-gray w-9">
                          Nơi ở
                        </span>
                        <Field
                          type="text"
                          name="address"
                          className="w-52 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5 flex items-center">
                        <span className="w-3/12 mr-4 text-[13px] text-primary-gray">
                          Thường trú
                        </span>
                        <Field
                          type="text"
                          name="resident"
                          className="w-52 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5 flex items-center">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Nơi sinh
                        </span>
                        <Field
                          type="text"
                          name="birthPlace"
                          className="w-52 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5 flex items-center">
                        <span className="w-3/12 mr-4 text-[13px] text-primary-gray">
                          Nguyên quán
                        </span>
                        <Field
                          type="text"
                          name="fromPlace"
                          className="w-52 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                    </div>

                    {/* -------------- Line 7 --------------- */}

                    <div className="flex justify-between items-center h-10 border-b border-gray-200">
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          MST
                        </span>
                        <Field
                          type="text"
                          name="taxCode"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Số bảo hiểm
                        </span>
                        <Field
                          type="text"
                          name="insuranceNumber"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5 flex items-center">
                        <span className="w-4/12 mr-4 text-[13px] text-primary-gray">
                          Ngày nộp BH
                        </span>
                        <DatePicker
                          selected={insuranceDate}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <Field
                              type="text"
                              name="insuranceDate"
                              className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                              onBlur={(e: FormEvent<HTMLInputElement>) => {
                                handleBlur(e);
                              }}
                            />
                          }
                          onChange={(date: Date | null) =>
                            setInsuranceDate(date)
                          }
                        />
                      </div>
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Hệ số lương
                        </span>
                        <Field
                          type="text"
                          name="salaryFactor"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                    </div>

                    {/* -------------- Line 8 --------------- */}

                    <div className="flex justify-between items-center h-10 border-b border-gray-200">
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Phụ cấp
                        </span>
                        <Field
                          type="text"
                          name="bonus"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Mức đóng BH
                        </span>
                        <Field
                          type="text"
                          name="salaryInsurance"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Người ký nhận
                        </span>
                        <Field
                          type="text"
                          name="signer"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                      <div className="w-1/5">
                        <span className="mr-4 text-[13px] text-primary-gray">
                          Người ký sa thải
                        </span>
                        <Field
                          type="text"
                          name="fireSigner"
                          className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                      </div>
                    </div>

                    {/* -------------- Line 9 --------------- */}

                    <div className="flex justify-between items-center h-10 border-b border-gray-200">
                      <div className="w-1/5 flex items-center">
                        <span className="w-8/12 mr-4 text-[13px] text-primary-gray">
                          Ngày bắt đầu làm việc
                        </span>
                        <DatePicker
                          selected={workStartDate}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <Field
                              type="text"
                              name="workStartDate"
                              className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                              onBlur={(e: FormEvent<HTMLInputElement>) => {
                                handleBlur(e);
                              }}
                            />
                          }
                          onChange={(date: Date | null) =>
                            setWorkStartDate(date)
                          }
                        />
                      </div>
                      <div className="w-1/5 flex items-center">
                        <span className="w-5/12 mr-4 text-[13px] text-primary-gray">
                          Ngày chấm dứt
                        </span>
                        <DatePicker
                          selected={workEndDate}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <Field
                              type="text"
                              name="workEndDate"
                              className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                              onBlur={(e: FormEvent<HTMLInputElement>) => {
                                handleBlur(e);
                              }}
                            />
                          }
                          onChange={(date: Date | null) => setWorkEndDate(date)}
                        />
                      </div>
                      <div className="w-1/5 flex items-center">
                        <span className="w-5/12 mr-4 text-[13px] text-primary-gray">
                          Ngày bổ nhiệm
                        </span>
                        <DatePicker
                          selected={appointmentDate}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <Field
                              type="text"
                              name="appointmentDate"
                              className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                              onBlur={(e: FormEvent<HTMLInputElement>) => {
                                handleBlur(e);
                              }}
                            />
                          }
                          onChange={(date: Date | null) =>
                            setAppointmentDate(date)
                          }
                        />
                      </div>
                      <div className="w-1/5 flex items-center">
                        <span className="w-5/12 mr-4 text-[13px] text-primary-gray">
                          Thay đổi lương
                        </span>
                        <DatePicker
                          selected={salaryChangeDate}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <Field
                              type="text"
                              name="salaryChangeDate"
                              className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                              onBlur={(e: FormEvent<HTMLInputElement>) => {
                                handleBlur(e);
                              }}
                            />
                          }
                          onChange={(date: Date | null) =>
                            setSalaryChangeDate(date)
                          }
                        />
                      </div>
                    </div>

                    {/* -------------- Line 10 --------------- */}

                    <div className="flex justify-between items-center h-10 border-b border-gray-200">
                      <div className="w-1/5 flex items-center">
                        <span className="w-2/4 mr-4 text-[13px] text-primary-gray">
                          Ngày ký hợp đồng
                        </span>
                        <DatePicker
                          selected={contactDate}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <Field
                              type="text"
                              name="contactDate"
                              className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                              onBlur={(e: FormEvent<HTMLInputElement>) => {
                                handleBlur(e);
                              }}
                            />
                          }
                          onChange={(date: Date | null) => setContactDate(date)}
                        />
                      </div>
                      <div className="w-1/5 flex items-center">
                        <span className="w-2/4 mr-4 text-[13px] text-primary-gray">
                          Ngày hiệu lực HĐ
                        </span>
                        <DatePicker
                          selected={activeContactDate}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <Field
                              type="text"
                              name="activeContactDate"
                              className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                              onBlur={(e: FormEvent<HTMLInputElement>) => {
                                handleBlur(e);
                              }}
                            />
                          }
                          onChange={(date: Date | null) =>
                            setActiveContactDate(date)
                          }
                        />
                      </div>
                      <div className="w-1/5 flex items-center">
                        <span className="w-4/12 mr-4 text-[13px] text-primary-gray">
                          Thời hạn HĐ
                        </span>
                        <DatePicker
                          selected={contactRange}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <Field
                              type="text"
                              name="contactRange"
                              className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                              onBlur={(e: FormEvent<HTMLInputElement>) => {
                                handleBlur(e);
                              }}
                            />
                          }
                          onChange={(date: Date | null) =>
                            setContactRange(date)
                          }
                        />
                      </div>
                      <div className="w-1/5 flex items-center">
                        <span className="w-5/12 mr-4 text-[13px] text-primary-gray">
                          Ngày nộp sổ BH
                        </span>
                        <DatePicker
                          selected={insuranceNoteDate}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <Field
                              type="text"
                              name="insuranceNoteDate"
                              className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 text-[13px]"
                              onBlur={(e: FormEvent<HTMLInputElement>) => {
                                handleBlur(e);
                              }}
                            />
                          }
                          onChange={(date: Date | null) =>
                            setInsuranceNoteDate(date)
                          }
                        />
                      </div>
                    </div>

                    <div className="absolute flex justify-end items-center bottom-0 -ml-6 px-6 h-12 w-full border-t border-gray-300 text-primary-light">
                      <button
                        type="submit"
                        className="bg-primary h-8 w-24 rounded-sm hover:opacity-90"
                        // onClick={() => handleCloseModal()}
                      >
                        Xác nhận
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default NewHumanModal;
