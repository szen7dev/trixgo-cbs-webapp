import { FC, useState } from "react";

import { Field, Form, Formik } from "formik";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import CollapseIcon from "assets/images/icon-collapse.svg";
import DropdownSearchable from "components/common/DropdownSearch";

const IncomeFormModal: FC = () => {
  const [openManagementInfo, setOpenManagementInfo] = useState(false);
  const [openGeneralInfo, setOpenGeneralInfo] = useState(false);
  const [openAcceptancePayment, setOpenAcceptancePayment] = useState(false);
  const [openBudget, setOpenBudget] = useState(false);
  const [openGuarantee, setOpenGuarantee] = useState(false);

  const { closeModal } = useModal();

  const initialValues = {
    project: "",
    officialClassification: "",
  };

  console.log(openManagementInfo);

  return (
    <main>
      <header className="flex items-center justify-between px-3 h-[50px] bg-cbs-table-header">
        <p className="text-xl font-bold">Tạo mới/cập nhật</p>
        <img
          src={CloseIcon}
          alt="Close"
          className="cursor-pointer"
          onClick={() => closeModal()}
        />
      </header>

      <Formik
        initialValues={initialValues}
        onSubmit={() => console.log("asdasd")}
      >
        {(formik) => {
          const { handleBlur } = formik;

          return (
            <Form className="text-left px-7 py-5">
              <div>
                <div className="flex items-center">
                  <button
                    className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3"
                    onClick={() => setOpenManagementInfo(!openManagementInfo)}
                  >
                    <img src={CollapseIcon} alt="Collapse" />
                  </button>
                  <span className="text-xl font-bold">
                    Thông tin quản trị và phân loại
                  </span>
                </div>
                {openManagementInfo && (
                  <div className="grid grid-cols-2 gap-x-11 gap-y-5 mt-2">
                    <div>
                      <p className="text-xs text-primary-gray">
                        Thuộc dự án (*)
                      </p>
                      <DropdownSearchable
                        placeholder="Thuộc dự án..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[30px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Chính thức",
                          },
                          {
                            _id: 2,
                            content: "Cộng tác viên",
                          },
                          {
                            _id: 3,
                            content: "Không xác định thời hạn",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div>
                      <p>Phân loại khác (*)</p>
                      <DropdownSearchable
                        placeholder="Phân loại..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Chính thức",
                          },
                          {
                            _id: 2,
                            content: "Cộng tác viên",
                          },
                          {
                            _id: 3,
                            content: "Không xác định thời hạn",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div>
                      <p>Phân loại chính thức (*)</p>
                      <DropdownSearchable
                        placeholder="Phân loại..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Chính thức",
                          },
                          {
                            _id: 2,
                            content: "Cộng tác viên",
                          },
                          {
                            _id: 3,
                            content: "Không xác định thời hạn",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div>
                      <p>Phân loại theo lĩnh vực (*)</p>
                      <DropdownSearchable
                        placeholder="Phân loại..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Chính thức",
                          },
                          {
                            _id: 2,
                            content: "Cộng tác viên",
                          },
                          {
                            _id: 3,
                            content: "Không xác định thời hạn",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div>
                      <p>Thuộc dự án (*)</p>
                      <DropdownSearchable
                        placeholder="Phân loại..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Chính thức",
                          },
                          {
                            _id: 2,
                            content: "Cộng tác viên",
                          },
                          {
                            _id: 3,
                            content: "Không xác định thời hạn",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div>
                      <p>Thuộc dự án (*)</p>
                      <DropdownSearchable
                        placeholder="Phân loại..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Chính thức",
                          },
                          {
                            _id: 2,
                            content: "Cộng tác viên",
                          },
                          {
                            _id: 3,
                            content: "Không xác định thời hạn",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div>
                      <p>Thuộc dự án (*)</p>
                      <DropdownSearchable
                        placeholder="Phân loại..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Chính thức",
                          },
                          {
                            _id: 2,
                            content: "Cộng tác viên",
                          },
                          {
                            _id: 3,
                            content: "Không xác định thời hạn",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div>
                      <p>Thuộc dự án (*)</p>
                      <DropdownSearchable
                        placeholder="Phân loại..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Chính thức",
                          },
                          {
                            _id: 2,
                            content: "Cộng tác viên",
                          },
                          {
                            _id: 3,
                            content: "Không xác định thời hạn",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div>
                      <p>Thuộc dự án (*)</p>
                      <DropdownSearchable
                        placeholder="Phân loại..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Chính thức",
                          },
                          {
                            _id: 2,
                            content: "Cộng tác viên",
                          },
                          {
                            _id: 3,
                            content: "Không xác định thời hạn",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div>
                      <p>Thuộc dự án (*)</p>
                      <DropdownSearchable
                        placeholder="Phân loại..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Chính thức",
                          },
                          {
                            _id: 2,
                            content: "Cộng tác viên",
                          },
                          {
                            _id: 3,
                            content: "Không xác định thời hạn",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <button className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                  <img src={CollapseIcon} alt="Collapse" />
                </button>
                <span className="text-xl font-bold">Thông tin chung</span>
              </div>

              <div className="flex items-center">
                <button className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                  <img src={CollapseIcon} alt="Collapse" />
                </button>
                <span className="text-xl font-bold">
                  Nghiệm thu và thanh toán
                </span>
              </div>

              <div className="flex items-center">
                <button className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                  <img src={CollapseIcon} alt="Collapse" />
                </button>
                <span className="text-xl font-bold">Ngân sách</span>
              </div>

              <div className="flex items-center">
                <button className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                  <img src={CollapseIcon} alt="Collapse" />
                </button>
                <span className="text-xl font-bold">Bảo lãnh</span>
              </div>
            </Form>
          );
        }}
      </Formik>

      <footer className="h-[60px] w-full border-t border-primary-border absolute bottom-0 flex items-center justify-end">
        <button className="text-primary-light bg-primary w-24 h-8 mr-8 rounded">
          Xác nhận
        </button>
      </footer>
    </main>
  );
};

export default IncomeFormModal;
