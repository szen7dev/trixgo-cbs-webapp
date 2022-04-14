/**
 * Libraries
 */
import { FC } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";

/**
 * Components, Assets
 */
import CloseIcon from "assets/images/icon-small-bold-close.svg";

/**
 * Hooks
 */
import { useModal } from "services/hooks/useModal";
import { useBudgetItem } from "services/hooks/budget/useBudgetItem";

type Props = {
  budgetID: string;
  onConfirm: () => void;
}

export const CreateBudget: FC<Props> = ({ budgetID, onConfirm }) => {
  const { closeModal } = useModal();
  const { insertAsync } = useBudgetItem({});

  const handleSubmit = async (values: any) => {
    try {
      const { error, data } = await insertAsync({
        budgetID,
        ...values
      });

      if(error) {
        return toast.warn(data?.message);
      }

      if(data.length) {
				return data.map((item: any) => toast.warn(item.message));
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
    name: string().required("Vui lòng nhập nội dung"),
  });

  const initialValues = {
    name: '',
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
        {({ handleBlur }) => (
          <Form>
            {/* Nội dung */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Nội dung (*)</p>
              <Field
                name="name"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Nội dung"
                onBlur={handleBlur}
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
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="sign"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Đơn vị tính */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Đơn vị tính</p>
              <Field
                name="unit"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Đơn vị tính"
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="unit"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Khối lượng */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Khối lượng</p>
              <Field
                name="quantity"
                type="number"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Khối lượng"
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Đơn giá */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Đơn giá</p>
              <Field
                name="unitPrice"
                type="number"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Đơn giá"
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="unitPrice"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Dự kiến khối lượng khi hoàn tất */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Dự kiến khối lượng khi hoàn tất</p>
              <Field
                type="number"
                name="forecastQuantity"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Dự kiến khối lượng khi hoàn tất"
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="forecastQuantity"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Dự kiến đơn giá khi hoàn tất */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Dự kiến đơn giá khi hoàn tất</p>
              <Field
                type="number"
                name="forecastAmount"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Dự kiến đơn giá khi hoàn tất"
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="forecastAmount"
                component="div"
                className="font-normal text-xs text-negative mt-2"
              />
            </div>
            {/* Nhập ghi chú */}
            <div className="px-10 py-2">
              <p className="text-xs mb-2">Nhập ghi chú</p>
              <Field
                name="note"
                className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                placeholder="Nhập ghi chú"
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="note"
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