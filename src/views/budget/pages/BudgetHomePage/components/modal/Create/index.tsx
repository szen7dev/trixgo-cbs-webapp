/**
 * Libraries
 */
import { FC, FormEvent } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { object, string, mixed } from "yup";
import { toast } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";

/**
 * Components, Assets
 */
import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { DropdownSearchable } from 'shareComponents/common';

/**
 * Hooks
 */
import { useModal } from "services/hooks/useModal";
import { useBudget } from "services/hooks/budget/useBudget";

type Props = {
  onConfirm: () => void;
}

export const Create: FC<Props> = ({ onConfirm }) => {
  const { closeModal } = useModal();
  const { insertAsync } = useBudget({});

  const handleSubmit = async (values: any) => {
    try {
      const { error, data } = await insertAsync(values);

      if(error) {
        return toast.warn(data?.message);
      }

      closeModal();
      onConfirm();
      toast.success('Tạo thành công');
    } catch (error) {
      if(error instanceof Error)
        toast.error(error.message);
      if(typeof error === 'string')
        toast.error(error);
    }
  }

  const schemaValidation = object().shape({
    type: mixed().oneOf([1,2,3], 'Vui lòng chọn phân loại'),
    name: string().required("Vui lòng nhập tiêu đề"),
  });

  const initialValues = {
    type: -1,
    name: '',
    date: null,
  }

  return (
    <main className="relative py-5">
      <header className="px-10 py-5 flex items-center justify-between">
        <p className="font-bold text-xl">Tạo mới</p>
        <img
          src={CloseIcon}
          alt="Close"
          className="cursor-pointer"
          onClick={closeModal}
        />
      </header>

      <Formik 
        validationSchema={schemaValidation} 
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, handleBlur, handleChange, values }) => (
          <Form>
            {/* Phân loại */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Phân loại (*)</p>
              <DropdownSearchable
                onchangeValue={(value: any) => setFieldValue("type", value?.id)}
                onClearData={() => setFieldValue("type", "")}
                className={"w-full flex-1 border border-primary-border rounded"}
                placeholder="Phân loại"
                isMultiple={false}
                allowClearValueSingleInput={true}
                showTriangle={true}
                maxWidthInput="max-w-none"
                data={[
                  { value: 1, label: 'Ngân sách cho chiến dịch' },
                  { value: 2, label: 'Ngân sách cho dự án' },
                  { value: 3, label: 'Ngân sách cho hợp đồng' },
                ]}
                formatItem={{
                  id: "value",
                  text: "label",
                }}
                inlineSearch={true}
              />
              <ErrorMessage
                name="type"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Tiêu đề */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Tiêu đề (*)</p>
              <Field
                name="name"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Tiêu đề"
                onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Mã hiệu */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Mã hiệu</p>
              <Field
                name="sign"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Mã hiệu"
                onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
              />
              <ErrorMessage
                name="sign"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Mô tả */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Mô tả</p>
              <Field
                name="description"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Mô tả"
                onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Ngày tháng */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Ngày tháng</p>
              <DatePicker
                wrapperClassName={"w-auto"}
                selected={values.date}
                customInput={
                  <div className={"relative w-full min-h-fit"}>
                    <input
                      name="date"
                      placeholder="Ngày tháng"
                      autoComplete="off"
                      className="pl-3 border border-primary-border rounded h-[32px] outline-none"
                      value={
                        values.date
                          ? moment(values.date).format(
                              "DD/MM/YYYY"
                            )
                          : ""
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                }
                onChange={(date: Date | null) => setFieldValue("date", date)}
              />
              <ErrorMessage
                name="date"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Ghi chú */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Ghi chú</p>
              <Field
                name="note"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Ghi chú"
                onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
              />
              <ErrorMessage
                name="note"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Doanh thu */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Doanh thu</p>
              <Field
                type="number"
                name="revenue"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Doanh thu"
                onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
              />
              <ErrorMessage
                name="revenue"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Doanh thu VAT */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Doanh thu VAT</p>
              <Field
                type="number"
                name="vatRevenue"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Doanh thu VAT"
                onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
              />
              <ErrorMessage
                name="vatRevenue"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Dự báo doanh thu tới */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Dự báo doanh thu tới</p>
              <Field
                type="number"
                name="forecastRevenue"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Dự báo doanh thu tới"
                onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
              />
              <ErrorMessage
                name="forecastRevenue"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Dự báo doanh thu tới VAT */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Dự báo doanh thu tới VAT</p>
              <Field
                type="number"
                name="forecastVatRevenue"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Dự báo doanh thu tới VAT"
                onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
              />
              <ErrorMessage
                name="forecastVatRevenue"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Doanh thu thực tế */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Doanh thu thực tế</p>
              <Field
                type="number"
                name="finalRevenue"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Doanh thu thực tế"
                onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
              />
              <ErrorMessage
                name="finalRevenue"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Doanh thu thực tế VAT */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Doanh thu thực tế VAT</p>
              <Field
                type="number"
                name="finalVatRevenue"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Doanh thu thực tế VAT"
                onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
              />
              <ErrorMessage
                name="finalVatRevenue"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>

            <div className="w-full flex justify-end px-10 pt-4">
              <button type="submit" className="bg-primary text-primary-light text-base w-24 h-8 rounded">
                Xác nhận
              </button>
            </div>
          </Form>
        )}
      </Formik>

    </main>
  );
};