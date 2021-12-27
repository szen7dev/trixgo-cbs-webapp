import { FC, FormEvent, useState } from "react";

import { Form, Formik } from "formik";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import CollapseHoriIcon from "assets/images/icon-collapse-hori.svg";
import CollapseVertiIcon from "assets/images/icon-collapse-verti.svg";

const ContractProduceModal: FC = () => {
  const [openGeneralInfo, setOpenGeneralInfo] = useState(false);
  const [openRealizedOutput, setOpenRealizedOutput] = useState(false);

  const { closeModal } = useModal();

  const initialValues = {
    dateTime: "",
    content: "",
    code: "",
    description: "",
    outputBeforeVAT: "",
    productionPartVAT: "",
    outputArisingVAT: "",
    productionOfVAT: "",
  };

  return (
    <main className="relative h-full">
      <header className="flex items-center justify-between px-3 h-[50px] bg-cbs-table-header">
        <p className="text-xl font-bold">Tạo mới/cập nhật</p>
        <img
          src={CloseIcon}
          alt="Close"
          className="cursor-pointer"
          onClick={() => closeModal()}
        />
      </header>

      <Formik initialValues={initialValues} onSubmit={() => closeModal()}>
        {(formik) => {
          const { handleBlur } = formik;

          return (
            <Form className="max-h-[690px] py-5 overflow-y-auto">
              <div>
                <div className="flex items-center px-7 mb-4">
                  <div
                    className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3 cursor-pointer select-none"
                    onClick={() => setOpenGeneralInfo(!openGeneralInfo)}
                  >
                    <img
                      src={
                        openGeneralInfo ? CollapseVertiIcon : CollapseHoriIcon
                      }
                      alt="Collapse"
                    />
                  </div>
                  <span className="text-xl font-bold">Thông tin chung</span>
                </div>
                {openGeneralInfo && (
                  <div className="pb-4 h-full mx-7">
                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">
                        Ngày tháng (*)
                      </p>
                      <input
                        type="text"
                        name="dateTime"
                        className="pl-3 cursor-not-allowed border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Ngày tháng..."
                        defaultValue="15/12/2021"
                        disabled
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">
                        Nội dung (*)
                      </p>
                      <input
                        type="text"
                        name="content"
                        className="pl-3 cursor-not-allowed border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Nội dung..."
                        defaultValue="Tạm ứng cho hợp đồng (30%)"
                        disabled
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <p className="text-primary text-xs mb-2">Mã hiệu</p>
                      <input
                        type="text"
                        name="code"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Mã hiệu..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">Mô tả</p>
                      <input
                        type="text"
                        name="description"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Mô tả..."
                        disabled
                        defaultValue="Đệ trình phê duyệt Hồ sơ thanh toán Đợt 6 PGI-PMI Dự án CHG"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mx-7 mb-4 w-2/3 flex justify-between gap-x-2">
                <div className="flex items-center">
                  <div
                    className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3 cursor-pointer select-none"
                    onClick={() => setOpenRealizedOutput(!openRealizedOutput)}
                  >
                    <img
                      src={
                        openRealizedOutput
                          ? CollapseVertiIcon
                          : CollapseHoriIcon
                      }
                      alt="Collapse"
                    />
                  </div>
                  <span className="text-xl font-bold">Sản lượng thực hiện</span>
                </div>
                {openRealizedOutput && (
                  <div className="flex items-center justify-end">
                    <div className="flex items-center">
                      <p className="text-primary-gray text-xs mr-5">
                        Tỷ giá USD
                      </p>
                      <input
                        type="text"
                        defaultValue="23.010"
                        className="w-[66px] h-8 outline-none text-right border-b border-primary-border text-primary"
                      />
                    </div>
                  </div>
                )}
              </div>
              {openRealizedOutput && (
                <div className="pb-9 mb-7 h-full mx-7 w-2/3">
                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      1 - Sản lượng trước VAT
                    </p>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        name="outputBeforeVAT"
                        className="pl-3 cursor-not-allowed border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        defaultValue="200.000.000"
                        disabled
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <input
                        type="text"
                        name="outputBeforeVAT"
                        className="pl-3 cursor-not-allowed border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        defaultValue="Nhập giá trị USD"
                        disabled
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      2 - Sản lượng phần VAT
                    </p>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        name="productionPartVAT"
                        className="pl-3 cursor-not-allowed border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        defaultValue="200.000.000"
                        disabled
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <input
                        type="text"
                        name="productionPartVAT"
                        className="pl-3 cursor-not-allowed border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        defaultValue="200.000.000"
                        disabled
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      3 - Sản lượng phát sinh trước VAT
                    </p>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        name="outputArisingVAT"
                        className="pl-3 cursor-not-allowed border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        defaultValue="200.000.000"
                        disabled
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <input
                        type="text"
                        name="outputArisingVAT"
                        className="pl-3 cursor-not-allowed border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        defaultValue="200.000.000"
                        disabled
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      4 - Sản lượng phát sinh phần VAT
                    </p>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        name="productionOfVAT"
                        className="pl-3 cursor-not-allowed border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Sản lượng phát sinh phần VAT..."
                        defaultValue="1.000.000"
                        disabled
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <input
                        type="text"
                        name="productionOfVAT"
                        className="pl-3 cursor-not-allowed border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Sản lượng phát sinh phần VAT..."
                        defaultValue="1.000.000"
                        disabled
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
              <footer className="absolute -pl-6 bottom-0 h-[60px] w-full border-t border-primary-border flex items-center justify-end">
                <button
                  type="submit"
                  className="text-primary-light bg-primary w-24 h-8 mr-8 rounded"
                >
                  Xác nhận
                </button>
              </footer>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
};

export default ContractProduceModal;
