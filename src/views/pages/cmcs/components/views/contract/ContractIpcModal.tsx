import { FC, FormEvent, useCallback, useState } from "react";

import { Form, Formik } from "formik";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import CollapseHoriIcon from "assets/images/icon-collapse-hori.svg";
import CollapseVertiIcon from "assets/images/icon-collapse-verti.svg";
import DropdownSearchable from "components/common/DropdownSearch";

interface NewContractIPCModalProps {
  defaultValues?: any;
  onFinish: (values: any, isEdit: boolean) => Promise<boolean>;
  title?: string;
  idEdit?: string;
  isEdit?: boolean;
}

const ContractIpcModal: FC<NewContractIPCModalProps> = ({ defaultValues, onFinish, title, idEdit = '', isEdit = false }) => {
  const [openGeneralInfo, setOpenGeneralInfo] = useState(false);
  const [openRealizedOutput, setOpenRealizedOutput] = useState(false);
  const [openPaymentSatus, setOpenPaymentStatus] = useState(false);

  const { closeModal } = useModal();

  const initialValues = {
    classify: "",
    dateTime: "",
    content: "",
    code: "",
    description: "",
    valueAcceptanceBeforeVAT: "",
    valueOfVATPartAcceptance: "",
    acceptanceValueArisingBeforeVAT: "",
    acceptanceValueArisingFromVAT: "",
    retentionValue: "",
    advanceWithdrawal: "",
    otherDeductions: "",
    requestAdvancePayment: "",
  };

  const handleSubmit = useCallback(
    async (values: any) => {
      // let formatData = {
      //   ...values,
      // }

      // if (isEdit) {
      //   formatData = {
      //     ...values,
      //     contractID: detailContract._id
      //   }
      // }

      // const isSuccess = await onFinish(mappingData(formatData), isEdit);
      // if (isSuccess) {
      //   closeModal();
      // }
    },
    [onFinish, closeModal]
  );

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

      <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
        {(formik) => {
          const { handleBlur } = formik;

          return (
            <Form className="max-h-[690px] py-5 overflow-y-auto">
              <div>
                <div
                  className="flex items-center px-7 mb-4 cursor-pointer select-none"
                  onClick={() => setOpenGeneralInfo(!openGeneralInfo)}
                >
                  <div className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
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
                      <p className="text-primary text-xs mb-2">Phân loại (*)</p>
                      <DropdownSearchable
                        placeholder="Bên bán..."
                        className="w-2/5 pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Tạm ứng",
                          },
                          {
                            _id: 2,
                            content: "Tạm ứng",
                          },
                          {
                            _id: 3,
                            content: "Tạm ứng",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>

                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">
                        Ngày tháng (*)
                      </p>
                      <input
                        type="text"
                        name="dateTime"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Ngày tháng..."
                        defaultValue="15/12/2021"
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
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Nội dung..."
                        defaultValue="Tạm ứng cho hợp đồng (30%)"
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
                        defaultValue="CHG.THT.IPC-1508"
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
                <div
                  className="flex items-center cursor-pointer select-none"
                  onClick={() => setOpenRealizedOutput(!openRealizedOutput)}
                >
                  <div className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                    <img
                      src={
                        openRealizedOutput
                          ? CollapseVertiIcon
                          : CollapseHoriIcon
                      }
                      alt="Collapse"
                    />
                  </div>
                  <span className="text-xl font-bold">
                    Nghiệm thu hoàn thành (VND & USD)
                  </span>
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
                <div className="mb-8 h-full mx-7 w-2/3">
                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      1 - Giá trị nghiệm thu trước VAT
                    </p>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        name="valueAcceptanceBeforeVAT"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu trước VAT..."
                        defaultValue="200.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <input
                        type="text"
                        name="valueAcceptanceBeforeVAT"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu trước VAT..."
                        defaultValue="Nhập giá trị USD"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      2 - Giá trị nghiệm thu phần VAT
                    </p>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        name="productionPartVAT"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phần VAT..."
                        defaultValue="200.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <input
                        type="text"
                        name="productionPartVAT"
                        className="pl-3 cursor-not-allowed border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phần VAT..."
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
                      3 - Giá trị nghiệm thu phát sinh trước VAT
                    </p>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        name="outputArisingVAT"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh trước VAT..."
                        defaultValue="210.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <input
                        type="text"
                        name="outputArisingVAT"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh trước VAT..."
                        defaultValue="210.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      4 - Giá trị nghiệm thu phát sinh phần VAT
                    </p>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        name="productionOfVAT"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh phần VAT..."
                        defaultValue="1.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <input
                        type="text"
                        name="productionOfVAT"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh phần VAT..."
                        defaultValue="1.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      5 - Giá trị giữ lại
                    </p>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        name="productionOfVAT"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Giá trị giữ lại..."
                        defaultValue="80.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <input
                        type="text"
                        name="productionOfVAT"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Giá trị giữ lại..."
                        defaultValue="80.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      6 - Thu hồi tạm ứng
                    </p>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        name="productionOfVAT"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Thu hồi tạm ứng..."
                        defaultValue="50.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <input
                        type="text"
                        name="productionOfVAT"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Thu hồi tạm ứng..."
                        defaultValue="50.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      7 - Khấu trừ khác
                    </p>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        name="productionOfVAT"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Khấu trừ khác..."
                        defaultValue="20.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <input
                        type="text"
                        name="productionOfVAT"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Khấu trừ khác..."
                        defaultValue="20.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      8 - Đề nghị tạm ứng/thanh toán ((1+2+3+4)-(5+6+7))
                    </p>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        name="productionOfVAT"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Đề nghị tạm ứng/thanh toán..."
                        defaultValue="181.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <input
                        type="text"
                        name="productionOfVAT"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Đề nghị tạm ứng/thanh toán..."
                        defaultValue="181.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div
                  className="flex items-center px-7 mb-4 cursor-pointer select-none"
                  onClick={() => setOpenPaymentStatus(!openPaymentSatus)}
                >
                  <div className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                    <img
                      src={
                        openPaymentSatus ? CollapseVertiIcon : CollapseHoriIcon
                      }
                      alt="Collapse"
                    />
                  </div>
                  <span className="text-xl font-bold">
                    Tình trạng thanh toán
                  </span>
                </div>
                {openPaymentSatus && (
                  <div className="pb-4 h-full mx-7">
                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">
                        Thời hạn thanh toán theo hợp đồng
                      </p>
                      <input
                        type="text"
                        name="dateTime"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Thời hạn thanh toán theo hợp đồng..."
                        defaultValue="18/12/2021"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">
                        9 - Đã giải ngân
                      </p>
                      <input
                        type="text"
                        name="content"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Đã giải ngân..."
                        defaultValue="150.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">
                        10 - Còn lại chưa giải ngân (8-9)
                      </p>
                      <input
                        type="text"
                        name="description"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Còn lại chưa giải ngân..."
                        defaultValue="31.000.000"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
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

export default ContractIpcModal;
