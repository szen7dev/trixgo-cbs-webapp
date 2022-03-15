/**
 * Libraries
 */
import { FC, UIEvent, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { string, object, number } from 'yup';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';

/**
 * Components
 */
import { DropdownSearchable } from 'shareComponents/common';

/**
 * Types, Services
 */
import { ModalProps, UserSystemPayload } from 'typings/users/userSystem';
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import { useQueryListDepartments } from 'services/hooks/items/useDepartment';
import { usePosition } from 'services/hooks/items/usePosition';

export const ModalCreateOrUpdateUser: FC<ModalProps> = ({ 
  toggle, 
  modalType, 
  onConfirm, 
  initialValues = {
    userID: "",
    email: "",
    fullname: "",
    companyID: "",
    departmentID: "",
    positionID: "",
    level: -1,
    departmentName: "",
    positionName: "",
  }
}) => {
  const [keywordDepartment, setKeywordDepartment] = useState('');
  const [keywordPosition, setKeywordPosition] = useState('');
  const { updateUserSystemAsync, createUserSystemAsync } = useUserSystem();
  const { listDepartments, fetchNextPageDepartments } = useQueryListDepartments({ 
    keyword: keywordDepartment
  });
  const { data: listPositions, fetchNextPage: fetchNextPagePosition } = usePosition({ 
    isFetch: true,
    keyword: keywordPosition
  });

  const userSchema = object().shape({
    email: string().email('Email không hợp lệ').required("Bạn cần nhập email"),
    fullname: string().required("Bạn cần nhập họ và tên"),
    departmentID: string().required("Bạn cần chọn phòng ban cho người dùng"),
    positionID: string().required("Bạn cần chọn chức danh cho người dùng"),
    level: number().required("Bạn cần chọn phân quyền")
  });

  const handleSubmit = async (values: UserSystemPayload) => {

    const dataCreateOrUpdate: UserSystemPayload = {
      companyID: initialValues.companyID,
      userID: values.userID,
      departmentID: values.departmentID,
      positionID: values.positionID,
      email: values.email,
      fullname: values.fullname,
      level: +values.level,
    }

    try {
      // Handle api here!
      switch (modalType) {
        case 'create': {
          const { error, message } = await createUserSystemAsync(dataCreateOrUpdate);

          if (error) {
            return toast.warning(message);
          }

          toast.success('Tạo người dùng thành công');
          break;
        }
        case 'update': {
          const { error, message } = await updateUserSystemAsync(dataCreateOrUpdate);

          if (error) {
            return toast.warning(message);
          }

          toast.success('Cập nhật người dùng thành công');
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

  const handleScrollDepartment = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isBottom = scrollHeight - scrollTop === clientHeight;
    isBottom && fetchNextPageDepartments();
  }

  const handleScrollPosition = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isBottom = scrollHeight - scrollTop === clientHeight;
    isBottom && fetchNextPagePosition();
  }

  const handleSearchDepartment = debounce((value) => setKeywordDepartment(value), 500);
  const handleSearchPosition = debounce((value) => setKeywordPosition(value), 500);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
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
                  {values.userID ? 'Cập nhật' : 'Tạo mới'}
                </Dialog.Title>
                <button className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl" type="button" onClick={toggle}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-6 mt-2 pt-3.5 flex-1 flex flex-col">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                    Họ và tên
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" placeholder="Nhập họ và tên" {...getFieldProps('fullname')} />
                  <ErrorMessage
                    name="fullname"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" placeholder="Nhập email" {...getFieldProps('email')} />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
                    Phòng ban
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
                    data={listDepartments}
                    formatItem={{
                      id: "_id",
                      text: "name",
                    }}
                    initialValue={{ 
                      _id: initialValues.departmentID, 
                      name: initialValues.departmentName
                    }}
                    inlineSearch={true}
                    onSearchInputChange={handleSearchDepartment}
                    onScroll={handleScrollDepartment}
                    onchangeValue={(value: any) => setFieldValue("departmentID", value._id)}
                    onClearData={() => setFieldValue("departmentID", '')}
                  />
                  <ErrorMessage
                    name="departmentID"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
                    Chức danh
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
                    data={listPositions}
                    formatItem={{
                      id: "_id",
                      text: "name",
                    }}
                    initialValue={{ 
                      _id: initialValues.positionID, 
                      name: initialValues.positionName,
                    }}
                    inlineSearch={true}
                    onSearchInputChange={handleSearchPosition}
                    onScroll={handleScrollPosition}
                    onchangeValue={(value: any) => setFieldValue("positionID", value._id)}
                    onClearData={() => setFieldValue("positionID", '')}
                  />
                  <ErrorMessage
                    name="positionID"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                <div className='mb-4'>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
                    Phân quyền
                  </label>
                  <div className={"w-full flex items-center border border-gray-100 rounded-md px-[14px] py-[8px] mb-[15px]"}>
                      <input
                        {...getFieldProps('level')}
                        value={0} 
                        type="radio" 
                        id="option-1" 
                        name={"level"} 
                        defaultChecked={initialValues.level === 0 ? true : false}
                        className={"form-check-input mt-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]"}
                      />
                      <label htmlFor="option-1" className={"text-left ml-3 mr-3 text-primary"}>Admin</label>
                      <input
                        {...getFieldProps('level')}
                        value={1} 
                        type="radio" 
                        id="option-2" 
                        name={"level"} 
                        defaultChecked={initialValues.level === 1 ? true : false}
                        className={"form-check-input mt-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]"}
                      />
                      <label htmlFor="option-2" className={"text-left ml-3 text-primary"}>Member</label>
                  </div>
                  <ErrorMessage
                    name="level"
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