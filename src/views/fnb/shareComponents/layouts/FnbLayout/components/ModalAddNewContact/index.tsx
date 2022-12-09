/**
 * Libraries
 */
 import React, { ChangeEvent, FC, UIEvent, useEffect, useRef, useState } from "react";
 import { Form, Formik, Field, ErrorMessage } from "formik";
 import { useHistory } from 'react-router-dom';
 import { object, string } from "yup";
 import { toast } from "react-toastify";
 
 /**
  * Hooks, Typings
  */
 import { useModal } from "services/hooks/useModal";
 import { useContact } from 'services/hooks/items/useContact';
 
 /**
  * Components, Assets
  */
 import Close from "assets/icons/Close";
 
 interface InitialValues {
    type: number,
    name: string,
    phone: string,
    address: string,
    note: string,
 }
 
 type Props = {
     defaultValues?: any;
     onClosed?: any
 }

//  console.log('=============>>>>>>>>>>>>>>>>>>>>>>>')
 
 export const ModalAddNewContact: FC<Props> = ({ 
    defaultValues = {},
    onClosed
  }) => {

    const { closeModal } = useModal();

    const {  insertAsync, refetch } = useContact({ params: { keyword: "" }, isFetchList: false, isFetchInfo: false  });

    const handleSubmit = async (values: any) => {
        const query = {
            ...values,
            type: values.type.toString(),
            name: values.name,
            phone: values.phone,
            address: values.address,
            note: values.note,
        };
        const result = await insertAsync(query);
        if (!result.error) {
            onClosed();
            closeModal();
            toast.success('Tạo mới dữ liệu thành công');
        } else {
            toast.error(result?.data?.message);
        }
    };
 
    const addContactSchema = object().shape({
        name: string().required("Vui lòng nhập tên!"),
        phone: string().required("Vui lòng nhập điện thoại!"),
        address: string().required("Vui lòng nhập địa chỉ!"),
        note: string().required("Vui lòng nhập ghi chú!"),
    });

    const initialValues: InitialValues = {
        type: 2,
        name: "",
        phone: "",
        address: "",
        note: "" 
    };
 
     return (
         <>
             <div className={"flex flex-col"}>
                 <div className={"flex w-full py-3 px-6"}>
                     <h4 className={"flex-1 text-lg font-bold text-left"}>Tạo danh bạ</h4>
                     <div className={"flex items-center justify-center cursor-pointer"}>
                         <Close onClick={closeModal} />
                     </div>
                 </div>
                 {/* input select */}
                 <Formik
                     validationSchema={addContactSchema}
                     initialValues={initialValues}
                     onSubmit={handleSubmit}
                 >
                     {
                        formik => {
                            const { values, getFieldProps, setFieldValue } = formik;
                            return (
                                <Form>
                                    <div className={"t-add-new-task-dialog-select px-6 pb-4"}>
                                        <div className="flex gap-4 w-full">
                                            <div className="w-full ">
                                                <div className={" p-2 my-2"}>
                                                    <div className="mb-3">
                                                        <div className="ml-3 mb-3 text-primary-gray">Tên</div>
                                                        <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtName" placeholder="Nhập nội dung" {...getFieldProps('name')} />
                                                        <ErrorMessage
                                                            name="name"
                                                            component="span"
                                                            className="font-normal leading-7 text-sm text-negative"
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="ml-3 mb-3 text-primary-gray">Điện thoại</div>
                                                        <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtPhone" placeholder="Nhập nội dung" {...getFieldProps('phone')} />
                                                        <ErrorMessage
                                                            name="phone"
                                                            component="span"
                                                            className="font-normal leading-7 text-sm text-negative"
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="ml-3 mb-3 text-primary-gray">Địa chỉ</div>
                                                        <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtAddress" placeholder="Nhập nội dung" {...getFieldProps('address')} />
                                                        <ErrorMessage
                                                            name="address"
                                                            component="span"
                                                            className="font-normal leading-7 text-sm text-negative"
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="ml-3 mb-3 text-primary-gray">Ghi chú</div>
                                                        <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="txtNote" placeholder="Nhập nội dung" {...getFieldProps('note')} />
                                                        <ErrorMessage
                                                            name="note"
                                                            component="span"
                                                            className="font-normal leading-7 text-sm text-negative"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right" style={{ marginTop: "50px" }}>
                                            <button type="submit" className="btn btn-primary ml-auto">Xác nhận</button>
                                        </div>
                                    </div>
                                </Form>
                            );
                        }
                     }
                 </Formik>
             </div>
         </>
     );
     
 };