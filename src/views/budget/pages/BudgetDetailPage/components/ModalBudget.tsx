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
import { ModalContainer } from "shareComponents/common";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';

/**
 * Hooks
 */
import { useBudgetItem } from "services/hooks/budget/useBudgetItem";
import { useBudgetGroup } from "services/hooks/budget/useBudgetGroup";
import { useBudgetWork } from "services/hooks/budget/useBudgetWork";

const executeFunctionAsync = (key: string, funcs: Array<any>, body: any) => {
  const keys = [
    'create-budget-item',
    'update-budget-item',
    'create-budget-group',
    'update-budget-group',
    'create-budget-work',
    'update-budget-work',
  ];
  const index = keys.findIndex(k => k === key);
  return funcs[index](body);
}

type Props = {
  initValues?: any;
  isToggle: boolean;
  toggle: () => void;
  onConfirm: (modalType: string, payload: any) => void;
}

export const ModalBudget: FC<Props> = ({ initValues, isToggle, toggle, onConfirm }) => {
  const {
    insertAsync: insertBudgetItemAsync,
    updateAsync: updateBudgetItemAsync
  } = useBudgetItem({});

  const {
    insertAsync: insertBudgetGroupAsync,
    updateAsync: updateBudgetGroupAsync
  } = useBudgetGroup({});

  const {
    insertAsync: insertBudgetWorkAsync,
    updateAsync: updateBudgetWorkAsync
  } = useBudgetWork({});

  const dataSendToInsert = (values: any, initValues: any) => {
    const body: any = {
      name: values.name,
      sign: values.sign,
      unit: values.unit,
      quantity: values.quantity,
      unitPrice: values.unitPrice,
      forecastAmount: values.forecastAmount,
      forecastQuantity: values.forecastQuantity,
      note: values.note,
    }

    switch (initValues.modalType) {
      // INSERT/UPDATE BUDGET ITEM
      case 'create-budget-item':
        body.budgetID = initValues.budgetID;
        break;
      case 'update-budget-item':
        body.itemID = initValues._id;
        break;
      // INSERT/UPDATE BUDGET GROUP
      case 'create-budget-group':
        body.itemID = initValues.budgetItemID;
        break;
      case 'update-budget-group':
        body.groupID = initValues._id;
        break;
      // INSERT/UPDATE BUDGET WORK
      case 'create-budget-work':
        body.groupID = initValues.budgetGroupID;
        break;
      case 'update-budget-work':
        body.workID = initValues._id;
        break;
      default:
        break;
    }

    return body;
  }

  const handleSubmit = async (values: any) => {
    // console.log({ initValues, values, body: dataSendToInsert(values, initValues) })

    try {
      const body = dataSendToInsert(values, initValues);

      const { error, data } = await executeFunctionAsync(initValues.modalType, [
        insertBudgetItemAsync,
        updateBudgetItemAsync,
        insertBudgetGroupAsync,
        updateBudgetGroupAsync,
        insertBudgetWorkAsync,
        updateBudgetWorkAsync,
      ], body);

      if(error) {
        return toast.warn(data?.message, TOAST_DEFAULT_OPTIONS);
      }

      if(data.length) {
				return data.map((item: any) => toast.warn(item.message, TOAST_DEFAULT_OPTIONS));
			}

      if(initValues.modalType?.startsWith('create')) {
        toast.success('Tạo thành công', TOAST_DEFAULT_OPTIONS);
      } else{
        toast.success('Cập nhật thành công', TOAST_DEFAULT_OPTIONS);
      }

      toggle();
      onConfirm(initValues.modalType, data);
    } catch (error) {
      if(error instanceof Error)
        toast.error(error.message, TOAST_DEFAULT_OPTIONS);
      if(typeof error === 'string')
        toast.error(error, TOAST_DEFAULT_OPTIONS);
    }
  }

  const validationSchema = object().shape({
    name: string().required("Vui lòng nhập nội dung"),
  });

  return (
    <ModalContainer isModalOpen={isToggle} toggle={toggle}>
      <div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-md">
        <main className="mb-5">
          <header className="px-10 py-5 flex items-center w-full justify-between">
            <p className="font-bold text-xl">
              {initValues.modalType?.startsWith('create') ? 'Tạo mới' : 'Cập nhật'}
            </p>
            <img
              src={CloseIcon}
              alt="Close"
              className="cursor-pointer"
              onClick={toggle}
            />
          </header>

          <Formik
            validationSchema={validationSchema}
            initialValues={initValues}
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
                  <p className="text-xs mb-2">Ghi chú</p>
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
      </div>
    </ModalContainer>
  );
};