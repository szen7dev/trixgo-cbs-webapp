/**
 * Libraries
 */
import { FC } from 'react';
import { Dialog } from '@headlessui/react';
import DayPickerInput from "react-day-picker/DayPickerInput";
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { string, object, number } from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';

/**
 * Types, Services
 */
import { ModalProps, AppCompanyPayload } from 'typings/apps/appCompany';
import { useAppCompany } from 'services/hooks/apps/useAppCompany';

export const ModalCreateOrUpdateAppCompany: FC<ModalProps> = ({ toggle, modalType, onConfirm, initialValues = {
  appCompanyID: "",
  company: "",
  app: "",
  maxCount: 0,
  maxData: 0,
  startTime: "",
  endTime: "",
} }) => {
  const { createAppCompanyAsync, updateAppCompanyAsync } = useAppCompany();

  const appCompanySchema = object().shape({
    maxCount: number().required("Bạn cần nhập hạn mức tài khoản"),
    maxData: number().required("Bạn cần nhập hạn mức dung lượng"),
    startTime: string().required("Bạn cần nhập ngày bắt đầu"),
    endTime: string().required("Bạn cần nhập ngày kết thúc")
  });

  const handleSubmit = async (values: AppCompanyPayload) => {
    let dataResponse: any = values;

    try {
      // Handle api here!
      switch (modalType) {
        case 'create': {
          const { error, data, message } = await createAppCompanyAsync(values);

          if (error) {
            return toast.warning(message);
          }

          dataResponse = data;
          toast.success('Tạo app thành công');
          break;
        }
        case 'update': {
          const { error, data, message } = await updateAppCompanyAsync(values);

          if (error) {
            return toast.warning(message);
          }

          dataResponse = data;
          toast.success('Cập nhật app thành công');
          break;
        }
        default:
          break;
      }
    } catch (error: unknown) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    onConfirm && onConfirm(dataResponse);
    toggle();
    return [values];
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={appCompanySchema}
      onSubmit={handleSubmit}
    >
      {
        formik => {
          const { getFieldProps, setFieldValue, values } = formik;
          return (
            <Form autoComplete="off">
              <div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-bold"
                >
                  {values.appCompanyID ? 'Cập nhật' : 'Tạo mới'}
                </Dialog.Title>
                <button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" type="button" onClick={toggle}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-6 mt-2 pt-3.5 flex-1 flex flex-col">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxCount">
                    Hạn mức tài khoản
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="maxCount" placeholder="Nhập hạn mức" {...getFieldProps('maxCount')} />
                  <ErrorMessage
                    name="maxCount"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxData">
                    Hạn mức dung lượng
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="maxData" placeholder="Nhập dung lượng" {...getFieldProps('maxData')} />
                  <ErrorMessage
                    name="maxData"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
                    Ngày bắt đầu sử dụng
                  </label>
                  <DayPickerInput
                      value={values.startTime && moment(values.startTime).format("DD/MM/YYYY")}
                      onDayChange={(day) => setFieldValue("startTime", moment(day).format("MM/DD/YYYY"))}
                      inputProps={{
                        className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                        placeholder: "Nhập ngày bắt đầu",
                        readOnly: true,
                      }}
											style={{ width: "100%" }}
                    />
                  {/* <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startTime" placeholder="Nhập ngày bắt đầu" {...getFieldProps('startTime')} /> */}
                  <ErrorMessage
                    name="startTime"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
                    Thời hạn sử dụng
                  </label>
                  <DayPickerInput
                      value={values.endTime && moment(values.endTime).format("DD/MM/YYYY")}
                      onDayChange={(day) => setFieldValue("endTime", moment(day).format("MM/DD/YYYY"))}
                      inputProps={{
                        className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                        placeholder: "Nhập ngày kết thúc",
                        readOnly: true,
                      }}
											style={{ width: "100%" }}
										/>
                  {/* <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endTime" placeholder="Nhập ngày kết thúc" {...getFieldProps('endTime')} /> */}
                  <ErrorMessage
                    name="endTime"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>

                <div className="flex justify-end pt-5 px-6 pb-6 mb-0.5">
                  <div>
                    <button type="submit" className="px-7 py-3.5 rounded-md bg-primary text-white font-bold text-sm leading-4">Xác nhận</button>
                  </div>
                </div>
              </div>
            </Form>
          )
        }
      }
    </Formik>
  )
}