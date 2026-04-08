import React, { FC, useEffect, useState } from "react";
// import { useHistory, useParams, useNavigate, useLocation  } from "react-router-dom";
import { useHistory, useLocation } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field } from "formik";
import { toast } from "react-toastify";
import { useModal } from "services/hooks/useModal";
import Close from "assets/icons/Close";
import API from "apis/repository";

type Props = {
    defaultValues?: any;
    recordSelected?: any;
    refetch: () => void; // Hàm để làm mới dữ liệu
}

export const ModalKpiUpdateItem: FC<Props> = ({ 
    defaultValues, 
    refetch, 
}) => {
    const { closeModal } = useModal()
    const initialValues = {
        ...defaultValues,
    }

    const onSubmitFilterData = async (values: any) => {
        try {
            const dataUpdate = {
                ...values, // giải nén toàn bộ các biến ở Form
                orderMistakeID: `${defaultValues?.mistakeID}`,
                amount: Number(values.amount),
                bonus: Number(values.bonus),
                status: Number(values.status),
            }

            const { data, status } = await API.put(
                `/api/fnb/mistakes`,
                dataUpdate,
            );

            if (status !== 200 || data.error) {
                return toast.warning(data?.data?.message);
            }

            toast.success('Cập nhật thành công');
            closeModal();
            
            // Gọi hàm refetch để làm mới dữ liệu
            refetch();
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            closeModal(); // Khi chạy hàm này -> Rerender lại trang -> mất kết nối socket
        }
    }

    return (
        <>
            <div className={"flex flex-col"}>

                <div className={"flex w-full py-3 px-6 border-b"}>
                    <h4 className={"flex-1 text-lg font-bold text-left"}>Chi tiết {defaultValues?.mistakeID}</h4>
                    <div className={"flex items-center justify-center cursor-pointer"}>
                        <Close onClick={closeModal} />
                    </div>
                </div>
                {/* input select */}
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmitFilterData}
                >
                    {(formik) => {
                        const { setFieldValue, getFieldProps, values } = formik;
                        return (
                            <Form>
                                <div className={"t-add-new-task-dialog-select px-6 pb-4"}>
                                    <div className="flex gap-4 w-full">
                                        <div className="w-full ">
                                            <div className={"my-3"}>
                                                <div className={"flex py-2"}>
                                                    <div className={"w-full flex items-center"}>
                                                        <div className={"h-full text-left flex items-center px-1 "}>
                                                            <span className="text-primary-gray font-bold pr-3">Thời gian ghi nhận</span>
                                                            <Field type="text" name="date" placeholder="Định dạng YYYY-MM-DD"
                                                                className="w-[200px] h-[30px] border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"flex py-2"}>
                                                    <div className={"w-full flex items-center"}>
                                                        <div className={"h-full text-left flex items-center px-1 "}>
                                                            <span className="text-primary-gray font-bold pr-3">Điểm vi phạm (chỉ Admin được sửa)</span>
                                                            <Field type="number" name="amount" placeholder=""
                                                                className="w-[200px] h-[30px] border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none text-right"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"flex py-2"}>
                                                    <div className={"w-full flex items-center"}>
                                                        <div className={"h-full text-left flex items-center px-1 "}>
                                                            <span className="text-primary-gray font-bold pr-3">Điểm thành tích (chỉ Admin được sửa)</span>
                                                            <Field type="number" name="bonus" placeholder=""
                                                                className="w-[200px] h-[30px] border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none text-right"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"flex py-2"}>
                                                    <div className={"w-full flex items-center"}>
                                                        <div className={"h-full text-left flex items-center px-1 "}>
                                                            <span className="text-primary-gray font-bold pr-3">Trạng thái</span>
                                                            <Field type="number" name="status" placeholder="1-Hoàn thành | 2-Hủy"
                                                                className="w-[200px] h-[30px] border-0.5 border-cbs-bg-input-search bg-cbs-bg-input-search px-3 py-1 outline-none text-right"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-3">
                                                <label className="block text-[13px] text-primary-gray mb-2 ml-3" htmlFor="txtNote">
                                                    Ghi chú
                                                </label>
                                                <Field className="h-[60px] appearance-none border-0.5 border-cbs-bg-input-search bg-cbs-table-header rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none resize-none" as="textarea" id="txtNote" placeholder="Ghi chú" {...getFieldProps('note')} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right p-3 border-t-0.5 border-cbs-border" style={{ marginTop: "50px" }}>
                                    <button type="submit" className="btn btn-primary ml-auto">Xác nhận</button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </>
    );
};