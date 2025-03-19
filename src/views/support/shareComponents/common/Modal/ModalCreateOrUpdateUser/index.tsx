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
    level: 1,
    departmentName: "",
    positionName: "",
    status: 1,
    phone: "",
    note: "",
    resetPass: "",
    startingTime: "",
    storageUse: 0,
  }
}) => {
  const [keywordDepartment, setKeywordDepartment] = useState('');
  const [keywordPosition, setKeywordPosition] = useState('');
  const { updateUserSystemAsync, createUserSystemAsync } = useUserSystem();

  const { listDepartments, fetchNextPageDepartments, hasNextPage: hasNextPageDepartments } = useQueryListDepartments({
    keyword: keywordDepartment,
    companyID: initialValues.companyID,
  }, !!initialValues.companyID);

  const { data: listPositions, fetchNextPage: fetchNextPagePosition, hasNextPage: hasNextPagePositions } = usePosition({
    companyID: initialValues.companyID,
    keyword: keywordPosition
  }, !!initialValues.companyID);

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
      status: +values.status,
      phone: values.phone,
      note: values.note,
      startingTime: values.startingTime,
      storageUse: values.storageUse,
      resetPass: values.resetPass,
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

    if(hasNextPageDepartments && isBottom) {
      fetchNextPageDepartments();
    }
  }

  const handleScrollPosition = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const isBottom = scrollHeight - scrollTop === clientHeight;

    if(hasNextPagePositions && isBottom) {
      fetchNextPagePosition();
    }
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
              <div className="flex items-center px-6 py-2 justify-between border-b border-secondary-gray border-opacity-30">
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
                <div className="mb-2">
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
                <div className="mb-2">
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

                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Điện thoại
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" placeholder="Điện thoại" {...getFieldProps('phone')} />
                  <ErrorMessage
                    name="phone"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resetPass">
                    Reset mật khẩu
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="resetPass" placeholder="Reset mật khẩu" {...getFieldProps('resetPass')} />
                  <ErrorMessage
                    name="resetPass"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startingTime">
                   Thời gian bắt đầu làm việc theo quy định (Giờ = TZ + 7 giờ)
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startingTime" type="string" placeholder="Thời gian bắt đầu làm việc theo quy định" {...getFieldProps('startingTime')} />
                  <ErrorMessage
                    name="startingTime"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storageUse">
                    Dung lượng đã dùng
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="storageUse" type="number" placeholder="Nhập dung lượng đã dùng" {...getFieldProps('storageUse')} />
                  <ErrorMessage
                    name="storageUse"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
                    Phòng ban
                  </label>
                  <DropdownSearchable
                    id="department"
                    className={"w-full pl-0 -mb-1 outline-none "}
                    bordered
                    isMultiple={false}
                    allowClearValueSingleInput
                    showTriangle
                    placeholder="Tìm kiếm phòng ban"
                    renderSelectedItem={(item) => (
                      <p
                        style={{
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                          minWidth: 0,
                          width: "150px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {item.text}
                      </p>
                    )}
                    data={listDepartments}
                    initialValue={{
                      _id: initialValues.departmentID,
                      name: initialValues.departmentName
                    }}
                    formatItem={{
                      id: "_id",
                      text: "name",
                    }}
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
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Chức danh
                  </label>

                  <DropdownSearchable
                    id="position"
                    className={"w-full pl-0 -mb-1 outline-none "}
                    bordered
                    isMultiple={false}
                    allowClearValueSingleInput
                    showTriangle
                    placeholder="Tìm kiếm chức danh"
                    renderSelectedItem={(item) => (
                      <p
                        style={{
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                          minWidth: 0,
                          width: "150px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {item.text}
                      </p>
                    )}
                    data={listPositions}
                    initialValue={{
                      _id: initialValues.positionID,
                      name: initialValues.positionName
                    }}
                    formatItem={{
                      id: "_id",
                      text: "name",
                    }}
                    onSearchInputChange={handleSearchPosition}
                    onScroll={handleScrollDepartment}
                    onchangeValue={(value: any) => setFieldValue("positionID", value._id)}
                    onClearData={() => setFieldValue("positionID", '')}
                  />
                  <ErrorMessage
                    name="positionID"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
                    Ghi chú
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="note" placeholder="Ghi chú" {...getFieldProps('note')} />
                  <ErrorMessage
                    name="note"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>

                <div className='mb-1'>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phân quyền
                  </label>
                  <div className={"w-full flex items-center border border-gray-100 rounded-md px-[14px] py-[8px] mb-[15px]"}>
                      <input
                        {...getFieldProps('level')}
                        value={0}
                        type="radio"
                        id="level-1"
                        name={"level"}
                        defaultChecked={initialValues.level === 0 ? true : false}
                        className={"form-check-input mt-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]"}
                      />
                      <label htmlFor="level-1" className={"text-left ml-3 mr-3 text-primary"}>Admin</label>
                      <input
                        {...getFieldProps('level')}
                        value={1}
                        type="radio"
                        id="level-2"
                        name={"level"}
                        defaultChecked={initialValues.level === 1 ? true : false}
                        className={"form-check-input mt-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]"}
                      />
                      <label htmlFor="level-2" className={"text-left ml-3 text-primary"}>Member</label>
                  </div>
                  <ErrorMessage
                    name="level"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>

                <div className='mb-1'>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Trạng thái
                  </label>
                  <div className={"w-full flex items-center border border-gray-100 rounded-md px-[14px] py-[8px] mb-[15px]"}>
                      <input
                        {...getFieldProps('status')}
                        value={1}
                        type="radio"
                        id="status-1"
                        name={"status"}
                        defaultChecked={initialValues.status === 1 ? true : false}
                        className={"form-check-input mt-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]"}
                      />
                      <label htmlFor="status-1" className={"text-left ml-3 mr-3 text-primary"}>Hoạt động</label>
                      <input
                        {...getFieldProps('status')}
                        value={0}
                        type="radio"
                        id="status-2"
                        name={"status"}
                        defaultChecked={initialValues.status === 0 ? true : false}
                        className={"form-check-input mt-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]"}
                      />
                      <label htmlFor="status-2" className={"text-left ml-3 text-primary"}>Khóa</label>
                  </div>
                  <ErrorMessage
                    name="status"
                    component="span"
                    className="font-normal leading-7 text-sm text-negative"
                  />
                </div>

                <div className="flex justify-end pt-2 px-6 pb-2 mb-0.5">
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