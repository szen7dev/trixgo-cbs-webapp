import { FC, FormEvent, useRef, useState } from "react";

import { Formik, Form, Field } from "formik";
import moment from "moment";

import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import { useModal } from "services/hooks/useModal";
import DropdownSearchable from "components/common/DropdownSearch";

const NewHumanModal: FC = () => {
  const [openOption, setOpenOption] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { closeModal } = useModal();

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

  useOnClickOutside(ref, () => setOpenOption(!openOption));

  return (
    <main>
      <section
        className="fixed flex justify-center items-center inset-0 z-auto"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="relative w-full h-5/6 bg-primary-light">
          <div className="h-12 flex items-center border-b border-gray-300 px-6">
            <p className="text-bold text-xl">Nhân sự mới</p>
            <img
              src={CloseIcon}
              alt="Close"
              className="absolute right-6 cursor-pointer"
              onClick={() => closeModal()}
            />
          </div>

          <Formik initialValues={initialValues} onSubmit={() => closeModal()}>
            {(formik) => {
              const { handleBlur, setFieldValue, values } = formik;
              const {
                type,
                birthDate,
                issuedDate,
                insuranceDate,
                workStartDate,
                workEndDate,
                appointmentDate,
                salaryChangeDate,
                contactDate,
                activeContactDate,
                contactRange,
                insuranceNoteDate,
              } = values;

              return (
                <Form className="px-6 text-left">
                  <div className="flex items-center justify-between h-10 border-b border-gray-200">
                    {/* -------------- Line 1 --------------- */}

                    <div className="w-1/5 flex items-center">
                      <span className="mr-4 text-primary-gray">Phân loại</span>
                      <div className="relative flex items-center">
                        <Field
                          type="text"
                          name="type"
                          className="relative w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3 pr-6 "
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                          onClick={() => setOpenOption(!openOption)}
                        />
                        {type && (
                          <img
                            src={CloseIcon}
                            alt="Delete"
                            className="absolute w-3 h-3 right-2 cursor-pointer"
                            onClick={() => setFieldValue("type", "")}
                          />
                        )}
                        {openOption && (
                          <div
                            ref={ref}
                            className="absolute top-7 w-64 h-80 text-sm bg-primary-light shadow-lg rounded border border-gray-200"
                          >
                            <div className="h-14 w-full flex items-center border-b border-gray-200">
                              <input
                                type="text"
                                className="pl-6 outline-none"
                                placeholder="Nhập nội dung"
                              />
                            </div>
                            <div>
                              <p className="h-14 w-full px-6 flex items-center cursor-pointer hover:bg-accent-light">
                                Chính thức
                              </p>
                              <p className="h-14 w-full px-6 flex items-center cursor-pointer hover:bg-accent-light">
                                Cộng tác viên
                              </p>
                              <p className="h-14 w-full px-6 flex items-center cursor-pointer hover:bg-accent-light">
                                Không xác định thời hạn
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="mr-4 text-primary-gray">Phòng ban</span>
                      <DropdownSearchable
                        placeholder="Phòng ban"
                        className="p-0 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        // maxHeightInput="max-h-8"
                        renderSelectedItem={(item) => (
                          <div className={"flex items-center"}>
                            <img alt={"tag icon"} src={TagIcon} />
                            <span>{item.text}</span>
                          </div>
                        )}
                        data={[
                          {
                            _id: 1,
                            content: "Trần Thanh Quang",
                          },
                          {
                            _id: 2,
                            content: "Trần Thanh Quang 2",
                          },
                          {
                            _id: 3,
                            content: "Trần Thanh Quang 3",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                      {/* <input
                        type="text"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                      /> */}
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">Chức vụ</span>
                      <input
                        type="text"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">Giới tính</span>
                      <input
                        type="text"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                      />
                    </div>
                  </div>

                  {/* -------------- Line 2 --------------- */}

                  <div className="flex items-center justify-between h-10 border-b border-gray-200">
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Tình trạng làm việc
                      </span>
                      <input
                        type="text"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Tình trạng nhân sự
                      </span>
                      <input
                        type="text"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Tình trạng SBH
                      </span>
                      <input
                        type="text"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Gia đình CS
                      </span>
                      <input
                        type="text"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                      />
                    </div>
                  </div>

                  {/* -------------- Line 3 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Loại hợp đồng
                      </span>
                      <input
                        type="text"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Số hợp đồng
                      </span>
                      <Field
                        type="text"
                        name="contactNumber"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Thông tin gia đình
                      </span>
                      <Field
                        type="text"
                        name="familyInfo"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Thông tin khác
                      </span>
                      <Field
                        type="text"
                        name="otherInfo"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 4 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">Họ và tên</span>
                      <Field
                        type="text"
                        name="fullName"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">Mã hiệu</span>
                      <Field
                        type="text"
                        name="humanCode"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">Điện thoại</span>
                      <Field
                        type="text"
                        name="phoneNumber"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">Email</span>
                      <Field
                        type="text"
                        name="email"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 5 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="mr-4 text-primary-gray">Ngày sinh</span>
                      <DayPickerInput
                        value={
                          birthDate && moment(birthDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) => setFieldValue("birthDate", day)}
                        inputProps={{
                          className:
                            "w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3",
                          placeholder: moment(Date.now())
                            .format("DD/MM/YYYY")
                            .toString(),
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Số định danh
                      </span>
                      <Field
                        type="text"
                        name="indentityCard"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 mr-4 text-primary-gray">
                        Ngày cấp
                      </span>
                      <DayPickerInput
                        value={
                          issuedDate && moment(issuedDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) => setFieldValue("issuedDate", day)}
                        inputProps={{
                          className:
                            "w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3",
                          placeholder: moment(Date.now())
                            .format("DD/MM/YYYY")
                            .toString(),
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">Nơi cấp</span>
                      <Field
                        type="text"
                        name="issuedBy"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 6 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="mr-4 text-primary-gray w-9">Nơi ở</span>
                      <Field
                        type="text"
                        name="address"
                        className="w-52 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 mr-4 text-primary-gray">
                        Thường trú
                      </span>
                      <Field
                        type="text"
                        name="resident"
                        className="w-52 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="mr-4 text-primary-gray">Nơi sinh</span>
                      <Field
                        type="text"
                        name="birthPlace"
                        className="w-52 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 mr-4 text-primary-gray">
                        Nguyên quán
                      </span>
                      <Field
                        type="text"
                        name="fromPlace"
                        className="w-52 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 7 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">MST</span>
                      <Field
                        type="text"
                        name="taxCode"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Số bảo hiểm
                      </span>
                      <Field
                        type="text"
                        name="insuranceNumber"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 mr-4 text-primary-gray">
                        Ngày nộp BH
                      </span>
                      <DayPickerInput
                        value={
                          insuranceDate &&
                          moment(insuranceDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("insuranceDate", day)
                        }
                        inputProps={{
                          className:
                            "w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3",
                          placeholder: moment(Date.now())
                            .format("DD/MM/YYYY")
                            .toString(),
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Hệ số lương
                      </span>
                      <Field
                        type="text"
                        name="salaryFactor"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 8 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">Phụ cấp</span>
                      <Field
                        type="text"
                        name="bonus"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Mức đóng BH
                      </span>
                      <Field
                        type="text"
                        name="salaryInsurance"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Người ký nhận
                      </span>
                      <Field
                        type="text"
                        name="signer"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <span className="mr-4 text-primary-gray">
                        Người ký sa thải
                      </span>
                      <Field
                        type="text"
                        name="fireSigner"
                        className="w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 9 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="w-8/12 mr-4 text-primary-gray">
                        Ngày bắt đầu làm việc
                      </span>
                      <DayPickerInput
                        value={
                          workStartDate &&
                          moment(workStartDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("workStartDate", day)
                        }
                        inputProps={{
                          className:
                            "w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3",
                          placeholder: moment(Date.now())
                            .format("DD/MM/YYYY")
                            .toString(),
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-5/12 mr-4 text-primary-gray">
                        Ngày chấm dứt
                      </span>
                      <DayPickerInput
                        value={
                          workEndDate &&
                          moment(workEndDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) => setFieldValue("workEndDate", day)}
                        inputProps={{
                          className:
                            "w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3",
                          placeholder: moment(Date.now())
                            .format("DD/MM/YYYY")
                            .toString(),
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-5/12 mr-4 text-primary-gray">
                        Ngày bổ nhiệm
                      </span>
                      <DayPickerInput
                        value={
                          appointmentDate &&
                          moment(appointmentDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("appointmentDate", day)
                        }
                        inputProps={{
                          className:
                            "w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3",
                          placeholder: moment(Date.now())
                            .format("DD/MM/YYYY")
                            .toString(),
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-5/12 mr-4 text-primary-gray">
                        Thay đổi lương
                      </span>
                      <DayPickerInput
                        value={
                          salaryChangeDate &&
                          moment(salaryChangeDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("salaryChangeDate", day)
                        }
                        inputProps={{
                          className:
                            "w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3",
                          placeholder: moment(Date.now())
                            .format("DD/MM/YYYY")
                            .toString(),
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 10 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="w-2/4 mr-4 text-primary-gray">
                        Ngày ký hợp đồng
                      </span>
                      <DayPickerInput
                        value={
                          contactDate &&
                          moment(contactDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) => setFieldValue("contactDate", day)}
                        inputProps={{
                          className:
                            "w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3",
                          placeholder: moment(Date.now())
                            .format("DD/MM/YYYY")
                            .toString(),
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-2/4 mr-4 text-primary-gray">
                        Ngày hiệu lực HĐ
                      </span>
                      <DayPickerInput
                        value={
                          activeContactDate &&
                          moment(activeContactDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("activeContactDate", day)
                        }
                        inputProps={{
                          className:
                            "w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3",
                          placeholder: moment(Date.now())
                            .format("DD/MM/YYYY")
                            .toString(),
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 mr-4 text-primary-gray">
                        Thời hạn HĐ
                      </span>
                      <DayPickerInput
                        value={
                          contactRange &&
                          moment(contactRange).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("contactRange", day)
                        }
                        inputProps={{
                          className:
                            "w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3",
                          placeholder: moment(Date.now())
                            .format("DD/MM/YYYY")
                            .toString(),
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-5/12 mr-4 text-primary-gray">
                        Ngày nộp sổ BH
                      </span>
                      <DayPickerInput
                        value={
                          insuranceNoteDate &&
                          moment(contactRange).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("insuranceNoteDate", day)
                        }
                        inputProps={{
                          className:
                            "w-32 h-6 border border-gray-200 rounded-xl outline-none pl-3",
                          placeholder: moment(Date.now())
                            .format("DD/MM/YYYY")
                            .toString(),
                        }}
                      />
                    </div>
                  </div>

                  <div className="absolute flex justify-end items-center bottom-0 -ml-6 px-6 h-12 w-full border-t border-gray-300 text-primary-light">
                    <button
                      type="submit"
                      className="bg-primary h-8 w-24 rounded-sm hover:opacity-90"
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
    </main>
  );
};

export default NewHumanModal;
