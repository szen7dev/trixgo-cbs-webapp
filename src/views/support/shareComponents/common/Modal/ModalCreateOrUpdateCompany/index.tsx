/**
 * Libraries
 */
import { UIEvent, FC, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { string, object } from 'yup';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';

/**
 * Assets, Components
 */
import { DropdownSearchable } from "shareComponents/common";

/**
 * Types, Services
 */
import { ModalProps } from 'typings/items/area';
import { CompanyPayload } from 'typings/companies';
import { useAuth } from 'services/hooks/useAuth';
import { useArea } from "services/hooks/items/useArea";
import { useCompany } from 'services/hooks/useCompanies';

export const ModalCreateOrUpdateCompany: FC<ModalProps> = ({ toggle, modalType, onConfirm, initialValues = {
  companyID: "",
  name: "",
  sign: "",
  taxid: "",
  address: "",
  area: "",
  phone: "",
  email: "",
} }) => {
  const { user } = useAuth();
  const [keywordArea, setKeywordArea] = useState('');
  const { listAreas, nextPageList: nextPageListArea } = useArea({
    params: {
      keyword: keywordArea
    },
    isFetchAreas: true
  });
  const { createCompanyAsync, updateCompanyAsync } = useCompany();

  const companySchema = object().shape({
    name: string().required("Bạn cần nhập tên cho công ty"),
    sign: string().required("Bạn cần nhập mã hiệu cho công ty"),
    taxid: string().required("Bạn cần nhập mã số thuế của công ty"),
    address: string().required("Bạn cần nhập địa chỉ của công ty"),
    area: string().required("Bạn cần chọn khu vực của công ty"),
    email: string().email('Email không hợp lệ'),
  });

  const handleSubmit = async (values: CompanyPayload) => {
    try {
      const dataCreateOrUpdate: CompanyPayload = {
        companyID: values.companyID,
        name: values.name,
        sign: values.sign,
        taxid: values.taxid,
        area: values.area,
        address: values.address,
        email: values.email,
        phone: values.phone,
      }

      // Handle api here!
      switch (modalType) {
        case 'create': {
          const { error, message } = await createCompanyAsync(dataCreateOrUpdate);

          if (error) {
            return toast.warning(message);
          }

          toast.success('Tạo công ty thành công');
          break;
        }
        case 'update': {
          const { error, message } = await updateCompanyAsync(dataCreateOrUpdate);
          if (error) {
            return toast.warning(message);
          }

          toast.success('Cập nhật công ty thành công');
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

    onConfirm && onConfirm();
    toggle();
    return [values];
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;
    bottom && nextPageListArea();
  }

  const handleSearchArea = debounce((value) => setKeywordArea(value), 500);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={companySchema}
      onSubmit={handleSubmit}
    >
      {
        formik => {
          const { values, getFieldProps, setFieldValue } = formik;
          return (
            <Form autoComplete="off">
              <div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-bold"
                >
                  Tạo mới/Cập nhật
                </Dialog.Title>
                <button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" type="button" onClick={() => toggle()}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-6 mt-2 pt-3.5 flex-1 flex flex-col">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtCompanyName">
                    Tên
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtCompanyName" placeholder="Nhập tên" {...getFieldProps('name')} />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtSign">
                    Mã hiệu
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtSign" placeholder="Nhập mã hiệu" {...getFieldProps('sign')} />
                  <ErrorMessage
                    name="sign"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtTaxID">
                    Mã số thuế
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtTaxID" placeholder="Nhập mã số thuế" {...getFieldProps('taxid')} />
                  <ErrorMessage
                    name="taxid"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtAddress">
                    Địa chỉ công ty
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtAddress" placeholder="Nhập địa chỉ" {...getFieldProps('address')} />
                  <ErrorMessage
                    name="address"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>

                <div className='mb-4'>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Khu vực công ty
                  </label>
                  <DropdownSearchable
                    placeholder="Tìm kiếm"
                    className="border border-primary-border rounded"
                    classNameInput="h-[36px]"
                    isMultiple={false}
                    allowClearValueSingleInput={false}
                    showTriangle={true}
                    maxWidthInput="max-w-none"
                    renderSelectedItem={(item: any) => <span>{item.text}</span>}
                    classNameItem="p-0"
                    data={listAreas}
                    formatItem={{
                      id: "_id",
                      text: "name",
                    }}
                    initialValue={{ 
                      _id: initialValues.area, 
                      name: initialValues.areaName
                    }}
                    inlineSearch={true}
                    onSearchInputChange={handleSearchArea}
                    onScroll={handleScroll}
                    onchangeValue={(value: any) => setFieldValue("area", value._id)}
                    onClearData={() => setFieldValue("area", '')}
                  />
                  <ErrorMessage
                    name="area"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtPhone">
                    Số điện thoại
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtPhone" placeholder="Nhập số điện thoại" {...getFieldProps('phone')} />
                  <ErrorMessage
                    name="phone"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txtEmail">
                    Email
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtEmail" placeholder="Nhập email" {...getFieldProps('email')} />
                  <ErrorMessage
                    name="email"
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